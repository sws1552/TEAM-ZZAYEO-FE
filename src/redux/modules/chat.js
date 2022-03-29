import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";
import io from "socket.io-client";

// 액션타입
const SET_SOCKET = "SET_SOCKET";
const DESTROY_SOCKET = "DESTROY_SOCKET";
const GET_CHAT = "GET_CHAT";
const GET_ROOM = "GET_ROOM";
const GET_CHAT_LIST = "GET_CHAT_LIST";

// 액션 생성 함수
const setSocket = createAction(SET_SOCKET, (instance) => ({ instance }));
const destroySocket = createAction(DESTROY_SOCKET, () => ({ }));
const getChat = createAction(GET_CHAT, (chatRoom_list) => ({ chatRoom_list }));
const getChatList = createAction(GET_CHAT_LIST, (chat_list) => ({ chat_list }));
const getRoom = createAction(GET_ROOM, (room_data) => ({ room_data }));

// 초기 상태값
const initialState = {
  instance: null,
  list: [],
  one_chat: {
    user: {},
    curUserInfo: {},
  },
  chatRoom_list: [],
};

// 미들웨어
const createSocketInstance = () => {
  return function (dispatch, getState, {history}) {
    const socket = getState().chat.instance;
    const userId = localStorage.getItem('userId');
    const snsId = localStorage.getItem('snsId');

    if(!socket || !socket?.connected){
      const instance = io.connect("https://stgon.shop");

      if(!userId) {
        return;
      }

      instance?.emit('login', {fromSnsId: snsId});

      dispatch(setSocket(instance));

    }

  }
}


const destroySocketInstance = () => {
  return function (dispatch, getState, {history}){
    const socket = getState().chat.instance;

    if(socket || socket?.connected){
      socket?.disconnect();
      dispatch(destroySocket());
    }

  }
}


const getChatRoomListFB = (toUserId) => {
  return async function (dispatch, getState, { history }) {
    console.log('toUserId !! ',toUserId);
    await axios
      .get(`https://stgon.shop/api/chat/${toUserId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log('채팅방 글 조회 res !! ', res.data.ChatMessages);
        dispatch(getChat(res.data.ChatMessages));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getChatListFB = () => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`https://stgon.shop/api/chat/list`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log('채팅방 목록 조회 res !! ', res.data.chatRoomList);
        dispatch(getChatList(typeof res.data.ChatRoomList === "undefined" ? [] : res.data.ChatRoomList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getNewChatFB = () => {
  return async function (dispatch, getState, { history }) {
    await instance
      .get(`/api/chat/new`)
      .then((res) => {
        console.log("신규 채팅 확인 res !! ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deleteChatRoomFB = (chatRoomId) => {
  return async function (dispatch, getState, { history }) {
    await instance
      .delete(`/api/chat/${chatRoomId}`)
      .then((res) => {
        console.log("채팅방 삭제 res !! ", res);
        dispatch(getChatListFB());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [SET_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.instance = action.payload.instance;
      }),

    [DESTROY_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.instance = null;
      }),

    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chatRoom_list = action.payload.chatRoom_list;
      }),

    [GET_CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.chat_list;
      }),

    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.one_chat = action.payload.room_data;
      }),
  },
  initialState
);

const actionCreators = {
  getRoom,
  getChatRoomListFB,
  getChatListFB,
  getNewChatFB,
  deleteChatRoomFB,
  createSocketInstance,
  destroySocketInstance,
};

export { actionCreators };

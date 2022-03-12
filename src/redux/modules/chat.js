import {createAction, handleActions} from "redux-actions"
import {produce} from "immer";
import axios from "axios";
import instance from "../../shared/Request";


// 액션타입
const GET_CHAT = "GET_CHAT";
const GET_ROOM = "GET_ROOM";
const GET_CHAT_LIST = "GET_CHAT_LIST";



// 액션 생성 함수
const getChat = createAction(GET_CHAT, (chatRoom_list)=> ({chatRoom_list}));
const getChatList = createAction(GET_CHAT_LIST, (chat_list)=> ({chat_list}));
const getRoom = createAction(GET_ROOM, (room_data)=> ({room_data}));


// 초기 상태값
const initialState = {
    list: [

    ],
    one_chat: {
        user:{},
        curUserInfo:{},
    },
    chatRoom_list:[

    ]
}


// 미들웨어
const getChatRoomListFB = (toUserId) => {
    return async function (dispatch, getState, {history}) {
        // console.log('toUserId !! ',toUserId);
        await instance.get(`/api/chat/${toUserId}`)
        .then((res) => {

            // console.log('채팅방 글 조회 res !! ', res.data.chatMessages);
            dispatch(getChat(res.data.chatMessages));
        })
        .catch((err) => {
            console.log(err);
        });
        

    }
}


const getChatListFB = () => {
    return async function (dispatch, getState, {history}) {
        
        await instance.get(`/api/chat/list`)
        .then((res) => {

            // console.log('채팅방 목록 조회 res !! ', res.data.chatRoomList);
            dispatch(getChatList(res.data.chatRoomList));

        })
        .catch((err) => {
            console.log(err);
        });
        

    }
}



export default handleActions (
    {

        [GET_CHAT]: (state, action) => produce(state, (draft)=> {
            draft.chatRoom_list = action.payload.chatRoom_list;
        }),

        [GET_CHAT_LIST]: (state, action) => produce(state, (draft)=> {
            draft.list = action.payload.chat_list;
        }),

        [GET_ROOM]: (state, action) => produce(state, (draft)=> {
            draft.one_chat = action.payload.room_data;
        }),


    }, initialState
);



const actionCreators = {
    getRoom,
    getChatRoomListFB,
    getChatListFB,
}

export {actionCreators};

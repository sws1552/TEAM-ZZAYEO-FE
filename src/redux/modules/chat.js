import {createAction, handleActions} from "redux-actions"
import {produce} from "immer";
import axios from "axios";


// 액션타입
const GET_CHAT = "GET_CHAT";
const GET_ROOM = "GET_ROOM";


// 액션 생성 함수
const getChat = createAction(GET_CHAT, (chat_list)=> ({chat_list}));
const getRoom = createAction(GET_ROOM, (room_data)=> ({room_data}));


// 초기 상태값
const initialState = {
    list: [

    ],
}


// 미들웨어
const getChatListFB = () => {
    return function (dispatch, getState, {history}) {

    }
}



export default handleActions (
    {

        [GET_CHAT]: (state, action) => produce(state, (draft)=> {

        }),

        [GET_ROOM]: (state, action) => produce(state, (draft)=> {
            draft.one_chat = action.payload.room_data;
        }),


    }, initialState
);



const actionCreators = {
    getRoom,
}

export {actionCreators};

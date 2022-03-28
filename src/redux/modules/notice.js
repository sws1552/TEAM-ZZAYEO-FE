import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";

// 액션타입
const GET_NOTICE_LIST = "GET_NOTICE_LIST";

// 액션 생성 함수
const getNotice = createAction(GET_NOTICE_LIST, (notice_list) => ({ notice_list }));

// 초기 상태값
const initialState = {
  list: [],
};

// 미들웨어
const getNoticeListFB = () => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`https://stgon.shop/api/notice`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log('알림 리스트 res !! ', res.data.notices);
        dispatch(getNotice(res.data.notices));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};



export default handleActions(
  {
    [GET_NOTICE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.notice_list;
      }),

    
  },
  initialState
);

const actionCreators = {
    getNoticeListFB,
};

export { actionCreators };

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";
import axios from "axios";

//actions
const GET_USER = "GET_USER";
const SET_USER = "user/SET_USER";

//actioncreator
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//initial
const initialState = {
  user: {
    _id: "",
    nickname: "",
    token: "",
  },
  is_login: false,
};

//middleware
//카카오로그인
const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://3.34.131.246:3000/api/auth/kakao/callback?code=${code}`)
      .then((res) => {
        console.log(res); // 토큰 넘어오는지 확인
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장
        history.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/login"); // 로그인 실패하면 로그인화면으로 보내기
      });
  };
};

//네이버로그인
const naverLogin = (code, state) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://주소넣기/oauth/callback/naver?code=${code}&state=${state}`,
    })
      .then((res) => {
        console.log(res); // 토큰 넘어오는지 확인
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장
        history.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/login"); // 로그인 실패하면 로그인화면으로 보내기
      });
  };
};

//reducer
export default handleActions(
  {
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
  },
  initialState
);

const actionCreators = {
  getUser,
  setUser,
  kakaoLogin,
  naverLogin,
};

export { actionCreators };

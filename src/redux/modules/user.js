import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import axios from "axios";
import { ContentCutOutlined } from "@mui/icons-material";

//actions
const SET_USER = "SET_USER";
const SET_USERPROFILE = "SET_USERPROFILE";
const LOG_OUT = "LOG_OUT";

//actioncreator
const setUser = createAction(SET_USER, (user) => ({ user }));
const setUserProfile = createAction(SET_USERPROFILE, (userInfo) => ({
  userInfo,
}));
const logOut = createAction(LOG_OUT, () => ({}));

//initial
const initialState = {
  user: { userId: null, nickname: null, userImg: null },
  userInfo: [],
  is_login: false,
};

//카카오로그인
const kakaoLogin = (code) => {
  console.log(code);
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://stgon.shop:3000/api/auth/kakao/callback?code=${code}`)
      .then((res) => {
        console.log(res); // 토큰 넘어오는지 확인
        const token = res.data.token;
        const userId = res.data.userId;
        localStorage.setItem("token", token); //예시로 로컬에 저장
        localStorage.setItem("userId", userId);
        dispatch(checkUserDB());
        window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/login"); // 로그인 실패하면 로그인화면으로 보내기
      });
  };
};

//네이버로그인
// const naverLogin = (code, state) => {
//   return function (dispatch, getState, { history }) {
//     axios({
//       method: "GET",
//       url: `http://주소넣기/oauth/callback/naver?code=${code}&state=${state}`,
//     })
//       .then((res) => {
//         console.log(res); // 토큰 넘어오는지 확인
//         const ACCESS_TOKEN = res.data.accessToken;
//         localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장
//         history.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
//       })
//       .catch((err) => {
//         console.log("소셜로그인 에러", err);
//         window.alert("로그인에 실패하였습니다.");
//         history.replace("/login"); // 로그인 실패하면 로그인화면으로 보내기
//       });
//   };
// };

//유저확인
const checkUserDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://stgon.shop:3000/api/users/auth/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res) => {
        let userId = res.data.userId;
        let nickname = res.data.nickname;
        let userImg = res.data.userImg;
        dispatch(
          setUser({ userId: userId, nickname: nickname, userImg: userImg })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//유저프로필 조회
const userProfileDB = (userId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/users/${userId}`)
      .then((res) => {
        console.log("res !! ", res);
        dispatch(setUserProfile(res.data.userInfo));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user.userId = action.payload.user.userId;
        draft.user.nickname = action.payload.user.nickname;
        draft.user.userImg = action.payload.user.userImg;
        draft.is_login = true;
      }),
    [SET_USERPROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        // localStorage.removeItem("token");
        localStorage.clear(); 
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  kakaoLogin,
  checkUserDB,
  setUserProfile,
  userProfileDB,
  logOut,
  // naverLogin,
};

export { actionCreators };

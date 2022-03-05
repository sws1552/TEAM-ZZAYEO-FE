// 리다이렉트될 화면
import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/ConfigureStore";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();

  const REST_API_KEY = "";
  const REDIRECT_URI = "http://3.34.131.246:3000/api/auth/kakao/callback";
  const CLIENT_SECRET = "";

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  let state = new URL(window.location.href).searchParams.get("state");
  console.log(code, state);

  React.useEffect(() => {
    dispatch(userActions.kakaoLogin(code));
    dispatch(userActions.naverLogin(code, state));
  }, []);
};

export default OAuth2RedirectHandler;

import React from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../shared/Auth";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <BtnBox>
        {/* <KaKaoBtn href="http://3.34.131.246:3000/api/auth/kakao/callback"></KaKaoBtn> */}
        <KaKaoBtn href={KAKAO_AUTH_URL}></KaKaoBtn>
        <NaverBtn href={NAVER_AUTH_URL}></NaverBtn>
      </BtnBox>
    </React.Fragment>
  );
};

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const KaKaoBtn = styled.a`
  background-image: url("/img/kakao_login.png");
  background-size: 90%;
  background-position: center;
  width: 312px;
  height: 48px;
  margin-top: 100%;
  margin-bottom: 10px;
  border: 1px solid transparent;
  border-radius: 12px;
  cursor: pointer;
`;

const NaverBtn = styled.a`
  background-image: url("/img/naver_login.png");
  background-size: 80%;
  background-position: center;
  width: 312px;
  height: 48px;
  border: 1px solid transparent;
  border-radius: 12px;
  cursor: pointer;
`;

export default Login;

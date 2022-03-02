import React from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL } from "../shared/Auth";

const Login = (props) => {
  return (
    <React.Fragment>
      <KaKaoBtn>
        <a href={KAKAO_AUTH_URL}>카카오로그인</a>
      </KaKaoBtn>
    </React.Fragment>
  );
};

const KaKaoBtn = styled.div`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

export default Login;

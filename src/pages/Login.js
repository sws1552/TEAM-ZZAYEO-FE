import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/ConfigureStore";

import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../shared/Auth";

const Login = (props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <BtnBox>
        <KaKaoBtn>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="20" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  href="#image0_551_573"
                  transform="translate(0.0434783 0.05) scale(0.00310559 0.00326087)"
                />
              </pattern>
              <image
                id="image0_551_573"
                width="294"
                height="276"
                href="data:image/png;base64,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"
              />
            </defs>
          </svg>
          <a href={KAKAO_AUTH_URL}>카카오로 시작하기</a>
        </KaKaoBtn>
        <LogoutBtn
          onClick={() => {
            dispatch(userActions.logOut());
            window.location.replace("/");
          }}
        >
          <p>로그아웃</p>
          {/* <NaverBtn href={NAVER_AUTH_URL}></NaverBtn> */}
        </LogoutBtn>
      </BtnBox>
    </React.Fragment>
  );
};

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 24px;
`;

const KaKaoBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  margin-top: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
  background-color: #fee500;
  border-radius: 8px;
  cursor: pointer;

  a {
    margin-left: 5px;
    color: #000000;
    font-size: 16px;
    font-weight: 400;
    line-height: 23.17px;
    letter-spacing: -2%;
    text-decoration-line: none;
  }
`;

const LogoutBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  margin-bottom: 10px;
  box-sizing: border-box;
  background-color: #d2dbdd;
  border-radius: 8px;
  cursor: pointer;

  p {
    margin-left: 5px;
    color: #000000;
    font-size: 16px;
    font-weight: 400;
    line-height: 23.17px;
    letter-spacing: -2%;
  }
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

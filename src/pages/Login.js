import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { KAKAO_AUTH_URL } from "../shared/Auth";
import { ReactComponent as CharactersImg } from "../shared/svg/img_splash_cha.svg";
import { ReactComponent as CiImg } from "../shared/svg/img_splash_bi.svg";
import { ReactComponent as CiTextImg } from "../shared/svg/img_splash_text.svg";

import Mypage from "./MyPage";

const Login = (props) => {
  const is_token = localStorage.getItem("token") ? true : false;

  const dispatch = useDispatch();

  if (is_token) {
    return <Mypage />;
  } else {
    return (
      <LoginCon>
        <BtnBox>
          <div>
            <CharactersImg />
          </div>
          <CiImgBox>
            <CiImg />
          </CiImgBox>
          <div>
            <CiTextImg />
          </div>

          <KaKaoBtn>
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99429 0C3.56888 0 0 2.89573 0 6.41119C0 8.69305 1.48465 10.6911 3.71164 11.8321L2.95789 14.6873C2.94368 14.7301 2.94149 14.776 2.95158 14.82C2.96166 14.864 2.98362 14.9043 3.01499 14.9363C3.06073 14.9772 3.11959 14.9999 3.18059 15C3.23116 14.9959 3.27914 14.9756 3.31763 14.9421L6.56103 12.724C7.03979 12.791 7.52241 12.8258 8.00571 12.8282C12.4254 12.8282 16 9.93244 16 6.41119C16 2.88994 12.414 0 7.99429 0Z"
                fill="#392020"
              />
            </svg>
            <a href={KAKAO_AUTH_URL}>카카오로 시작하기</a>
          </KaKaoBtn>
          <LookBtn
            onClick={() => {
              window.location.replace("/");
            }}
          >
            <p>짜여 둘러보기</p>
          </LookBtn>
        </BtnBox>
      </LoginCon>
    );
  }
};

const LoginCon = styled.div`
  width: 100%;
  padding: 0px 24px;
  height: 93.7%;
  display: flex;
  align-items: center;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CiImgBox = styled.div`
  margin-top: 24px;
`;

const KaKaoBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  /* margin-top: 100%; */
  margin-top: 48px;
  margin-bottom: 16px;
  box-sizing: border-box;
  background-color: #fee500;
  border-radius: 8px;
  cursor: pointer;

  a {
    margin-left: 5px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #212121;
    text-align: center;
    letter-spacing: -0.02em;
    text-decoration-line: none;
  }
`;

const LookBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  background-color: #4e49e2;
  border-radius: 8px;
  cursor: pointer;

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
  }
`;

export default Login;

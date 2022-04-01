import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Mypage/Header";
import Switch from "../components/Mypage/Switch";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/ConfigureStore";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const checkUser = useSelector((state) => state.user.user);

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
  }, [dispatch]);

  return (
    <MypageCon>
      <Header />
      <UserCon>
        {checkUser.userImg ? (
          <UserImg
            src={
              checkUser.userImg
                ? checkUser.userImg
                : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200"
            }
          />
        ) : (
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_370_494)">
              <circle cx="45" cy="41" r="41" fill="#F4F4F4" />
              <path
                d="M62.8211 59.8359C61.77 56.7846 59.4536 54.0884 56.2315 52.1653C53.0093 50.2423 49.0613 49.2 44.9998 49.2C40.9383 49.2 36.9903 50.2423 33.7682 52.1653C30.546 54.0884 28.2297 56.7846 27.1785 59.8359"
                stroke="#BFBFBF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="45"
                cy="28.7"
                r="10.25"
                stroke="#BFBFBF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_370_494"
                x="0"
                y="0"
                width="90"
                height="90"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_370_494"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_370_494"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}

        <NickName>{checkUser.nickname}</NickName>
      </UserCon>

      <ListCon>
        <ListItem onClick={() => history.push("/mypageproup")}>
          프로필 수정
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.1154 6.70538C9.72581 6.31581 9.09419 6.31581 8.70462 6.70538V6.70538C8.31534 7.09466 8.315 7.72569 8.70385 8.11538L12.58 12L8.70385 15.8846C8.315 16.2743 8.31534 16.9053 8.70462 17.2946V17.2946C9.09419 17.6842 9.72581 17.6842 10.1154 17.2946L14.7029 12.7071C15.0934 12.3166 15.0934 11.6834 14.7029 11.2929L10.1154 6.70538Z"
              fill="#212121"
            />
          </svg>
        </ListItem>
        <ListItem onClick={() => history.push("/mypageset")}>
          계정 설정
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.1154 6.70538C9.72581 6.31581 9.09419 6.31581 8.70462 6.70538V6.70538C8.31534 7.09466 8.315 7.72569 8.70385 8.11538L12.58 12L8.70385 15.8846C8.315 16.2743 8.31534 16.9053 8.70462 17.2946V17.2946C9.09419 17.6842 9.72581 17.6842 10.1154 17.2946L14.7029 12.7071C15.0934 12.3166 15.0934 11.6834 14.7029 11.2929L10.1154 6.70538Z"
              fill="#212121"
            />
          </svg>
        </ListItem>
        <UseMethod
        onClick={()=>{
          window.open("https://spectacled-socks-6a6.notion.site/064665c9cbd04512b444aaaa8ee48691")
        }}
        >
          짜여 사용 방법 보러가기 >
        </UseMethod>
        {/* <ListItem3>
          알림 설정
          <Switch />
        </ListItem3> */}
    
      </ListCon>
    </MypageCon>
  );
};
const UseMethod = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  margin-top: 16px;
  color: #4E49E2;
  width: 100%;
  height: 54px;
  border: 1px solid #4E49E2;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
` 
const MypageCon = styled.div`
  width: 100%;
  height: 92%;
  padding-bottom: 25px;
  box-sizing: border-box;
`;

const UserCon = styled.div`
  padding: 24px 0px 40px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserImg = styled.div`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  width: 88px;
  height: 88px;
  border-radius: 50px;
`;

const NickName = styled.div`
  margin-top: 16px;
  text-align: center;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const ListCon = styled.div`
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
`;

const ListItem = styled.div`
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  &:hover {
    background-color: #f5f5f5;
  }
  svg {
    cursor: pointer;
  }
`;

const ListItem3 = styled.div`
  border-top: 1px solid #e5e5e5;
  /* border-bottom: 1px solid #e5e5e5; */
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  align-items: center;
`;

export default MyPage;

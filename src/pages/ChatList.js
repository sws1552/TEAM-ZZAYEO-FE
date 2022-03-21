import React, { useState } from "react";
import styled from "styled-components";

import Header from "../components/Chat/Header";
import Onechat from "../components/Chat/Onechat";
import { history } from "../redux/ConfigureStore";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

// import io from "socket.io-client";

// 서버와 클라이언트 연결
// const socket = io.connect("http://3.36.50.53:3000");
// const socket = io.connect("http://localhost:5000");

const ChatList = (props) => {
  const dispatch = useDispatch();

  const chat_list = useSelector((state) => state.chat.list);

  // console.log('chat_list !! ',chat_list);

  const is_token = localStorage.getItem("token") ? true : false;

  React.useEffect(() => {

    if(is_token){
      dispatch(chatActions.getChatListFB());
      // dispatch(chatActions.getNewChatFB());
    }

  }, []);

  

  return (
    <ListContainer>
      <Header />
      {is_token ? 
        <ListWrap>
          <OneChatWrap>
            
            {
            chat_list.length === 0 
            ?
            <NotMsg>
              <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.9093 58.1033L15 65.625L17.0867 52.446C12.1366 47.8835 9.375 41.5459 9.375 34.5395C9.375 20.6415 20.2411 9.375 37.5 9.375C54.7589 9.375 65.625 20.6415 65.625 34.5395C65.625 48.4374 54.7589 59.7039 37.5 59.7039C33.6319 59.7039 30.0848 59.138 26.9093 58.1033Z" stroke="#BDBDBD" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.0137 31.25C26.7396 31.25 28.1387 32.6491 28.1387 34.375C28.1387 35.9776 26.9324 37.2985 25.3782 37.479L25.0137 37.5C23.2741 37.5 21.875 36.1009 21.875 34.375C21.875 32.7724 23.0814 31.4515 24.6356 31.271L25.0137 31.25Z" fill="#BDBDBD"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5137 31.25C39.2396 31.25 40.6387 32.6491 40.6387 34.375C40.6387 35.9776 39.4324 37.2985 37.8782 37.479L37.5137 37.5C35.7741 37.5 34.375 36.1009 34.375 34.375C34.375 32.7724 35.5814 31.4515 37.1356 31.271L37.5137 31.25Z" fill="#BDBDBD"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M50.0137 31.25C51.7396 31.25 53.1387 32.6491 53.1387 34.375C53.1387 35.9776 51.9324 37.2985 50.3782 37.479L50.0137 37.5C48.2741 37.5 46.875 36.1009 46.875 34.375C46.875 32.7724 48.0814 31.4515 49.6356 31.271L50.0137 31.25Z" fill="#BDBDBD"/>
              </svg>
              메세지가 없습니다.
            </NotMsg>
            : 
            chat_list.map((item, i) => {
              // if(typeof item.roomNum !== "undefined"){
                return <Onechat key={item._id} {...item} />
              // }else {
              //   return null;
              // }
            })
            }
            
            
          </OneChatWrap>

        </ListWrap>
      : 
        '로그인 후 이용 가능합니다.'
      }
      
    </ListContainer>
  );

  
};

const ListContainer = styled.div`
  width: 100%;
  height: 93.7%;
  /* background-color: orange; */
  padding: 25px 0;
  box-sizing: border-box;
  border-radius: 10px;
`;

const NotMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
`;

const ListWrap = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: white; */
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;


// 컴포넌트에 스타일을 바꾸는방법 괄호안에 컴포넌트를 넣으면된당
// const TripDestBox = styled(TitleBox)``;

// const ListWrap = styled.div`
//     width: 100%;
//     height: 100%;
//     background-color: white;
//     overflow-y: scroll;
//     overflow-x: hidden;

// 컴포넌트에 스타일을 바꾸는방법 괄호안에 컴포넌트를 넣으면된당
// const TripDestBox = styled(TitleBox)``;



const OneChatWrap = styled.div`
  padding: 0 15px;
`;

export default ChatList;

import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';


const OneNotice = (props) => {

    const displayCreatedAt = (createdAt) => {
        let startTime = new Date(createdAt);
        let nowTime = Date.now();
        if (parseInt(startTime - nowTime) > -60000) {
          return (
            <Moment locale="ko" format="방금 전">
              {startTime}
            </Moment>
          );
        }
        if (parseInt(startTime - nowTime) < -86400000) {
          return (
            <Moment locale="ko" format="MM월 D일">
              {startTime}
            </Moment>
          );
        }
        if (parseInt(startTime - nowTime) > -86400000) {
          return (
            <Moment locale="ko" fromNow>
              {startTime}
            </Moment>
          );
        }
      };

    const testUrl = "";

    return (
        <OneCon>
            {testUrl === "" ?  
            <NoticeImg >
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M23.1031 6.04726C24.8398 5.42703 26.6667 6.71448 26.6667 8.55857V23.4412C26.6667 25.2853 24.8398 26.5728 23.1031 25.9525L15.769 23.3332H10.6667C9.19391 23.3332 8 22.1393 8 20.6666V11.3332C8 9.86047 9.19391 8.66656 10.6667 8.66656H14.3833C15.3003 8.66656 16.2105 8.50891 17.074 8.2005L23.1031 6.04726ZM24 8.55857L17.9709 10.7118C16.8195 11.123 15.606 11.3332 14.3833 11.3332H10.6667V20.6666H16.231L24 23.4412V8.55857Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M14.667 22.6663V9.33301H17.3337V22.6663H14.667Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M4 13.3332C4 11.8604 5.19391 10.6665 6.66667 10.6665H10.6667V21.3332H6.66667C5.19391 21.3332 4 20.1393 4 18.6665V13.3332ZM8 13.3332H6.66667V18.6665H8V13.3332Z" fill="white"/>
            </svg>
            </NoticeImg>
            :
            <NoticeImg src={testUrl}/>
            }

            <ContentCon>
                <Content>
                    Lukasz Szmigiel 님이 회원님의 여행을 좋아합니다.~~~~~~~~~~~~~~~~~~~!
                </Content>
                <TimeCon>
                    {displayCreatedAt("2022.3.25.14:20")}
                </TimeCon>
            </ContentCon>
            
        </OneCon>
    );
};

export default OneNotice;

const OneCon = styled.div`
    /* background-color: red; */
    width: 100%;
    box-sizing: border-box;
    height: 80px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const NoticeImg = styled.div`
    width: 56px;
    height: 56px;
    background-image: url(${(props) => props.src});
    background-color: #8F8CF1;
    border-radius: 30px;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentCon = styled.div`
    /* background-color: orange; */
    width: 80%;
    max-height: 56px;
`;

const Content = styled.div`
    font-size: 14px;
`;

const TimeCon = styled.div`
    margin-top: 8px;
    font-size: 12px;
    color: #9E9E9E;
`;
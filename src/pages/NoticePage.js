import React from 'react';
import styled from 'styled-components';
import Header from '../components/notice/Header';
import OneNotice from '../components/notice/OneNotice';
const NoticePage = (props) => {

    const noticeList = ['알림1','알림2','알림3'];

    return (
        <Container>
            <Header title="알림" showBack={true}/>
            {noticeList.map((item, i) => {
                return <OneNotice key={`noti${i}`}/>;
            })}
            
        </Container>
    );
};

export default NoticePage;

const Container = styled.div`
     width: 100%;
  height: 93.7%;
  /* background-color: orange; */
  padding-bottom: 25px;
  box-sizing: border-box;
  border-radius: 10px;
`;
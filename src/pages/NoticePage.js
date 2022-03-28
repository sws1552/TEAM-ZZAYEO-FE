import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/notice/Header';
import OneNotice from '../components/notice/OneNotice';
import {actionCreators as noticeActions} from '../redux/modules/notice';



const NoticePage = (props) => {

    const dispatch = useDispatch();

    const noticeList = useSelector((state) => state.notice.list);

    // console.log('noticeList !! ',noticeList);

    React.useEffect(() => {
        dispatch(noticeActions.getNoticeListFB());
    }, [dispatch]);

    return (
        <Container>
            <Header title="알림" showBack={true}/>
            {noticeList.map((item, i) => {
                return <OneNotice key={item._id} {...item}/>;
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

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

`;
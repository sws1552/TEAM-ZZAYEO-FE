import React from 'react';
import styled from 'styled-components';

import CommentMenu from './CommentMenu';
import ReplyWrite from './ReplyWrite';

const Reply = (props) => {
    return (
        <ReplyCon>
            <UserCon>
                <UserImg/>
                <NickCon>
                    <NicText>wonseok</NicText>
                    <TimeText>2022-03-05</TimeText>
                </NickCon>
                <CommentMenu/>
            </UserCon>

            <Context>
                이 여행일정을 따라 제주도 여행 쉽게
                클리어 했어요. 정말 꼼꼼한 성격이신 
                것 같아 여행이 쉬웠어용! 감사합니다

                <LikeBtn>좋아요</LikeBtn>

            </Context>
            
            
            <ReplyWrite />


        </ReplyCon>
    );
};

const ReplyCon = styled.div`
    margin-top: 10px;
    width: auto;
    height: auto;
    padding-left: 50px;
    /* background-color: red; */
`;

const UserCon = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const UserImg = styled.div`
    background-image: url("https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200");
    background-position: center;
    background-size: cover;
    box-shadow: 0 5px 5px 0 #BFBFBF;
    width: 40px;
    height: 40px;
    border-radius: 25px;
`;

const NickCon = styled.div`
    margin-left: 10px;
`;

const NicText = styled.div`
    font-weight: bold;
`;

const TimeText = styled.div`
    font-size: 10px;
    color: #BFBFBF;
`;

const Context = styled.div`
    margin-top: 10px;
    padding-left: 50px;
    width: auto;
    height: auto;
    min-height: 40px;
    max-width: 100%;
    overflow-wrap: break-word;
`;

const LikeBtn = styled.div`
    margin-top: 10px;
    font-size: 12px;
    color: #BFBFBF;
    cursor: pointer;
`;

export default Reply;
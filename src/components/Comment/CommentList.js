import React from 'react';
import styled from 'styled-components';

import CommentWrite from './CommentWrite';
import CommentMenu from "./CommentMenu";
import Reply from './Reply';

const CommentList = (props) => {


    const [select, setSelect] = React.useState(false);

    const registClick = () => {
        setSelect(false);
    }

    const sympathyClick = () => {
        setSelect(true);
    }

    return (
        <ListCon>
            <Text>댓글 12</Text>
            <OrderCon>
                <RegistBtn className={select ? "seleted" : null } onClick={registClick}>
                    <Circle></Circle>
                    등록순
                </RegistBtn>
                <Sympathy className={select ? null : "seleted" } onClick={sympathyClick}>
                    <Circle></Circle>
                    공감순
                </Sympathy>
            </OrderCon>

            <CommentCon>
                <CommentItem/>
            </CommentCon>
            
            <CommentWrite/>
        </ListCon>
    );
};

const ListCon = styled.div`
    /* background-color: black; */
    width: 100%;
    height: 53.5vh;
    box-sizing: border-box;

    & .seleted {
        opacity: 0.3;
    }

`;

const Text = styled.div`
    color: #BFBFBF;
    margin: 10px 0;
`;

const OrderCon = styled.div`
    /* background-color: orange; */
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
`;

const Circle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #12C5ED;
`;

const RegistBtn = styled.div`
    cursor: pointer;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Sympathy = styled.div`
    cursor: pointer;
    margin-left: 20px;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CommentCon = styled.div`
    /* background-color: orange; */
    width: 100%;
    height: 77%;
`;


const CommentItem = (props) => {

    return (
        <ItemCon>
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
                <LikeandreplyCon>
                    <LikeBtn>좋아요 2</LikeBtn>
                    <ReplyBtn>답글쓰기</ReplyBtn>
                </LikeandreplyCon>
            </Context>

            <Reply />

        </ItemCon>
    )

}

const ItemCon = styled.div`
    padding-top: 10px;
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
    width: 50px;
    height: 50px;
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

const LikeandreplyCon = styled.div`
    margin-top: 10px;
    font-size: 12px;
    display: flex;
`;

const LikeBtn = styled.div`
    cursor: pointer;
    color: #BFBFBF;
`;

const ReplyBtn = styled.div`
    cursor: pointer;
    margin-left: 10px;
    color: #BFBFBF;
`;






export default CommentList;
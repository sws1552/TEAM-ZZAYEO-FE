import React from 'react';
import styled from 'styled-components';

const ReplyWrite = (props) => {
    return (
        <ReplyCon>
            <UserImg />
            <Input placeholder='답글을 입력해주세요.'/>
        </ReplyCon>
    );
};

const ReplyCon = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
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

const Input = styled.input`
    margin-left: 10px;
    width: 80%;
    height: 35px;
    border: 2px solid #F4F4F4;
    border-radius: 50px;
    padding: 10px 20px;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }

`;

export default ReplyWrite;
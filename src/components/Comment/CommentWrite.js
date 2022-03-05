import React from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';

const CommentWrite = (props) => {
    return (
        <WriteCon>
            <Input placeholder='댓글을 입력해주세요.' />
            <SendIconRe/>
        </WriteCon>
    );
};

const WriteCon = styled.div`
    width:100%;
    height: 12%;
    /* background-color: red; */
    display: flex;
    align-items: center;
    border-top: 1px solid #EDEDED;
`;

const Input = styled.input`
    width: 100%;
    height: 35px;
    background-color: #F4F4F4;
    border:none;
    border-radius: 50px;
    padding: 10px 20px;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }

`;

const SendIconRe = styled(SendIcon)`
    margin-left: 10px;
    color: #c4c4c4;
    cursor: pointer;
    font-size: 30px;
`;

export default CommentWrite;
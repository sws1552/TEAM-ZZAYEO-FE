import React, { useState } from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as commentActions} from '../../redux/modules/comment';
import {actionCreators as userActions} from '../../redux/modules/user';


const CommentWrite = (props) => {

    const {planId} = props;

    const [comment, setComment] = useState('');

    const dispatch = useDispatch();


    const commentAdd = () => {
        if(comment === "") {window.alert('내용을 입력해주세요'); return;}
        dispatch(commentActions.addCommentFB(planId, comment));
        setComment("");
    }

    return (
        <WriteCon>
            <Input placeholder='댓글을 입력해주세요.' value={comment} onChange={(e) => setComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && commentAdd() }/>
            <SendIconRe onClick={commentAdd}/>
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
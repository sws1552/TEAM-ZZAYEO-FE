
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {actionCreators as commentActions} from '../../redux/modules/comment';

const ReplyWrite = (props) => {   

    const {planId, commentId, commentSnsId} = props;

    const socket = useSelector((state) => state.chat.instance);


    const dispatch = useDispatch();


    const [reply, setReply] = useState("");


    const ReplyAdd = () => {
        if(reply === ""){window.alert('내용을 입력해주세요.'); return;}

        socket?.emit('notice', {
            fromSnsId: localStorage.getItem('snsId'),
            toSnsId: commentSnsId,
            noticeType: "CommentReply",
            whereEvent: "reply"
          });

        dispatch(commentActions.addReplyFB(planId, commentId, reply));

        setReply("");
    }

    return (
        <ReplyCon>
            <Input placeholder='답글을 입력해주세요.'
            
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && ReplyAdd()}/>
        </ReplyCon>
    );
};

const ReplyCon = styled.div`
    /* margin-top: 10px; */
    display: flex;
    align-items: center;
    width: 85%;
`;

const Input = styled.input`
    margin-left: 10px;
    width: 100%;
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
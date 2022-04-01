
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

            <div
                className="sendIcon"
                style={{ color: "#4E49E2" }}
                onClick={ReplyAdd}
            >
                <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.46406 0.647395C1.31686 0.0355554 -0.0123762 1.07338 0.302961 2.33473L1.71928 8L7 8C7.55228 8 8 8.44772 8 9C8 9.55229 7.55228 10 7 10L1.71924 10L0.302962 15.6651C-0.0123745 16.9264 1.31685 17.9643 2.46406 17.3524L15.6434 10.3234C16.7022 9.75874 16.7022 8.24109 15.6434 7.67639L2.46406 0.647395Z"
                    fill="#4E49E2"
                />
                </svg>
            </div>
        </ReplyCon>
    );
};

const ReplyCon = styled.div`
    /* margin-top: 10px; */
    display: flex;
    align-items: center;
    width: 85%;

    & .sendIcon {
        margin-left: 10px;
        color: #c4c4c4;
        cursor: pointer;
        font-size: 25px;
        display: flex;
        align-items: center;
    }

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
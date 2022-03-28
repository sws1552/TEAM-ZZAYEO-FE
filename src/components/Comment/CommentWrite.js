import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentWrite = (props) => {
  const { planId, snsId } = props;

  const socket = useSelector((state) => state.chat.instance);

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const commentAdd = () => {
    if (comment === "") {
      window.alert("내용을 입력해주세요");
      return;
    }

    socket?.emit('notice', {
      fromSnsId: localStorage.getItem('snsId'),
      toSnsId: snsId,
      noticeType: "CommentReply",
      whereEvent: "comment"
    });

    dispatch(commentActions.addCommentFB(planId, comment));
    setComment("");
  };

  return (
    <WriteCon>
      <Input
        placeholder="댓글을 입력해주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && commentAdd()}
      />
      <SendIconRe
        onClick={commentAdd}
        style={{ color: comment.length !== 0 ? "#4E49E2" : null }}
      >
        등록
      </SendIconRe>
    </WriteCon>
  );
};

const WriteCon = styled.div`
  width: 100%;
  height: 12%;
  /* background-color: red; */
  display: flex;
  align-items: center;
  border-top: 1px solid #ededed;
  padding: 10px 0;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  background-color: #f4f4f4;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const SendIconRe = styled.div`
  margin-left: 10px;
  color: #c4c4c4;
  cursor: pointer;
  font-size: 14px;
  width: 30px;
`;

export default CommentWrite;

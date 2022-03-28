import React, { useState } from "react";
import styled from "styled-components";

import CommentWrite from "./CommentWrite";
import CommentMenu from "./CommentMenu";
import ReplyList from "./ReplyList";

import "moment/locale/ko";
import moment from "moment";

import Moment from "react-moment";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { actionCreators as userActions } from "../../redux/modules/user";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DropDownMenu from "./DropDownMenu";

const CommentList = (props) => {
  const planId = props.planId;
  const snsId = props.snsId;

  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  const userInfo = useSelector((state) => state.user.user);

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());

    if (!comment_list[planId]) {
      dispatch(commentActions.getCommentFB(planId));
    }
  }, []);

  if (!comment_list[planId] || !planId) {
    return null;
  } else {
    return (
      <ListCon>
        <Text>댓글 {comment_list[planId].length}</Text>
        <CommentCon>
          {comment_list[planId].map((item, i) => {
            return (
              <CommentItem key={item.commentId} {...item} userInfo={userInfo} />
            );
          })}
        </CommentCon>

        <CommentWrite planId={planId} snsId={snsId}/>
      </ListCon>
    );
  }
};

const ListCon = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
  border-top: 1px solid #E0E0E0;
  margin-top: 24px;
`;

const Text = styled.div`
  color: #616161;
  margin: 10px 0;
`;

const CommentCon = styled.div`
  width: 100%;
`;

const CommentItem = (props) => {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.chat.instance);

  const [upComment, setUpComment] = useState(props.content);
  const [replyHide, setReplyHide] = useState(false);
  const [updateHide, setHide] = useState(false);

  const updateComment = () => {
    dispatch(
      commentActions.realUpdateCommentFB(
        props.commentId,
        props.planId,
        upComment
      )
    );
    setHide(!updateHide);
  };

  const commentLikeFunc = () => {
    if (props.isLike) {
      dispatch(commentActions.commentLikeFalse(props.planId, props.commentId));
    } else {

      socket?.emit('notice', {
        fromSnsId: localStorage.getItem('snsId'),
        toSnsId: props.userId.snsId,
        noticeType: "Like",
        whereEvent: "comment"
      });

      dispatch(commentActions.commentLikeTrue(props.planId, props.commentId));
    }
  };

  // 업로드 시간 가공
  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return (
        <Moment locale="ko" format="방금 전">
          {startTime}
        </Moment>
      );
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return (
        <Moment locale="ko" format="MM월 D일">
          {startTime}
        </Moment>
      );
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return (
        <Moment locale="ko" fromNow>
          {startTime}
        </Moment>
      );
    }
  };

  return (
    <ItemCon>
      <UserCon>
        <UserImg
          src={
            props.userId.profile_img
              ? props.userId.profile_img
              : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200"
          }
        />
        <NickCon>
          <NicText>{props.userId.nickname}</NicText>
          <TimeText>{displayCreatedAt(props.createdAt)}</TimeText>
        </NickCon>
        {props.userId.email === localStorage.getItem("userId") ? (
          <DropDownMenu
            commentId={props.commentId}
            planId={props.planId}
            hide={() => setHide(!updateHide)}
          />
        ) : null}
        
      </UserCon>

      <Context>
        {updateHide ? (
          <UpdateCon>
            <UpdateText
              value={upComment}
              onChange={(e) => setUpComment(e.target.value)}
            />
            <UpdateBtnCon>
              <UpdateBtn onClick={updateComment}>수정</UpdateBtn>
              <UpdateCancelBtn onClick={() => setHide(!updateHide)}>
                취소
              </UpdateCancelBtn>
            </UpdateBtnCon>
          </UpdateCon>
        ) : (
          props.content
        )}

        <LikeandreplyCon>
          <LikeBtn
            className={props.isLike ? "likeTrue" : null}
            onClick={commentLikeFunc}
          >
            {props.isLike ? (
              <FavoriteIcon style={{ fontSize: "13px", marginRight: "2px" }} />
            ) : (
              <FavoriteBorderIcon
                style={{ fontSize: "13px", marginRight: "2px" }}
              />
            )}
            좋아요 {props.likeCount}
          </LikeBtn>
          <ReplyBtn onClick={() => setReplyHide(!replyHide)}>
            답글달기 {props.replies.length}
          </ReplyBtn>
        </LikeandreplyCon>
      </Context>

      {replyHide ? (
        <ReplyList
          userInfo={props.userInfo}
          planId={props.planId}
          commentId={props.commentId}
          replies={props.replies}
          commentSnsId={props.userId.snsId}
        />
      ) : null}
    </ItemCon>
  );
};

const ItemCon = styled.div`
  padding: 10px 0;
  box-sizing: border-box;
  .likeTrue {
    color: #757575;
    font-weight: bold;
  }
`;

const UserCon = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const UserImg = styled.div`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  /* box-shadow: 0 5px 5px 0 #bfbfbf; */
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
  color: #757575;
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

const UpdateCon = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpdateText = styled.textarea`
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid #f1f3f5;
  margin-bottom: 0.7rem;
  border-radius: 4px;
  min-height: 1.125rem;
  font-size: 1rem;
  color: black;
  line-height: 1.75;
  background: #ffffff;
  /* font-weight: 500; */
`;

const UpdateBtnCon = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UpdateBtn = styled.button``;

const UpdateCancelBtn = styled.button`
  margin-left: 10px;
`;

const LikeandreplyCon = styled.div`
  margin-top: 10px;
  font-size: 12px;
  display: flex;
`;

const LikeBtn = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #757575;
`;

const ReplyBtn = styled.div`
  cursor: pointer;
  margin-left: 10px;
  color: #757575;
`;

export default CommentList;

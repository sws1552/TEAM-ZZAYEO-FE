import React, { useState } from 'react';
import styled from 'styled-components';

import CommentMenu from './CommentMenu';
import ReplyWrite from './ReplyWrite';
import ReplyMenu from './ReplyMenu';

import 'moment/locale/ko';
import moment from 'moment';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../../redux/modules/comment';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyDrop from './ReplyDrop';

const ReplyList = (props) => {

    const { planId, commentId, replies, userInfo, commentSnsId } = props;
    const token = localStorage.getItem("token")

    return (
        <ReplyListCon>
            <ReplyWrap heightVal={replies.length <= 2 ? "auto" : "20vh"}>
                {replies.map((item, i) => {
                    return <Reply key={item.replyId} {...item} userInfo={userInfo} planId={planId} />
                })}
            </ReplyWrap>


            {token ?
                <ReplyWriteCon>
                    <ReplyUserImg userImg={userInfo.userImg} />
                    <ReplyWrite planId={planId} commentId={commentId} commentSnsId={commentSnsId} />
                </ReplyWriteCon> : null}

        </ReplyListCon>
    )

}

const ReplyListCon = styled.div`
    padding: 10px 0 0 0;
    width: auto;
    height: auto;
    padding-left: 50px;
    /* overflow-y: scroll; */
    /* background-color: red; */
`;

const ReplyWrap = styled.div`
    height: auto;
    /* overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    } */
`;

const ReplyUserImg = styled.div`
    background-image: url("${(props) => (props.userImg ? props.userImg : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200")}");
    background-position: center;
    background-size: cover;
    /* box-shadow: 0 5px 5px 0 #BFBFBF; */
    width: 40px;
    height: 40px;
    border-radius: 25px;
`;

const ReplyWriteCon = styled.div`
    margin-top: 10px;
    display:flex;
    align-items: center;
`;

const Reply = (props) => {

    const socket = useSelector((state) => state.chat.instance);

    const dispatch = useDispatch();

    const [upReplyhide, setReplyHide] = useState(false);

    const [upReplyText, setReplyText] = useState(props.content);

    const updateReply = () => {
        dispatch(commentActions.updateReplyFB(props.planId, props.replyId, upReplyText));
        setReplyHide(!upReplyhide);
    }

    const replyLike = () => {
        if (props.isLike) {
            dispatch(commentActions.replyLikeFalse(props.planId, props.replyId));
        } else {

            socket?.emit('notice', {
                fromSnsId: localStorage.getItem('snsId'),
                toSnsId: props.userId.snsId,
                noticeType: "Like",
                whereEvent: "reply"
            });

            dispatch(commentActions.replyLikeTrue(props.planId, props.replyId));
        }
    }

    // 업로드 시간 가공
    const displayCreatedAt = (createdAt) => {
        let startTime = new Date(createdAt);
        let nowTime = Date.now();
        // 현재시간부터 1분 일때
        if (parseInt(startTime - nowTime) > -60000) {
            return <Moment locale="ko" format="방금 전">{startTime}</Moment>;
        }
        // 현재시간부터 24시간이 지낫을때
        if (parseInt(startTime - nowTime) < -86400000) {
            return <Moment locale="ko" format="MM월 D일">{startTime}</Moment>;
        }
        // 현재시간부터 24시간이 지나지 않았을때
        if (parseInt(startTime - nowTime) > -86400000) {
            return <Moment locale="ko" fromNow>{startTime}</Moment>;
        }
    };

    return (
        <ReplyCon>
            <UserCon>
                <UserImg profile_img={props.userId.profile_img} />
                <NickCon>
                    <NicText>{props.userId.nickname}</NicText>
                    <TimeText>{displayCreatedAt(props.createdAt)}</TimeText>
                </NickCon>
                {props.userId.email === localStorage.getItem("userId") ?
                    <ReplyDrop planId={props.planId} commentId={props.commentId} replyId={props.replyId} hide={() => setReplyHide(!upReplyhide)} />
                    :
                    null}

            </UserCon>

            <Context>
                {upReplyhide ?
                    <ReplyUpdateCon>
                        <ReplyUpdateText value={upReplyText}
                            onChange={(e) => setReplyText(e.target.value)} />
                        <ReplyUpdateBtnCon>
                            <ReplyUpdateBtn onClick={updateReply}>수정</ReplyUpdateBtn>
                            <ReplyUpdateCancelBtn onClick={() => setReplyHide(!upReplyhide)}>취소</ReplyUpdateCancelBtn>
                        </ReplyUpdateBtnCon>
                    </ReplyUpdateCon>
                    :
                    props.content}

                <BtnCon>
                    <LikeBtn className={props.isLike ? 'likeTrue' : null}
                        onClick={replyLike}>
                        {props.isLike ? <FavoriteIcon style={{ fontSize: "13px", marginRight: "2px" }} /> : <FavoriteBorderIcon style={{ fontSize: "13px", marginRight: "2px" }} />}
                        좋아요 {props.likeCount}
                    </LikeBtn>

                </BtnCon>

            </Context>

        </ReplyCon>
    );
};

const ReplyCon = styled.div`
    
    background-color: #f3f3f3;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 5px;
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
    background-image: url("${(props) => (props.profile_img ? props.profile_img : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200")}");
    background-position: center;
    background-size: cover;
    /* box-shadow: 0 5px 5px 0 #BFBFBF; */
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
    font-size: 14px;
`;

const BtnCon = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
`;

const LikeBtn = styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #757575;
    cursor: pointer;
`;

const ReplyUpdateCon = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReplyUpdateText = styled.textarea`
    resize: none;
    padding: 1rem 1rem 1.5rem;
    outline: none;
    border: 1px solid #F1F3F5;
    margin-bottom: 0.7rem;
    border-radius: 4px;
    min-height: 1.125rem;
    font-size: 1rem;
    color: black;
    line-height: 1.75;
    background: #FFFFFF;
    /* font-weight: 500; */
`;

const ReplyUpdateBtnCon = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ReplyUpdateBtn = styled.button`

`;

const ReReplyBtnC = styled.div`
  cursor: pointer;
  margin-left: 10px;
  color: #757575;
  font-size: 12px;
`;

const ReplyUpdateCancelBtn = styled.button`
    margin-left: 10px;

`;

export default ReplyList;
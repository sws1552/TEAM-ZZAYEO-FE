import React, { useState } from 'react';
import styled from 'styled-components';

import CommentMenu from './CommentMenu';
import ReplyWrite from './ReplyWrite';
import ReplyMenu from './ReplyMenu';

import 'moment/locale/ko';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {actionCreators as commentActions} from '../../redux/modules/comment';

const ReplyList = (props) => {

    const {planId, commentId, replies, userInfo} = props;

    // console.log('planId !! ', planId);
    // console.log('commentId !! ', commentId);
    // console.log('replies !! ', replies);

    // console.log('userInfo !! ',userInfo);

    return (
        <ReplyListCon>
            <ReplyWrap>
            {replies.map((item, i) => {
                return <Reply key={item.replyId} {...item} userInfo={userInfo} planId={planId}/>
            })}
            </ReplyWrap>
            <ReplyWriteCon>
                <ReplyUserImg userImg={userInfo.userImg}/>
                <ReplyWrite planId={planId} commentId={commentId}/>
            </ReplyWriteCon>
        </ReplyListCon>
    )

}

const ReplyListCon = styled.div`
    padding: 10px 0;
    width: auto;
    height: auto;
    padding-left: 50px;
    /* overflow-y: scroll; */
    /* background-color: red; */
`;

const ReplyWrap = styled.div`
    height: 20vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const ReplyUserImg = styled.div`
    background-image: url("${(props) => (props.userImg ? props.userImg : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200" )}");
    background-position: center;
    background-size: cover;
    box-shadow: 0 5px 5px 0 #BFBFBF;
    width: 40px;
    height: 40px;
    border-radius: 25px;
`;

const ReplyWriteCon = styled.div`
    display:flex;
    align-items: center;
`;

const Reply = (props) => {

    // console.log('props !! ', props);
    const dispatch = useDispatch();

    const [upReplyhide, setReplyHide] = useState(false);

    const [upReplyText, setReplyText] = useState(props.content);

    const updateReply = () => {
        dispatch(commentActions.updateReplyFB(props.planId, props.replyId, upReplyText));
        setReplyHide(!upReplyhide);
    }

    const replyLike = () => {
        if(props.isLike){
            dispatch(commentActions.replyLikeFalse(props.planId, props.replyId));
        }else {
            dispatch(commentActions.replyLikeTrue(props.planId, props.replyId));
        }
    }

    return (
        <ReplyCon>
            <UserCon>
                <UserImg profile_img={props.userId.profile_img}/>
                <NickCon>
                    <NicText>{props.userId.nickname}</NicText>
                    <TimeText>{moment(props.createdAt).format('YYYY-MM-DD')}</TimeText>
                </NickCon>
                {props.userId.email === props.userInfo.userId ? 
                    <ReplyMenu planId={props.planId} commentId={props.commentId} replyId={props.replyId} hide={() => setReplyHide(!upReplyhide)}/>
                :
                    null}
                
            </UserCon>

            <Context>
                {upReplyhide ? 
                    <ReplyUpdateCon>
                        <ReplyUpdateText value={upReplyText}
                        onChange={(e) => setReplyText(e.target.value)}/>
                        <ReplyUpdateBtnCon>
                            <ReplyUpdateBtn onClick={updateReply}>수정</ReplyUpdateBtn>
                            <ReplyUpdateCancelBtn onClick={() => setReplyHide(!upReplyhide)}>취소</ReplyUpdateCancelBtn>
                        </ReplyUpdateBtnCon>
                    </ReplyUpdateCon>
                :
                    props.content}

                <BtnCon>
                    <LikeBtn className={props.isLike ? 'likeTrue' : null}
                    onClick={replyLike}>좋아요 {props.likeCount}</LikeBtn>
                </BtnCon>

            </Context>
            
        </ReplyCon>
    );
};

const ReplyCon = styled.div`
    
    /* background-color: red; */
    margin-bottom: 10px;

    .likeTrue {
        color: #12C5ED;
        font-weight: bold;
    }

`;

const UserCon = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const UserImg = styled.div`
    background-image: url("${(props) => (props.profile_img ? props.profile_img : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200" )}");
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
    font-size: 14px;
`;

const BtnCon = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
`;

const LikeBtn = styled.div`
    font-size: 12px;
    color: #BFBFBF;
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

const ReplyUpdateCancelBtn = styled.button`
    margin-left: 10px;

`;

export default ReplyList;
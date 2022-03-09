import React, { useState } from 'react';
import styled from 'styled-components';

import CommentWrite from './CommentWrite';
import CommentMenu from "./CommentMenu";
import ReplyList from './ReplyList';

import 'moment/locale/ko';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as commentActions} from '../../redux/modules/comment';
import {actionCreators as userActions} from '../../redux/modules/user';


const CommentList = (props) => {

    const {planId} = props;

    const dispatch = useDispatch();
    const comment_list = useSelector(state => state.comment.list);
    const userInfo = useSelector((state) => state.user.user);

    React.useEffect(() => {
        dispatch(userActions.checkUserDB());
        
        if(!comment_list[planId]){
            dispatch(commentActions.getCommentFB(planId));
        }
    }, [])
    
    // console.log('userInfo !! ',userInfo);
    // console.log('comment_list !! ',comment_list);

    // const [select, setSelect] = useState(false);

    // const registClick = () => {
    //     setSelect(false);
    // }

    // const sympathyClick = () => {
    //     setSelect(true);
    // }

    if(!comment_list[planId] || !planId){
        return null;
    }else {

        return (
            <ListCon>
                <Text>댓글 {comment_list[planId].length}</Text>
                {/* <OrderCon>
                    <RegistBtn className={select ? "seleted" : null } onClick={registClick}>
                        <Circle></Circle>
                        등록순
                    </RegistBtn>
                    <Sympathy className={select ? null : "seleted" } onClick={sympathyClick}>
                        <Circle></Circle>
                        공감순
                    </Sympathy>
                </OrderCon> */}

                <CommentCon>
                {comment_list[planId].map((item, i) => {
                    return <CommentItem key={item.commentId} {...item} userInfo={userInfo} />
                })}
                </CommentCon>
                
                <CommentWrite planId="6226e4ea0e661b1ab7e06834"/>
            </ListCon>
        );

    }
};

CommentList.defaultProps = {
    planId: "6226e4ea0e661b1ab7e06834",
}

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
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

`;


const CommentItem = (props) => {

    // console.log(props);

    // console.log('updateState !! ',props.updateState);

    const dispatch = useDispatch();

    const [upComment, setUpComment] = useState(props.content);

    const [replyHide, setReplyHide] = useState(false);

    const [updateHide, setHide] = useState(false);

    const [commentLike, setCommentLike] = useState(false);

    const updateComment = () => {
        dispatch(commentActions.realUpdateCommentFB(props.commentId, props.planId, upComment));
        setHide(!updateHide);
    }

    const commentLikeFunc = () => {

        dispatch(commentActions.commentLikeTrue(props.planId, props.commentId));

        setCommentLike(!commentLike);
    }

    // console.log('updateHide !! ',updateHide);

    return (
        <ItemCon>
            <UserCon>
                <UserImg profile_img={props.userId.profile_img}/>
                <NickCon>
                    <NicText>{props.userId.nickname}</NicText>
                    <TimeText>{moment(props.createdAt).format('YYYY-MM-DD')}</TimeText>
                </NickCon>
                {props.userId.email === props.userInfo.userId ? 
                    <CommentMenu commentId={props.commentId} planId={props.planId} hide={() => setHide(!updateHide)}/>
                : 
                    null}
            </UserCon>

            <Context>

                {updateHide ? 
                <UpdateCon>
                    <UpdateText value={upComment}
                    onChange={(e) => setUpComment(e.target.value)}/>
                    <UpdateBtnCon>
                        <UpdateBtn
                        onClick={updateComment}>수정</UpdateBtn>
                        <UpdateCancelBtn
                        onClick={() => setHide(!updateHide)}>취소</UpdateCancelBtn>
                    </UpdateBtnCon>
                </UpdateCon> 
                : 
                props.content }

                <LikeandreplyCon>
                    <LikeBtn className={commentLike ? 'likeTrue' : null}
                    onClick={commentLikeFunc}>좋아요 {props.likeCount}</LikeBtn>
                    <ReplyBtn onClick={() => setReplyHide(!replyHide)}>답글 {props.replies.length}</ReplyBtn>
                </LikeandreplyCon>
            </Context>

            {/* {props.replies.map((item, i) => {
                return <Reply />
            })} */}

            {replyHide ? <ReplyList userInfo={props.userInfo} planId={props.planId} commentId={props.commentId} replies={props.replies}/> : null }

        </ItemCon>
    )

}

// CommentItem.defaultProps = {
//     userId: {
//         profile_img: "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200",
//     }
// }

const ItemCon = styled.div`
    padding-top: 10px;

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

const UpdateCon = styled.div`
    display: flex;
    flex-direction: column;
`;

const UpdateText = styled.textarea`
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

const UpdateBtnCon = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const UpdateBtn = styled.button`

`;

const UpdateCancelBtn = styled.button`
    margin-left: 10px;

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
import React from 'react';
import styled from "styled-components";
import moment from 'moment';
import { socket } from "../../shared/Socket";
import { history } from "../../redux/ConfigureStore";
import { actionCreators as chatActions } from "../../redux/modules/chat";
import { actionCreators as userActions } from "../../redux/modules/user";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";

const Onechat = (props) => {

    const dispatch = useDispatch();

    // console.log('props !! ',props);

    const joinRoom = () => {
        
        const roomUserInfo = {
            user: props.userId2,
            curUserInfo: props.userId,
        }

        const roomData = {
            fromSnsId: props.userId.snsId,
            toSnsId: props.userId2.snsId,
        }

        dispatch(chatActions.getRoom(roomUserInfo));

        socket.emit("joinRoom", roomData);

        history.push("/chatroom");

    }

    return (
        <Container onClick={joinRoom}>
            <UserImg profileImg={props.userId2.profile_img}/>
            <NickCon>
                <Text>{props.userId2.nickname} 
                    {props.notReadCount !== 0 ? 
                    <NotReadCount>안 읽은 메세지: {props.notReadCount}개</NotReadCount>
                    :
                    null}
                </Text>
                <LastChat>{props.lastChat.chatText}</LastChat>
                <div style={{color: "#757575"}}>{moment(props.updatedAt).format("YYYY. MM. DD")}</div>
            </NickCon>
        </Container>
    );
};

Onechat.defaultProps = {
    profileImg : "https://i.pinimg.com/736x/b8/5e/08/b85e089d8b68bb06d7f691acce480adb--big-cats-cute-cats.jpg",
    userNick: "wonseok",
    pretime: "2022-03-03",
    _onClick: () => {},
}

const LastChat = styled.div`
    max-width: 270px;
    height: 24px;
    overflow-x: hidden;
    overflow-y: hidden;
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 7vh;
    /* background-color: orange; */
    align-items: center;
    border-radius: 10px;
    margin: 20px 0;

    &:hover {
        background-color: #F5F5F5;
    }

`;

const NotReadCount = styled.div`
    color: purple;
    margin-left: 10px;
`;

const UserImg = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-image: url(${(props) => (props.profileImg ? props.profileImg : "https://i.pinimg.com/736x/b8/5e/08/b85e089d8b68bb06d7f691acce480adb--big-cats-cute-cats.jpg")});
    background-position: center;
    background-size: cover;
    object-fit: contain;
`;

const NickCon = styled.div`
    margin-left: 10px;
`;

const Text = styled.div`
    font-weight: bold;
    display: flex;
`;

export default Onechat;
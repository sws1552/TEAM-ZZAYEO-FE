import React from "react";
import styled from "styled-components";
import moment from "moment";
import Moment from "react-moment";
import { history } from "../../redux/ConfigureStore";
import { actionCreators as chatActions } from "../../redux/modules/chat";
import { actionCreators as userActions } from "../../redux/modules/user";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";
import OneChatDrop from "./OneChatDrop";

const Onechat = (props) => {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.chat.instance);

  const joinRoom = () => {
    const roomUserInfo = {
      user: props.userId2,
      curUserInfo: props.userId,
    };

    const roomData = {
      fromSnsId: props.userId.snsId,
      toSnsId: props.userId2.snsId,
    };

    dispatch(chatActions.getRoom(roomUserInfo));

    socket.emit("joinRoom", roomData);

    history.push("/chatroom");
  };

  // 업로드 시간 가공
  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    // 현재시간부터 1분 일때
    if (parseInt(startTime - nowTime) > -60000) {
      return (
        <Moment locale="ko" format="방금 전">
          {startTime}
        </Moment>
      );
    }
    // 현재시간부터 24시간이 지낫을때
    if (parseInt(startTime - nowTime) < -86400000) {
      return (
        <Moment locale="ko" format="MM월 D일">
          {startTime}
        </Moment>
      );
    }
    // 현재시간부터 24시간이 지나지 않았을때
    if (parseInt(startTime - nowTime) > -86400000) {
      return (
        <Moment locale="ko" fromNow>
          {startTime}
        </Moment>
      );
    }
  };

  return (

    <div style={{ display: "flex", justifyContent: "space-between", position:"relative" }}>

      <Container style={{ cursor: "pointer" }} onClick={joinRoom}>
        <UserImg profileImg={props?.userId2?.profile_img} />
        <NickCon>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text>{props?.userId2?.nickname}</Text>
            {props?.notReadCount !== 0 ? (
              <NotReadCount>{props.notReadCount}</NotReadCount>
            ) : null}
          </div>

          <LastChat>{props?.lastChat?.chatText}</LastChat>
          <div style={{ color: "#9E9E9E", fontSize: "12px" }}>
            {displayCreatedAt(props?.updatedAt)}
          </div>
        </NickCon>
      </Container>
      <div style={{marginTop:"-12px"}}>
        <OneChatDrop chatRoomId={props.chatRoomId} />
      </div>
    </div>

  );
};

Onechat.defaultProps = {
  profileImg:
    "https://i.pinimg.com/736x/b8/5e/08/b85e089d8b68bb06d7f691acce480adb--big-cats-cute-cats.jpg",
  userNick: "wonseok",
  pretime: "2022-03-03",
  _onClick: () => { },
};

const LastChat = styled.div`
  max-width: 270px;
  /* height: 24px; */
  overflow-x: hidden;
  overflow-y: hidden;
  font-size: 14px;
  font-weight: 500;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 80px;
  /* background-color: orange; */
  align-items: center;
  /* border-radius: 10px; */

  &:hover {
    background-color: #f5f5f5;
  }
`;

const NotReadCount = styled.div`
  color: #ffffff;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background-color: #ed3e44;
  justify-content: center;
`;

const UserImg = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 35px;
  background-image: url(${(props) =>
    props.profileImg
      ? props.profileImg
      : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200"});
  background-position: center;
  background-size: cover;
  object-fit: contain;
`;

const NickCon = styled.div`
  margin-left: 10px;
`;

const Text = styled.div`
  font-weight: 700;
  display: flex;
  font-size: 14px;
`;

export default Onechat;

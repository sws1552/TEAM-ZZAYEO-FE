import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import instance from "../shared/Request";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { socket } from "../shared/Socket";
import { history } from "../redux/ConfigureStore";

const OtherUserPage = (props) => {
  const dispatch = useDispatch();

  const userId = props.match.params.userId;

  const myInfo = useSelector((store) => store.user.user);

  const user = useSelector((store) => store.user.userInfo);

  const joinRoom = async () => {
    const curUserInfo = await instance
      .get(`/api/users/${myInfo.userId}`)
      .then((res) => {
        return res.data.userInfo;
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log('user !! ',user);
    // console.log('curUserInfo !! ',curUserInfo);

    const roomUserInfo = {
      user: user,
      curUserInfo: curUserInfo,
    };

    const roomData = {
      fromSnsId: curUserInfo.snsId,
      toSnsId: user.snsId,
    };

    // console.log('roomData !! ',roomData);

    dispatch(chatActions.getRoom(roomUserInfo));

    socket.emit("joinRoom", roomData);

    history.push("/chatroom");
  };

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
    dispatch(userActions.userProfileDB(userId));
  }, [userId]);

  return (
    <Container>
      <UserInfo>
        <UserNickName>{user.nickname}</UserNickName>
        <UserImgCon>
          <UserImg src={user.profile_img} />
        </UserImgCon>
        <MessageBtn onClick={joinRoom}>메시지 보내기</MessageBtn>
      </UserInfo>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const UserInfo = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
`;

const UserNickName = styled.div`
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 20px;
  color: #535353;
`;

const UserImgCon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
`;

const UserImg = styled.img`
  width: 82px;
  height: 82px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-position: center;
  background-size: cover;
  border-radius: 82px;
`;

const MessageBtn = styled.div`
  background: #ffffff;
  border: 1px solid #bfbfbf;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 5px 16px;
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #535353;
  cursor: pointer;
`;

export default OtherUserPage;

import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const OtherUserPage = (props) => {
  const dispatch = useDispatch();

  const userId = props.match.params.userId;

  const user = useSelector((store) => store.user.userInfo);

  React.useEffect(() => {
    dispatch(userActions.userProfileDB(userId));
  }, [userId]);

  return (
    <Container>
      <UserInfo>
        <UserNickName>{user.nickname}</UserNickName>
        <UserImgCon>
          <UserImg src={user.profile_img} />
        </UserImgCon>
        <MessageBtn>메시지 보내기</MessageBtn>
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

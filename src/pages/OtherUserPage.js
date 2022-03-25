import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import instance from "../shared/Request";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { socket } from "../shared/Socket";
import { history } from "../redux/ConfigureStore";
import TravelList from "../components/OtherUserPage/TravelList";

const OtherUserPage = (props) => {
  const dispatch = useDispatch();

  const userId = props.match.params.userId;

  const myInfo = useSelector((store) => store.user.user);
  const user = useSelector((store) => store.user.userInfo);
  console.log(user)

  const joinRoom = async () => {
    const curUserInfo = await instance
      .get(`/api/users/${myInfo.userId}`)
      .then((res) => {
        return res.data.userInfo;
      })
      .catch((err) => {
        console.log(err);
      });

    const roomUserInfo = {
      user: user,
      curUserInfo: curUserInfo,
    };

    const roomData = {
      fromSnsId: curUserInfo.snsId,
      toSnsId: user.snsId,
    };

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
      <Top>
          <CancleBtn
            onClick={() => {
              history.replace("/");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.29289 12.7073C2.90237 12.3168 2.90237 11.6836 3.29289 11.2931L9.65685 4.92912C10.0474 4.5386 10.6805 4.5386 11.0711 4.92912C11.4616 5.31965 11.4616 5.95281 11.0711 6.34334L6.41421 11.0002H20C20.5523 11.0002 21 11.4479 21 12.0002C21 12.5525 20.5523 13.0002 20 13.0002H6.41421L11.0711 17.657C11.4616 18.0476 11.4616 18.6807 11.0711 19.0713C10.6805 19.4618 10.0474 19.4618 9.65685 19.0713L3.29289 12.7073Z"
                fill="#212121"
              />
            </svg>
          </CancleBtn>
        </Top>
      <UserInfo>
        <UserImgCon>
          <UserImg src={user.profile_img} />
        </UserImgCon>
        <UserNickName>{user.nickname}</UserNickName>
        <MessageBtn onClick={joinRoom}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M2 12.645V4.66699C2 3.56242 2.89543 2.66699 4 2.66699H12C13.1046 2.66699 14 3.56242 14 4.66699V10.0003C14 11.1049 13.1046 12.0003 12 12.0003H5.38024L4.45498 13.3882C4.45497 13.3882 4.45499 13.3882 4.45498 13.3882C3.71954 14.4914 2 13.9708 2 12.645ZM3.34555 12.6487L4.50834 10.9045C4.55035 10.8415 4.60455 10.7891 4.66667 10.7498C4.75082 10.6965 4.84951 10.667 4.9521 10.667H12C12.3682 10.667 12.6667 10.3685 12.6667 10.0003V4.66699C12.6667 4.2988 12.3682 4.00033 12 4.00033H4C3.63181 4.00033 3.33333 4.2988 3.33333 4.66699V12.645C3.33333 12.6516 3.34189 12.6542 3.34555 12.6487Z" fill="#4E49E2"/>
<circle cx="5.33366" cy="7.33366" r="0.666667" fill="#4E49E2"/>
<circle cx="7.99967" cy="7.33366" r="0.666667" fill="#4E49E2"/>
<ellipse cx="10.6667" cy="7.33366" rx="0.666667" ry="0.666667" fill="#4E49E2"/>
</svg>
<p>메시지</p></MessageBtn>
      </UserInfo>
      <Contents>
        <ContentsTitle>여행 <span>{user?.plans?.length}</span></ContentsTitle>
        {user?.plans?.map((p, i) => {
          return(<TravelList key={i} {...p} {...user}/>)
        })}
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width:420px;
  height: 90%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Top = styled.div`
  height: 56px;
  padding: 0px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CancleBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-right: 16px;
`;

const UserInfo = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 8px solid #e0e0e0;
`;

const UserImgCon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const UserNickName = styled.div`
  margin-bottom: 16px;
  font-weight: bold;
  font-size: 20px;
  color: #535353;
`;

const UserImg = styled.img`
  width: 88px;
  height: 88px;
  background-position: center;
  background-size: cover;
  border-radius: 88px;
`;

const MessageBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  border: 1px solid #4E49E2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 7px 8px;
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #4E49E2;
  cursor: pointer;

  p{
    margin:0
  }
`;

const Contents = styled.div`
`;

const ContentsTitle = styled.div`
  padding: 24px 0px 16px 24px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #212121;

  span {
    color: #36CD5E;
  }
`;

export default OtherUserPage;

import React from "react";
import styled from "styled-components";
import moment from "moment";
import Like from "../MainDetailPage/Like";
import BookMark from "../MainDetailPage/BookMark";
import GetPlan from "../MainDetailPage/GetPlan";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as chatActions } from "../../redux/modules/chat";
import { actionCreators as planActions } from "../../redux/modules/plan";
import instance from "../../shared/Request";
import { history } from "../../redux/ConfigureStore";

const Header = (props) => {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.chat.instance);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const startDate = moment(props.startDate).format("YYYY.MM.DD");
  const endDate = moment(props.endDate).format("MM.DD");
  const is_me = props?.userId?.email === userId ? true : false;
  const onProfile = (e) => {
    e.stopPropagation();
    if (token) {
      history.push(`/otheruser/${props.userId.userId}`);
    } else {
      alert("로그인 후 확인 가능합니다.");
      history.push(`/login`);
    }
  };

  const myInfo = useSelector((store) => store.user.user);
  const user = useSelector((store) => store.user.userInfo);

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
    dispatch(userActions.userProfileDB(props?.userId?.userId));
  }, [props?.userId?.userId]);

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

  const defaultUrl = [
    "../../images/1.png",
    "../../images/2.png",
    "../../images/3.png",
    "../../images/4.png",
    "../../images/5.png",
    "../../images/6.png",
  ];

  let imgUrl = Math.floor(Math.random() * defaultUrl.length);

  return (
    <Container is_me>
      <BackBtn
        onClick={() => {
          history.go(-1);
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
            d="M3.29289 12.7068C2.90237 12.3163 2.90237 11.6831 3.29289 11.2926L9.65685 4.92864C10.0474 4.53811 10.6805 4.53811 11.0711 4.92864C11.4616 5.31916 11.4616 5.95232 11.0711 6.34285L6.41421 10.9997H20C20.5523 10.9997 21 11.4474 21 11.9997C21 12.552 20.5523 12.9997 20 12.9997H6.41421L11.0711 17.6566C11.4616 18.0471 11.4616 18.6802 11.0711 19.0708C10.6805 19.4613 10.0474 19.4613 9.65685 19.0708L3.29289 12.7068Z"
            fill="white"
          />
        </svg>
      </BackBtn>
      <BtnBox>
        <Like {...props} />
        <BookMark {...props} />
        {is_me ? null : <GetPlan {...props} />}
      </BtnBox>
      <Thumbnail
        src={props.thumbnailImage ? props.thumbnailImage : defaultUrl[imgUrl]}
      ></Thumbnail>
      <Btn onClick={onProfile}>
        <UserImg src={props?.userId?.profile_img} />
      </Btn>
      <UserNickname>{props?.userId?.nickname}</UserNickname>
      {is_me ? null : (
        <MsgDiv>
          <MsgBtn onClick={joinRoom}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 12.645V4.66699C2 3.56242 2.89543 2.66699 4 2.66699H12C13.1046 2.66699 14 3.56242 14 4.66699V10.0003C14 11.1049 13.1046 12.0003 12 12.0003H5.38024L4.45498 13.3882C4.45497 13.3882 4.45499 13.3882 4.45498 13.3882C3.71954 14.4914 2 13.9708 2 12.645ZM3.34555 12.6487L4.50834 10.9045C4.55035 10.8415 4.60455 10.7891 4.66667 10.7498C4.75082 10.6965 4.84951 10.667 4.9521 10.667H12C12.3682 10.667 12.6667 10.3685 12.6667 10.0003V4.66699C12.6667 4.2988 12.3682 4.00033 12 4.00033H4C3.63181 4.00033 3.33333 4.2988 3.33333 4.66699V12.645C3.33333 12.6516 3.34189 12.6542 3.34555 12.6487Z"
                fill="#4E49E2"
              />
              <circle cx="5.33317" cy="7.33366" r="0.666667" fill="#4E49E2" />
              <circle cx="8.00016" cy="7.33366" r="0.666667" fill="#4E49E2" />
              <ellipse
                cx="10.6667"
                cy="7.33366"
                rx="0.666667"
                ry="0.666667"
                fill="#4E49E2"
              />
            </svg>
            <p>메세지</p>
          </MsgBtn>
        </MsgDiv>
      )}
      <PlanInfo>
        <Title>{props.title}</Title>
        <Day>
          {startDate} - {endDate}
        </Day>
        <Info>
          {props.destination} | {props.withlist} | {props.style}
        </Info>
      </PlanInfo>
    </Container>
  );
};



const Container = styled.div`
  position: relative;
  width: 100%;
`;

const BackBtn = styled.div`
  position: absolute;
  padding: 16px;
  display: flex;
  cursor: pointer;
`;

const BtnBox = styled.div`
  position: absolute;
  top: 16px;
  right: 24px;
  display: flex;
  flex-direction: row;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 224px;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${(props) => props.src});
  background-position: center;
  background-size: cover;
`;

const Btn = styled.div`
  position: relative;
  top: -16px;
  left: 24px;
  cursor: pointer;
`;

const UserImg = styled.img`
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 64px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
`;

const UserNickname = styled.div`
  margin: 22px 0px 0px 96px;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #212121;
`;

const MsgDiv = styled.div`
  position: absolute;
  top: 240px;
  right: 24px;
`;

const MsgBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 32px;
  border: 1px solid #4e49e2;
  box-sizing: border-box;
  border-radius: 4px;

  svg {
    margin-right: 4px;
  }

  p {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #4e49e2;
    cursor: pointer;
  }
`;

const PlanInfo = styled.div`
  width: 100%;
  padding: 24px 0px 12px 0px;
`;

const Title = styled.div`
  padding: 0px 16px 0px 24px;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: #1a1a1a;
`;

const Day = styled.div`
  padding-left: 24px;
  margin-top: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #616161;
`;

const Info = styled.div`
  padding-left: 24px;
  margin-top: 2px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #616161;
`;

export default Header;

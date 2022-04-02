import React, { useCallback, useState } from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import Header from "../components/Chat/Header";
import "moment/locale/ko";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";

import { history } from "../redux/ConfigureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";

const ChatRoom = (props) => {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.chat.instance);

  const roomData = useSelector((state) => state.chat.one_chat);

  const roomChatData = useSelector((state) => state.chat.chatRoom_list);


;
  // 보내려는메세지
  const [curMsg, setCurMsg] = useState("");
  // 채팅방메세지리스트
  const [msgList, setMessageList] = useState([]);
  let time = moment().format("LT");



  // 비동기로 만들어서 메시지가 실제로 업데이트를 할 때까지 기다리도록 한다.
  const sendMessage = async () => {
    if (curMsg.replace(/\s| /gi, "").length !== 0) {
      const msgData = {
        // roomId: roomData.roomId,
        fromSnsId: roomData.curUserInfo.snsId, // 메세지보내는사람 snsId,
        toSnsId: roomData.user.snsId, // 메세지받는사람 snsId,
        chatText: curMsg, // 메세지 텍스트
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"), // 채팅 보낸 시간
        // 메세지보내는사람 fromSnsId,
        // 메세지받는사람 toSnsId,
        // 메세지 텍스트 chatText
      };

      // 서버에 메시지 데이터 전송
      await socket.emit("room", msgData);

    }

    setCurMsg("");
  };

  // 소켓서버에 변경사항이 있을때마다 내부함수 실행
  React.useEffect(() => {
    // 서버에서 메시지데이터 받아오기
    socket?.on("chat", (data) => {
      // 수신데이터는 보낸데이터에서 checkChat추가 (읽엇는지 안읽엇는지)

      const oneChat = {
        chatText: data.chatText,
        checkChat: data.checkChat,
        createdAt: data.createdAt,
        fromUserId: {
          snsId: data.fromSnsId,
        },
        toUserId: {
          snsId: data.toSnsId,
        },
      };

      // 상대방 메시지 채팅방 메시지 리스트에 저장
      setMessageList((preState) => {
        return [...preState, oneChat];
      });
    });

    socket?.on("join", (data) => {

      if (data === roomData.curUserInfo.snsId) {
        dispatch(chatActions.getChatRoomListFB(roomData.user.snsId));
      }
    });

    return () => {

      const room = {
        fromSnsId: roomData.curUserInfo.snsId,
        toSnsId: roomData.user.snsId,
      };

      socket?.emit("leaveRoom", room);

      setMessageList([]);
    };
  }, [socket]);

  React.useEffect(() => {
    if (typeof roomData.user.nickname === "undefined") {
      history.push("/chatlist");
    } else {
      dispatch(chatActions.getChatRoomListFB(roomData.user.snsId));
    }

    return () => {};
  }, []);

  React.useEffect(() => {
    setMessageList(roomChatData);
  }, [roomChatData]);

  return (
    <>
      <RoomContainer>
        <Header
          title={roomData.user.nickname}
          showBack={true}
          _onClick={() => history.goBack()}
        />
        <ChatBody>
          {/* <ScrollToBottomNew className="msg-container"> */}
          {msgList.map((item, i) => {
            return (
              <Message
                key={`msgKey${i}`}
                className={
                  roomData.curUserInfo.snsId === item.fromUserId.snsId
                    ? "me"
                    : "other"
                }
              >
                <div>
                  <UserCon
                    className={
                      roomData.curUserInfo.snsId === item.fromUserId.snsId
                        ? "me"
                        : "other"
                    }
                  >
                    {/* {roomData.curUserInfo.snsId === item.fromUserId.snsId ? null : roomData.user.nickname} */}
                  </UserCon>
                  <MsgCon
                    className={
                      roomData.curUserInfo.snsId === item.fromUserId.snsId
                        ? "me"
                        : "other"
                    }
                  >
                    {roomData.curUserInfo.snsId ===
                    item.fromUserId.snsId ? null : (
                      <UserImg
                        profile_img={roomData.user.profile_img}
                        onClick={() =>
                          history.push(`/otheruser/${roomData.user.userId}`)
                        }
                      />
                    )}
                    <MessageContent
                      className={
                        roomData.curUserInfo.snsId === item.fromUserId.snsId
                          ? "me"
                          : "other"
                      }
                    >
                      <p>{item.chatText}</p>
                    </MessageContent>

                    <TimeCon>
                      {moment(item.createdAt).format("LT")}
                      {item.checkChat ? null : (
                        <CheckChatCon
                          className={
                            roomData.curUserInfo.snsId === item.fromUserId.snsId
                              ? "me"
                              : "other"
                          }
                        >
                          1
                        </CheckChatCon>
                      )}
                    </TimeCon>
                  </MsgCon>
                </div>
              </Message>
            );
          })}
          {/* </ScrollToBottomNew> */}
        </ChatBody>

        <InputBar>
          <ChatInput
            value={curMsg}
            placeholder="메세지를 입력하세요."
            onChange={(e) => setCurMsg(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <div
            className="sendIcon"
            style={{ color: "#4E49E2" }}
            onClick={sendMessage}
          >
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.46406 0.647395C1.31686 0.0355554 -0.0123762 1.07338 0.302961 2.33473L1.71928 8L7 8C7.55228 8 8 8.44772 8 9C8 9.55229 7.55228 10 7 10L1.71924 10L0.302962 15.6651C-0.0123745 16.9264 1.31685 17.9643 2.46406 17.3524L15.6434 10.3234C16.7022 9.75874 16.7022 8.24109 15.6434 7.67639L2.46406 0.647395Z"
                fill="#4E49E2"
              />
            </svg>
          </div>
        </InputBar>
      </RoomContainer>
    </>
  );
};

const RoomContainer = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  background: gray;
  position: relative;

  & .sendIcon {
    margin-left: 10px;
    color: #c4c4c4;
    cursor: pointer;
    font-size: 25px;
  }

  /* & .msg-container {
    width: 100%;
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
  } */
`;

const ChatBody = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 112px);
  top: 56px
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollToBottomNew = styled(ScrollToBottom)`
  /* & .react-scroll-to-bottom--css-xhzoi-1n7m0yu::-webkit-scrollbar {
    overflow-y: auto;
    display: none;
  } */
`;

const Message = styled.div`
  /* height: auto; */
  padding: 10px;
  display: flex;
  justify-content: ${(props) =>
    props.className === "me" ? "flex-end" : "flex-start"};
`;

const UserImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 35px;
  background-image: url("${(props) =>
    props.profile_img
      ? props.profile_img
      : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200"}");
  background-position: center;
  background-size: cover;
  object-fit: contain;
  cursor: pointer;
`;

const UserCon = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.className === "me" ? "flex-end" : "flex-start"};
  margin-left: ${(props) => (props.className === "me" ? null : "12px")};
`;

const MsgCon = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.className === "me" ? "row-reverse" : "row"};
`;

const TimeCon = styled.div`
  display: flex;
  flex-direction: column-reverse;
  font-size: 10px;
  color: #9e9e9e;
`;

const CheckChatCon = styled.div`
  color: purple;
  display: flex;
  justify-content: ${(props) =>
    props.className === "me" ? "flex-end" : "flex-start"};
`;

const MessageContent = styled.div`
  width: auto;
  /* height: auto; */
  max-width: ${(props) => (props.className === "me" ? "200px" : "140px")};
  background-color: ${(props) =>
    props.className === "me" ? "#E0E0E0" : "#CFCFFF"};
  border-radius: 16px;
  color: black;
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 400;
  overflow-wrap: break-word;
  word-break: break-word;
  /* box-shadow: 1px 1px 1px 1px gray; */
  p {
    margin: 0;
  }
`;

const InputBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 56px;
  padding: 8px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: white;
`;

const ChatInput = styled.textarea`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: #f4f4f4;
  resize: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    outline: none;
  }
`;

export default ChatRoom;

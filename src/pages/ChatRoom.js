import React, { useState } from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import Header from '../components/Chat/Header';
import 'moment/locale/ko';
import moment from 'moment';
import ScrollToBottom from "react-scroll-to-bottom";

import { history } from '../redux/ConfigureStore';
import {useDispatch, useSelector} from 'react-redux';
import {socket} from '../shared/Socket';
import {actionCreators as chatActions} from '../redux/modules/chat';

const ChatRoom = (props) => {

    const dispatch = useDispatch();

    const roomData = useSelector((state) => state.chat.one_chat);

    const roomChatData = useSelector((state) => state.chat.chatRoom_list);

    // console.log("roomData !! ",roomData);

    // console.log('roomChatData !! ',roomChatData);

    // 보내려는메세지
    const [curMsg, setCurMsg] = useState("");
    // 채팅방메세지리스트
    const [msgList, setMessageList] = useState([]);
    let time = moment().format("LT");

    // console.log('msgList !! ',msgList);

    // 비동기로 만들어서 메시지가 실제로 업데이트를 할 때까지 기다리도록 한다.
    const sendMessage = async () => {

        if(curMsg !== ""){
            const msgData = {
                // roomId: roomData.roomId,
                fromSnsId: roomData.curUserInfo.snsId, // 메세지보내는사람 snsId,
                toSnsId: roomData.user.snsId, // 메세지받는사람 snsId,
                chatText: curMsg, // 메세지 텍스트
                createdAt: time, // 채팅 보낸 시간
                // 메세지보내는사람 fromSnsId,
                // 메세지받는사람 toSnsId,
                // 메세지 텍스트 chatText
            }

            // 서버에 메시지 데이터 전송
            await socket.emit("room", msgData);

            // setMessageList((preState) => {
            //     console.log('전에 있던 채팅리스트 데이터 ', preState);
            //     return [...preState, msgData];
            // });
            // console.log('msgList !! ', msgList);
            // console.log("roomData !! ",roomData);

        }

        setCurMsg("");
    }
    
    // 소켓서버에 변경사항이 있을때마다 내부함수 실행
    React.useEffect(() => {
        // 서버에서 메시지데이터 받아오기
        socket.on("chat", (data) => {
            // 수신데이터는 보낸데이터에서 checkChat추가 (읽엇는지 안읽엇는지)
            console.log("메시지 수신~!! ", data);

            const oneChat = {
                chatText: data.chatText,
                checkChat: data.checkChat,
                createdAt: data.createdAt,
                fromUserId:{
                    snsId: data.fromSnsId,
                },
                toUserId:{
                    snsId: data.toSnsId,
                }

            }
            
            // 상대방 메시지 채팅방 메시지 리스트에 저장
            setMessageList((preState) => {
                return [...preState, oneChat];
            });

        });

        return () => {
            console.log('채팅방나간다잉');
            setMessageList([]);
        }


    }, [socket]);

    React.useEffect(() => {
        if(typeof roomData.user.nickname === "undefined"){
            window.alert('잘못된 접근입니다.');
            history.push('/chatlist');
        }else{
            
            dispatch(chatActions.getChatRoomListFB(roomData.user.snsId));
            
        }

        return () => {

        }

    }, []);

    React.useEffect(() => {
        setMessageList(roomChatData);

    }, [roomChatData]);


    return (
        <RoomContainer>
            <Header 
            title={roomData.user.nickname}
            showBack={true}
            _onClick={() => history.goBack()}/>
            <ChatBody>
                <ScrollToBottomNew className="msg-container">
                {msgList.map((item, i) => {
                    return (
                        <Message key={`msgKey${i}`} className={roomData.curUserInfo.snsId === item.fromUserId.snsId ? "me" : "other"} >
                            <div>
                                <UserCon className={roomData.curUserInfo.snsId === item.fromUserId.snsId ? "me" : "other"}>
                                    {roomData.curUserInfo.snsId === item.fromUserId.snsId ? null : roomData.user.nickname}
                                </UserCon>
                                <MsgCon className={roomData.curUserInfo.snsId === item.fromUserId.snsId ? "me" : "other"}>
                                    
                                    
                                    {roomData.curUserInfo.snsId === item.fromUserId.snsId ? 
                                        null
                                    :
                                        <UserImg profile_img={roomData.user.profile_img} onClick={() => history.push(`/otheruser/${roomData.user.userId}`)}/>
                                    }
                                    <MessageContent className={roomData.curUserInfo.snsId === item.fromUserId.snsId ? "me" : "other"}>
                                        <p>{item.chatText}</p>
                                    </MessageContent>

                                    <TimeCon>{moment(item.createdAt).format("LT")}</TimeCon>
                                </MsgCon>
                            </div>
                        </Message>
                    )
                })}
                </ScrollToBottomNew>

                <InputBar>
                    <ChatInput value={curMsg} placeholder='메세지를 입력하세요.' onChange={(e) => setCurMsg(e.target.value)} 
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
                    <SendIcon className='sendIcon' onClick={sendMessage} />
                </InputBar>
            </ChatBody>
        </RoomContainer>
    );
};

const RoomContainer = styled.div`
    /* background-color: red; */
    width: 100%;
    height: 90%;
    box-sizing: border-box;
    padding: 25px;

    & .sendIcon {
        margin-left: 10px;
        color: #c4c4c4;
        cursor: pointer;
        font-size: 30px;
    }

    & .msg-container {
        width: 100%;
        height: 93%;
        overflow-y: auto;
        overflow-x: hidden;
    }

`;

const ChatBody = styled.div`
    display: flex;
    width:100%;
    height:100%;
    flex-direction: column;
    position: relative;
`;

const ScrollToBottomNew = styled(ScrollToBottom)`
    
    /* & .react-scroll-to-bottom--css-cqiwg-79elbk::-webkit-scrollbar {
        display: none;
    } */

`;

const Message = styled.div`
    height: auto;
    padding: 10px;
    display: flex;
    justify-content: ${(props) => (props.className === 'me' ? "flex-end" : "flex-start")};
`;

const UserImg = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-image: url("${(props) => props.profile_img ? props.profile_img : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200"}");
    background-position: center;
    background-size: cover;
    object-fit: contain;
    cursor: pointer;
`;

const UserCon = styled.div`
    display: flex;
    justify-content: ${(props) => (props.className === 'me' ? "flex-end" : "flex-start")};
`;

const MsgCon = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.className === 'me' ? "row-reverse" : "row")};
`;

const TimeCon = styled.div`
    display:flex;
    flex-direction: column-reverse;
`;

const MessageContent = styled.div`
    width: auto;
    height: auto;
    min-height: 40px;
    max-width: 120px;
    background-color: ${(props) => (props.className === 'me' ? "#EDEDED" : "#EDEDED")};
    border-radius: 5px;
    color: black;
    display: flex;
    align-items: center;
    margin-right: 5px;
    margin-left: 5px;
    padding-right: 5px;
    padding-left: 5px;
    overflow-wrap: break-word;
    word-break: break-word;
    box-shadow: 1px 1px 1px 1px gray;
`;

const InputBar = styled.div`
    border-top: 1px solid #E5E5E5;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    /* background-color: orange; */
`;

const ChatInput = styled.input`
    width: 100%;
    height: 35px;
    border: 1px solid #BDBDBD;
    border-radius: 50px;
    padding: 10px 20px;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }

`;



export default ChatRoom;
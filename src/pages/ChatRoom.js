import React, { useCallback, useState } from 'react';
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

        if(curMsg.replace(/\s| /gi, "").length !== 0){
            const msgData = {
                // roomId: roomData.roomId,
                fromSnsId: roomData.curUserInfo.snsId, // 메세지보내는사람 snsId,
                toSnsId: roomData.user.snsId, // 메세지받는사람 snsId,
                chatText: curMsg, // 메세지 텍스트
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'), // 채팅 보낸 시간
                // 메세지보내는사람 fromSnsId,
                // 메세지받는사람 toSnsId,
                // 메세지 텍스트 chatText
            }

            // 서버에 메시지 데이터 전송
            await socket.emit("room", msgData);

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
            // console.log("메시지 수신~!! ", data);

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
                // console.log('preState !! ',preState);
                return [...preState, oneChat];
            });

        });

        socket.on("join", (data) => {
            // console.log('data 상대방이 입장했는지 !! ',data);
            
            if(data === roomData.curUserInfo.snsId){
                
                dispatch(chatActions.getChatRoomListFB(roomData.user.snsId));

            }
            
        });

        return () => {
            console.log('채팅방나간다잉');
            // upCheckChat();
            // console.log('checkChat 컴포넌트가 사라질때!! ',checkChat);

            const room = {
                fromSnsId: roomData.curUserInfo.snsId,
                toSnsId: roomData.user.snsId,
            }

            socket.emit("leaveRoom", room);

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
                                    {/* {roomData.curUserInfo.snsId === item.fromUserId.snsId ? null : roomData.user.nickname} */}
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

                                    <TimeCon>
                                        {moment(item.createdAt).format("LT")}
                                        {item.checkChat ? null : <CheckChatCon className={roomData.curUserInfo.snsId === item.fromUserId.snsId ? "me" : "other"}>1</CheckChatCon> }
                                    </TimeCon>

                                    
                                </MsgCon>
                            </div>
                        </Message>
                    )
                })}
                </ScrollToBottomNew>

                <InputBar>
                    <ChatInput value={curMsg} placeholder='메세지를 입력하세요.' onChange={(e) => setCurMsg(e.target.value)} 
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
                    <SendIcon className='sendIcon' style={{color: curMsg.length !== 0 ? "#4E49E2" : null}} onClick={sendMessage} />
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
    padding-bottom: 25px;
    

    & .sendIcon {
        margin-left: 10px;
        color: #c4c4c4;
        cursor: pointer;
        font-size: 25px;
        /* color: #4E49E2; */
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
    background-color: #F5F5F5;
    
`;

const ScrollToBottomNew = styled(ScrollToBottom)`
    
    /* & .react-scroll-to-bottom--css-xhzoi-1n7m0yu::-webkit-scrollbar {
        overflow-y: auto;
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
    margin-left: ${(props) => (props.className === 'me' ? null : "12px")};
`;

const MsgCon = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.className === 'me' ? "row-reverse" : "row")};
`;

const TimeCon = styled.div`
    display:flex;
    flex-direction: column-reverse;
    color: #9E9E9E;
`;

const CheckChatCon = styled.div`
    color: purple;
    display: flex;
    justify-content: ${(props) => (props.className === 'me' ? "flex-end" : "flex-start")};
`;

const MessageContent = styled.div`
    width: auto;
    height: auto;
    min-height: 40px;
    max-width: ${(props) => (props.className === 'me' ? "200px" : "140px")};
    background-color: ${(props) => (props.className === 'me' ? "#E0E0E0" : "#CFCFFF")};
    border-radius: 10px;
    color: black;
    display: flex;
    align-items: center;
    margin-right: 5px;
    margin-left: 5px;
    padding-right: 5px;
    padding-left: 5px;
    overflow-wrap: break-word;
    word-break: break-word;
    /* box-shadow: 1px 1px 1px 1px gray; */
`;

const InputBar = styled.div`
    /* border-top: 1px solid #E5E5E5; */
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: white;
`;

const ChatInput = styled.textarea`
    width: 100%;
    height: 35px;
    /* border: 1px solid #BDBDBD; */
    border: none;
    border-radius: 50px;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #F4F4F4;

    &::-webkit-scrollbar {
        display: none;
    }
    

    &:focus {
        outline: none;
    }

`;



export default ChatRoom;
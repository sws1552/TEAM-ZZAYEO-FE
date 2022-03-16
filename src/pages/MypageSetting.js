import React from 'react';
import styled from 'styled-components';
import Header from '../components/Mypage/Header';
import {history} from '../redux/ConfigureStore';

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";



const MypageSetting = () => {

    const dispatch = useDispatch();

    return (
        <MypageCon>
            <Header title="계정 설정" showBack={true}/>

            <AccCon>
                <TextCon>
                    <Text1>연결된 계정</Text1>
                    <Text2>
                        <KakaoImg />카카오톡 회원
                    </Text2>
                </TextCon>
                <div>{localStorage.getItem('userId')}</div>
            </AccCon>

            <ListCon>
                <ListItem onClick={() => {
                dispatch(userActions.logOut());
                history.push("/");
                }}>로그아웃</ListItem>
                <ListItem>탈퇴하기</ListItem>
            </ListCon>
            
        </MypageCon>
    );
};

const MypageCon = styled.div`
    width: 100%;
    height: 92%;
    /* background-color: orange; */
    padding: 25px 0;
    box-sizing: border-box;
`;

const AccCon = styled.div`
    /* background-color: red; */
    width: 100%;
    border-bottom: 10px solid #E5E5E5;
    padding: 40px 15px;
    box-sizing: border-box;
`;

const ListCon = styled.div`
    /* background-color: orange; */
    width:100%;
    padding: 0 15px;
    box-sizing: border-box;
    height: 65vh;
`;

const ListItem = styled.div`
    border-bottom: 1px solid #E5E5E5;
    padding: 25px 0;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    &:hover {
        background-color: #F5F5F5;
    }
`;

const TextCon = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 7px;
`;

const Text1 = styled.div`
    color: #4E49E2;
    font-weight: bold;
    font-size: 18px;
`;


const KakaoImg = styled.div`
    width:22px;
    height:22px;
    background-image: url("https://i0.wp.com/forhappywomen.com/wp-content/uploads/2018/11/%EC%82%B0%EB%B6%80%EC%9D%B8%EA%B3%BC-%ED%8F%AC%ED%95%B4%ED%94%BC%EC%9A%B0%EB%A8%BC-%EB%AC%B8%EC%9D%98-%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%8C%EB%9F%AC%EC%8A%A4%EC%B9%9C%EA%B5%AC-%EB%B2%84%ED%8A%BC.png?resize=586%2C586&ssl=1");
    background-position: center;
    background-size: cover;
    border-radius: 11px;
    margin-right: 5px;
`;

const Text2 = styled.div`
    display: flex;
    align-items: center;
`;

export default MypageSetting;
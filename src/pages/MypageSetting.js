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
                        
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="11" fill="#FEE500"/>
                            <path d="M11.0314 5.30859C7.60907 5.30859 4.84912 7.51652 4.84912 10.197C4.84912 11.9369 5.99726 13.4603 7.71946 14.3303L7.13656 16.5073C7.12557 16.54 7.12388 16.575 7.13168 16.6085C7.13948 16.642 7.15646 16.6728 7.18072 16.6972C7.2161 16.7284 7.26161 16.7456 7.30878 16.7458C7.34789 16.7426 7.385 16.7272 7.41476 16.7016L9.923 15.0103C10.2932 15.0614 10.6665 15.088 11.0402 15.0898C14.4581 15.0898 17.2225 12.8819 17.2225 10.197C17.2225 7.51211 14.4493 5.30859 11.0314 5.30859Z" fill="#392020"/>
                        </svg>
                        <div style={{marginLeft: "5px"}}>
                            카카오톡 회원
                        </div>
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
    padding-bottom: 25px;
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
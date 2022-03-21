import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Mypage/Header';
import Switch from '../components/Mypage/Switch';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {actionCreators as userActions} from '../redux/modules/user';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/ConfigureStore';




const MyPage = (props) => {

    const dispatch = useDispatch();
    const checkUser = useSelector(state => state.user.user);

    // console.log('checkUser !! ',checkUser);

    

    React.useEffect(() => {
        dispatch(userActions.checkUserDB());
    }, [dispatch]);

    return (
        <MypageCon>
            <Header />
            <UserCon >
                <div>
                    {checkUser.userImg ? 
                    <UserImg userImg={checkUser.userImg}/> : 
                    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_370_494)">
                        <circle cx="45" cy="41" r="41" fill="#F4F4F4"/>
                        <path d="M62.8211 59.8359C61.77 56.7846 59.4536 54.0884 56.2315 52.1653C53.0093 50.2423 49.0613 49.2 44.9998 49.2C40.9383 49.2 36.9903 50.2423 33.7682 52.1653C30.546 54.0884 28.2297 56.7846 27.1785 59.8359" stroke="#BFBFBF" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="45" cy="28.7" r="10.25" stroke="#BFBFBF" stroke-width="2" stroke-linecap="round"/>
                        </g>
                        <defs>
                        <filter id="filter0_d_370_494" x="0" y="0" width="90" height="90" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_370_494"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_370_494" result="shape"/>
                        </filter>
                        </defs>
                    </svg>
                    }
                    
                    <NickName>{checkUser.nickname}</NickName>
                </div>
            </UserCon>
            
            <ListCon>
                <ListItem onClick={() => history.push('/mypageproup')} >프로필 수정<ArrowForwardIosIcon/></ListItem>
                <ListItem onClick={() => history.push('/mypageset')}>계정 설정<ArrowForwardIosIcon/></ListItem>
                <ListItem3>알림 설정<Switch _onClick={() => console.log('test')}/></ListItem3>
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

const UserCon = styled.div`
    /* background-color: orange; */
    width: 100%;
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UserImg = styled.div`
    background-image: url(${(props) => (props.userImg ? props.userImg : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200")});
    background-position: center;
    background-size: cover;
    /* box-shadow: 0 7px 5px 0 #BFBFBF; */
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

const NickName = styled.div`
    margin-top: 10px;
    text-align: center;
`;

const ListCon = styled.div`
    /* background-color: red; */
    width: 100%;
    height: 50vh;
    padding: 0 15px;
    box-sizing: border-box;
`;

const ListItem = styled.div`
    border-top: 1px solid #E5E5E5;
    padding: 25px 0;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    &:hover {
        background-color: #F5F5F5;
    }
`;

const ListItem3 = styled.div`
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
    padding: 25px 0;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    align-items: center;
`;

export default MyPage;
import React from 'react';
import styled from 'styled-components';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BasicTabs from '../components/Mypage/BasicTabs';


const MyPage = (props) => {
    return (
        <MypageCon>
            <Header>
                <UserNickName>송원석</UserNickName>
                <SettingsOutlinedIcon className='gearIcon'/>
            </Header>
            <UserImgCon>
                <UserImg/>
            </UserImgCon>

            <BasicTabs />
            
        </MypageCon>
    );
};

const MypageCon = styled.div`
    width: 100%;
    height: 92%;
    /* background-color: orange; */
    display: flex;
    flex-direction: column;

    & .gearIcon {
        color: #A4A4A4;
        position: absolute;
        right: 20px;
    }

`;

const Header = styled.div`
    /* background-color: red; */
    height: 50px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const UserNickName = styled.div`
    font-weight: bold;
    font-size: 20px;
    color: #535353;
`;

const UserImgCon = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`;

const UserImg = styled.div`
    background-image: url("https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200");
    background-position: center;
    background-size: cover;
    box-shadow: 0 7px 5px 0 #BFBFBF;
    width: 80px;
    height: 80px;
    border-radius: 40px;
`;

export default MyPage;
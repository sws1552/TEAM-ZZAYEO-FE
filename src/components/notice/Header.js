import React from 'react';
import styled from 'styled-components';
import { history } from '../../redux/ConfigureStore';


import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Header = (props) => {
    return (
        <HeaderCon>
            <Text>
                {props.showBack 
                && 
                <KeyboardBackspaceIcon className='backIcon' onClick={history.goBack}/>}
                {props.title}
            </Text>
        </HeaderCon>
    );
};

Header.defaultProps = {
    title: "알림",
    showBack: false,
}

const HeaderCon = styled.div`
    /* border-bottom: 1px solid #D2DBDD; */
    /* background-color: orange; */
`;

const Text = styled.div`
    /* padding: 0 0 20px; */
    /* margin: 20px 0; */
    font-weight: 700;
    font-size: 18px;
    display: flex;
    height: 56px;
    align-items: center;
    padding-left: 24px;

    & .backIcon {
        padding: 0;
        margin-right: 7px;
        cursor: pointer;
        box-sizing: border-box;
        font-size: 20px;
    }

`;

export default Header;
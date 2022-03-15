import React from 'react';
import styled from 'styled-components';


import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Header = (props) => {
    return (
        <HeaderCon>
            <Text>
                {props.showBack 
                && 
                <KeyboardBackspaceIcon className='backIcon' onClick={props._onClick}/>}
                {props.title}
            </Text>
        </HeaderCon>
    );
};

Header.defaultProps = {
    title: "메시지",
    showBack: false,
    _onClick: () => {},
}

const HeaderCon = styled.div`
    /* border-bottom: 1px solid #D2DBDD; */
    /* background-color: orange; */
`;

const Text = styled.div`
    /* padding: 0 0 20px; */
    margin: 20px 0;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-left: 15px;

    & .backIcon {
        padding: 0;
        margin-right: 7px;
        cursor: pointer;
        box-sizing: border-box;
        font-size: 20px;
    }

`;

export default Header;
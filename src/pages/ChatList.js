import React from 'react';
import styled from 'styled-components';

import Searchbar from '../components/Chat/Searchbar';
import Onechat from '../components/Chat/Onechat';

const ChatList = (props) => {
    return (
        <ListContainer>
            <ListWrap>
                <Searchbar/>
                <Text>메시지</Text>
                <OneChatWrap>
                    <Onechat />
                    <Onechat />
                    <Onechat />
                    <Onechat />
                    <Onechat />
                    <Onechat />
                    <Onechat />
                    <Onechat />
                    <Onechat />
                    <Onechat />
                </OneChatWrap>
            </ListWrap>
        </ListContainer>
    );
};

const ListContainer = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: orange; */
    padding: 25px;
    box-sizing: border-box;
    border-radius: 10px;    
`;

const ListWrap = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: white; */
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }

`;

const Text = styled.div`
    margin: 20px 0;
    font-weight: bold;
`;

const OneChatWrap = styled.div`
    
`;

export default ChatList;
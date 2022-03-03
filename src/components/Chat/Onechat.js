import React from 'react';
import styled from "styled-components";

const Onechat = (props) => {
    return (
        <Container>
            <UserImg profileImg={props.profileImg}/>
            <NickCon>
                <Text>{props.userNick}</Text>
                <div style={{color: "#757575"}}>{props.pretime}</div>
            </NickCon>
        </Container>
    );
};

Onechat.defaultProps = {
    profileImg : "https://i.pinimg.com/736x/b8/5e/08/b85e089d8b68bb06d7f691acce480adb--big-cats-cute-cats.jpg",
    userNick: "wonseok",
    pretime: "2022-03-03",
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 7vh;
    /* background-color: orange; */
    align-items: center;
    border-radius: 10px;
    margin: 20px 0;

    &:hover {
        background-color: #F5F5F5;
    }

`;

const UserImg = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-image: url(${(props) => (props.profileImg)});
    background-position: center;
    background-size: cover;
    object-fit: contain;
`;

const NickCon = styled.div`
    margin-left: 10px;
`;

const Text = styled.div`
    font-weight: bold;
`;

export default Onechat;
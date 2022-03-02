import React from 'react';
import styled from 'styled-components';
import MainLike from './MainLike';
import MainBookMark from './MainBookMark';

const MainTravelList = () => {
    return (
        <Container>
            힐링을 위한 제주도 여행
            <MainLike/>
            <MainBookMark/>
        </Container>
    );
};

const Container = styled.div`
width: 100%;
height: 300px;
box-sizing: border-box;
border: 5px solid orange;
margin: 24px auto 0px auto;
overflow-y: auto;
`
export default MainTravelList;


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
height: 200px;
box-sizing: border-box;
border: 4px solid gray;
`
export default MainTravelList;


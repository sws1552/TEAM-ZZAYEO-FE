import React from 'react';
import styled from 'styled-components';
import MainCategory from '../components/Main/MainCategory';
import MainBookMarkList from '../components/Main/MainBookMarkList';
import MainTravelList from '../components/Main/MainTravelList';


const Main = () => {
    return (
        <Container>
           <MainCategory/>
           <MainBookMarkList/>
           <MainTravelList/>
        </Container>
        
    );
};

export default Main;

const Container = styled.div`
padding: 24px 24px;
`
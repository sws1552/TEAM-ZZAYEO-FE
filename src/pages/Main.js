import React from 'react';
import styled from 'styled-components';
import MainCategory from '../components/Main/MainCategory';
import MainBookMarkList from '../components/Main/MainBookMarkList';
import MainTravelList from '../components/Main/MainTravelList';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";


const Main = () => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(planActions.getPlanDB());
      }, []);
   
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

`
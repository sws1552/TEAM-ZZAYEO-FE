import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as planActions } from "../redux/modules/plan";
import styled from "styled-components";
import MainCategory from "../components/Main/MainCategory";
import MainBookMarkList from "../components/Main/MainBookMarkList";
import MainTravelList from "../components/Main/MainTravelList";
import Searchbar from "../components/Search/Searchbar";

const Main = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(planActions.getPlanDB());
  }, []);

  return (
    <Container>
      <Searchbar />
      <MainCategory />
      <MainBookMarkList />
      <MainTravelList />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

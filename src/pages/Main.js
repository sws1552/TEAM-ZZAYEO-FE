import React from "react";
import styled from "styled-components";
import MainCategory from "../components/Main/MainCategory";
import MainBookMarkList from "../components/Main/MainBookMarkList";
import MainTravelList from "../components/Main/MainTravelList";
import Searchbar from "../components/Search/Searchbar";

const Main = () => {
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

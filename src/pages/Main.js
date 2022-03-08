import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import styled from "styled-components";
import MainCategory from "../components/Main/MainCategory";
import MainBookMarkList from "../components/Main/MainBookMarkList";
import MainTravelList from "../components/Main/MainTravelList";
import Searchbar from "../components/Search/Searchbar";

const Main = (props) => {
  const dispatch = useDispatch();

  const is_token = localStorage.getItem("token") ? true : false;

  const plans = useSelector((store) => store.plan.list);
  console.log(plans);

  React.useEffect(() => {
    dispatch(planActions.getPlanDB());
  }, []);

  if (is_token) {
    return (
      <Container>
        <Searchbar />
        <MainCategory />
        <MainBookMarkList />
        <TravelListBox>
          <p>여행 일정 매거진</p>
          {plans.map((l, i) => {
            return <MainTravelList key={i} {...l} />;
          })}
        </TravelListBox>
      </Container>
    );
  }
  return (
    <Container>
      <Searchbar />
      {plans.map((l, i) => {
        return <MainTravelList key={i} {...l} />;
      })}
    </Container>
  );
};

export default Main;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TravelListBox = styled.div`
  p {
    padding: 0px 24px;
    margin-bottom: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #1a1a1a;
  }
`;

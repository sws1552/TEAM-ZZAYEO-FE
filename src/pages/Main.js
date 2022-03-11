import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import MainBookMarkList from "../components/Main/MainBookMarkList";
import MainTravelList from "../components/Main/MainTravelList";
import Searchbar from "../components/Search/Searchbar";
import Filter from "../components/Main/Filter";

const Main = (props) => {
  const dispatch = useDispatch();

  const is_token = localStorage.getItem("token") ? true : false;

  const plans = useSelector((store) => store.plan.list);

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
    dispatch(planActions.getPlanDB());
    dispatch(planActions.getBookMarkDB());
  }, []);

  if (is_token) {
    return (
      <Container>
        <Searchbar />
        {/* <MainCategory /> */}
        <Filter />
        <BookMarkListBox>
          <p>내가 찜한 여행 스토리</p>
          <MainBookMarkList />
        </BookMarkListBox>
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

const BookMarkListBox = styled(TravelListBox)`
  margin-bottom: 36px;
`;

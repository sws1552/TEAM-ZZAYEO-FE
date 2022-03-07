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
        {plans.map((l, i) => {
          return <MainTravelList key={i} {...l} />;
        })}
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

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import WritePlanMap from "../components/WritePlan/Map/WritePlanMap";
import DetailDay from "../components/MainDetailPage/DetailDay";
import DetailDayhide from "../components/MainDetailPage/DetailDayhide";
import Header from "../components/MainDetailPage/Header";
import { Collapse } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import CommentList from "../components/Comment/CommentList";

const MainDetailPage = (props) => {
  const dispatch = useDispatch();

  const planId = props.match.params.planId;
  const plans = useSelector((state) => state.plan.myPlan);

  const userId = localStorage.getItem("userId");

  const toggleMenu = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const [isChecked, setIsChecked] = React.useState(true);
  const [clickedTripDest, changeTripDest] = React.useState(0);

  React.useEffect(() => {
    dispatch(planActions.getdayPlanDB(planId));
  }, []);

  const decideShare = ["비공개", "공개"];
  const shareRef = React.useRef([]);

  useEffect(() => {
   
      shareRef.current.forEach((v, i) => {
        console.log(v.id, plans.status)
        if (v.id === plans.status) {
          v.click()
        }
      })
  
  }, []);

  if (plans?.userId?.email === userId) {
    return (
      <Container>
        <Header {...plans} />
        <TripDestBox>
          <div>
            {decideShare.map((l, i) => {
              return (
                <li
                  ref={(el) => (shareRef.current[i] = el)}
                  id={l}
                  key={i}
                  onClick={() => {
                    changeTripDest(i);
                    if (l === "공개") {
                      dispatch(planActions.statusDB(plans.planId, l));
                    }
                    if (l === "비공개") {
                      dispatch(planActions.statusDB(plans.planId, l));
                    }
                  }}
                  style={{
                    backgroundColor:
                      i === clickedTripDest ? "#4E49E2" : "#F4F4F4",
                    color: i === clickedTripDest ? "#FFFFFF" : "#9E9E9E",
                  }}
                >
                  {l==="공개" ? "모두에게 공유" : "나만의 일정"}
                </li>
              );
            })}
          </div>
        </TripDestBox>
        <Collapse in={isChecked}>
          <WritePlanMap {...plans} />
        </Collapse>
        <ToggleBox>
          {isChecked ? (
            <ToogleBtn onClick={toggleMenu}>
              <svg
                width="38"
                height="8"
                viewBox="0 0 38 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37 6.5L19 2L1 6.5"
                  stroke="#BDBDBD"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </ToogleBtn>
          ) : (
            <ToggleBox>
              <ToogleBtn onClick={toggleMenu}>
                <svg
                  width="38"
                  height="7"
                  viewBox="0 0 38 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L19 5.5L37 1"
                    stroke="#BDBDBD"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </ToogleBtn>
            </ToggleBox>
          )}
        </ToggleBox>
        <DetailDay {...plans} />
        {/* {isChecked ? <DetailDay {...plans} /> : <DetailDayhide {...plans} />} */}
        <CommentList planId={planId} />
      </Container>
    );
  }

  return (
    <Container>
      <Header {...plans} />
      <Collapse in={isChecked}>
        <WritePlanMap {...plans} />
      </Collapse>
      <ToggleBox>
        {isChecked ? (
          <ToogleBtn onClick={toggleMenu}>
            <svg
              width="38"
              height="8"
              viewBox="0 0 38 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37 6.5L19 2L1 6.5"
                stroke="#BDBDBD"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </ToogleBtn>
        ) : (
          <ToggleBox>
            <ToogleBtn onClick={toggleMenu}>
              <svg
                width="38"
                height="7"
                viewBox="0 0 38 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L19 5.5L37 1"
                  stroke="#BDBDBD"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </ToogleBtn>
          </ToggleBox>
        )}
      </ToggleBox>
      <DetailDay {...plans} />
      {/* {isChecked ? <DetailDay {...plans} /> : <DetailDayhide {...plans} />} */}
      <CommentList planId={planId} />
    </Container>
  );
};

export default MainDetailPage;

const Container = styled.div`
  width: 100%;
  height: 93%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ToggleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ToogleBtn = styled.div`
  cursor: pointer;
`;

const TitleBox = styled.div`
  width: 100%;
  padding: 0px 24px;
`;

const TripDestBox = styled(TitleBox)`
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    cursor: pointer;
  }

  li {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 32px;
    margin: 0px 10px 24px 0px;
    padding: 15px 12px;
    box-sizing: border-box;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
  }
`;

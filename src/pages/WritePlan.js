import React from "react";
import styled, { keyframes } from "styled-components";
import WritePlanMap from "../components/WritePlan/Map/WritePlanMap";
import BasicTabs from "../components/WritePlan/Plan/BasicTabs";
import BasicTabsHide from "../components/WritePlan/Plan/BasicTapsHide";
import Header from "../components/WritePlan/Header/Header";
import Title from "../components/WritePlan/Title/Title";
import { Collapse } from '@mui/material';
import { Switch } from '@mui/material';
import { Paper } from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel'
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../redux/modules/map";
import { actionCreators as planActions } from "../redux/modules/plan";

const WritePlan = (props) => {
  const dispatch = useDispatch();

  const planId = props.match.params.planId;
  const myPlan = useSelector((state) => state.plan.myPlan);
  
  const [clickedTripDest, changeTripDest] = React.useState(0);
  const [isChecked, setIsChecked] = React.useState(true);
  
  React.useEffect(() => {
    dispatch(planActions.getdayPlanDB(planId));
  }, []);

  const decideShare = ["공개", "비공개"];

  return (
    <>
      <Container>
        <Header />
        <Title {...myPlan} />
        <TripDestBox>
          <div>
            {decideShare.map((l, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    changeTripDest(i);
                  }}
                  style={{
                    backgroundColor:
                      i === clickedTripDest ? "#12C5ED" : "#EDEDED",
                    color: i === clickedTripDest ? "#FFFFFF" : "#979797",
                  }}
                >
                  {l}
                </li>
              );
            })}
          </div>
        </TripDestBox>


        <div>
          <FormControlLabel
            style={{ display: 'block', padding: "10px 24px" , color:"gray"}}
            control={<Switch style={{color:"#12C5ED"}}checked={isChecked} onChange={() => {
              setIsChecked((prev) => !prev);
            }} />}
            label="지도보기"
          />
          <Collapse in={isChecked}>
            <WritePlanMap />
          </Collapse>
        </div>

       {isChecked? <BasicTabs {...myPlan} />: <BasicTabsHide {...myPlan} />} 
      </Container>
    </>
  );
};

export default WritePlan;


const Container = styled.div`
  /* padding: 24px 24px; */
  width: 100%;
`;

const TitleBox = styled.div`
  display: block;
  width: 100%;
  padding: 0px 24px ;
 
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
    margin: 0px 10px 5px 0px;
    padding: 15px 12px;
    box-sizing: border-box;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
  }
`;



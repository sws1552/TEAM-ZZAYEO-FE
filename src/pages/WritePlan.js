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
import ChooseDay from "../components/WritePlan/Plan/ChooseDay";

const WritePlan = (props) => {
  const dispatch = useDispatch();

  const planId = props.match.params.planId;
  const myPlan = useSelector((state) => state.plan.myPlan);

  const [clickedTripDest, changeTripDest] = React.useState(0);
  const [isChecked, setIsChecked] = React.useState(false);
  const toggleMenu = () => {
    setIsChecked(isChecked => !isChecked); 
  }
  

React.useEffect(() => {
    dispatch(planActions.getdayPlanDB(planId));
  }, []);

  const decideShare = ["나만의 일정", "모두에게 공유"];
  const share = "공개"
  const unshare = "비공개"

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
                    if (l === "모두에게 공유") {
                      dispatch(planActions.statusDB(myPlan.planId, share))
                    }
                    if (l === "나만의 일정") {
                      dispatch(planActions.statusDB(myPlan.planId, unshare))
                    }
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

          <Collapse in={isChecked}>
            <WritePlanMap />
          </Collapse>
    
        <div style={{width: "100%", display:"flex",  justifyContent:"center"}}>
        {isChecked ? 
        <div onClick={()=>toggleMenu()} style={{cursor:"pointer"}}>
          <svg width="38" height="8" viewBox="0 0 38 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 6.5L19 2L1 6.5" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div> : 
        <div onClick={()=>toggleMenu()} style={{cursor:"pointer"}}>
          <svg width="38" height="7" viewBox="0 0 38 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L19 5.5L37 1" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
        }
        </div>


        {isChecked ? <ChooseDay {...myPlan} /> : null}
        {/* {isChecked ? <BasicTabs {...myPlan} /> : <BasicTabsHide {...myPlan} />} */}
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



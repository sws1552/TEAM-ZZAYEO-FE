import React from "react";
import styled from "styled-components";
import WritePlanMap from "../components/WritePlan/Map/WritePlanMap";
import DetailDay from "../components/MainDetailPage/DetailDay";
import DetailDayhide from "../components/MainDetailPage/DetailDayhide";
import Header from "../components/MainDetailPage/Header";
import Title from "../components/WritePlan/Title/Title";
import { Collapse } from "@mui/material";
import { Switch } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import Like from "../components/MainDetailPage/Like";

const MainDetailPage = (props) => {
  const dispatch = useDispatch();

  const planId = props.match.params.planId;

  const plans = useSelector((state) => state.plan.myPlan);
  // const plan = plans.find((p) => p.planId === planId);
  // console.log(plans);

  const [isChecked, setIsChecked] = React.useState(true);

  React.useEffect(() => {
    dispatch(planActions.getdayPlanDB(planId));
  }, []);

  return (
    <>
      <Container>
        <Header />
        <Title {...plans} />
        <BtnBox>
          <Like {...plans} />
        </BtnBox>
        <div>
          <FormControlLabel
            style={{ display: "block", padding: "10px 24px", color: "gray" }}
            control={
              <Switch
                style={{ color: "#12C5ED" }}
                checked={isChecked}
                onChange={() => {
                  setIsChecked((prev) => !prev);
                }}
              />
            }
            label="지도보기"
          />
          <Collapse in={isChecked}>
            <WritePlanMap />
          </Collapse>
        </div>
        {isChecked ? <DetailDay {...plans} /> : <DetailDayhide {...plans} />}
      </Container>
    </>
  );
};

export default MainDetailPage;

const Container = styled.div`
  /* padding: 24px 24px; */
  width: 100%;
`;

const BtnBox = styled.div`
  padding: 0px 24px;
  display: flex;
  flex-direction: row;
`;

// const TitleBox = styled.div`
//   display: block;
//   width: 100%;
//   padding: 0px 24px;
// `;

// const TripDestBox = styled(TitleBox)`
//   div {
//     width: 100%;
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     cursor: pointer;
//   }

//   li {
//     display: flex;
//     align-items: center;
//     width: fit-content;
//     height: 32px;
//     margin: 0px 10px 5px 0px;
//     padding: 15px 12px;
//     box-sizing: border-box;
//     border-radius: 50px;
//     font-size: 14px;
//     font-weight: 500;
//   }
// `;

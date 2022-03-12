import React from "react";
import styled from "styled-components";
import WritePlanMap from "../components/WritePlan/Map/WritePlanMap";
import DetailDay from "../components/MainDetailPage/DetailDay";
import DetailDayhide from "../components/MainDetailPage/DetailDayhide";
import Header from "../components/MainDetailPage/Header";
import Title from "../components/WritePlan/Title/Title";
import CommentList from "../components/Comment/CommentList";
import { Collapse } from "@mui/material";
import { Switch } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import plan, { actionCreators as planActions } from "../redux/modules/plan";
import Like from "../components/MainDetailPage/Like";
import BookMark from "../components/MainDetailPage/BookMark";

const MainDetailPage = (props) => {
  const dispatch = useDispatch();

  const planId = props.match.params.planId;
  const plans = useSelector((state) => state.plan.myPlan);
  console.log(plans)

  const userId = localStorage.getItem("userId");
  console.log(userId)

  const [isChecked, setIsChecked] = React.useState(true);
  const [clickedTripDest, changeTripDest] = React.useState(0);

  React.useEffect(() => {
    dispatch(planActions.getdayPlanDB(planId));
  }, []);

  const decideShare = ["나만의 일정", "모두에게 공유"];
  const share = "공개"
  const unshare = "비공개"
  
  if (plans.userId.email === userId) {
    return (
      <>
        <Container>
          <Header />
          <Title {...plans} />
          <BtnBox>
            <Like {...plans} />
            <BookMark {...plans} />
          </BtnBox>
          <TripDestBox>
            <div>
              {decideShare.map((l, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      changeTripDest(i);
                      if (l === "모두에게 공유") {
                        dispatch(planActions.statusDB(plans.planId, share))
                      }
                      if (l === "나만의 일정") {
                        dispatch(planActions.statusDB(plans.planId, unshare))
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
          <CommentList planId={planId} />
        </Container>
      </>
    );
  }


  return (
    <>
      <Container>
        <Header />
        <Title {...plans} />
        <BtnBox>
          <Like {...plans} />
          <BookMark {...plans} />
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
        <CommentList planId={planId} />
      </Container>
    </>
  );
};

export default MainDetailPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const BtnBox = styled.div`
  padding: 0px 24px;
  margin-bottom: 27px;
  display: flex;
  flex-direction: row;
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


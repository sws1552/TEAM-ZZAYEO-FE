import React from "react";
import styled from "styled-components";
import { history } from "../../redux/ConfigureStore";
import MyEditPost from "./MyEditPost"

const AfterRegister = (props) => {
  return (
    <React.Fragment>
      <Container>
        <TripCard
          onClick={(e) => {
            history.push(`/detail/${props.planId}`);
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CardTitle>{props.title}</CardTitle>
            <MyEditPost planId={props.planId}/>
          </div>
          <CardInfo>
            {props.startDate}~{props.endDate}
          </CardInfo>
        </TripCard>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 24px 0px 24px;
`;

const TripCard = styled.div`
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 127px;
  background-color: #e6e6e6;
  border-radius: 8px;
`;

const CardTitle = styled.div`
  margin: 24px 0px 0px 24px;
  font-size: 22px;
  font-weight: 600;
  line-height: 25px;
  color: #ffffff;
`;

const CardInfo = styled.div`
  margin: 5px 0px 0px 24px;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: #ffffff;
`;

export default AfterRegister;

import React from "react";
import styled from "styled-components";
import { history } from "../../redux/ConfigureStore";
import MyEditPost from "./MyEditPost";

const AfterRegister = (props) => {
  return (
    <React.Fragment>
      <Container>
        <TripCard
          onClick={(e) => {
            history.push(`/detail/${props.planId}`);
          }}
        >
          <MyEditPost planId={props.planId} />
          <CardInfo>
            <CardTitle>{props.title}</CardTitle>
            <CardDays>
              {props.startDate}~{props.endDate}
            </CardDays>
          </CardInfo>
        </TripCard>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 8px 24px 0px 24px;
`;

const TripCard = styled.div`
  width: 100%;
  height: 128px;
  background-image: url("https://i.pinimg.com/564x/8b/32/96/8b3296a8852e92129622638283f715fd.jpg");
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  cursor: pointer;
`;

const CardInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 17px;
  bottom: 16px;
`;

const CardTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
`;

const CardDays = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
`;

export default AfterRegister;

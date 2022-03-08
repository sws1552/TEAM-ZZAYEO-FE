import React from "react";
import styled from "styled-components";

const MainBookMark = (props) => {
  return (
    <React.Fragment>
      <Container>
        <TripCard>
          <CardTitle></CardTitle>
          <CardInfo></CardInfo>
        </TripCard>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 24px;
`;

const TripCard = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  width: 120px;
  height: 200px;
  background-color: #e6e6e6;
  border-radius: 8px;
  margin-right: 8px;
  cursor: pointer;
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

export default MainBookMark;

import React from "react";
import styled from "styled-components";
import MainLike from "./MainLike";

const MainTravelList = (props) => {
  const { title, destination, style, withlist, isBookmark, planId } = props;

  return (
    <React.Fragment>
      <Container>
        <TripCard>
          <CardTitle>{title}</CardTitle>
          <CardInfo>
            #{style} #{destination} #{withlist}
          </CardInfo>
          <MainLike isBookmark={isBookmark} planId={planId} />
        </TripCard>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 24px;
`;

const TripCard = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 200px;
  background-color: #e6e6e6;
  border-radius: 8px;
  margin: 0px 0px 8px;
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

const BookMark = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

export default MainTravelList;

import React from "react";
import styled from "styled-components";

const SearchList = (props) => {
  const { title, destination, style, withlist } = props;

  return (
    <React.Fragment>
      <Container>
        <TripCard>
          <CardTitle>{title}</CardTitle>
          <CardInfo>
            #{style} #{destination} #{withlist}
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
  padding: 0px 24px;
`;

const TripCard = styled.div`
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 200px;
  background-color: #e6e6e6;
  border-radius: 8px;
  margin: 0px 0px 8px;
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

export default SearchList;

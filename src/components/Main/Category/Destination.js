import React from "react";
import styled from "styled-components";

const Destination = (props) => {
  const destList = ["국내", "해외"];
  return (
    <React.Fragment>
      <Container>
        {destList.map((l, i) => {
          return <Category key={i}>{l}</Category>;
        })}
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 16px;
  margin-right: 8px;
  background-color: #f4f4f4;
  border-radius: 16px;
`;

export default Destination;

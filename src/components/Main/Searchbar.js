import React from "react";
import styled from "styled-components";

const Searchbar = (props) => {
  return (
    <React.Fragment>
      <Container>
        <input></input>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  margin: 48px 24px 0px;
`;

export default Searchbar;

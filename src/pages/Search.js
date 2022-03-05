import React from "react";
import styled from "styled-components";
import Searchbar from "../components/Main/Searchbar";

const Search = (props) => {
  return (
    <React.Fragment>
      <Container>
        <Searchbar />
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Search;

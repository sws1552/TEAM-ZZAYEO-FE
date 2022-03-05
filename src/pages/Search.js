import React from "react";
import styled from "styled-components";
import Searchbar from "../components/Main/Searchbar";
import SearchList from "../components/Main/SearchList";
import queryString from "query-string";

const Search = (props) => {
  //const search = decodeURI(props.location.search).split("=")[1];
  const query = queryString.parse(window.location.search);
  const search = query.query;

  return (
    <React.Fragment>
      <Container>
        <Searchbar />
        <SearchKeword>
          <p>
            <span>"{search}"</span>에 대한 검색 결과입니다.
          </p>
        </SearchKeword>
        <SearchList />
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

const SearchKeword = styled.div`
  font-family: "Roboto", sans-serif;
  position: absolute;
`;

export default Search;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import styled from "styled-components";
import Searchbar from "../components/Search/Searchbar";
import SearchList from "../components/Search/SearchList";
import queryString from "query-string";
import Filter from "../components/Search/Filter";
import { useLocation } from "react-router";

const Search = (props) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const query = location.search;
  const search = queryString.parse(window.location.search);
  const keyword = search.query;
  const searchList = useSelector((store) => store.plan.search_list.plans);

  React.useEffect(() => {
    dispatch(planActions.searchDB(query));
  }, [query]);

  if (searchList) {
    return (
      <React.Fragment>
        <Container>
          <Searchbar query={query} />
          <Filter />
          <SearchKeword>
            <p>
              <span>"{keyword}"</span>에 대한 검색 결과입니다.
            </p>
          </SearchKeword>
          {searchList
            ? searchList.map((l, i) => {
                return <SearchList key={i} {...l} />;
              })
            : ""}
        </Container>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Container>
        <Searchbar query={query} />
        <Filter />
        <Div>
          <svg
            width="62"
            height="62"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59 59L45.4667 45.4667M52.7778 27.8889C52.7778 41.6346 41.6346 52.7778 27.8889 52.7778C14.1431 52.7778 3 41.6346 3 27.8889C3 14.1431 14.1431 3 27.8889 3C41.6346 3 52.7778 14.1431 52.7778 27.8889Z"
              stroke="#BDBDBD"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>검색 결과가 없습니다.</p>
        </Div>
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
  margin: 0px 24px;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 25px;
  }
`;
const Div = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
  }
`;

export default Search;

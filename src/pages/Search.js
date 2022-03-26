import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import styled from "styled-components";
import Searchbar from "../components/Search/Searchbar";
import SearchList from "../components/Search/SearchList";
import queryString from "query-string";
// import Filter from "../components/Search/Filter";
import { useLocation } from "react-router";
import { ReactComponent as SvgImg } from "../shared/svg/img-none.svg";

const Search = (props) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const query = location.search;
  const search = queryString.parse(window.location.search);
  const keyword = search.query;
  const searchList = useSelector((store) => store.plan.search_list.plans);

  console.log(searchList);

  React.useEffect(() => {
    dispatch(planActions.searchDB(query));
  }, [query]);

  if (query) {
    return (
      <React.Fragment>
        <Container>
          <Searchbar query={query} />
          {/* <Filter /> */}
          {searchList.length !== 0 ? (
            <>
              <SearchKeword>
                <p>
                  <span>"{keyword}"</span>에 대한 검색 결과입니다.
                </p>
              </SearchKeword>
              {searchList.map((l, i) => {
                return <SearchList key={i} {...l} />;
              })}
            </>
          ) : (
            <>
              <Div>
                <SvgImg />
                <p>검색 결과가 없습니다.</p>
              </Div>
            </>
          )}
        </Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Container>
        <Searchbar query={query} />
        {/* <Filter /> */}
        <Div>
          <SvgImg />
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

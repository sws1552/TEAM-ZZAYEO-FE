import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import styled from "styled-components";
import Searchbar from "../components/Search/Searchbar";
import SearchList from "../components/Search/SearchList";
import queryString from "query-string";

const Search = (props) => {
  const dispatch = useDispatch();

  const plans = useSelector((store) => store.plan.list);

  //const search = decodeURI(props.location.search).split("=")[1];
  const query = queryString.parse(window.location.search);
  const search = query.query;

  React.useEffect(() => {
    dispatch(planActions.getPlanDB());
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Searchbar />
        <SearchKeword>
          <p>
            <span>"{search}"</span>에 대한 검색 결과입니다.
          </p>
        </SearchKeword>
        {plans
          .filter((p) => {
            if (search === "") {
              return p;
            } else if (p.title.includes(search)) {
              return p;
            }
          })
          .map((p, i) => {
            return <SearchList key={i} {...p} />;
          })}
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

export default Search;

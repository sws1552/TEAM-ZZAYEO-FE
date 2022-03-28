import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import styled from "styled-components";
import Searchbar from "../components/Search/Searchbar";
import SearchList from "../components/Search/SearchList";
import queryString from "query-string";
import { useLocation } from "react-router";
import { ReactComponent as SvgImg } from "../shared/svg/img-none.svg";
import axios from "axios";

const Search = (props) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const query = location.search;
  const search = queryString.parse(window.location.search);
  const keyword = search.query;

  const searchList = useSelector((store) => store.plan.search_list.plans);
  const Endpage = useSelector((store) => store.plan.search_list.endPage);

  const [feed, setFeed] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [endPage, setEndPage] = React.useState(0);
  const pageEnd = React.useRef();
  console.log(pageNumber, feed, loading);

  // pageNumber가 바뀔때마다 실행
  React.useEffect(() => {
    if (endPage !== 0 && pageNumber > endPage) {
      return;
    } else {
      fetchFeeds(query, pageNumber);
    }
  }, [pageNumber, query]);

  const fetchFeeds = async (query, pageNumber) => {
    setLoading(false);
    await axios
      .get(`https://stgon.shop/api/plans/search${query}&page=${pageNumber}`)
      .then((res) => {
        console.log(res);
        setFeed((prev) => [...prev, ...res.data.plans]);
        setEndPage(res.data.endPage);
      });
    setLoading(true);
  };

  //loading이 바뀔때마다 실행
  React.useEffect(() => {
    // fetchFeed 함수에서 loading 값이 true로 바뀐다면
    console.log(loading);
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        },
        { threshold: 1 }
      );
      if (feed.length !== 0) {
        observer.observe(pageEnd.current);
      }
    }
  }, [loading, feed]);

  if (query) {
    return (
      <React.Fragment>
        <Container>
          <Searchbar
            query={query}
            setFeed={setFeed}
            setPageNumber={setPageNumber}
          />
          {feed.length !== 0 ? (
            <>
              <SearchKeword>
                <p>
                  <span>"{keyword}"</span>에 대한 검색 결과입니다.
                </p>
              </SearchKeword>
              {feed.map((l, i) => {
                return <SearchList key={i} {...l} />;
              })}
              <div ref={pageEnd}></div>
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
  height: 93.7%;
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

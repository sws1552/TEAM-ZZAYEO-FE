import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { actionCreators as planActions } from "../redux/modules/plan";
import { actionCreators as userActions } from "../redux/modules/user";
import Loader from "../components/Main/Loader";
import TravelList from "../components/AllPlanPage/TravelList";
import Filter from "../components/AllPlanPage/Filter";

const AllPlanPage = (props) => {
  const dispatch = useDispatch();
  const scroll = React.useRef(null);

  const [feed, setFeed] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const pageEnd = React.useRef();

  const location = useLocation();
  const query = location.search;
  // const plans = useSelector((store) => store.plan.list);

  const executeScroll = () =>
    scroll.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

  // async, await를 이용해서 비동기적으로 데이터 통신
  const fetchFeeds = async (pageNumber) => {
    const res = await fetch(`http://stgon.shop/api/plans?page=${pageNumber}`);
    const data = await res.json();
    setFeed((prev) => [...prev, ...data.plans]);
    setLoading(true);
  };

  // pageNumber가 바뀔때마다 실행
  React.useEffect(() => {
    fetchFeeds(pageNumber);
  }, [pageNumber]);

  // loading이 바뀔때마다 실행
  React.useEffect(() => {
    // fetchFeed에서 loading이 true면
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
    if (query) {
      dispatch(planActions.getPlanDB(query + "&page=" + pageNumber));
    } else {
      return null;
    }
  }, [query]);

  return (
    <React.Fragment>
      <Container>
        <Header ref={scroll}>
          <HeaderTitle>전체 여행</HeaderTitle>
        </Header>
        <Contents>
          <Filter />
          {feed.map((l, i) => {
            return <TravelList key={i} {...l} />;
          })}
        </Contents>
        <ScrollBtn onClick={executeScroll}>
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.29319 0.292893C7.68371 -0.0976314 8.31688 -0.0976314 8.7074 0.292893L15.0714 6.65685C15.4619 7.04738 15.4619 7.68054 15.0714 8.07107C14.6808 8.46159 14.0477 8.46159 13.6572 8.07107L9.0003 3.41421L9.0003 17C9.0003 17.5523 8.55258 18 8.0003 18C7.44801 18 7.0003 17.5523 7.0003 17L7.0003 3.41421L2.34344 8.07107C1.95292 8.46159 1.31975 8.46159 0.929228 8.07107C0.538704 7.68054 0.538704 7.04738 0.929228 6.65685L7.29319 0.292893Z"
              fill="white"
            />
          </svg>
        </ScrollBtn>
        <div className="loading" ref={pageEnd}>
          {loading && <Loader />}
        </div>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 93.7%;
  max-width: 420px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  height: 56px;
  padding-left: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 16px;
`;

const ScrollBtn = styled.div`
  position: absolute;
  z-index: 999;
  width: 48px;
  height: 48px;
  border-radius: 48px;
  right: 16px;
  bottom: 72px;
  background: #8f8cf1;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default AllPlanPage;

import React, { useState, useEffect, useCallback } from "react";
import instance from "../shared/Request";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import MainBookMarkList from "../components/Main/MainBookMarkList";
import MainTravelList from "../components/Main/MainTravelList";
import Loader from "../components/Main/Loader";
import Filter from "../components/Main/Filter";
import { useLocation } from "react-router";
import HeaderBar from "../components/Main/HeaderBar";

const Main = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const is_token = localStorage.getItem("token") ? true : false;

  //무한 스크롤
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([]);
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(0);

  useEffect(() => {
    console.log(itemLists);
  }, [itemLists]);

  const getMoreItem = async (page) => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await instance.get(`/api/plans?page=${page}`).then((res) => {
      let Items = res.data.plans;
      setItemLists((itemLists) => itemLists.concat(Items));
      setEndPage(res.data.endPage);
    });
    setIsLoaded(false);
  };

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target);
        await getMoreItem(page);
        if (page === endPage) {
          return page;
        } else {
          setPage((num) => num + 1);
        }
        observer.observe(entry.target);
      }
    },
    [page]
  );

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, page]);

  const plans = useSelector((store) => store.plan.list);

  const query = location.search;

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
    dispatch(planActions.getPlanDB(query));
    dispatch(planActions.getBookMarkDB());
  }, [query]);

  if (is_token) {
    return (
      <Container>
        <HeaderBar />
        <Banner>
          <p>
            트리플랜과 함께
            <br />
            여행을 나눌 준비됐나요?
          </p>
        </Banner>
        <Content>
          <BookMarkListBox>
            <p>내가 찜한 여행기 📚😆</p>
            <MainBookMarkList />
          </BookMarkListBox>
          <TravelListBox>
            <p>여행 일정 매거진</p>
            <Filter />
            {query ? (
              <>
                {plans.map((l, i) => {
                  return <MainTravelList key={i} {...l} />;
                })}
              </>
            ) : (
              <>
                {itemLists.map((l, i) => {
                  return <MainTravelList key={i} {...l} />;
                })}
              </>
            )}
            <div ref={setTarget} className="Target-Element">
              {isLoaded && <Loader />}
            </div>
          </TravelListBox>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Filter />
      {plans.map((l, i) => {
        return <MainTravelList key={i} {...l} />;
      })}
    </Container>
  );
};

export default Main;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Banner = styled.div`
  position: relative;
  height: 148px;
  background-color: #cfcfff;
  padding: 0px 24px;

  p {
    margin: 0;
    position: absolute;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    bottom: 40px;
    color: #212121;
  }
`;

const Content = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const TravelListBox = styled.div`
  p {
    padding: 0px 24px;
    margin-bottom: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #1a1a1a;
  }
`;

const BookMarkListBox = styled(TravelListBox)`
  margin-bottom: 36px;
`;

import React, { useState, memo, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import instance from "../shared/Request";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import MainBookMarkList from "../components/Main/MainBookMarkList";
import MainTravelList from "../components/Main/MainTravelList";
import Loader from "../components/Main/Loader";
import Item from "./Item";
import Searchbar from "../components/Search/Searchbar";
import Filter from "../components/Main/Filter";

const Main = (props) => {
  const dispatch = useDispatch();
  const is_token = localStorage.getItem("token") ? true : false;

  //무한 스크롤
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log(itemLists);
  }, [itemLists]);

  const getMoreItem = async (page) => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await instance.get(`/api/plans?page=${page}`).then((res) => {
      let Items = res.data.plans;
      setItemLists((itemLists) => itemLists.concat(Items));
    });
    setIsLoaded(false);
  };

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target);
        await getMoreItem(page);
        setPage((num) => num + 1);
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

  const style = useSelector((store) => store.category.style);
  const style_list = useSelector((store) => store.plan.style_list);
  console.log(style_list);

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
    dispatch(planActions.getPlanDB(style));
    dispatch(planActions.getBookMarkDB());
  }, [style]);

  if (is_token && style_list.length === 0) {
    return (
      <Container>
        <Searchbar />
        <Filter />
        <BookMarkListBox>
          <p>내가 찜한 여행 스토리</p>
          <MainBookMarkList />
        </BookMarkListBox>
        <TravelListBox>
          <p>여행 일정 매거진</p>

          {itemLists.map((l, i) => {
            return <MainTravelList key={i} {...l} />;
          })}
          <div ref={setTarget} className="Target-Element">
            {isLoaded && <Loader />}
          </div>
        </TravelListBox>
      </Container>
    );
  }

  if (is_token && style_list.length !== 0) {
    return (
      <Container>
        <Searchbar />
        <Filter />
        <BookMarkListBox>
          <p>내가 찜한 여행 스토리</p>
          <MainBookMarkList />
        </BookMarkListBox>
        <TravelListBox>
          <p>여행 일정 매거진</p>

          {style_list.map((l, i) => {
            return <MainTravelList key={i} {...l} />;
          })}
          <div ref={setTarget} className="Target-Element">
            {isLoaded && <Loader />}
          </div>
        </TravelListBox>
      </Container>
    );
  }

  return (
    <Container>
      <Searchbar />
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

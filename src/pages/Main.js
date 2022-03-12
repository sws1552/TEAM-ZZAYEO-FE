import React, { useState, useEffect, useCallback } from "react";
import instance from "../shared/Request";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import MainBookMarkList from "../components/Main/MainBookMarkList";
import MainTravelList from "../components/Main/MainTravelList";
import Loader from "../components/Main/Loader";
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
  const style = useSelector((store) => store.category.style);
  const destination = useSelector((store) => store.category.destination);
  const destination_list = useSelector((store) => store.plan.destination_list);
  console.log(destination_list)

  console.log(style, destination)

  const getPost = async (style, destination) => {
    if (style === "") {
      await instance.get(`/api/plans?destination=${destination}`)
        .then((res) => {
          dispatch(planActions.destinationList(res.data.plans));
        });
    } else if (style !== "" & destination !== "") {
      await instance.get(`/api/plans?destination=${destination}&style=${style}`)
        .then((res) => {
          if (res.data.plans.length === 0) {
            alert("선택하신 여행 스타일이 없습니다.")
          } else {
            dispatch(planActions.destinationList(res.data.plans));
          }
        });
    } else if (destination === "") {
      await instance.get(`/api/plans?style=${style}`)
        .then((res) => {
          if (res.data.plans.length === 0) {
            alert("선택하신 여행 스타일이 없습니다.")
          } else {
            dispatch(planActions.destinationList(res.data.plans));
          }
        });
    }
  };

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
    dispatch(planActions.getBookMarkDB());
    getPost(style, destination)
  }, [style, destination]);

  if (is_token && destination_list.length !== 0) {
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
          {destination_list.map((l, i) => {
            return <MainTravelList key={i} {...l} />;
          })}
          <div ref={setTarget} className="Target-Element">
            {isLoaded && <Loader />}
          </div>
        </TravelListBox>
      </Container>
    );
  }

  if (is_token) {
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

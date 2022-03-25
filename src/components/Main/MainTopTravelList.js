import React from "react";
import styled from "styled-components";
import MainTopTravel from "./MainTopTravel";
import { useSelector } from "react-redux";


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

const MainTopTravelList = (props) => {
  const toptravel_list = useSelector((store) => store.plan.toptravel_list);

  return (
    // <Container>
    //   {toptravel_list.map((list, idx) => {
    //     return <MainTopTravel key={idx} {...list} index={idx} />;
    //   })}
    // </Container>
    <SwiperSlider
    className="banner"
    // spaceBetween={1}
    slidesPerView={2.3}
    scrollbar={{ draggable: true }}
    // navigation
    // pagination={{ clickable: true }}
    // breakpoints={{
    //   768: {
    //     slidesPerView: 1,
    //   },
    // }}
  >
   {toptravel_list.map((list, idx) => {
     return (
      <SwiperSlide key={`swiperkey-${idx}`}>
        <MainTopTravel key={idx} {...list} index={idx} />
      </SwiperSlide>
     );
   })}
    
</SwiperSlider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 24px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SwiperSlider = styled(Swiper)`
  padding: 0 24px;
  justify-content: center;

`;

export default MainTopTravelList;

import React from "react";
import styled from "styled-components";
import MainUserpick from "./MainUserpick";
import { useSelector } from "react-redux";


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

const MainUserpickList = (props) => {
  const userpick_list = useSelector((store) => store.plan.userpick_list);

  return (
    // <Container>
    //   {userpick_list.map((list, idx) => {
    //     return <MainUserpick key={idx} {...list} index={idx} />;
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
       {userpick_list.map((list, idx) => {
         return (
          <SwiperSlide key={`swiperkey-${idx}`}>
            <MainUserpick key={idx} {...list} index={idx} />
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
  z-index: 0;
`;

export default MainUserpickList;

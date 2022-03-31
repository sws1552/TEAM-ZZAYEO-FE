import React from "react";
import styled from "styled-components";
import MainBookMark from "./MainBookMark";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as planActions } from "../../redux/modules/plan";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainBookMarkList = (props) => {
  const bookmark_list = useSelector((store) => store.plan.bookmark_list);

  return (
    // <Container>
    //   {bookmark_list.map((list, idx) => {
    //     return <MainBookMark key={idx} {...list} index={idx} />;
    //   })}
    // </Container>

    <SwiperSlider
      className="banner"
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      // navigation
      pagination={{ clickable: true }}
      breakpoints={{
        768: {
          slidesPerView: 1,
        },
      }}
    >
      {bookmark_list.map((list, idx) => {
        return (
          <SwiperSlide key={`swiperkey-${idx}`}>
            <MainBookMark key={idx} {...list} index={idx} />
          </SwiperSlide>
        );
      })}
    </SwiperSlider>
  );
};

const SwiperSlider = styled(Swiper)`
  /* padding: 0 24px; */
  justify-content: center;
  z-index: 0;

  .swiper-pagination {
    display: flex;
    justify-content: center;
  }

  .swiper-pagination-bullet-active {
    width: 24px;
    background-color: #4e49e2;
    border-radius: 10px;
  }
`;

export default MainBookMarkList;

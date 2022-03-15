import React from 'react';
import styled from 'styled-components';

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination])

const SwiperImage = (props) => {
    const { image } = props

    return (
        <div style={{ maxWidth: "340px" }}>
            <SwiperSlider
                className="banner"
                spaceBetween={50}
                slidesPerView={1}
                // navigation
                pagination={{
                    type: "fraction",
                }}
            >
                {image && image.map((m, i) => (
                    <SwiperSlide key={i}>
                        <Image src={m}></Image>
                    </SwiperSlide>
                ))}
            </SwiperSlider>
        </div>
    );
};

const Image = styled.div`
    padding-top: 75%;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    display: block;
    margin-top: 16px;
    border-radius: 8px;
    width: 100%;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
`

const SwiperSlider = styled(Swiper)`

.swiper-pagination {
    width: "100px";
    top: 30px;
    margin: 0px 130px;
    position: absolute;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    }
`

export default SwiperImage;
import React from "react";
import styled from "styled-components";

const MainLike = (props) => {
  const [bookMarkIcon, setbookMarkIcon] = React.useState(false);

  const onBookMark = () => {};

  return (
    <React.Fragment>
      <BookMark onClick={() => setbookMarkIcon(!bookMarkIcon)}>
        {bookMarkIcon === true ? (
          <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_370_337)">
              <path
                d="M4 9.5278C4 6.92197 4 5.61906 4.82376 4.80953C5.64752 4 6.97335 4 9.625 4H13.375C16.0267 4 17.3525 4 18.1762 4.80953C19 5.61906 19 6.92197 19 9.5278V15.8181C19 18.2902 19 19.5263 18.2085 19.9043C17.4169 20.2824 16.4279 19.5187 14.4499 17.9914L13.8168 17.5026C12.7046 16.6438 12.1485 16.2144 11.5 16.2144C10.8515 16.2144 10.2954 16.6438 9.18317 17.5026L8.55012 17.9914C6.57207 19.5187 5.58305 20.2824 4.79153 19.9043C4 19.5263 4 18.2902 4 15.8181V9.5278Z"
                fill="#12C5ED"
                strokeWidth="1.4"
              />
            </g>
          </svg>
        ) : (
          <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_370_337)">
              <path
                d="M4 9.5278C4 6.92197 4 5.61906 4.82376 4.80953C5.64752 4 6.97335 4 9.625 4H13.375C16.0267 4 17.3525 4 18.1762 4.80953C19 5.61906 19 6.92197 19 9.5278V15.8181C19 18.2902 19 19.5263 18.2085 19.9043C17.4169 20.2824 16.4279 19.5187 14.4499 17.9914L13.8168 17.5026C12.7046 16.6438 12.1485 16.2144 11.5 16.2144C10.8515 16.2144 10.2954 16.6438 9.18317 17.5026L8.55012 17.9914C6.57207 19.5187 5.58305 20.2824 4.79153 19.9043C4 19.5263 4 18.2902 4 15.8181V9.5278Z"
                stroke="white"
                strokeWidth="1.4"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_370_337"
                x="0.299805"
                y="0.300049"
                width="22.4004"
                height="23.4006"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_370_337"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_370_337"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}
      </BookMark>
    </React.Fragment>
  );
};

const BookMark = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

export default MainLike;

import React from "react";
import styled from "styled-components";

const MainLike = (props) => {
  const is_like = props.isLike;

  return (
    <React.Fragment>
      <Like>
        {is_like ? (
          <svg
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_207_1222)">
              <path
                d="M22.4578 5.41452C21.9691 4.96607 21.3889 4.61034 20.7503 4.36763C20.1117 4.12492 19.4272 4 18.7359 4C18.0446 4 17.3601 4.12492 16.7215 4.36763C16.0829 4.61034 15.5026 4.96607 15.0139 5.41452L13.9997 6.34476L12.9855 5.41452C11.9984 4.50912 10.6596 4.00047 9.26361 4.00047C7.86761 4.00047 6.52879 4.50912 5.54168 5.41452C4.55456 6.31992 4 7.5479 4 8.82833C4 10.1088 4.55456 11.3367 5.54168 12.2421L6.55588 13.1724L13.9997 20L21.4436 13.1724L22.4578 12.2421C22.9467 11.7939 23.3346 11.2617 23.5992 10.676C23.8638 10.0902 24 9.46237 24 8.82833C24 8.19428 23.8638 7.56645 23.5992 6.9807C23.3346 6.39494 22.9467 5.86275 22.4578 5.41452V5.41452Z"
                fill="#12C5ED"
              />
              <path
                d="M22.4578 5.41452C21.9691 4.96607 21.3889 4.61034 20.7503 4.36763C20.1117 4.12492 19.4272 4 18.7359 4C18.0446 4 17.3601 4.12492 16.7215 4.36763C16.0829 4.61034 15.5026 4.96607 15.0139 5.41452L13.9997 6.34476L12.9855 5.41452C11.9984 4.50912 10.6596 4.00047 9.26361 4.00047C7.86761 4.00047 6.52879 4.50912 5.54168 5.41452C4.55456 6.31992 4 7.5479 4 8.82833C4 10.1088 4.55456 11.3367 5.54168 12.2421L6.55588 13.1724L13.9997 20L21.4436 13.1724L22.4578 12.2421C22.9467 11.7939 23.3346 11.2617 23.5992 10.676C23.8638 10.0902 24 9.46237 24 8.82833C24 8.19428 23.8638 7.56645 23.5992 6.9807C23.3346 6.39494 22.9467 5.86275 22.4578 5.41452V5.41452Z"
                stroke="#12C5ED"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_207_1222"
                x="0.299805"
                y="0.300049"
                width="27.4004"
                height="23.3999"
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
                  result="effect1_dropShadow_207_1222"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_207_1222"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        ) : (
          <svg
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_207_1222)">
              <path
                d="M22.4578 5.41452C21.9691 4.96607 21.3889 4.61034 20.7503 4.36763C20.1117 4.12492 19.4272 4 18.7359 4C18.0446 4 17.3601 4.12492 16.7215 4.36763C16.0829 4.61034 15.5026 4.96607 15.0139 5.41452L13.9997 6.34476L12.9855 5.41452C11.9984 4.50912 10.6596 4.00047 9.26361 4.00047C7.86761 4.00047 6.52879 4.50912 5.54168 5.41452C4.55456 6.31992 4 7.5479 4 8.82833C4 10.1088 4.55456 11.3367 5.54168 12.2421L6.55588 13.1724L13.9997 20L21.4436 13.1724L22.4578 12.2421C22.9467 11.7939 23.3346 11.2617 23.5992 10.676C23.8638 10.0902 24 9.46237 24 8.82833C24 8.19428 23.8638 7.56645 23.5992 6.9807C23.3346 6.39494 22.9467 5.86275 22.4578 5.41452V5.41452Z"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_207_1222"
                x="0.299805"
                y="0.300049"
                width="27.4004"
                height="23.3999"
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
                  result="effect1_dropShadow_207_1222"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_207_1222"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}
      </Like>
    </React.Fragment>
  );
};

const Like = styled.div`
  right: 16px;
  bottom: 16px;
`;

export default MainLike;

import React from "react";
import styled from "styled-components";

const Bookmark = (props) => {
  const is_Bookmark = props.isBookmark;

  return (
    <React.Fragment>
      <BookmarkBtn>
        {is_Bookmark ? (
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 3C0 1.34315 1.34315 0 3 0H11C12.6569 0 14 1.34315 14 3V15C14 15.3466 13.8205 15.6684 13.5257 15.8507C13.2309 16.0329 12.8628 16.0494 12.5528 15.8944L7 13.118L1.44721 15.8944C1.13723 16.0494 0.769085 16.0329 0.474269 15.8507C0.179452 15.6684 0 15.3466 0 15V3Z"
              fill="#4E49E2"
            />
          </svg>
        ) : (
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 3C0 1.34315 1.34315 0 3 0H11C12.6569 0 14 1.34315 14 3V15C14 15.3466 13.8205 15.6684 13.5257 15.8507C13.2309 16.0329 12.8628 16.0494 12.5528 15.8944L7 13.118L1.44721 15.8944C1.13723 16.0494 0.769085 16.0329 0.474269 15.8507C0.179452 15.6684 0 15.3466 0 15V3ZM3 2C2.44772 2 2 2.44772 2 3V13.382L6.55279 11.1056C6.83431 10.9648 7.16569 10.9648 7.44721 11.1056L12 13.382V3C12 2.44772 11.5523 2 11 2H3Z"
              fill="#BDBDBD"
            />
          </svg>
        )}
      </BookmarkBtn>
    </React.Fragment>
  );
};

const BookmarkBtn = styled.div`
  padding: 4px 5px;
`;

export default Bookmark;

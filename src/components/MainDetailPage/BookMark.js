import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as planActions } from "../../redux/modules/plan";

const BookMark = (props) => {
  const dispatch = useDispatch();

  const planId = props.planId;
  const is_bookmark = props.isBookmark;

  const onBookMark = () => {
    if (is_bookmark === false) {
      dispatch(planActions.addBookMarkDB(planId));
    } else {
      dispatch(planActions.deleteBookMarkDB(planId));
    }
  };

  return (
    <React.Fragment>
      <LikeBtn onClick={onBookMark}>
        {is_bookmark ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 7C5 5.34315 6.34315 4 8 4H16C17.6569 4 19 5.34315 19 7V19C19 19.3466 18.8205 19.6684 18.5257 19.8507C18.2309 20.0329 17.8628 20.0494 17.5528 19.8944L12 17.118L6.44721 19.8944C6.13723 20.0494 5.76909 20.0329 5.47427 19.8507C5.17945 19.6684 5 19.3466 5 19V7Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 7C5 5.34315 6.34315 4 8 4H16C17.6569 4 19 5.34315 19 7V19C19 19.3466 18.8205 19.6684 18.5257 19.8507C18.2309 20.0329 17.8628 20.0494 17.5528 19.8944L12 17.118L6.44721 19.8944C6.13723 20.0494 5.76909 20.0329 5.47427 19.8507C5.17945 19.6684 5 19.3466 5 19V7ZM8 6C7.44772 6 7 6.44772 7 7V17.382L11.5528 15.1056C11.8343 14.9648 12.1657 14.9648 12.4472 15.1056L17 17.382V7C17 6.44772 16.5523 6 16 6H8Z"
              fill="white"
            />
          </svg>
        )}
        <LikeCnt>{props.bookmarkCount}</LikeCnt>
      </LikeBtn>
    </React.Fragment>
  );
};
const LikeBtn = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    cursor: pointer;
  }
`;

const LikeCnt = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #ffffff;
`;

export default BookMark;

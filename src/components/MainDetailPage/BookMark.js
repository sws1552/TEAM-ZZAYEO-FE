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
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.49134C1 3.3741 1 2.31548 1.65901 1.65774C2.31802 1 3.37868 1 5.5 1H8.5C10.6213 1 11.682 1 12.341 1.65774C13 2.31548 13 3.3741 13 5.49134V10.6022C13 12.6108 13 13.6151 12.3668 13.9223C11.7336 14.2294 10.9423 13.609 9.3599 12.368L8.85346 11.9709C7.96368 11.2731 7.51879 10.9242 7 10.9242C6.48121 10.9242 6.03632 11.2731 5.14653 11.9709L4.6401 12.368C3.05766 13.609 2.26644 14.2294 1.63322 13.9223C1 13.6151 1 12.6108 1 10.6022V5.49134Z"
              fill="#12C5ED"
              stroke="#12C5ED"
              strokeWidth="1.4"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.49134C1 3.3741 1 2.31548 1.65901 1.65774C2.31802 1 3.37868 1 5.5 1H8.5C10.6213 1 11.682 1 12.341 1.65774C13 2.31548 13 3.3741 13 5.49134V10.6022C13 12.6108 13 13.6151 12.3668 13.9223C11.7336 14.2294 10.9423 13.609 9.3599 12.368L8.85346 11.9709C7.96368 11.2731 7.51879 10.9242 7 10.9242C6.48121 10.9242 6.03632 11.2731 5.14653 11.9709L4.6401 12.368C3.05766 13.609 2.26644 14.2294 1.63322 13.9223C1 13.6151 1 12.6108 1 10.6022V5.49134Z"
              stroke="#999999"
              strokeWidth="1.4"
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
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #666666;
`;

export default BookMark;

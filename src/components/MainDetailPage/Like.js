import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../../redux/modules/plan";

const Like = (props) => {
  const dispatch = useDispatch();
  const planId = props.planId;
  const is_like = props.isLike;
  console.log(is_like);
  // const [is_like, setIsLike] = React.useState(false);

  const onLike = () => {
    if (is_like === false) {
      dispatch(planActions.addLikeDB(planId));
    } else {
      dispatch(planActions.deleteLikeDB(planId));
    }
  };

  return (
    <React.Fragment>
      <LikeBtn onClick={onLike}>
        {is_like ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.53544 5.89997V3.09999C9.53544 2.54304 9.31062 2.0089 8.91044 1.61507C8.51027 1.22125 7.96751 1 7.40158 1L4.55643 7.29996V14.9999H12.5797C12.9228 15.0037 13.2557 14.8854 13.5172 14.6667C13.7786 14.448 13.9509 14.1437 14.0023 13.8099L14.9839 7.50996C15.0148 7.30931 15.0011 7.10444 14.9436 6.90954C14.8861 6.71464 14.7862 6.53437 14.6509 6.38123C14.5156 6.22808 14.3481 6.10572 14.1599 6.02262C13.9718 5.93952 13.7675 5.89767 13.5613 5.89997H9.53544ZM4.55643 14.9999H2.42257C2.04528 14.9999 1.68345 14.8524 1.41666 14.5899C1.14988 14.3273 1 13.9712 1 13.5999V8.69995C1 8.32865 1.14988 7.97256 1.41666 7.71001C1.68345 7.44746 2.04528 7.29996 2.42257 7.29996H4.55643"
              fill="#C4C4C4"
            />
            <path
              d="M4.55643 7.29996L7.40158 1C7.96751 1 8.51027 1.22125 8.91044 1.61507C9.31062 2.0089 9.53544 2.54304 9.53544 3.09999V5.89997H13.5613C13.7675 5.89767 13.9718 5.93952 14.1599 6.02262C14.3481 6.10572 14.5156 6.22808 14.6509 6.38123C14.7862 6.53437 14.8861 6.71464 14.9436 6.90954C15.0011 7.10444 15.0148 7.30931 14.9839 7.50996L14.0023 13.8099C13.9509 14.1437 13.7786 14.448 13.5172 14.6667C13.2557 14.8854 12.9228 15.0037 12.5797 14.9999H4.55643M4.55643 7.29996V14.9999M4.55643 7.29996H2.42257C2.04528 7.29996 1.68345 7.44746 1.41666 7.71001C1.14988 7.97256 1 8.32865 1 8.69995V13.5999C1 13.9712 1.14988 14.3273 1.41666 14.5899C1.68345 14.8524 2.04528 14.9999 2.42257 14.9999H4.55643"
              stroke="#999999"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
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
              d="M4.55643 7.29996L7.40158 1C7.96751 1 8.51027 1.22125 8.91044 1.61507C9.31062 2.0089 9.53544 2.54304 9.53544 3.09999V5.89997H13.5613C13.7675 5.89767 13.9718 5.93952 14.1599 6.02262C14.3481 6.10572 14.5156 6.22808 14.6509 6.38123C14.7862 6.53437 14.8861 6.71464 14.9436 6.90954C15.0011 7.10444 15.0148 7.30931 14.9839 7.50996L14.0023 13.8099C13.9509 14.1437 13.7786 14.448 13.5172 14.6667C13.2557 14.8854 12.9228 15.0037 12.5797 14.9999H4.55643M4.55643 7.29996V14.9999M4.55643 7.29996H2.42257C2.04528 7.29996 1.68345 7.44746 1.41666 7.71001C1.14988 7.97256 1 8.32865 1 8.69995V13.5999C1 13.9712 1.14988 14.3273 1.41666 14.5899C1.68345 14.8524 2.04528 14.9999 2.42257 14.9999H4.55643"
              stroke="#999999"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <LikeCnt>{props.likeCount}</LikeCnt>
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

export default Like;

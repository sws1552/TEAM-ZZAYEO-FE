import React from "react";
import styled from "styled-components";
import MainBookMark from "./MainBookMark";
import { useSelector } from "react-redux";

const MainBookMarkList = (props) => {
  const bookmark_list = useSelector((store) => store.plan.bookmark_list);

  return (
    <Container>
      {bookmark_list.map((list, idx) => {
        return <MainBookMark key={idx} {...list} index={idx} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 24px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MainBookMarkList;

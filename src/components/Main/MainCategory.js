import React from "react";
import styled from "styled-components";

const MainCategory = (props) => {
  return (
    <Container>
      <SelectBox>
        <Destination>어디로</Destination>
        <Style>여행스타일</Style>
      </SelectBox>
    </Container>
  );
};

export default MainCategory;

const Container = styled.div`
  padding: 0px 24px;
  position: relative;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: row;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;

const Destination = styled.div`
  background: #ffffff;
  border: 1px solid #ededed;
  box-sizing: border-box;
  border-radius: 15.5px;
  padding: 4px 16px;
  margin-right: 8px;
  cursor: pointer;
`;

const Style = styled.div`
  background: #ffffff;
  border: 1px solid #ededed;
  box-sizing: border-box;
  border-radius: 15.5px;
  padding: 4px 16px;
  cursor: pointer;
`;

import React from "react";
import styled from "styled-components";

const Style = (props) => {
  const tripStyle = [
    "액티비티 체험",
    "문화 예술 역사 체험",
    "명소 관광지 방문필수",
    "페스티벌 참여",
    "먹방투어",
    "쇼핑 좋아",
    "편하게 쉬는 휴양",
    "SNS 핫플 투어",
    "호캉스",
    "자연친화",
  ];
  return (
    <React.Fragment>
      <Container>
        {tripStyle.map((l, i) => {
          return <Category key={i}>{l}</Category>;
        })}
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px 24px;
`;

const Category = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 16px;
  margin-right: 8px;
  margin-bottom: 12px;
  background-color: #f4f4f4;
  border-radius: 16px;
`;

export default Style;
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { history } from "../../redux/ConfigureStore";

const MainBookMark = (props) => {
  const planId = props.planId;

  const bookmark_list = useSelector((store) => store.plan.bookmark_list);
  const plan = bookmark_list.find((p) => p.planId === planId);
  const userId = plan.planId.userId.userId;

  const onProfile = (e) => {
    e.stopPropagation();
    history.push(`/otheruser/${userId}`);
  };
  return (
    <React.Fragment>
      <Container>
        <BookMarkCard
          onClick={() => {
            history.push(`detail/${planId.planId}`);
          }}
        >
          <UserImg onClick={onProfile}>
            <img src={plan.planId.userId.profile_img} alt="" />
          </UserImg>
          <UserName>{plan.planId.userId.nickname}</UserName>
        </BookMarkCard>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 8px;
`;

const BookMarkCard = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  width: 120px;
  height: 200px;
  background-color: #e6e6e6;
  border-radius: 8px;
  margin-right: 8px;
  cursor: pointer;
`;

const UserImg = styled.div`
  margin: 10px 0px 0px 10px;
  img {
    width: 34px;
    height: 34px;
    border-radius: 34px;
  }
`;

const UserName = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #ffffff;
`;

export default MainBookMark;

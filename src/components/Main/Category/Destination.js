import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as categoryActions } from "../../../redux/modules/category";

const Destination = (props) => {
  const dispatch = useDispatch();
  const destination = ["국내", "해외"];
  const [clickedDestination, changeDestination] = React.useState(0);

  return (
    <React.Fragment>
      <Container>
        {destination.map((l, i) => {
          return (
            <Category
              onClick={() => {
                changeDestination(i);
                // dispatch(categoryActions.addCategoryDB(destination[i]));
              }}
              style={{
                backgroundColor:
                  i === clickedDestination ? "#535353" : "#F4F4F4",
                color: i === clickedDestination ? "#FFFFFF" : "#757575",
              }}
              key={i}
              value={l}
            >
              {l}
            </Category>
          );
        })}
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px;
`;

const Category = styled.option`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 16px;
  margin-right: 8px;
  border-radius: 16px;
  cursor: pointer;
`;

export default React.memo(Destination);

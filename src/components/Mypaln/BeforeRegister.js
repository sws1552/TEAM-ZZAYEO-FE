import React from "react";
import styled from "styled-components";
import CropSquareIcon from "@mui/icons-material/CropSquare";

const BeforeRegister = (props) => {
  return (
    <React.Fragment>
      <ContainerBox>
        <CropSquareIcon className="CropSquare" />
        <P>등록된 여행이 없습니다.</P>
      </ContainerBox>
    </React.Fragment>
  );
};

const ContainerBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 312px;
  height: 65vh;

  & .CropSquare {
    font-size: 75px;
    color: #bdbdbd;
  }
`;

const P = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 20.27px;
  margin: 0;
`;

export default BeforeRegister;

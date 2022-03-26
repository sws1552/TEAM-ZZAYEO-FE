import React from "react";
import styled from "styled-components";
import { ReactComponent as SvgImg } from "../../shared/svg/img_write_none.svg";

const BeforeRegister = (props) => {
  return (
    <React.Fragment>
      <ContainerBox>
        <SvgImg />
        <P>
          등록된 여행이 없습니다. <br />
          여행을 작성해보세요.
        </P>
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
  height: 65vh;

  & .CropSquare {
    font-size: 75px;
    color: #bdbdbd;
  }
`;

const P = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  margin-top: 16px;
`;

export default BeforeRegister;

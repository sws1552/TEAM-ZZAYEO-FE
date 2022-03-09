import React from "react";
import styled from "styled-components";

const CategoryModal = (props) => {
  const { open, close } = props;
  if (open) {
    return (
      <React.Fragment>
        <OpenModal>
          <Section></Section>
        </OpenModal>
      </React.Fragment>
    );
  }
  return null;
};

const ModalBox = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.72);
  z-index: 9999;
  overflow-y: auto;
  max-width: 420px;
  width: 100%;
  margin: auto;
`;

const OpenModal = styled(ModalBox)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 420px;
  width: 100%;
  margin: auto;
  height: 586px;
  background-color: #ffffff;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
`;

export default CategoryModal;

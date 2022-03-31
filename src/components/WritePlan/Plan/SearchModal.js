import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SearchMap from "./SearchMap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const Modalbox = styled(Box)`
  position: fixed;
  top: 0;
  bottom: 0;
  position: absolute;
  /* top: 50%;
  transform: translate(0%, -50%); */
  width: 100%;
  max-width: 420px;
  height: 100%;
  background-color: white;
  border: none;
  box-shadow: 24;
  @media (max-width: 540px) {
    margin: auto;
    left: 0;
    right: 0;
}
  @media (min-width: 1580px) {
  /* justify-content: flex-end; */
  left: 1150px;
  }
  @media (max-width: 1579px) and (min-width: 541px) {
  right: 100px;
  }
`

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  background-color: #4e49e2;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  position: absolute;
  bottom: 0;
`;

const ADDPlace = styled.div`
  color: #757575;
  font-size: 14px;
  font-weight: 400;
  border: none;
  cursor: pointer;
`;
const Header = styled.div`
  height: 56px;
  line-height: 56px;
  padding: 0px 24px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 700;
  align-items: center;
  font-family: "Roboto", sans-serif;
`;

export default function SearhModal() {
  const placeName = useSelector((state) => state.addPlace.placeName);
  
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [place, setPlace] = React.useState("+ 장소를 검색해주세요");

  React.useEffect(() => {}, [placeName]);

  return (
    <div>
      <ADDPlace onClick={handleOpen}>{placeName ? placeName : place}</ADDPlace>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modalbox>
          <div>
            <Header>
              <div>장소선택</div>
              <div
                onClick={() => {
                  setOpen(false);
                }}
              >
                <svg
                  style={{ cursor: "pointer", display: "block" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="black"
                    fillOpacity="0.87"
                  />
                </svg>
              </div>
            </Header>
            <SearchMap />
            <AddButton
              onClick={() => {
                setOpen(false);
                setPlace(placeName);
              }}
            >
              장소추가
            </AddButton>
          </div>
        </Modalbox>
      </Modal>
    </div>
  );
}

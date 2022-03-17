import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchMap from "./SearchMap"
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "350px",
  height: "800px",
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 3,
};

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0px auto;
  width: 100%;
  height: 45px;
  background-color: #4E49E2;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  border-radius: 8px;
`

const ADDPlace = styled.div`
  color: #BDBDBD;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
`

export default function SearhModal() {
  const placeName = useSelector((state) => state.addPlace.placeName);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      {placeName === "" ? <ADDPlace onClick={handleOpen}>+ 장소를 검색해주세요</ADDPlace> :
        <ADDPlace onClick={handleOpen}>최근 검색: {placeName}</ADDPlace>}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <SearchMap />
            <AddButton
              onClick={() => {
                setOpen(false)
              }}
            >장소추가</AddButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
}


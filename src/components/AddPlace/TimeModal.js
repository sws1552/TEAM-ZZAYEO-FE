import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from "styled-components";
import Timedropdown from "./Timedropdown"


const BasicModal =()=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <TimeButton onClick={handleOpen}>+시간을 선택해주세요</TimeButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Timedropdown />
                </Box>

            </Modal>

        </div>
    );
}

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    height: "100px",
    bgcolor: 'background.paper',
    border: "none",
    boxShadow: 24,
    p: 4,
    borderRadius:"8px"
};

const TimeButton = styled.div`
color: gray ;
font-size: 13px ;
`

export default BasicModal
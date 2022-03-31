import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from 'styled-components';
import {actionCreators as commentActions} from '../../redux/modules/comment';
import {useDispatch} from "react-redux";

const options = [
  '수정하기',
  '삭제하기',
];

const ITEM_HEIGHT = 48;

export default function ReplyMenu(props) {

    const {planId, commentId, replyId, hide} = props;

  const dispatch = useDispatch();

  const itemClick = (e) => {

    if(e.target.id === "수정하기"){

        hide();        

    }else {

      if(window.confirm("정말로 삭제하시겠습니까?")){
        dispatch(commentActions.deleteReplyFB(planId, replyId));

      }else {
        return;
      }

    }
    
    handleClose();

  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id='ReplyCon' style={{position:"absolute", right: "0"}}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10.5ch',
          },
        }}

        style={{
            left: '-50px',
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} id={option} onClick={itemClick}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

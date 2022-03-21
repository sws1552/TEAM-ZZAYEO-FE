import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { actionCreators as planActions } from "../../redux/modules/plan";
import styled from 'styled-components';
import { history } from "../../redux/ConfigureStore";
import EditContents from "../AddPlan/EditContents";

const options = [
  '삭제하기',
  '수정하기'
];

const ITEM_HEIGHT = 48;

export default function MyEditPost(props) {
  const planId = props.planId;

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(event) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
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
          left: '-20px',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={(e) => {
              handleClose();
              if (option === "삭제하기") {
                dispatch(planActions.deleteMyPlanDB(planId));
              } 
              if(option === "수정하기") {
                e.stopPropagation();
                dispatch(planActions.createPlan(planId));
                history.push("/editplan");
              }
            }}
          >
           <div>{option}</div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}


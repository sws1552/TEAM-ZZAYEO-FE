import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { actionCreators as chatActions } from "../../redux/modules/chat";
import { useDispatch } from "react-redux";

const options = ["채팅방 나가기"];

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {

  const {chatRoomId} = props;

  const dispatch = useDispatch();


  const itemClick = (e) => {

    if (e.target.id === "채팅방 나가기") {

      // if (window.confirm("정말로 삭제하시겠습니까?")) {
      //   console.log("삭제 ㄱㄱ");
      // } else {
      //   console.log("return");
      //   return;
      // }
      console.log('chatRoomId !! ',chatRoomId);
      console.log('채팅방나가기 !! ');
      dispatch(chatActions.deleteChatRoomFB(chatRoomId));

    } 

    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{margin: "20px 0"}}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
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
            width: "14ch",
          },
        }}
        style={{
          left: "-70px",
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

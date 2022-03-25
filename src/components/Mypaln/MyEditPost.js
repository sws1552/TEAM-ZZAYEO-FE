// import * as React from "react";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { useDispatch } from "react-redux";
// import { actionCreators as planActions } from "../../redux/modules/plan";
// import styled from 'styled-components';
// import { history } from "../../redux/ConfigureStore";
// import EditContents from "../AddPlan/EditContents";

// const options = [
//   '삭제하기',
//   '수정하기'
// ];

// const ITEM_HEIGHT = 48;

// export default function MyEditPost(props) {
//   const planId = props.planId;

//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "flex-end" }}>
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? "long-menu" : undefined}
//         aria-expanded={open ? "true" : undefined}
//         aria-haspopup="true"
//         onClick={(event) => {
//           event.stopPropagation();
//           setAnchorEl(event.currentTarget);
//         }}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           "aria-labelledby": "long-button",
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           style: {
//             maxHeight: ITEM_HEIGHT * 4.5,
//             width: '10.5ch',
//           },
//         }}
//         style={{
//           left: '-20px',
//         }}
//       >
//         {options.map((option) => (
//           <MenuItem
//             key={option}
//             onClick={(e) => {
//               handleClose();
//               if (option === "삭제하기") {
//                 dispatch(planActions.deleteMyPlanDB(planId));
//               } 
//               if(option === "수정하기") {
//                 e.stopPropagation();
//                 history.push(`/writeplan/${planId}`);
//                 // dispatch(planActions.createPlan(planId));
//                 // history.push("/editplan");
//               }
//             }}
//           >
//            <div>{option}</div>
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from 'react-redux';
import { actionCreators as planActions } from "../../redux/modules/plan";
import { history } from "../../redux/ConfigureStore";

const MyEditPost = (props) => {
  const planId = props.planId;

  const dispatch = useDispatch();

  const itemClick = (e) => {

    if (e.target.id === "삭제하기") {
      dispatch(planActions.deleteMyPlanDB(planId));
    } else {
      e.stopPropagation();
      history.push(`/writeplan/${planId}`);
    }
    showHide();

  }

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const showHide = () => setIsActive(!isActive);

  useEffect(() => {

    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isActive]);

  const options = [
    '삭제하기',
    '수정하기'
  ];

  return (
    <Container>
      <MoreVertIcon style={{ color: "white" }} onClick={(e) => {
        e.stopPropagation()
        showHide()
      }} className="menu-trigger" />
      <nav className={`menu ${isActive ? 'active5' : 'inactive'}`}>
        <ul>
          {options.map((option) => {
            return (
              <li key={option} id={option} onClick={itemClick}>
                {option}
              </li>
            )
          })}
        </ul>
      </nav>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  z-index: 1;

  .menu {
    background: #ffffff;
    border-radius: 8px;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  .menu.active5 {
    opacity: 1;
    visibility: visible;
    transform: translateY(-30px);
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu li {
    border-bottom: 1px solid #dddddd;
    text-decoration: none;
    color: #333333;
    padding: 5px;
    display: block;
    text-align: center;
    cursor: pointer;
  }

  .menu li:hover {
    background-color: #EEEEEE;
  }
  
  .menu-trigger {
    /* border-radius: 90px; */
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    border: none;
    vertical-align: middle;
    color: #616161;
  }

  .menu-trigger:hover {
    color: black;
  }

`;



export default MyEditPost;
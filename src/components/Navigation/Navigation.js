import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import { history } from "../../redux/ConfigureStore";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: 420, height: 60 }}
      value={value}
      onChange={handleChange}
      style={{ position: "absolute", bottom: 0, borderRadius: "10px" }}
    >
      <BottomNavigationAction
        onClick={() => {
          history.push("/");
        }}
        label="홈"
        value="recents"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        onClick={() => {
          history.push("/myplan");
        }}
        label="나의여행"
        value="favorites"
        icon={<CropSquareIcon />}
      />
      <BottomNavigationAction
        onClick={() => history.push("/chatlist")}
        label="메세지"
        value="nearby"
        icon={<ChatIcon />}
      />
      <BottomNavigationAction
        onClick={() => {
          history.push("/login");
        }}
        label="마이피드"
        value="folder"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}

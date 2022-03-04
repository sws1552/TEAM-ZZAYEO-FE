import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        onClick={() => {
          history.push("/writeplan");
        }}
        label="나의여행"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        onClick={() => history.push("/chatlist")}
        label="메세지"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        onClick={() => {
          history.push("/login");
        }}
        label="마이피드"
        value="folder"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}

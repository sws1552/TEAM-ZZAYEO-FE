import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../../../redux/modules/map";

const Polyline = ({ maps, map, markers }) => {
  const dispatch = useDispatch();
  const polyLinedata = useSelector((state) => state.map.polyline);

  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 1.5,
  };

  let createPolyline = new maps.Polyline({
    path: markers,
    geodesic: true,
    strokeColor: "#757575",
    strokeOpacity: 0,
    icons: [
      {
        icon: lineSymbol,
        offset: "0",
        repeat: "7px",
      },
    ],
    strokeWeight: 2,
  });

  useEffect(() => {
    dispatch(mapActions.addPolyline(createPolyline));

    if (polyLinedata !== null) {
      polyLinedata.setMap(null);
    }

    createPolyline.setMap(map);
  }, [markers, map, maps]);

  return null;
};

export default Polyline;

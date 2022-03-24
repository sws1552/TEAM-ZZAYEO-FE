import React, { useState, useCallback } from "react";

const Fitbound = ({markers, map, maps}) => {
  
    React.useEffect(() => {
    
        if (markers.length !== 0) {
          handleOnPlacesChanged()
        }
    
      }, [markers]);
    
      //gemotry가 바뀔때 useCallback 실행시키기 deps 값이 변할때만 실행됨!
      const handleOnPlacesChanged = useCallback(() => {
    
        const bounds = new maps.LatLngBounds();
    
        markers.map(item => {
          bounds.extend(item);
        });
    
        if (bounds) {
          map.fitBounds(bounds);
          // if (bounds?.Sa?.h === bounds?.Sa?.j) {
          //   map.setZoom(17)
          // }
        } else {
          map.setCenter(new maps.LatLng(markers[markers.length - 1].lat, markers[markers.length - 1].lng))
          map.setZoom(17)
        }
      }, [markers])

    return null
};

export default Fitbound;
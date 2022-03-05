import React from 'react';


const Polyline = ({ maps, map, markers }) => {

  const geodesicPolyline = new maps.Polyline({
    path: markers,
    geodesic: true,
    strokeColor: '#00a1e1',
    strokeOpacity: 1.0,
    strokeWeight: 4
  })
  geodesicPolyline.setMap(map)

  const nonGeodesicPolyline = new maps.Polyline({
    path: markers,
    geodesic: false,
    strokeColor: 'red',
    strokeOpacity: 0.8,
    strokeWeight: 2
  })
  nonGeodesicPolyline.setMap(map)
  return (
    null
  );
};

export default Polyline;
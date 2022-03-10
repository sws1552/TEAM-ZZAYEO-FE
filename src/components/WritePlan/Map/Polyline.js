import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../../../redux/modules/map";

const Polyline = ({ maps, map, markers }) => {

  const dispatch = useDispatch()
  const myPlan = useSelector((state) => state.plan.myPlan);
  const dayId = useSelector((state) => state.map.dayId);// dayId를 넘겨서 같은 dayI인지 비교하려고!
  const dayPlace_list = [] //각 day를 배열로 묶어서 places를 전달, day별로 place값을 뿌려주기만하면됨
  myPlan?.days?.forEach((doc) => {
    dayPlace_list.push(doc);
  });

  React.useEffect(() => {
    PloyLineChanged(maps, map, markers)
  }, [maps, map, markers]);

  const PloyLineChanged = useCallback(() => {

    let line = []
    let PolyLine = []

    markers.map((v, i) => {
      return (
        line.push(new maps.LatLng(v.lat, v.lng))
      )
    })
    console.log(line)
   
    for (let i = 0; i < myPlan.days.length; i++) {
      PolyLine.push({ dayId: myPlan.days[i].dayId })
    }
   
    let createPolyline = new maps.Polyline({
      path: line,
      geodesic: true,
      strokeColor: 'green',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    let deletePolyline = new maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: 'blue',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })
    console.log(createPolyline)
    console.log(deletePolyline)

    PolyLine.map((v, i) => {
      if (v.dayId === dayId) {  
        createPolyline.setMap(map)
        createPolyline.setVisible(true)
 
      } else {
        deletePolyline.setMap(null)
        deletePolyline.setVisible(false)
      }
      
    })
   

  }, [maps, map, markers])

  // const geodesicPolylines = PolyLine.map((v, i) => {
  //   return (
  //     i = new maps.Polyline({
  //       path: line,
  //       geodesic: true,
  //       strokeColor: 'blue',
  //       strokeOpacity: 1.0,
  //       strokeWeight: 2
  //     })
  //   )
  // })

  // PolyLine.map((v, i) => {
  //   if (v.dayId === dayId) {
  //     console.log(v.dayId)
  //     console.log(i)
  //     geodesicPolylines[i].setMap(map)
  //     geodesicPolylines[i].setVisible(true)
  //   } else {
  //     geodesicPolylines[i].setVisible(false)
  //     geodesicPolylines[i].setMap(null)
  //   }
  // })

  // let geodesicPolyline = new maps.Polyline({
  //   path: line,
  //   geodesic: true,
  //   strokeColor: 'red',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2
  // })

  // console.log(line)

  //   let PolyLine = []

  // for (let i = 0; i < myPlan.days.length; i++) {
  //   PolyLine.push({ dayId: myPlan.days[i].dayId })
  // }


  // PolyLine.map((v, i) => {
  //   if (v.dayId === dayId) {
  //     var line = geodesicPolylines && geodesicPolylines[i]?.latLngs?.Ed[0]
  //     geodesicPolylines[i].setMap(map)
  //     geodesicPolylines[i].setVisible(true)
  //     return (
  //       markers.map((v, i) => {
  //         return (
  //           line.push(new maps.LatLng(v.lat, v.lng))
  //         )
  //       })
  //     )
  //   } else {
  //     geodesicPolylines[i].setVisible(false)
  //     geodesicPolylines[i].setMap(null)

  //   const geodesicPolylines = PolyLine.map((v,i)=>{
  //     return(
  //       i =  new maps.Polyline({
  //         path: [],
  //         geodesic: true,
  //         strokeColor: 'blue',
  //         strokeOpacity: 1.0,
  //         strokeWeight: 2
  //       })
  //     )
  //   })
  //  console.log(geodesicPolylines)



  //   })
  //   React.useEffect(() => {

  //   }, [PolyLine, geodesicPolylines]);
  // const nonGeodesicPolyline = new maps.Polyline({
  //   path: 
  //   geodesic: false,
  //   strokeColor: 'red',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2
  // })

  // nonGeodesicPolyline.setMap(map)

  return (
    null
  );
};

export default Polyline;
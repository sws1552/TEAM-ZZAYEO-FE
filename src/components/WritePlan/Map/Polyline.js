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

  const EachDayPlaces = dayPlace_list.filter((v) => v.dayId === dayId)

 
  var line = []
  markers.map((v, i) => {
    return (
      line.push(new maps.LatLng(v.lat, v.lng))
    )
  })

  let geodesicPolyline = new maps.Polyline({
    path: line,
    geodesic: true,
    strokeColor: 'red',
    strokeOpacity: 1.0,
    strokeWeight: 2
  })


  
  
  // var PolyLine = []

  // for (let i = 0; i < myPlan.days.length; i++) {
  //   PolyLine.push({ dayId: myPlan.days[i].dayId})
  // }

  // const geodesicPolylines = PolyLine.map((v,i)=>{
  //   return(
  //     i =  new maps.Polyline({
  //       path: [],
  //       geodesic: true,
  //       strokeColor: 'red',
  //       strokeOpacity: 1.0,
  //       strokeWeight: 2
  //     })
  //   )
  // })
  // console.log(geodesicPolylines)
 
  // PolyLine.map((v, i) => {
  //   if (v.dayId === dayId) {
  //     var line = geodesicPolylines[i].latLngs.Ed[0]
  //     geodesicPolylines[i].setMap(map)
  //     // geodesicPolylines[i].setVisible(true)
  //     return (
  //       markers.map((v, i) => {
  //         return (
  //           line.push(new maps.LatLng(v.lat, v.lng))
  //         )
  //       })
  //      )
  //   } else {
  //     // geodesicPolylines[i].setVisible(false)
  //     geodesicPolylines[i].setMap(null)
  //   }     
  // })




  // React.useEffect(() => {

  // }, []);

  // const handlegeodesicPolyline = useCallback(() => {
  //   // 
  // }, [markers, map, maps]);

  // const nonGeodesicPolyline = new maps.Polyline({
  //   path: 
  //   geodesic: false,
  //   strokeColor: 'red',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2
  // })

  // nonGeodesicPolyline.setMap(map)
  const add = () => {
    geodesicPolyline.setMap(map)
    console.log(geodesicPolyline)
 
  }
  const adddelete =  () => {
    geodesicPolyline.setMap(null)
    console.log(geodesicPolyline)
    // geodesicPolyline.setVisible(false)
  }


  return (
    <>
    <button onClick={()=>{
        add()
    }}>라인생기기</button>
    <button onClick={()=>{
        adddelete()
    }}>라인지우기</button>
    </>
  );
};

export default Polyline;
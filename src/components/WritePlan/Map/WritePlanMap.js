import React, { useState, useCallback } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import Polyline from "./Polyline";
import Fitbound from "./Fitbound";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as planActions } from "../../../redux/modules/plan";

const WritePlanMap = (props) => {
  const myPlan = props;
  const dispatch = useDispatch();

  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);

  let zoom = 10;

  const dayId = useSelector((state) => state.map.dayId); // dayId를 넘겨서 같은 dayI인지 비교하려고!
  const [center, setCenter] = useState({ lat: 37.5, lng: 127 });

  const dayPlace_list = []; //각 day를 배열로 묶어서 places를 전달, day별로 place값을 뿌려주기만하면됨
  myPlan?.days?.forEach((doc) => {
    dayPlace_list.push(doc);
  });

  const EachDayPlaces = dayPlace_list.filter((v) => v.dayId === dayId);

  //Markers
  const Markers = [];

  EachDayPlaces[0]?.places?.filter((v, i) => {
    return Markers.push({ lat: v.lat, lng: v.lng });
  });

  const handleApiloaded = (map, maps) => {
    if (map && maps) {
      setApiReady(true);
      setMap(map);
      setGooglemaps(maps);
    }
  };

  return (
    <Container>
      <div style={{ height: "220px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyD688QW0Av06YgBIC_XFCTwxAbiNDMsMQA",
            libraries: "places",
            //GoogleMap로드시 라이브러리로 places를 추가
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          // 맵의 줌 레벨을 제어하는 버튼인 "+/-" 슬라이더
          yesIWantToUseGoogleMapApiInternals
          // 구글맵 api의 internals(내부)를 사용한다.
          onGoogleApiLoaded={({ map, maps }) => {
            handleApiloaded(map, maps);
          }}
        >
          {EachDayPlaces &&
            EachDayPlaces[0]?.places?.length !== 0 &&
            EachDayPlaces[0]?.places?.map((place, index) => {
              return (
                <Marker
                  key={place.id}
                  Num={index}
                  text={place.placeName}
                  lat={place.lat}
                  lng={place.lng}
                />
              );
            })}

          {apiReady && googlemaps && (
            <Polyline markers={Markers} map={map} maps={googlemaps} />
          )}

          {Markers.length !== 0 && apiReady && googlemaps && (
           <Fitbound markers={Markers} map={map} maps={googlemaps} />
          )}
        </GoogleMapReact>
      </div>
    </Container>
  );
};

export default WritePlanMap;

const Container = styled.div`
  width: 100%;
  height: 220px;
  box-sizing: border-box;
`;

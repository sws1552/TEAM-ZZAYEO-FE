import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import Maker from "./Maker"
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../../../redux/modules/map";

const WritePlanMap = () => {
  const dispatch = useDispatch();
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null)
  const [googlemaps, setGooglemaps] = useState(null)
  const [center, setCenter] = useState({ lat: 37.5, lng: 127 })
  let zoom = 10;

  const [places, setPlaces] = useState([]);
  const [target, setTarget] = useState(null);
  
  // React.useEffect(() => {
  //   dispatch(mapActions.searchLocation(places))
  //   dispatch(mapActions.loadLocation(places))
  // }, [places]);

  // const searchList = useSelector((state) => state.map.list); 
  // console.log(searchList)

  if (window.screen.width >= 768) {
    zoom = 15
  }

  //serchBar
  const handleApiloaded = (map, maps) => {
    if (map && maps) {
      setApiReady(true);
      setMap(map);
      setGooglemaps(maps)
    }
  }

  //장소찾기
  const addPlace = (places) => {
    if (places) {
      setPlaces(places);
    }
  }

  //마커찍기
  const markerClicked = (key) => {
    setTarget(key);
  }

  return (
    <Container>
      {/* SearchBox 구현을 위해서는 지도객체인 map, api요소가 있는 maps를 프로퍼티로 보내야한다. */}
      {apiReady && googlemaps && (
        <SearchBar
          map={map}
          mapApi={googlemaps}
          addPlace={addPlace}
        />)}

      <div style={{ height: '345px', width: '100%', margin: "auto" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyD688QW0Av06YgBIC_XFCTwxAbiNDMsMQA',
            libraries: "places"
            //GoogleMap로드시 라이브러리로 places를 추가
          }}

          defaultCenter={center}
          defaultZoom={zoom}
          // 맵의 줌 레벨을 제어하는 버튼인 "+/-" 슬라이더
          yesIWantToUseGoogleMapApiInternals
          // 구글맵 api의 internals(내부)를 사용한다.

          onChildClick={markerClicked}
          onGoogleApiLoaded={({ map, maps }) => handleApiloaded(map, maps)}
        // 위치를 렌더해주는 함수
        >
          {places.length !== 0 && places.map((place) => (
            <Maker
              key={place.id}
              text={place.name}
              lat={place.geometry.location.lat()}
              lng={place.geometry.location.lng()}
              target={place.place_id === target}
              place={place}
            />
          ))}

        </GoogleMapReact>
      </div>
    </Container>
  );
};

export default WritePlanMap;

const Container = styled.div`
width: 100%;
height: 400px;
box-sizing: border-box;
border: 5px solid green;
margin: auto;
`
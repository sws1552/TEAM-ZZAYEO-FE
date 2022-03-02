import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import Maker from "./Maker"
import SearchBar from './SearchBar';

const WritePlanMap = () => {
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null)
  const [googlemaps, setGooglemaps] = useState(null)
  const [center, setCenter] = useState({ lat: 37.5, lng: 127 })
  let zoom = 10;

  const [places, setPlaces] = useState([]);
  const [target, setTarget] = useState(null);


  if (window.screen.width >= 768) {
    zoom = 15
  }

  //serchBar
  const handleApiloaded = (map, maps) => {
    console.log(maps)
    if (map && maps) {
      console.log(map, maps)
      setApiReady(true);
      setMap(map);
      setGooglemaps(maps)
    }
  }

  const addPlace = (places) => {
    if (places) {
      setPlaces(places);
    }
  }
  console.log(places)

  const markerClicked = (key) => {
    setTarget(key);
  }
  return (
    <Container>
      <div style={{ height: "50vh" }}>

        {/* SearchBox 구현을 위해서는 지도객체인 map, api요소가 있는 maps를 프로퍼티로 보내야한다. */}
        {apiReady && googlemaps && (
          <SearchBar
            map={map}
            mapApi={googlemaps}
            addPlace={addPlace}
          />)}

        <div style={{ height: '345px', width: '100%', margin: "auto"}}>
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
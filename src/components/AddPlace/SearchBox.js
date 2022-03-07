import React, { useCallback, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { positions } from "@mui/system";
// import { history } from "../../../redux/ConfigureStore";


const SearchBox = ({ mapApi, map, addPlace }) => {
   
    const dayId = useSelector((state) => state.map.dayId);
    const image = useSelector((state) => state.image.preview);

    const dispatch = useDispatch();
    const input = useRef(null);
    const searchBox = useRef(null);
    

    //useCallback 계산된 값을 자료구조에 저장하고 이후 같은 계산을 반복하지 않고 자료구조에서 꺼내 재사용하는 것, 상태값이 변경된 경우에만 다시 생성된다.
    const handleOnPlacesChanged = useCallback(() => {
        const selected = searchBox.current.getPlaces();
        
        const { 0: place } = selected
     
        addPlace(selected)
        console.log(selected)   
        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport)
        } else {
        map.setCenter(place.geometry.location)
        map.setZoom(17)
    }
        
        // 
    }, [searchBox]);
  
   
    useEffect(() => {
        if (!searchBox.current && mapApi) {
            searchBox.current = new mapApi.places.SearchBox(input.current);
            //SearchBox에서 장소선택시 이벤트 발생
            searchBox.current.addListener("places_changed", handleOnPlacesChanged);
            //SearchBox 결과가 map화면에 보여지며 해당 위치로 viewport 이동
            searchBox.current.bindTo('bounds', map)
        }

      return () => {
        if (mapApi) {
          searchBox.current = null;
          mapApi.event.clearInstanceListeners(searchBox);
        }
      };
    }, [map,mapApi, handleOnPlacesChanged]);
  
    return (
        <>
        <ElInput ref={input} placeholder="장소찾기" type="text" />
        </>
    )
  };
  
const ElInput = styled.input`
    border: none;
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    :focus {
        outline:none;
        }
    `;
 
  
  export default SearchBox;

import React, { useCallback, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { positions } from "@mui/system";
// import { history } from "../../../redux/ConfigureStore";
import "./SearchBox.css"
import { actionCreators as addPlaceActions } from "../../../redux/modules/addPlace";
import { id } from "date-fns/locale";

const SearchBox = ({ mapApi, map, addPlace }) => {



  const dispatch = useDispatch();
  const input = useRef(null);
  const searchBox = useRef(null);

  //useCallback 계산된 값을 자료구조에 저장하고 이후 같은 계산을 반복하지 않고 자료구조에서 꺼내 재사용하는 것, 상태값이 변경된 경우에만 다시 생성된다.
  const handleOnPlacesChanged = useCallback(() => {
    const selected = searchBox.current.getPlaces();
    if(selected.length === 1) {
      const { 0: place } = selected
      addPlace(selected)
      dispatch(addPlaceActions.addlocation(selected))
  
      if (!place.geometry) return;
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location)
        map.setZoom(17)
      }
    } else {
      alert("한곳의 장소만 검색해주세요.")
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
  }, [map, mapApi, handleOnPlacesChanged]);

  return (
    <div>
      <ElInput ref={input} className="pac-container" placeholder="장소를 검색해주세요" type="text" />
    </div>
  )
};

const ElInput = styled.input`
    border: none;
    box-sizing: border-box;
    max-width:312px;
    width: 100%;
    height: 40px;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 22px;
    margin-top: 60px;
    padding: 0px 19px;
    display: flex;
    align-items: center;
    :focus {
        outline:none;
        caret-color: gray;
        }
   
    ::placeholder {
      font-size: 14px;
      font-weight: 400;
    }


    `;



export default SearchBox;

import React, { useCallback, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { actionCreators as mapActions } from "../../../redux/modules/map";
import { useDispatch } from "react-redux";

const SearchBox = ({ mapApi, map, addPlace }) => {
    const dispatch = useDispatch();
    const input = useRef(null);
    const searchBox = useRef(null);
    const [Addmap, setAddmap] = useState(null)
  
    //useCallback 계산된 값을 자료구조에 저장하고 이후 같은 계산을 반복하지 않고 자료구조에서 꺼내 재사용하는 것, 상태값이 변경된 경우에만 다시 생성된다.
    const handleOnPlacesChanged = useCallback(() => {
        const selected = searchBox.current.getPlaces();
        
        const { 0: place } = selected
     
        addPlace(selected)
        setAddmap(selected)
        
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
        <button onClick={()=>{
            addPlace([])
            dispatch(mapActions.searchLocation(Addmap))
        }}>장소추가</button>
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
// class SearchBox extends React.Component {
    
//     render() {
        
//         return (
//             <ElInput
//                 id="pac-input"
//                 className='controls'
//                 type="text"
//                 placeholder='장소검색'
//                 ref={(ref) => this.input = ref}></ElInput>

//         )
//     }

//     //장소를 place라 선언 후 place의 위치를 기준으로 지도의 viewport와 중심을 변경
//     onPlacesChanged = ({ map, mapApi, addPlace } = this.props) => {
//         const selected = this.SearchBox.getPlaces();
//         // console.log(selected) 장소정보 다있음 굿
//         const { 0: place } = selected;
//         //maker addPlace의 app.js const addPlace 인수로 selected를 넘겨줌
//         addPlace(selected)

//         if (!place.geometry) return;
//         if (place.geometry.viewport) {
//             map.fitBounds(place.geometry.viewport)
//         } else {
//             map.setCenter(place.geometry.location)
//             map.setZoom(17)
//         }
//     }


//     componentDidMount({ map, mapApi } = this.props) {
//         this.SearchBox = new mapApi.places.SearchBox(this.input)

//         //SearchBox에서 장소선택시 이벤트 발생
//         this.SearchBox.addListener("places_changed", this.onPlacesChanged);

//         //SearchBox 결과가 map화면에 보여지며 해당 위치로 viewport 이동
//         this.SearchBox.bindTo('bounds', map)
//     }
// }


// const ElInput = styled.input`
//   border: none;
//   width: 100%;
//   height: 45px;
//   box-sizing: border-box;
//   :focus {
//       outline:none;
//       }
// `;
// export default SearchBox
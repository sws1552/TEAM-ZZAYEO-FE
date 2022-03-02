import React from 'react'
import styled from "styled-components";


class SearchBox extends React.Component {

    render() {
        return (
            <ElInput
                id="pac-input"
                className='controls'
                type="text"
                placeholder='장소검색'
                ref={(ref) => this.input = ref}></ElInput>

        )
    }

    //장소를 place라 선언 후 place의 위치를 기준으로 지도의 viewport와 중심을 변경
    onPlacesChanged = ({ map, mapApi, addPlace } = this.props) => {
        const selected = this.SearchBox.getPlaces();
        // console.log(selected) 장소정보 다있음 굿
        const { 0: place } = selected;
        //maker addPlace의 app.js const addPlace 인수로 selected를 넘겨줌
        addPlace(selected)

        if (!place.geometry) return;
        console.log(place.geometry)
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport)
        } else {
            map.setCenter(place.geometry.location)
            map.setZoom(17)
        }
    }


    componentDidMount({ map, mapApi } = this.props) {
        this.SearchBox = new mapApi.places.SearchBox(this.input)

        //SearchBox에서 장소선택시 이벤트 발생
        this.SearchBox.addListener("places_changed", this.onPlacesChanged);
        //구글맵에서 제공하는 이벤트

        //SearchBox 결과가 map화면에 보여지며 해당 위치로 viewport 이동
        this.SearchBox.bindTo('bounds', map)
    }

}

const ElInput = styled.input`
  border: none;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  :focus {
      outline:none;
      }
`;
export default SearchBox
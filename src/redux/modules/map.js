import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";

// actions
const LOADLOATION = "LOADLOATION";
const SEARCHLOATION = "SEARCHLOATION";
const SENDDAYID = "SENDDAYID"

// action creators
const loadLocation = createAction(LOADLOATION, (dayId, places, day) => ({ dayId, places, day }));
const searchLocation = createAction(SEARCHLOATION, (dayId, placeName, lat, lng, address, day) => ({ dayId, placeName, lat, lng, address, day }));
const sendDayId = createAction(SENDDAYID, (dayId, dayList, day) => ({ dayId, dayList, day }));
// initial state
const initialState = {
  list: [],
  dayId: "",
  dayList: [{
    dayId: "dayId1",
    dayNumber: 1,
    place: [{ placeName: "하이용", lat: 456, lng: 555, address: "강서구" },
    { placeName: "하이용", lat: 456, lng: 555, address: "강서구" },
    { placeName: "하이용", lat: 456, lng: 555, address: "강서구" }]
  }]
};

//middleware

export const loadLocationDB = (dayId, places) => {
  return (dispatch, getState, { history }) => {
    const day = getState().map.dayList
    dispatch(loadLocation(dayId, places, day));

  }
}

export const searchLocationDB = (dayId, place) => {

  return (dispatch, getState, { history }) => {

    // const places = getState().map.list;
    // let list = []
    // places.forEach((doc)=>{

    //   list.push(doc.dayId)
    // })
    // console.log(list)
    const day = getState().map.dayList

    const placeName = place[0].name
    const lat = place[0].geometry.location.lat()
    const lng = place[0].geometry.location.lng()
    const address = place[0].formatted_address
    dispatch(searchLocation(dayId, placeName, lat, lng, address, day))

  }
}
// reducer

export default handleActions(
  {
    [LOADLOATION]: (state, action) =>
      produce(state, (draft) => {

      }),
    [SEARCHLOATION]: (state, action) =>
      produce(state, (draft) => {
        // const place = action.payload.places
        const placeName = action.payload.placeName
        const lat = action.payload.lat
        const lng = action.payload.lng
        const address = action.payload.address
        const dayId = action.payload.dayId
        // const day = action.payload.day
        const day = state.dayList.find(e => e.dayId === dayId)
        console.log(day.place.push({ placeName, lat, lng, address }))
        //
        // e.places.push({placeName, lat, lng, address})
        draft.list.push({ placeName, lat, lng, address })
        // draft.list.push({places: [{placeName, lat, lng, address}] })
        // draft.list.push({placeName,lat,lng,address})
      }),
    [SENDDAYID]: (state, action) =>
      produce(state, (draft) => {

        draft.dayId = action.payload.dayId
        // draft.dayList = action.payload.dayList
      }),
  },
  initialState
);

const actionCreators = {
  loadLocation,
  loadLocationDB,
  searchLocation,
  searchLocationDB,
  sendDayId
};

export { actionCreators };
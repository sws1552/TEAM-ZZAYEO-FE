import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";

// actions

const LOCATION = "LOCATION"
const ADDTIME = "ADDTIME"
const EDITPLACE = "EDITPLACE"
const INITIALPLACE = "INITIALPLACE"
// action creators
const addlocation = createAction(LOCATION, (place) => ({ place }));
const addhour = createAction(ADDTIME, (hour) => ({ hour }));
const editplace = createAction(EDITPLACE, (place) => ({ place }));
const initialplace = createAction(INITIALPLACE, () => ({}));
// initial state
const initialState = {
  placeName: "",
  lat: 0,
  lng: 0,
  address: "",
  ampm: "",
  hour: "",
  minute: "",
  geometry: "",
};

//middleware

// reducer

export default handleActions(
  {
    [LOCATION]: (state, action) =>
      produce(state, (draft) => {
        const place = action.payload.place
        console.log(place)
        const placeName = place[0].name
        const lat = place[0].geometry.location.lat()
        const lng = place[0].geometry.location.lng()
        const address = place[0].formatted_address

        draft.placeName = placeName
        draft.lat = lat
        draft.lng = lng
        draft.address = address

      }),

    [ADDTIME]: (state, action) =>
      produce(state, (draft) => {
        draft.hour = action.payload.hour
      }),
    [EDITPLACE]: (state, action) =>
      produce(state, (draft) => {
        const place = action.payload.place
        draft.placeName = place.placeName
        draft.lat = place.lat
        draft.lng = place.lng
        draft.address = place.address
      }),
    [INITIALPLACE]: (state, action) =>
      produce(state, (draft) => {
        console.log("바이")
        draft.placeName = ""
        draft.lat = 0
        draft.lng = 0
        draft.address = ""
      }),
  },
  initialState
);

const actionCreators = {
  addlocation,
  editplace,
  initialplace

};

export { actionCreators };
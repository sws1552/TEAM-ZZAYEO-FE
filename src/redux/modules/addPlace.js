import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";

// actions

const LOCATION = "LOCATION"
const IMAGEURL = "IMAGEURL"
const ADDTIME = "ADDTIME"

// action creators
const addlocation = createAction(LOCATION, (place) => ({ place }));
const imageURL = createAction(IMAGEURL, (imageURL) => ({ imageURL }));
const addhour = createAction(ADDTIME, (hour) => ({ hour }));


// initial state
const initialState = {
  placeName: "",
  lat: 0,
  lng: 0,
  address: "",
  imageURL: [],
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
        draft.geometry = place[0].geometry

      }),
    [IMAGEURL]: (state, action) =>
      produce(state, (draft) => {
        draft.imageURL = action.payload.imageURL
      }),
    [ADDTIME]: (state, action) =>
      produce(state, (draft) => {
        draft.hour = action.payload.hour
      }),
   
  },
  initialState
);

const actionCreators = {
  addlocation,
  imageURL,
};

export { actionCreators };
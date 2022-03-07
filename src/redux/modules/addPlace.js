import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";

// actions

const LOCATION = "LOCATION"

// action creators
const addlocation = createAction(LOCATION, (place) => ({ place }));
// initial state
const initialState = {
  places:[]
};

//middleware

// reducer

export default handleActions(
  {
    [LOCATION]: (state, action) =>
      produce(state, (draft) => {
          const place = action.payload.place
   
          const placeName = place[0].name
          const lat = place[0].geometry.location.lat()
          const lng = place[0].geometry.location.lng()
          const address = place[0].formatted_address
          console.log(placeName,lat,lng,address)
          draft.places.push(placeName,lat,lng,address)
      }),
  },
  initialState
);

const actionCreators = {
    addlocation,
};

export { actionCreators };
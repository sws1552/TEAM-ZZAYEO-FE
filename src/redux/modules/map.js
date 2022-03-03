import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions
const LOADLOATION = "LOADLOATION";
const SEARCHLOATION = "SEARCHLOATION";

// action creators
const loadLocation = createAction(LOADLOATION, (places) => ({ places }));
const searchLocation = createAction(SEARCHLOATION, (places) => ({ places }));

// initial state
const initialState = {
    list: []
};

// reducer
export default handleActions(
  {
    [LOADLOATION]: (state, action) =>
      produce(state, (draft) => {
        // const place = action.payload.places
        // const name = place[0].name
        // const lat = place[0].geometry.location.lat()
        // const lng = place[0].geometry.location.lng()
        // const address = place[0].formatted_address
        // draft.list = {name, lat, lng, address}
      }),
    [SEARCHLOATION]: (state, action) =>
      produce(state, (draft) => {
        const place = action.payload.places
        const name = place[0].name
        const lat = place[0].geometry.location.lat()
        const lng = place[0].geometry.location.lng()
        const address = place[0].formatted_address
        draft.list.push({name,lat,lng,address});
      }),
  },
  initialState
);

const actionCreators = {
    loadLocation,
    searchLocation
};

export { actionCreators };
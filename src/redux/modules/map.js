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
        // draft.list = action.payload.places
      }),
    [SEARCHLOATION]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.places)
        // draft.list.push(action.payload.places);
      }),
  },
  initialState
);

const actionCreators = {
    loadLocation,
    searchLocation
};

export { actionCreators };
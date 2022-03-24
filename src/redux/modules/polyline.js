import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";
import { Search } from "@mui/icons-material";

// actions
const ADDLOCATION = "ADDLOCATION";
const SEARCHERS = "SEARCHERS"
// action creators
const addlocation = createAction(ADDLOCATION, (location) => ({ location }));
const search = createAction(SEARCHERS, (query) => ({ query }));
// initial state
const initialState = {
  list: [],
  query: "",
};

//middleware

// reducer

export default handleActions(
  {
    [ADDLOCATION]: (state, action) =>
      produce(state, (draft) => {
        const polyline = action.payload.location
        let maker = []
        polyline.forEach((p) => { maker.push({ "lat": p.lat, "lng": p.lng }) })
        draft.list = maker
      }),
    [SEARCHERS]: (state, action) =>
      produce(state, (draft) => {
        draft.query = action.payload.query
      }),
  },
  initialState
);

const actionCreators = {
  addlocation,
  search
};

export { actionCreators };
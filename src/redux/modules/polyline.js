import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";

// actions
const ADDLOCATION = "ADDLOCATION";

// action creators
const addlocation = createAction(ADDLOCATION, (location) => ({ location }));

// initial state
const initialState = {
    list: []
};

//middleware


  

// reducer

export default handleActions(
  {
    [ADDLOCATION]: (state, action) =>
      produce(state, (draft) => {
        const polyline = action.payload.location
        let maker = []
        polyline.forEach((p)=>{maker.push({"lat":p.lat, "lng": p.lng})})
        draft.list = maker
      }),
  },
  initialState
);

const actionCreators = {
    addlocation
};

export { actionCreators };
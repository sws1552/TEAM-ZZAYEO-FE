import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";

// actions

const SENDDAYID = "SENDDAYID"
const POLYLINE = "POLYLINE"

// action creators
const sendDayId = createAction(SENDDAYID, (dayId) => ({ dayId }));
const addPolyline = createAction(POLYLINE, (polyline) => ({ polyline }));

// initial state
const initialState = {
  dayId: "",
  polyline: {}
};

//middleware

// reducer

export default handleActions(
  {
    [SENDDAYID]: (state, action) =>
      produce(state, (draft) => {
        draft.dayId = action.payload.dayId
      }),
    [POLYLINE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.polyline)
        draft.polyline = action.payload.polyline
      }),
  },
  initialState
);

const actionCreators = {
  sendDayId,
  addPolyline,
};

export { actionCreators };
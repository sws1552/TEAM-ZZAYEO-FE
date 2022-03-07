import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";

// actions

const SENDDAYID = "SENDDAYID"

// action creators
const sendDayId = createAction(SENDDAYID, (dayId, dayList, day) => ({ dayId, dayList, day }));
// initial state
const initialState = {
  list: [],
  dayId: "",
};

//middleware

// reducer

export default handleActions(
  {
    [SENDDAYID]: (state, action) =>
      produce(state, (draft) => {
        draft.dayId = action.payload.dayId
      }),
  },
  initialState
);

const actionCreators = {
  sendDayId
};

export { actionCreators };
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 액션타입
const GET_PLAN = "GET_PLAN";
const CREATE_PLAN = "CREATE_PLAN";

// 액션 생성 함수
const getPlan = createAction(GET_PLAN, (plans) => ({ plans }));
const createPlan = createAction(CREATE_PLAN, (plan) => ({ plan }));

// 초기 상태값
const initialState = {
  list: [],
  is_loaded: false,
};

// 미들웨어
const createPlanDB = (plan) => {
  //console.log(plan);
  return function (dispatch, getState, { history }) {
    dispatch(createPlan(plan));
  };
};

//리덕스
export default handleActions(
  {
    [GET_PLAN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.plans;
      }),

    [CREATE_PLAN]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.plan);
        draft.is_loaded = true;
      }),
  },
  initialState
);

const actionCreators = {
  getPlan,
  createPlan,
  createPlanDB,
};

export { actionCreators };

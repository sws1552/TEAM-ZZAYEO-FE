import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// 액션타입
const ADD_STYLE = "ADD_STYLE";
const ADD_DESTINATION = "ADD_DESTINATION";

// 액션 생성 함수
const addStyle = createAction(ADD_STYLE, (style) => ({ style }));
const addDestination = createAction(ADD_DESTINATION, (destination) => ({
  destination,
}));

// 초기 상태값
const initialState = {
  categorys: [],
  style: "",
  destination: "",
};

// 미들웨어
// const addCategoryDB = (category) => {
//   return function (dispatch, getState, { history }) {
//     const new_list = [];
//     new_list.push(category);
//     dispatch(addCategory(new_list));
//   };
// };

//리듀서
export default handleActions(
  {
    [ADD_STYLE]: (state, action) =>
      produce(state, (draft) => {
        draft.style = action.payload.style;
      }),
    [ADD_DESTINATION]: (state, action) =>
      produce(state, (draft) => {
        draft.destination = action.payload.destination;
      }),
  },
  initialState
);

const actionCreators = {
  addStyle,
  addDestination,
};

export { actionCreators };

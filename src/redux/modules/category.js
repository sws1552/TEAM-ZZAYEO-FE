import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// 액션타입
const ADD_CATEGORY = "ADD_CATEGORY";

// 액션 생성 함수
const addCategory = createAction(ADD_CATEGORY, (categorys) => ({ categorys }));

// 초기 상태값
const initialState = {
  categorys: [],
};

// 미들웨어
const addCategoryDB = (category) => {
  return function (dispatch, getState, { history }) {
    const new_list = [];
    new_list.push(category);
    dispatch(addCategory(new_list));
  };
};

//리듀서
export default handleActions(
  {
    [ADD_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        const new_list = [...state.categorys, action.payload.categorys];
        //기존 배열에 새롭게 추가
        return { categorys: new_list };
      }),
  },
  initialState
);

const actionCreators = {
  addCategory,
  addCategoryDB,
};

export { actionCreators };

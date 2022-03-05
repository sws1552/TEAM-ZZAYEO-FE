import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";


// const token = localStorage.getItem("is_login");

// 액션타입
const GET_PLAN = "GET_PLAN";
const CREATE_PLAN = "CREATE_PLAN";
const GET_DAYPLAN = "GET_DAYPLAN"
// 액션 생성 함수
const getPlan = createAction(GET_PLAN, (plans) => ({ plans }));
const createPlan = createAction(CREATE_PLAN, (plan) => ({ plan }));
const getdayPlan = createAction(GET_DAYPLAN, (dayList) => ({ dayList }));

// 초기 상태값
const initialState = {
  list: [],
  dayList: [],
  is_loaded: false,
};

// 미들웨어

//전체포스트 내용 받아오기
const getPlanDB = () => {
  return function (dispatch, getState, {history}) {
    // instance.get('/api/plans', {})
    // .then(function (response) {
    //   console.log(response)
        
    //     // dispatch(getPost(post_list))
    // })
    // .catch(function (error) { console.log(error) })
  }
}

//일정생성하기
const createPlanDB = (plan) => {
  return function (dispatch, getState, { history }) {
    // instance
    // .post('/api/plans', {
    //   title: plan.title,
    //   location: plan.location,
    //   startdate: plan.startdate,
    //   enddata: plan.enddate,
    //   category: plan.category,
    //   withlist: plan.withlist
    // },
    // // { headers: { Authorization: `Bearer ${token}` } }
    // )
    // .then(function (response) {
    //   console.log(response)
    //   dispatch(createPlan(plan));
      
    // })
    // .catch(function (error) { console.log(error) })
   
  };
};

//특정 여행 받아오기
const getdayPlanDB = (planId) => {
  return function (dispatch, getState, {history}) {
    // instance.get('/day', {})
    // .then(function (response) {
    //   console.log(response)
    //     // dispatch(getdayPlan(response.data.days))
    // })
    // .catch(function (error) { console.log(error) })
  }
}

//리덕스
export default handleActions(
  {
    [GET_PLAN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.plans;
      }),

    [CREATE_PLAN]: (state, action) =>
      produce(state, (draft) => {
      }),
    [GET_DAYPLAN]: (state, action) =>
    produce(state, (draft) => {
      draft.dayList = action.payload.dayList;
    }),  
    
  },
  initialState
);

const actionCreators = {
  getPlan,
  getPlanDB,
  createPlan,
  createPlanDB,
  getdayPlanDB
};

export { actionCreators };

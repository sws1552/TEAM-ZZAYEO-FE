import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const token = localStorage.getItem("token");
let formData = new FormData();

// 액션타입
const GET_PLAN = "GET_PLAN";
const CREATE_PLAN = "CREATE_PLAN";
const GET_DAYPLAN = "GET_DAYPLAN";
const ADD_BOOKMARK = "ADD_BOOKMARK";

// 액션 생성 함수
const getPlan = createAction(GET_PLAN, (plans) => ({ plans }));
const createPlan = createAction(CREATE_PLAN, (planId) => ({ planId }));
const getdayPlan = createAction(GET_DAYPLAN, (myPlan) => ({ myPlan }));
const addBookMark = createAction(ADD_BOOKMARK, (myPlan) => ({ myPlan }));

// 초기 상태값
const initialState = {
  list: [],
  myPlan: [],
  is_loaded: false,
  planId: "",
  aaa: [],
};

// 미들웨어

//전체포스트 내용 받아오기
const getPlanDB = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/api/plans")
      .then((res) => {
        dispatch(getPlan(res.data.plans));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//일정생성하기
const createPlanDB = (plan) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/api/plans", plan)
      .then((res) => {
        console.log(res);
        const planId = res.data.planId;
        dispatch(createPlan(planId));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//특정 여행 받아오기
const getdayPlanDB = (planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/plans/${planId}`)
      .then(function (response) {
        dispatch(getPlan(response.data.plan));
        //const myPlan = response.data.plan;
        //dispatch(getdayPlan(myPlan));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const saveLocationDB = (dayId, place) => {
  return (dispatch, getState, { history }) => {
    const placeName = place[0].name;
    const lat = place[0].geometry.location.lat();
    const lng = place[0].geometry.location.lng();
    const address = place[0].formatted_address;
    console.log(placeName, lat, lng, address);

    formData.append("placeName", placeName);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("address", address);
    instance
      .post(
        `/api/plans/days/${dayId}`,
        formData,
        {
          // time: "10시00분",
          // memoText: "여행메모",
          // memoImage: "이미지"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function (response) {
        console.log(response);
        const planId = getState().plan.planId;
        dispatch(createPlan(planId));
        history.push("/writeplan");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//북마크 여행 불러오기
const bookMarkDB = () => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/api/plans/bookmark")
      .then((res) => {
        console(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//특정 여행 북마크 추가하기
const addBookMarkDB = (planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/api/plans/${planId}/bookmark`, {})
      .then((res) => {
        console(res);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        draft.planId = action.payload.planId;
      }),
    [GET_DAYPLAN]: (state, action) =>
      produce(state, (draft) => {
        draft.myPlan = action.payload.myPlan;
      }),
  },
  initialState
);

const actionCreators = {
  getPlan,
  getPlanDB,
  createPlan,
  createPlanDB,
  getdayPlanDB,
  saveLocationDB,
  addBookMark,
  addBookMarkDB,
  bookMarkDB,
};

export { actionCreators };

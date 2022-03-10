import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

// 액션타입
const GET_PLAN = "GET_PLAN";
const CREATE_PLAN = "CREATE_PLAN";
const GET_DAYPLAN = "GET_DAYPLAN";
const GET_BOOKMARK = "GET_BOOKMARK";

// 액션 생성 함수
const getPlan = createAction(GET_PLAN, (plans) => ({ plans }));
const createPlan = createAction(CREATE_PLAN, (planId) => ({ planId }));
const getdayPlan = createAction(GET_DAYPLAN, (myPlan) => ({ myPlan }));
const getBookMark = createAction(GET_BOOKMARK, (bookmark_list) => ({
  bookmark_list,
}));

// 초기 상태값
const initialState = {
  list: [],
  myPlan: [],
  is_loaded: false,
  planId: "",
  aaa: [],
  bookmark_list: [],
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
        const planId = res.data.planId;
        dispatch(createPlan(planId));
        history.push(`/writeplan/${planId}`);
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
      .then((res) => {
        dispatch(getdayPlan(res.data.plan));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const saveLocationDB = (
  dayId,
  AmPm,
  Hour,
  Minute,
  Memo,
  placeName,
  lat,
  lng,
  address,
  imageURL,
) => {
  return (dispatch, getState, { history }) => {
    console.log(
      dayId,
      AmPm,
      Hour,
      Minute,
      Memo,
      placeName,
      lat,
      lng,
      address,
      imageURL,
    );

    let formData = new FormData();
    formData.append("placeName", placeName);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("address", address);
    formData.append("time", `${AmPm} ${Hour}시 ${Minute}분`);
    formData.append("memoText", Memo);
    imageURL.map((eachfile) => {
      formData.append("imageFile", eachfile);
    });

    instance
      .post(`/api/plans/days/${dayId}`, formData, {})
      .then(function (response) {
        const planId = getState().plan.planId;
        instance
          .get(`/api/plans/${planId}`)
          .then((res) => {
            console.log(res)
            dispatch(getdayPlan(res.data.plan));
          })
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};


//북마크 여행 불러오기
const getBookMarkDB = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/plans/bookmark`)
      .then((res) => {
        dispatch(getBookMark(res.data.plans));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//특정 여행 북마크 추가하기
const addBookMarkDB = (planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/api/plans/${planId}/bookmark`)
      .then((res) => {
        dispatch(getdayPlanDB(planId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//특정 여행 북마크 취소하기
const deleteBookMarkDB = (planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/api/plans/${planId}/bookmark`)
      .then((res) => {
        dispatch(getdayPlanDB(planId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//여행 좋아요
const addLikeDB = (planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/api/plans/${planId}/like`)
      .then((res) => {
        console.log(res);
        dispatch(getdayPlanDB(planId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//여행 좋아요 취소하기
const deleteLikeDB = (planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/api/plans/${planId}/like`)
      .then((res) => {
        dispatch(getdayPlanDB(planId));
      })
      .catch((error) => {
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
    [GET_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.bookmark_list = action.payload.bookmark_list;
      }),
  },
  initialState
);

const actionCreators = {
  getPlanDB,
  createPlanDB,
  getdayPlanDB,
  saveLocationDB,
  getBookMark,
  getBookMarkDB,
  addBookMarkDB,
  deleteBookMarkDB,
  addLikeDB,
  deleteLikeDB,
};

export { actionCreators };

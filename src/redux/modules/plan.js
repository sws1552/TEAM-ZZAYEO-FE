import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

// 액션타입
const GET_PLAN = "GET_PLAN";
const CREATE_PLAN = "CREATE_PLAN";
const GET_DAYPLAN = "GET_DAYPLAN";
const GET_BOOKMARK = "GET_BOOKMARK";
const GET_MYPLAN = "GET_MYPLAN";
const STATUS = "STATUS";
const DELETEMYDAYPOST = "DELETEMYDAYPOST";
const SEARCH = "SEARCH";

// 액션 생성 함수
const getPlan = createAction(GET_PLAN, (plans) => ({ plans }));
const createPlan = createAction(CREATE_PLAN, (planId) => ({ planId }));
const getdayPlan = createAction(GET_DAYPLAN, (myPlan) => ({ myPlan }));
const getBookMark = createAction(GET_BOOKMARK, (bookmark_list) => ({
  bookmark_list,
}));
const getMyPlan = createAction(GET_MYPLAN, (myplans) => ({ myplans }));
const status = createAction(STATUS, (status) => ({ status }));
const deleteMyPost = createAction(DELETEMYDAYPOST, (placeId) => ({ placeId }));
const search = createAction(SEARCH, (search_list) => ({ search_list }));

// 초기 상태값
const initialState = {
  list: [],
  myPlan: [],
  is_loaded: false,
  planId: "",
  bookmark_list: [],
  myplans: [],
  status: "",
  search_list: [{}],
};

//카테고리 선택 목록 가져오기
const getPlanDB = (query) => {
  if (query) {
    return function (dispatch, getState, { history }) {
      instance
        .get(`/api/plans${query}`)
        .then((res) => {
          dispatch(getPlan(res.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }

  //전체포스트 내용 받아오기
  return function (dispatch, getState, { history }) {
    instance
      .get("/api/plans")
      .then((res) => {
        dispatch(getPlan(res.data));
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

//일정수정하기
const EditPlanDB = (plan, planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .patch(`/api/plans/${planId}`, plan)
      .then((res) => {
        console.log(res);
        // const planId = res.data.planId;
        // dispatch(createPlan(planId));
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
  planId
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
      planId
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
        // const planId = getState().plan.planId;
        console.log(planId);
        instance.get(`/api/plans/${planId}`).then((res) => {
          console.log(res);
          dispatch(getdayPlan(res.data.plan));
        });
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

//북마크 여행 불러오기
const getMyPlanDB = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/myplans`)
      .then((res) => {
        dispatch(getMyPlan(res.data.plans));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//공개, 비공개 설정하기
const statusDB = (planId, status) => {
  return function (dispatch, getState, { history }) {
    console.log(planId, status);
    instance
      .post(`api/plans/${planId}/public`, {
        status: status,
      })
      .then((res) => {
        console.log(res);
        instance
          .get(`/api/plans/${planId}`)
          .then((res) => {
            console.log(res.data.plan);
            dispatch(getdayPlan(res.data.plan));
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//나의 Plan 삭제(여행리스트삭제)
const deleteMyPlanDB = (planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/api/plans/${planId}`)
      .then((res) => {
        console.log(res);
        history.push("/myplan");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//나의 DayPost(특정장소삭제) 삭제
const deleteMyPostDB = (placeId, planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/api/plans/days/places/${placeId}`)
      .then((res) => {
        // const planId = getState().plan.planId;
        instance.get(`/api/plans/${planId}`).then((res) => {
          console.log(res);
          dispatch(getdayPlan(res.data.plan));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 특정 여행 사진 삭제하기
const deleteMyPostImageDB = (placeId, imageIndex) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/api/plans/days/places/${placeId}/${imageIndex}`)
      .then((res) => {
        console.log("특정 여행 사진 삭제 !! ", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//게시물 수정
export const editMyPostDB = (
  placeId,
  AmPm,
  Hour,
  Minute,
  Memo,
  placeName,
  lat,
  lng,
  address,
  imageURL,
  planId
) => {
  return (dispatch, getState, { history }) => {
    console.log(
      placeId,
      AmPm,
      Hour,
      Minute,
      Memo,
      placeName,
      lat,
      lng,
      address,
      imageURL,
      planId
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
      .post(`/api/plans/days/places/${placeId}`, formData, {})
      .then(function (response) {
        instance.get(`/api/plans/${planId}`).then((res) => {
          console.log(res);
          dispatch(getdayPlan(res.data.plan));
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// 검색하기
const searchDB = (query) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/plans/search${query}`)
      .then(function (res) {
        console.log(res);
        dispatch(search(res.data.plans));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// 썸네일 추가하기
const addThumbnailDB = (planId, imageURL) => {
  return function (dispatch, getState, { history }) {
    let formData = new FormData();
    formData.append("imageFile", imageURL);
    instance
      .post(`/api/plans/${planId}/thumbnail`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//여행 일정가져오기
const getyourPostDB = (planId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/api/plans/${planId}/copy`)
      .then((res) => {
        alert("여행기 작성에 등록 되었습니다.");
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
        draft.list = action.payload.plans.plans;
        draft.endPage = action.payload.plans.endPage;
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
    [GET_MYPLAN]: (state, action) =>
      produce(state, (draft) => {
        draft.myplans = action.payload.myplans;
      }),
    [DELETEMYDAYPOST]: (state, action) => produce(state, (draft) => {}),
    [SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list = action.payload.search_list;
      }),
  },
  initialState
);

const actionCreators = {
  getPlanDB,
  createPlanDB,
  createPlan,
  getdayPlanDB,
  saveLocationDB,
  getBookMark,
  getBookMarkDB,
  addBookMarkDB,
  deleteBookMarkDB,
  addLikeDB,
  deleteLikeDB,
  getMyPlanDB,
  statusDB,
  deleteMyPostDB,
  deleteMyPlanDB,
  searchDB,
  editMyPostDB,
  addThumbnailDB,
  EditPlanDB,
  deleteMyPostImageDB,
  getyourPostDB,
};

export { actionCreators };

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import { push } from "connected-react-router";
import DestinationModal from "../../components/Main/Modal/DestinationModal";
import { useSelector, useDispatch } from "react-redux";

// 액션타입
const GET_PLAN = "GET_PLAN";
const CREATE_PLAN = "CREATE_PLAN";
const GET_DAYPLAN = "GET_DAYPLAN";
const GET_BOOKMARK = "GET_BOOKMARK";
const GET_MYPLAN = "GET_MYPLAN";
const STATUS = "STATUS";
const DELETEMYDAYPOST = "DELETEMYDAYPOST";
const SEARCH = "SEARCH";
const STYLELIST = "STYLELIST";
const DESTINATION = "DESTINATION";

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
const styleList = createAction(STYLELIST, (style_list, style) => ({
  style_list,
  style,
}));
const destinationList = createAction(
  STYLELIST,
  (destination_list, destination) => ({
    destination_list,
    destination,
  })
);
// 초기 상태값
const initialState = {
  list: [],
  myPlan: [],
  is_loaded: false,
  planId: "",
  bookmark_list: [],
  myplans: [],
  status: "",
  search_list: [],
  style_list: [],
  destination_list: [],
};

//국내, 해외 목록 가져오기
const getdestinationDB = (destination) => {
  return function (dispatch, getState, { history }) {
    const style = getState().category.style;
    instance
      .get(`/api/plans?destination=${destination}`)
      .then((res) => {
        console.log(res);
        dispatch(destinationList(res.data.destination, style));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//스타일별 목록 가져오기
const getPlanDB = (style) => {
  console.log(style);
  if (style) {
    return function (dispatch, getState, { history }) {
      const destination = getState().category.destination;
      instance
        .get(`/api/plans?style=${style}`)
        .then((res) => {
          console.log(res);
          dispatch(styleList(res.data.plans, destination));
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
  imageURL
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
      imageURL
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
          .get("/api/plans")
          .then((res) => {
            dispatch(getPlan(res.data.plans));
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
    console.log(planId);
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
const deleteMyPostDB = (placeId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/api/plans/days/places/${placeId}`)
      .then((res) => {
        const planId = getState().plan.planId;
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
  imageURL
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
      imageURL
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
      .post(`/api/plans/days/${placeId}`, formData, {})
      .then(function (response) {
        const planId = getState().plan.planId;
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
const searchDB = (keyword) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/plans/search?query=${keyword}`)
      .then(function (res) {
        dispatch(search(res.data.plans));
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
    [STYLELIST]: (state, action) =>
      produce(state, (draft) => {
        const style = action.payload.style_list;
        const destination = action.payload.destination;
        if (style.length === 0) {
          draft.style_list = [{ none: "없음" }];
        } else {
          draft.style_list = action.payload.style_list;
        }
        // if (style.length !== 0) {
        //   if (destination === "국내") {
        //     const domestic = style.filter((v) => v.destination === destination);
        //     draft.style_list = domestic;
        //   } else if (destination === "해외") {
        //     const abroad = style.filter((v) => v.destination === destination);
        //     draft.style_list = abroad;
        //   } else if (destination === "") {
        //     draft.style_list = style;
        //   }
        // }
      }),
    [DESTINATION]: (state, action) =>
      produce(state, (draft) => {
        // const destination = action.payload.destination_list;
        // const style = action.payload.style;
        // if (destination.length === 0) {
        //   draft.destination_list = [{ none: "없음" }];
        // }
        // if (destination.length !== 0) {
        //   if (style === "액티비티 체험") {
        //     const activity = destination.filter((v) => v.style === style);
        //     draft.destination_list = activity;
        //   } else if (style === "문화 예술 역사 체험") {
        //     const culture = destination.filter((v) => v.style === style);
        //     draft.destination_list = culture;
        //   } else if (style === "명소 관광지 방문필수") {
        //     const tourism = destination.filter((v) => v.style === style);
        //     draft.destination_list = tourism;
        //   } else if (style === "페스티벌 참여") {
        //     const festival = destination.filter((v) => v.style === style);
        //     draft.destination_list = festival;
        //   } else if (style === "먹방투어") {
        //     const food = destination.filter((v) => v.style === destination);
        //     draft.destination_list = food;
        //   } else if (style === "쇼핑 좋아") {
        //     const shopping = destination.filter((v) => v.style === style);
        //     draft.destination_list = shopping;
        //   } else if (style === "편하게 쉬는 휴양") {
        //     const relax = destination.filter((v) => v.style === style);
        //     draft.style_list = relax;
        //   } else if (style === "SNS 핫플 투어") {
        //     const SNS = destination.filter((v) => v.style === style);
        //     draft.destination_list = SNS;
        //   } else if (style === "호캉스") {
        //     const hotel = destination.filter((v) => v.style === style);
        //     draft.destination_list = hotel;
        //   } else if (style === "자연친화") {
        //     const nature = destination.filter((v) => v.style === style);
        //     draft.destination_list = nature;
        //   }
        // }
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
  getMyPlanDB,
  statusDB,
  deleteMyPostDB,
  deleteMyPlanDB,
  searchDB,
  editMyPostDB,
  getdestinationDB,
};

export { actionCreators };

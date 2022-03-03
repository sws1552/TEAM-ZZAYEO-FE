import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/Request";
import { useSelector, useDispatch } from "react-redux";

// actions
const LOADLOATION = "LOADLOATION";
const SEARCHLOATION = "SEARCHLOATION";

// action creators
const loadLocation = createAction(LOADLOATION, (places) => ({ places }));
const searchLocation = createAction(SEARCHLOATION, (placeName,lat,lng,address) => ({ placeName,lat,lng,address }));

// initial state
const initialState = {
    list: []
};

//middleware

export const loadLocationDB = () => {
  return (dispatch, getState, { history }) => {
      instance
      .get("/list")
      .then((response)=>{
          const location = response.data.days
          dispatch(loadLocation(location))
      })
      .catch((error) => {
          console.log("안가져와짐");
      })
  }
}

export const searchLocationDB = (place) => {
  return (dispatch, getState, { history }) => {
      // const places = getState().map.list;
      // let list = []
      // places.forEach((doc)=>{
        
      //   list.push(doc.dayId)
      // })
      // console.log(list)
      const placeName = place[0].name
      const lat = place[0].geometry.location.lat()
      const lng = place[0].geometry.location.lng()
      const address = place[0].formatted_address
      dispatch(searchLocation(placeName,lat,lng,address))

  }
}
// reducer

export default handleActions(
  {
    [LOADLOATION]: (state, action) =>
      produce(state, (draft) => {
     
       
      }),
    [SEARCHLOATION]: (state, action) =>
      produce(state, (draft) => {
        // const place = action.payload.places
        const placeName =action.payload.placeName
        const lat = action.payload.lat
        const lng = action.payload.lng
        const address = action.payload.address
        draft.list.push({placeName, lat, lng, address})
        // draft.list.push({places: [{placeName, lat, lng, address}] })
        // draft.list.push({placeName,lat,lng,address})
      }),
  },
  initialState
);

const actionCreators = {
    loadLocation,
    loadLocationDB,
    searchLocation,
    searchLocationDB
};

export { actionCreators };
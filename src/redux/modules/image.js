import { createAction, handleActions } from "redux-actions";
import produce from "immer";



// actions
const UPLOADING = "UPLOADING";
const SET_PREVIEW = "SET_PREVIEW";
const DELETE_PREVIEW = "DELETE_PREVIEW"

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const deletePreview = createAction(DELETE_PREVIEW, (previewIndex) => ({ previewIndex }));

// initial state
const initialState = {
  image_url: "",
  uploading: false,
  preview: [],
};

// reducer
export default handleActions(
  {
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        const new_list = [...state.preview, action.payload.preview];
        //기존 배열에 새롭게 추가
        return { preview: new_list };
        // console.log(action.payload.preview)
        // draft.preview = action.payload.preview
      }),
    [DELETE_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        const new_list = state.preview.filter((l, idx) => {
          return parseInt(action.payload.previewIndex) !== idx;
        });
        return { preview: new_list };
      }),
  },
  initialState
);

const actionCreators = {
  // uploadImage,
  //   uploadImageFB,
  setPreview,
  deletePreview
};

export { actionCreators };
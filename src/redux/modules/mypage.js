import {createAction, handleActions} from 'redux-actions';
import { produce } from "immer";
import instance from "../../shared/Request";


const SET_PREVIEW = "SET_PREVIEW";


const setpreview = createAction(SET_PREVIEW, (myPreview) => ({myPreview}));


const initialState = {
    myPreview: null,
}


const updateProfileFB = (newImg, newNick) => {
    return async function (dispatch, getState, { history }) {
        

        const form = new FormData();
        form.append('imageFile', newImg);
        form.append('nickname', newNick);

        await instance
        .post(`/api/users/auth/me`, form)
        .then((res) => {
            history.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };


export default handleActions({

    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
        draft.myPreview = action.payload.myPreview;
    }),

}, initialState);


const actionCreators = {
    setpreview,
    updateProfileFB,
}

export {actionCreators};
import { createAction } from "../../utilities/reducer/reducer.utils";
export const initialState = {
    currentUser: null
}

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'user/SET_CURRENT_USER',
  };
export const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default:
            return state;
    }
}
export const setCurrentUser = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const selectCurrentUser = (state) => state.user.currentUser;
import { createAction } from '../../utilities/reducer/reducer.utils';
import { createSelector } from "reselect";
import { getCategoriesAndDocuments } from '../../utilities/firebase/firebase.utils';

const categoriesInitialState = {
    categories: [],
    isLoading: false,
    error: null,
};
/*
export const setCategories = (categories) =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
*/

//setCategories
export const fetchCategoriesStart = () =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        categoriesArray
    );

export const fetchCategoriesFailure = (error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

//main fetch
export const fetchCategoriesAsync = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesStart());
        try {
            const categoriesArray = await getCategoriesAndDocuments('categories');
            dispatch(fetchCategoriesSuccess(categoriesArray));
        } catch (error) {
            dispatch(fetchCategoriesFailure(error));
        }
    };
};

/*
const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES_MAP: 'categories/SET_CATEGORIES_MAP',
    SET_CATEGORIES: 'categories/SET_CATEGORIES',
};*/
export const CATEGORIES_ACTION_TYPES = {
    FETCH_CATEGORIES_START: 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS: 'category/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED: 'category/FETCH_CATEGORIES_FAILED',
};


export const categoriesReducer = (
    state = categoriesInitialState,
    action = {}
) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
            };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, categories: payload };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return { ...state, isLoading: false, error: payload };
        default:
            return state;
    }
};

const selectCategoriesReducer = (state) => state.categories;

//createSelector =detected change categoriesReduces then it will run a function in second parameter. (only run when it changed)
export const selectCategories = createSelector([selectCategoriesReducer], (categoriesReducer) => categoriesReducer.categories)

//this is works the same : it only run the function (in second para)when the object is change => stop unnessary rerendering
export const selectCategoriesMap = createSelector([selectCategories], (categories) => categories.reduce((acc, { title, items }) => {
    //set title to a key 
    acc[title.toLowerCase()] = items;
    return acc;
}, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.isLoading
  );
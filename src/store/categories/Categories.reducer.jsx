import { createAction } from '../../utilities/reducer/reducer.utils';
import {createSelector} from "reselect";

const categoriesInitialState = {
    categories: [],
};

export const setCategories = (categories) =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);

const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES_MAP: 'categories/SET_CATEGORIES_MAP',
    SET_CATEGORIES: 'categories/SET_CATEGORIES',
};

export const categoriesReducer = (
    state = categoriesInitialState,
    action = {}
) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return { ...state, categories: payload };
        default:
            return state;
    }
};

const selectCategoriesReducer = (state) => state.categories;

//createSelector =detected change categoriesReduces then it will run a function in second parameter. (only run when it changed)
export const selectCategories = createSelector([selectCategoriesReducer],(categoriesReducer)=> categoriesReducer.categories)

  //this is works the same : it only run the function (in second para)when the object is change => stop unnessary rerendering
export const selectCategoriesMap = createSelector([selectCategories],(categories)=>categories.reduce((acc,{title,items})=>{
    //set title to a key 
    acc[title.toLowerCase()] = items;
    return acc;
  },{})
);

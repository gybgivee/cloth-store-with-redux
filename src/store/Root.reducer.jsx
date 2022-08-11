import {combineReducers} from 'redux';
import { userReducer } from "./user/User.reducer";
import { categoriesReducer } from './categories/Categories.reducer';
import { cartReducer } from './cart/Cart.reducer';
export const rootReducer = combineReducers({
    user:userReducer,
    categories:categoriesReducer,
    cart:cartReducer,
})
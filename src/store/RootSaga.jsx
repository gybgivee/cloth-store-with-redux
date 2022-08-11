import {all,call} from "redux-saga/effects"
import { categoriesSaga } from "./categories/CategoriesSaga.saga"
import { userSagas } from "./user/UserSaga.saga"
//generator function 
export function* rootSaga(){
    yield all([call(categoriesSaga),call(userSagas)])
}
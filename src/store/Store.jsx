import {compose,applyMiddleware} from 'redux';
import { legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './Root.reducer';

const persistConfig ={
  key:'root',
  storage:storage,
  blacklist:['user']
}
//create persistedReducter for store
const persistedReducer = persistReducer(persistConfig,rootReducer);

const middleWares = [process.env.NODE_ENV !== 'development' && logger].filter(
  Boolean
);
//set this to be able to use redux devtools in chorme
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
//this is like a session now instead of using rootReducer => persistedreducer
export const store = createStore(persistedReducer, undefined, composedEnhancers);
//export const store = createStore(rootReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);

/*
// Redux set STORE using createStore
//in order for middleware to work we need to call apply middleware
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const store = createStore(rootReducer, undefined, composedEnhancers);
// Redux set STORE configureStore
export const Store = configureStore({reducer: rootReducer});
*/

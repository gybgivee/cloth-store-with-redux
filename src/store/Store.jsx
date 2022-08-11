import { compose, applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './Root.reducer';
import thunk from 'redux-thunk';

//blacklist: for the data that you don't want to keep in session but whitelist is opposite
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cart']
}
//create persistedReducter for store
const persistedReducer = persistReducer(persistConfig, rootReducer);

//set log to visible in middleware and initalise thunk
const middleWares = [process.env.NODE_ENV !== 'development' && logger, thunk]
  .filter(Boolean);

//set this to be able to use redux devtools in chorme
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
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

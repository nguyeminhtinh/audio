// libs
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';
import appReducers from './rootReducers';
import rootSagas from './rootSagas';

// creates the store
export default () => {
  const middlewares = [];
  const enhancers = [];
  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: seamlessImmutableReconciler,
    // transforms: [seamlessImmutableTransformer]
    whitelist: [
      'settingReducer',
      'myPageReducer',
      'searchReducer',
      'mainReducer',
      'playBookReducer',
      'myReducer',
      'accountReducer',
      'recordReducer',
    ],
  };

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  // eslint-disable-next-line no-underscore-dangle
  const __DEV__ = process.env.NODE_ENV !== 'production';

  if (__DEV__) {
    // create the logger
    const logger = createLogger();
    middlewares.push(logger);
  }

  enhancers.push(applyMiddleware(...middlewares));

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'Admin',
      })
    : compose;

  /* ------------- AutoRehydrate Enhancer ------------- */
  const persistedReducer = persistReducer(persistConfig, appReducers);

  const store = createStore(persistedReducer, composeEnhancers(...enhancers));
  const persistor = persistStore(store);

  // kick off root saga
  sagaMiddleware.run(rootSagas);

  return { store, persistor };
};

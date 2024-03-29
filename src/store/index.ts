// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import RootReducer, { AppState } from './reducers';
import rootSaga from './sagas';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

// create a makeStore function
const makeStore = () => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  // 2: Add an extra parameter for applying middleware:
  const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  // 3: Run your sagas on server
  sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

// export an assembled wrapper
export default createWrapper<Store<AppState>>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});

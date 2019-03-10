import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import db from '../pouchdb';
import reducer from './reducer';

export const createStore = () => reduxCreateStore(
  reducer,
  applyMiddleware(
    thunk.withExtraArgument({ db }),
    logger,
  ),
);

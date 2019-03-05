import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import db from '../pouchdb';
import api from '../api';
import reducer from './reducer';

const devtools = process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()

export const createStore = () => reduxCreateStore(reducer, compose(
  applyMiddleware(thunk.withExtraArgument({
    api,
    db,
  })),
  devtools,
));

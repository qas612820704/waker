import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import { createDatabase } from '../database';
import reducer from './reducer';

const devtools = process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()

const connectStore = createDatabase(['todos']);

export const createStore = () => reduxCreateStore(reducer, compose(
  applyMiddleware(thunk.withExtraArgument({
    api: {
      todos: connectStore('todos'),
    },
  })),
  devtools,
));

import { combineReducers } from 'redux';
import todos from './todos';
import notifications from './notifications';

export default combineReducers({
  todos,
  notifications,
});

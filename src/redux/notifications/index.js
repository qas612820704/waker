import { combineReducers } from 'redux';

const TOGGLE_NOTIFICATION_AVAILABILITY = 'TOGGLE_NOTIFICATION_AVAILABILITY';

const isEnable = (state = false, action) => {
  switch(action.type) {
    case TOGGLE_NOTIFICATION_AVAILABILITY:
      return (action.payload.permission === 'granted')
        ? (!state)
        : false;
    default:
      return state;
  }
}

export function toggleNotificationAvailability(permission) {
  return {
    type: TOGGLE_NOTIFICATION_AVAILABILITY,
    payload: {
      permission,
    },
  };
}

export default combineReducers({
  isEnable,
});

import uuid from 'uuid/v4';
import * as moment from 'moment';
import * as $ from './constants';

export function restoreTodos() {
  return async (dispatch, getState, { api }) => {
    const todos = await api.todos.getAll();

    dispatch({
      type: $.RESTORE_TODOS,
      payload: todos,
    })

    return todos;
  }
}

export function addTodo(fields) {
  return async (dispatch) => {
    const todo = {
      _id: uuid(),
      alertAt: moment().add(30, 'minute').toISOString(),
      ...fields,
    };

    dispatch({
      type: $.ADD_TODO,
      payload: todo
    });

    return await dispatch(
      storeTodoRequest(todo._id),
    );
  }
}

export function updateTodo(todo) {
  return async (dispatch) => {
    dispatch({
     type: $.UPDATE_TODO,
     payload: todo,
    });

    return await dispatch(
      storeTodoRequest(todo._id),
    );
  }
}

export function deleteTodo(todoId) {
  return async (dispatch) => {
    dispatch({
      type: $.DELETE_TODO,
      payload: {
        _id: todoId
      },
     });

    return await dispatch(
      storeTodoRequest(todoId),
    );
  }
}

export function activateTodo(todoId) {
  return async (dispatch) => {
    dispatch({
      type: $.ACTIVATE_TODO,
      payload: {
        _id: todoId,
      },
     });

    return await dispatch(
      storeTodoRequest(todoId),
    );
  }
}

export function deactivateTodo(todoId) {
  return async (dispatch) => {
    dispatch({
      type: $.DEACTIVATE_TODO,
      payload: {
        _id: todoId,
      },
     });

    return await dispatch(
      storeTodoRequest(todoId),
    );
  }
}

export function activeAllTodos(todoIds = []) {
  return async (dispatch, getState, api) => {
    await Promise.all(
      todoIds.map(
        todoId => dispatch(activateTodo(todoId))
      )
    );
  }
}

export function deactiveAllTodos(todoIds = []) {
  return async (dispatch, getState, api) => {
    await Promise.all(
      todoIds.map(
        todoId => dispatch(deactivateTodo(todoId))
      )
    );
  }
}

export function storeTodoRequest(todoId) {
  return async (dispatch, getState, { api }) => {
    dispatch({
      type: $.STORING_TODO_REQUEST,
      payload: { _id: todoId },
    });

    const todo = getState().todos.byId[todoId];

    try {
      await api.todos.set(todo);

      return dispatch({
        type: $.STORING_TODO_SUCCESS,
        payload: { _id: todoId },
      });
    } catch (error) {
      return dispatch({
        type: $.STORING_TODO_FAILURE,
        payload: {
          _id: todoId,
          error,
        },
      });
    }
  }
}

export function syncTodo(id) {
  return navigator.serviceWorker.ready.then(registration => {
    registration.sync.register(`/todos/${id}`);
  })
}

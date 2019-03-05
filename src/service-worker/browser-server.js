import uuid from 'uuid/v4';
import { omitBy } from 'lodash';
import App from './lib/App';
import db from '../pouchdb';
import * as debug from '../debug';

const app = new App();

app.get('/todos', async () => {
  debug.sw.app('GET /todos');

  const withDeletedTodos = await db
  .allDocs({
    include_docs: true,
  })
  .then(result => result.rows)
  .then(rows => rows.map(row => row.doc));

  const todos = withDeletedTodos
      .filter(todo => !todo.deletedAt)
      .map(todo => omitBy(todo, '_rev'));

  return todos;
});

app.post('/todos', async ({ payload }) => {
  debug.sw.app('POST /todos', payload);

  const todo = {
    _id: uuid(),
    ...payload,
  };

  await db.put(todo);

  return todo;
})



export default app;

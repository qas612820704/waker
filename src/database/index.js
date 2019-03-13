import { openDb } from 'idb';
import { name } from '../../package.json';

export function createDatabase(stores = []) {
  const dbPromise = openDb(name, 1, (upgradedb) => {
    stores.forEach(s => {
      upgradedb.createObjectStore(s, { keyPath: '_id' });
    })
  });

  return function connectStore(storeName) {

    async function getAll() {
      const db = await dbPromise;

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      return store.getAll();
    }
    async function get(key) {
      const db = await dbPromise;

      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      return store.get(key);
    }
    async function set(item) {
      const db = await dbPromise;

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      return store.put(item);
    }
    async function del(key) {
      const db = await dbPromise;

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      return store.delete(key);
    }
    async function clear() {
      const db = await dbPromise;

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      return store.clear();
    }
    async function keys() {
      const db = await dbPromise;

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      return store.getAllKeys();
    }

    return {
      getAll,
      get,
      set,
      del,
      clear,
      keys,
    };
  }

}

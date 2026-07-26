import { Task } from '../../models/Task';

const URL = 'http://localhost:3001/tasks';

const headers = {
  'Content-Type': 'application/json'
};

const serverAPI = {
  getAll: () => {
    return fetch(URL).then((response) => response.json());
  },

  getById: (id: string) => {
    return fetch(`${URL}/${id}`).then((response) => response.json());
  },

  add: (task: Task) => {
    return fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(task)
    }).then((response) => response.json());
  },

  delete: (id: string) => {
    return fetch(`${URL}/${id}`, { method: 'DELETE' });
  },

  deleteAll: (tasks: Task[]) => {
    return Promise.all(tasks.map(({ id }) => serverAPI.delete(id)));
  },

  toggleComplete: (id: string, isDone: boolean) => {
    return fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ isDone })
    });
  }
};

export default serverAPI;

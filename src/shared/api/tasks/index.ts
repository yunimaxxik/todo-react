const URL = 'http://localhost:3001/tasks';

const headers = {
  'Content-Type': 'application/json'
};

interface APITask {
  id: string | number;
  title: string;
  isDone: boolean;
}

const tasksAPI = {
  getAll: (): Promise<APITask[]> => {
    return fetch(URL).then((response) => response.json());
  },

  getById: (id: string | number): Promise<APITask> => {
    return fetch(`${URL}/${id}`).then((response) => response.json());
  },

  add: (task: Omit<APITask, 'id'>): Promise<APITask> => {
    return fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(task)
    }).then((response) => response.json());
  },

  delete: (id: string | number): Promise<Response> => {
    return fetch(`${URL}/${id}`, {
      method: 'delete'
    });
  },

  deleteAll: (tasks: APITask[]): Promise<Response[]> => {
    return Promise.all(tasks.map(({ id }) => tasksAPI.delete(id)));
  },

  toggleComplete: (id: string | number, isDone: boolean): Promise<Response> => {
    return fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ isDone })
    });
  }
};

export default tasksAPI;

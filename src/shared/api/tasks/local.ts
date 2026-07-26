const STORAGE_KEY = 'tasks';

import { Task } from '../../models/Task';

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
};

const write = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const delay = (ms = 150) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const localAPI = {
  getAll: async () => {
    await delay();

    return read();
  },

  getById: async (id: string) => {
    await delay();

    return read().find((task: Task) => task.id === id) ?? null;
  },

  add: async (task: Task) => {
    await delay();

    const newTask = {
      ...task,
      id: crypto?.randomUUID() ?? Date.now().toString()
    };

    write([...read(), newTask]);

    return newTask;
  },

  delete: async (id: string) => {
    await delay();

    const tasks = read().filter((task: Task) => task.id !== id);

    write(tasks);
  },

  deleteAll: async () => {
    await delay();

    write([]);
  },

  toggleComplete: async (id: string, isDone: boolean) => {
    await delay();

    const tasks = read().map((task: Task) => {
      return task.id === id ? { ...task, isDone } : task;
    });

    write(tasks);
  }
};

export default localAPI;

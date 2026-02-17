import axios from 'axios';

const api = axios.create({
    baseURL: 'https://to-do-list-server-dnng.onrender.com/api',
});

export const getTasks = () => api.get('/tasks');
export const addTask = (task) => api.post('/tasks', task);
export const updateTask = (id, updates) => api.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;

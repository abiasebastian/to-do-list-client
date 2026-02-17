import { useState, useEffect } from 'react';
import { getTasks } from './services/api';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { Loader2 } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks. Make sure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">Todo List</h1>
        <p className="text-gray-600">Stay organized and productive</p>
      </header>

      <TaskForm onTaskAdded={handleTaskAdded} />

      <main>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks</h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No tasks yet. Add one above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

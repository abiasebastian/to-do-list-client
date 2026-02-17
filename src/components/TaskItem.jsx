import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { updateTask, deleteTask } from '../services/api';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || '');

    const handleToggleComplete = async () => {
        try {
            const { data } = await updateTask(task.id, { isCompleted: !task.isCompleted });
            onTaskUpdated(data);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(task.id);
                onTaskDeleted(task.id);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleUpdate = async () => {
        try {
            const { data } = await updateTask(task.id, { title: editTitle, description: editDescription });
            onTaskUpdated(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${task.isCompleted ? 'border-green-500' : 'border-blue-500'} mb-4 transition-all hover:shadow-md`}>
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                    />
                    <div className="flex justify-end space-x-2">
                        <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                        <button onClick={handleUpdate} className="text-green-600 hover:text-green-800">
                            <Check size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center mb-1">
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={handleToggleComplete}
                                className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <h3 className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                {task.title}
                            </h3>
                        </div>
                        {task.description && (
                            <p className={`text-gray-600 ml-8 text-sm ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>
                                {task.description}
                            </p>
                        )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50">
                            <Pencil size={18} />
                        </button>
                        <button onClick={handleDelete} className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;

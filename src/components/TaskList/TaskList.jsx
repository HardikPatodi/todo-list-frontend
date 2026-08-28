import TaskItem from '../TaskItem/TaskItem'
import './TaskList.css'

function TaskList({ tasks, loading, error, onToggle, onDelete }) {
    if (loading) {
        return (
            <div className="task-list-status">
                <div className="spinner"></div>
                <p>Loading tasks...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="task-list-status error">
                <p>⚠️ {error}</p>
                <p className="error-hint">Make sure the backend API is running.</p>
            </div>
        )
    }

    if (tasks.length === 0) {
        return (
            <div className="task-list-status empty">
                <p>No tasks yet. Add one above!</p>
            </div>
        )
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}

export default TaskList

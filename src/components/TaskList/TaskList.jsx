import { useState } from 'react'
import TaskItem from '../TaskItem/TaskItem'
import './TaskList.css'

// Filter options the user can pick from
const FILTER_OPTIONS = ['All', 'Pending', 'Completed']

function TaskList({ tasks, loading, error, onToggle, onDelete, onEdit }) {
    const [filter, setFilter] = useState('All')

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

    // Apply the selected filter to the task list
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'Pending') return !task.completed
        if (filter === 'Completed') return task.completed
        return true
    })

    return (
        <div>
            {/* Filter tabs — only shown when there are tasks */}
            {tasks.length > 0 && (
                <div className="filter-bar">
                    {FILTER_OPTIONS.map((option) => (
                        <button
                            key={option}
                            className={`filter-btn ${filter === option ? 'active' : ''}`}
                            onClick={() => setFilter(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {tasks.length === 0 ? (
                <div className="task-list-status empty">
                    <p>No tasks yet. Add one above!</p>
                </div>
            ) : filteredTasks.length === 0 ? (
                <div className="task-list-status empty">
                    <p>No {filter.toLowerCase()} tasks.</p>
                </div>
            ) : (
                <ul className="task-list">
                    {filteredTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TaskList

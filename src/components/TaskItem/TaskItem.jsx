import { useState } from 'react'
import './TaskItem.css'

function TaskItem({ task, onToggle, onDelete }) {
    const [deleting, setDeleting] = useState(false)
    const [toggling, setToggling] = useState(false)

    async function handleToggle() {
        setToggling(true)
        try {
            await onToggle(task.id, !task.completed)
        } finally {
            setToggling(false)
        }
    }

    async function handleDelete() {
        setDeleting(true)
        try {
            await onDelete(task.id)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}
                <span className="task-date">
                    {new Date(task.created_date).toLocaleDateString()}
                </span>
            </div>
            <div className="task-actions">
                <button
                    className={`btn ${task.completed ? 'btn-undo' : 'btn-complete'}`}
                    onClick={handleToggle}
                    disabled={toggling}
                >
                    {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                    className="btn btn-delete"
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    Delete
                </button>
            </div>
        </li>
    )
}

export default TaskItem

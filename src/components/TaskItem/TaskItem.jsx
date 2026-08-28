import { useState } from 'react'
import './TaskItem.css'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [deleting, setDeleting] = useState(false)
    const [toggling, setToggling] = useState(false)

    // Edit mode state
    const [editing, setEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editError, setEditError] = useState('')
    const [saving, setSaving] = useState(false)

    // Delete confirmation state
    const [confirmDelete, setConfirmDelete] = useState(false)

    async function handleToggle() {
        setToggling(true)
        try {
            await onToggle(task.id, !task.completed)
        } finally {
            setToggling(false)
        }
    }

    // First click shows confirmation, second click deletes
    async function handleDelete() {
        if (!confirmDelete) {
            setConfirmDelete(true)
            return
        }
        setDeleting(true)
        try {
            await onDelete(task.id)
        } finally {
            setDeleting(false)
            setConfirmDelete(false)
        }
    }

    function handleEditStart() {
        setEditTitle(task.title)
        setEditError('')
        setEditing(true)
    }

    function handleEditCancel() {
        setEditing(false)
        setEditError('')
    }

    async function handleEditSave() {
        const trimmed = editTitle.trim()
        if (!trimmed) {
            setEditError('Title cannot be empty.')
            return
        }
        setSaving(true)
        try {
            await onEdit(task.id, trimmed)
            setEditing(false)
            setEditError('')
        } catch (err) {
            setEditError(err.message || 'Failed to save.')
        } finally {
            setSaving(false)
        }
    }

    // Save on Enter, cancel on Escape
    function handleEditKeyDown(e) {
        if (e.key === 'Enter') handleEditSave()
        if (e.key === 'Escape') handleEditCancel()
    }

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                {editing ? (
                    <div className="edit-area">
                        <input
                            className="edit-input"
                            value={editTitle}
                            onChange={(e) => { setEditTitle(e.target.value); setEditError('') }}
                            onKeyDown={handleEditKeyDown}
                            autoFocus
                        />
                        {editError && <p className="edit-error">{editError}</p>}
                        <div className="edit-actions">
                            <button className="btn btn-save" onClick={handleEditSave} disabled={saving}>
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button className="btn btn-cancel" onClick={handleEditCancel} disabled={saving}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="task-title">{task.title}</h3>
                        {task.description && (
                            <p className="task-description">{task.description}</p>
                        )}
                        <span className="task-date">
                            {new Date(task.created_date).toLocaleDateString()}
                        </span>
                    </>
                )}
            </div>

            {!editing && (
                <div className="task-actions">
                    <button
                        className="btn btn-edit"
                        onClick={handleEditStart}
                    >
                        Edit
                    </button>
                    <button
                        className={`btn ${task.completed ? 'btn-undo' : 'btn-complete'}`}
                        onClick={handleToggle}
                        disabled={toggling}
                    >
                        {task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button
                        className={`btn btn-delete ${confirmDelete ? 'confirm' : ''}`}
                        onClick={handleDelete}
                        disabled={deleting}
                        title={confirmDelete ? 'Click again to confirm' : 'Delete task'}
                    >
                        {confirmDelete ? 'Sure?' : 'Delete'}
                    </button>
                </div>
            )}
        </li>
    )
}

export default TaskItem

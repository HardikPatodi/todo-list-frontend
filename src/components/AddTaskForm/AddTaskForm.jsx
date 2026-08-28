import { useState } from 'react'
import './AddTaskForm.css'

function AddTaskForm({ onAdd }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        // Validate title is not empty
        const trimmedTitle = title.trim()
        if (!trimmedTitle) {
            setError('Title cannot be empty.')
            return
        }

        setError('')
        setSubmitting(true)

        try {
            await onAdd(trimmedTitle, description.trim())
            setTitle('')
            setDescription('')
        } catch (err) {
            setError(err.message || 'Failed to add task.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-input"
                placeholder="Task title *"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setError('') }}
            />
            <input
                type="text"
                className="form-input"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {error && <p className="form-error">{error}</p>}
            <button
                type="submit"
                className="btn btn-add"
                disabled={submitting}
            >
                {submitting ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    )
}

export default AddTaskForm

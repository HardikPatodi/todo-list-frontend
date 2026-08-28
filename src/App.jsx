import { useState, useEffect } from 'react'
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi'
import AddTaskForm from './components/AddTaskForm/AddTaskForm'
import TaskList from './components/TaskList/TaskList'
import './App.css'

function App() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Fetch all tasks on mount
    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {
        setLoading(true)
        setError('')
        try {
            const data = await fetchTasks()
            setTasks(data)
        } catch (err) {
            setError(err.message || 'Failed to fetch tasks.')
        } finally {
            setLoading(false)
        }
    }

    async function handleAdd(title, description) {
        const newTask = await createTask(title, description)
        setTasks((prev) => [newTask, ...prev])
    }

    async function handleToggle(id, completed) {
        const task = tasks.find((t) => t.id === id)
        const updated = await updateTask(id, {
            title: task.title,
            description: task.description,
            completed,
        })
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    }

    async function handleDelete(id) {
        await deleteTask(id)
        setTasks((prev) => prev.filter((t) => t.id !== id))
    }

    async function handleEdit(id, newTitle) {
        const task = tasks.find((t) => t.id === id)
        const updated = await updateTask(id, {
            title: newTitle,
            description: task.description,
            completed: task.completed,
        })
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    }

    return (
        <div className="app">
            <h1 className="app-title">To-Do List</h1>
            <div className="app-container">
                <AddTaskForm onAdd={handleAdd} />
                <TaskList
                    tasks={tasks}
                    loading={loading}
                    error={error}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </div>
        </div>
    )
}

export default App

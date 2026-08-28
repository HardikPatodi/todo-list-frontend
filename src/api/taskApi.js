const API_BASE = import.meta.env.VITE_API_BASE_URL

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.detail || `Request failed with status ${response.status}`;
        throw new Error(message);
    }
    return response.json();
}

export async function fetchTasks() {
    const response = await fetch(`${API_BASE}/tasks`);
    return handleResponse(response);
}

export async function createTask(title, description = '') {
    const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    });
    return handleResponse(response);
}

export async function updateTask(id, updates) {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    return handleResponse(response);
}

export async function deleteTask(id) {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
}

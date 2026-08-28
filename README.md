# To-Do List Web App (Assignment 5)

A React single-page application that lets users manage tasks through a clean browser interface. It consumes the FastAPI REST API built in Assignment 4.

---

## What it does

- **View** all tasks in a list, ordered newest first
- **Add** a new task with a title and optional description
- **Mark complete / undo** to toggle a task's status
- **Edit** a task's title inline without leaving the page
- **Delete** a task with a confirmation modal before removing
- **Filter** tasks by All, Pending, or Completed
- Shows a **loading spinner** while fetching, a readable **error message** if the API is unreachable, and an **empty state** when no tasks exist

---

## Tech Stack

- [React](https://react.dev/) (v19) — UI framework
- [Vite](https://vitejs.dev/) — development server and build tool
- Plain CSS — styling, no UI libraries

---

## Prerequisites

Make sure you have the following installed before starting:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18 or higher | https://nodejs.org |
| npm | comes with Node.js | — |
| Python | 3.10 or higher | https://python.org (for the backend) |

---

## Project Structure

```
To-Do list frontend/
├── .gitignore
├── README.md
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx                  # Entry point — mounts React into the DOM
    ├── App.jsx                   # Root component — state management and CRUD logic
    ├── App.css
    ├── index.css                 # Global reset and dark theme
    ├── api/
    │   └── taskApi.js            # All API calls in one place (configurable base URL)
    └── components/
        ├── AddTaskForm/          # Form to create new tasks
        ├── TaskList/             # List with loading, error and empty states + filter bar
        ├── TaskItem/             # Single task row with edit, complete and delete actions
        └── ConfirmModal/         # Delete confirmation modal
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/HardikPatodi/todo-list-frontend.git
cd todo-list-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the environment variable

The app reads the backend URL from an environment variable so it is never hardcoded.

Create a file named `.env` in the project root (this file is excluded from Git):

```
VITE_API_BASE_URL=http://localhost:****
```

> Change `8000` to whichever port your Assignment 4 FastAPI backend is running on.  
> The variable **must** start with `VITE_` for Vite to expose it to the browser.

---

## Running the App

### Run the backend (Assignment 4) first

Open a terminal in your Assignment 4 folder and run:

```bash
# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Start the FastAPI server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.  
Interactive API docs: `http://localhost:8000/docs`

---

### Run the frontend (this project)

Open a **second terminal** in this folder and run:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Both terminals must stay open** for the full application to work.

---

## Running both together — quick reference

| Terminal | Folder | Command |
|----------|--------|---------|
| Terminal 1 (backend) | `To-Do list/` | `uvicorn main:app --reload` |
| Terminal 2 (frontend) | `To-Do list frontend/` | `npm run dev` |

Then open `http://localhost:5173` in your browser.

---

## How CORS works

The React app runs on port `5173` and the API runs on port `8000`. Browsers block cross-origin requests by default. The FastAPI backend (Assignment 4) already has CORS enabled with `allow_origins=["*"]`, so the frontend can call the API without any browser errors.

---

## Bonus Features

| Feature | Description |
|---------|-------------|
| Edit task title | Click **Edit** on any task to edit its title inline. Press Enter to save or Escape to cancel. |
| Filter by status | Use the **All / Pending / Completed** tabs above the task list to filter. |
| Delete confirmation | Clicking **Delete** opens a modal asking you to confirm before removing the task. |

---

## Git History

This project follows the commit convention `"Add feature: description"` / `"Fix: description"`.

Each feature was developed on its own branch and merged back into `main`:

- `feature/components` — core UI components
- `feature/bonus-features` — edit, filter and delete confirmation

---

## Notes

- The `.env` file is listed in `.gitignore` and is **not committed**. Each developer must create it locally.
- `node_modules/` and `dist/` are also excluded from Git.

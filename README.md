# Tasks Manager

A simple, fast, and fully client-side tasks manager. Built with nothing but **HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools, no backend, no dependencies.

## Features

- **Add tasks** – type a task and press Enter or click the **Add** button.
- **Complete tasks** – click the circle next to a task to mark it done (gets a checkmark and strikethrough). Click again to undo.
- **Delete tasks** – remove any task with the **Delete** button.
- **Clear completed** – remove all completed tasks at once.
- **Filters** – view **All**, **Active**, or **Completed** tasks.
- **Local persistence** – tasks are saved in your browser's `localStorage`, so they survive page refreshes and browser restarts.
- **Responsive design** – works on every device, from phones to desktops.

## Files

| File          | Purpose                                        |
| ------------- | ---------------------------------------------- |
| `index.html`  | The page structure and markup                  |
| `styles.css`  | Styling, layout, and responsive breakpoints    |
| `script.js`   | All the app logic (add / complete / delete / save) |

## How it works

### 1. Adding a task
The form at the top captures the text input and, on submit, creates a new task object:

```js
{
  id: "...",    // unique identifier
  text: "...",  // the task text
  done: false   // completion state
}
```

The new task is prepended to the list, saved to `localStorage`, and the list is re-rendered.

### 2. Saving & loading (localStorage)
Every change (add, toggle, delete, clear) calls `save()`, which stores the whole task array as JSON under the key `tasksManager.tasks`:

```js
localStorage.setItem("tasksManager.tasks", JSON.stringify(state.tasks));
```

On page load, `load()` reads that key and restores the tasks. If the stored data is missing or invalid, the app safely falls back to an empty list.

### 3. Completing tasks
Clicking the circle button toggles the task's `done` flag. Completed tasks get a checkmark, strikethrough styling, and are excluded from the active count.

### 4. Deleting and clearing
- The **Delete** button removes a single task by its `id`.
- The **Clear completed** button filters out every task where `done` is `true`.

### 5. Filters
The filter buttons (`All`, `Active`, `Completed`) change which tasks are shown. `getVisibleTasks()` returns the correct subset based on the current filter, and `render()` displays it.

### 6. Rendering
`render()` rebuilds the visible task list from the current state, updates the subtitle ("X tasks left"), and shows a friendly empty-state message when there is nothing to display.

## How to run

No server or installation needed. Just open `index.html` in any modern web browser:

```
double-click index.html
```

Or serve the folder locally if you prefer:

```
npx serve .
```

## Notes

- Tasks are stored **only on your device** (in the browser's local storage). Clearing browser data or using a different browser/device will reset or not show your tasks.
- The app is fully keyboard accessible: add with Enter, tab between buttons, and use Enter/Space to trigger them.

(function () {
  "use strict";

  var STORAGE_KEY = "tasksManager.tasks";
  var state = {
    tasks: [],
    filter: "all"
  };

  var taskInput = document.getElementById("task-input");
  var taskForm = document.getElementById("task-form");
  var taskList = document.getElementById("task-list");
  var empty = document.getElementById("empty");
  var subtitle = document.getElementById("app-subtitle");
  var clearCompletedBtn = document.getElementById("clear-completed");
  var filterButtons = document.querySelectorAll(".filter");

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      state.tasks = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      state.tasks = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  }

  function getVisibleTasks() {
    if (state.filter === "active") {
      return state.tasks.filter(function (t) { return !t.done; });
    }
    if (state.filter === "completed") {
      return state.tasks.filter(function (t) { return t.done; });
    }
    return state.tasks;
  }

  function render() {
    var visible = getVisibleTasks();

    empty.hidden = visible.length > 0;

    taskList.innerHTML = "";

    visible.forEach(function (task) {
      var li = document.createElement("li");
      li.className = "task" + (task.done ? " done" : "");
      li.dataset.id = task.id;

      var check = document.createElement("button");
      check.type = "button";
      check.className = "task-check";
      check.setAttribute("aria-label", task.done ? "Mark as not completed" : "Mark as completed");
      check.addEventListener("click", function () { toggleTask(task.id); });

      var span = document.createElement("span");
      span.className = "task-text";
      span.textContent = task.text;

      var del = document.createElement("button");
      del.type = "button";
      del.className = "task-delete";
      del.setAttribute("aria-label", "Delete task");
      del.textContent = "Delete";
      del.addEventListener("click", function () { deleteTask(task.id); });

      li.appendChild(check);
      li.appendChild(span);
      li.appendChild(del);

      taskList.appendChild(li);
    });

    var remaining = state.tasks.filter(function (t) { return !t.done; }).length;
    subtitle.textContent = remaining + (remaining === 1 ? " task left" : " tasks left");

    var completedCount = state.tasks.filter(function (t) { return t.done; }).length;
    clearCompletedBtn.disabled = completedCount === 0;
  }

  function addTask(text) {
    var trimmed = text.trim();
    if (!trimmed) return;

    state.tasks.unshift({
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8),
      text: trimmed,
      done: false
    });

    save();
    render();
  }

  function toggleTask(id) {
    var task = state.tasks.find(function (t) { return t.id === id; });
    if (task) {
      task.done = !task.done;
      save();
      render();
    }
  }

  function deleteTask(id) {
    state.tasks = state.tasks.filter(function (t) { return t.id !== id; });
    save();
    render();
  }

  function clearCompleted() {
    state.tasks = state.tasks.filter(function (t) { return !t.done; });
    save();
    render();
  }

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask(taskInput.value);
    taskInput.value = "";
    taskInput.focus();
  });

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      state.filter = btn.dataset.filter;
      render();
    });
  });

  clearCompletedBtn.addEventListener("click", clearCompleted);

  load();
  render();
})();

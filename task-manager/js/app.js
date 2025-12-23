// Load tasks from storage
let tasks = loadTasks();
let currentFilter = "all";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskListEl = document.getElementById("task-list");

/* =======================
   ADD TASK
======================= */
form.addEventListener("submit", e => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const task = {
    id: generateId(),
    text,
    completed: false
  };

  tasks.push(task);
  saveTasks(tasks);
  applyFilter();
  updateStats(tasks);
  updateEmptyMessage(tasks);

  input.value = "";
});

/* =======================
   TOGGLE TASK
======================= */
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks(tasks);
  applyFilter();
  updateStats(tasks);
  updateEmptyMessage(tasks);
}

/* =======================
   DELETE TASK
======================= */
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks(tasks);
  applyFilter();
  updateStats(tasks);
  updateEmptyMessage(tasks);
}

/* =======================
   EDIT TASK
======================= */
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newText = prompt("Edit task", task.text);
  if (newText && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks(tasks);
    applyFilter();
    updateStats(tasks);
  }
}

/* =======================
   FILTER LOGIC
======================= */
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filters button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
    currentFilter = btn.dataset.filter;

    applyFilter();
  });
});

function applyFilter() {
  if (currentFilter === "completed") {
    renderTasks(tasks.filter(t => t.completed));
  } else if (currentFilter === "active") {
    renderTasks(tasks.filter(t => !t.completed));
  } else {
    renderTasks(tasks);
  }
}

/* =======================
   DRAG & DROP
======================= */
let draggedId = null;

taskListEl.addEventListener("dragstart", e => {
  const li = e.target.closest("li");
  if (!li) return;
  draggedId = li.dataset.id;
});

taskListEl.addEventListener("dragover", e => {
  e.preventDefault();
});

taskListEl.addEventListener("drop", e => {
  e.preventDefault();

  const targetLi = e.target.closest("li");
  if (!targetLi || !draggedId) return;

  const targetId = targetLi.dataset.id;
  if (draggedId === targetId) return;

  const fromIndex = tasks.findIndex(t => t.id == draggedId);
  const toIndex = tasks.findIndex(t => t.id == targetId);

  const [movedTask] = tasks.splice(fromIndex, 1);
  tasks.splice(toIndex, 0, movedTask);

  saveTasks(tasks);
  applyFilter();
});

/* =======================
   INITIAL LOAD
======================= */
applyFilter();
updateStats(tasks);
updateEmptyMessage(tasks);

const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

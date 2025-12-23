function renderTasks(taskList) {
  const taskListEl = document.getElementById("task-list");
  taskListEl.innerHTML = "";

  taskList.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";
    if (task.completed) li.classList.add("completed");

    // ✅ Drag & Drop support
    li.setAttribute("draggable", "true");
    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.textContent = task.text;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "complete-btn";
    completeBtn.setAttribute("aria-label", "Mark task as completed");
    completeBtn.addEventListener("click", () => toggleTask(task.id));

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.setAttribute("aria-label", "Edit task");
    editBtn.addEventListener("click", () => editTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.append(completeBtn, editBtn, deleteBtn);

    li.append(span, actions);
    taskListEl.appendChild(li);
  });
}

/* Empty Message */
function updateEmptyMessage(tasks) {
  const msg = document.getElementById("emptyMessage");
  msg.textContent = tasks.length === 0
    ? "No tasks yet. Add your first task 👆"
    : "";
}

/* Animated Count */
function animateCount(el, start, end) {
  const duration = 400;
  let startTime = null;

  function animate(time) {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    el.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* Stats + Progress */
function updateStats(tasks) {
  const totalEl = document.getElementById("total-count");
  const completedEl = document.getElementById("completed-count");
  const progressFill = document.getElementById("progress-fill");

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  animateCount(totalEl, Number(totalEl.textContent), total);
  animateCount(completedEl, Number(completedEl.textContent), completed);

  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressFill.style.width = percent + "%";
}

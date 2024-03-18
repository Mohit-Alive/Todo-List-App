document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
  });
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
  
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTaskCompletion(index));
      
      const span = document.createElement("span");
      span.textContent = task.name;
      if (task.completed) {
        span.classList.add("completed");
      }
      span.addEventListener("click", () => toggleTaskCompletion(index));
      
      const deleteBtn = document.createElement("span");
      deleteBtn.textContent = "❌";
      deleteBtn.classList.add("delete");
      deleteBtn.addEventListener("click", () => deleteTask(index));
      
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }
  
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
  
    if (task !== "") {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ name: task, completed: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskInput.value = "";
      loadTasks();
    } else {
      alert("Please enter a valid task!");
    }
  }
  
  function toggleTaskCompletion(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
  
  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
  
  function clearTasks() {
    localStorage.removeItem("tasks");
    loadTasks();
  }
  
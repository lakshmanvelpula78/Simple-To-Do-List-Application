let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  if(title === ""){
    alert("Please enter task title");
    return;
  }

  let task = {
    title,
    description,
    completed:false
  };

  tasks.push(task);

  saveTasks();

  displayTasks();

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}

function displayTasks(){

  let pending = document.getElementById("pendingTasks");
  let completed = document.getElementById("completedTasks");

  pending.innerHTML = "";
  completed.innerHTML = "";

  tasks.forEach((task,index)=>{

    let card = `
      <div class="task-card ${task.completed ? 'completed' : ''}">
        <h5>${task.title}</h5>
        <p>${task.description}</p>

        <button class="btn btn-sm btn-success"
          onclick="toggleTask(${index})">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>

        <button class="btn btn-sm btn-danger"
          onclick="deleteTask(${index})">
          Delete
        </button>
      </div>
    `;

    if(task.completed){
      completed.innerHTML += card;
    }
    else{
      pending.innerHTML += card;
    }

  });

}

function toggleTask(index){

  tasks[index].completed = !tasks[index].completed;

  saveTasks();

  displayTasks();
}

function deleteTask(index){

  tasks.splice(index,1);

  saveTasks();

  displayTasks();
}

displayTasks();
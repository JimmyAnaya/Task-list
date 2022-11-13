import { Task } from "../class";
import { taskList } from "../index";

//Referencia al todo-list
const divTaskList   = document.querySelector(".todo-list");
const txtInput      = document.querySelector(".new-task");
const btnBorrar     = document.querySelector(".clear-completed");
const ulFiltors     = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearTaskHtml = (task) => {
  const htmlTask = `
    <li class="${task.complete ? "completed" : ""}" data-id="${task.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              task.complete ? "checked" : ""
            }>
            <label>${task.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

  const div = document.createElement("div");
  div.innerHTML = htmlTask;

  divTaskList.append(div.firstElementChild);

  return div.firstElementChild;
};

//Eventos
txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const newTask = new Task(txtInput.value);
    taskList.newTask(newTask);

    crearTaskHtml(newTask);
    txtInput.value = "";
  }
});

divTaskList.addEventListener("click", (event) => {
  const nameElement = event.target.localName; //input, label, button
  const taskElement = event.target.parentElement.parentElement; //choose li with event
  const taskId = taskElement.getAttribute("data-id");

  if (nameElement.includes("input")) {
    //click in the check
    taskList.checkComplete(taskId);
    taskElement.classList.toggle("completed");
  } else if (nameElement.includes("button")) {
    // Erase everything
    taskList.deleteTask(taskId);
    divTaskList.removeChild(taskElement);
  }
});

btnBorrar.addEventListener("click", () => {
  taskList.deleteCompletes();

  for (let i = divTaskList.children.length - 1; i >= 0; i--) {
    const element = divTaskList.children[i];

    if (element.classList.contains("completed")) {
      divTaskList.removeChild(element);
    }
  }
});

ulFiltors.addEventListener("click", (event) => {
  const filtro = event.target.text;
  if (!filtro) { return; }

anchorFiltros.forEach( elem => elem.classList.remove('selected'));
event.target.classList.add('selected');

  for (const elemento of divTaskList.children) {
    elemento.classList.remove("hidden");
    const complete = elemento.classList.contains("completed");

    switch (filtro) {
      case "Pendientes":
        if (complete) {
          elemento.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!complete) {
          elemento.classList.add("hidden");
        }
        break;
    }
  }
});

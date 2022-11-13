import { Task } from "./task.class";

export class TaskList {
  constructor() {
    this.loadLocalStorage();
  }

  newTask(task) {
    this.tasks.push(task);
    this.saveLocalStorage();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id != id);
    this.saveLocalStorage();
  }

  checkComplete(id) {
    for (const task of this.tasks) {
      if (task.id == id) {
        task.complete = !task.complete;
        this.saveLocalStorage();
        break;
      }
    }
  }

  deleteCompletes() {
    this.tasks = this.tasks.filter((task) => !task.complete);
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem("task", JSON.stringify(this.tasks));
  }

  loadLocalStorage() {
    this.tasks = localStorage.getItem("task")
      ? JSON.parse(localStorage.getItem("task"))
      : [];

      this.tasks = this.tasks.map( obj => Task.fromJson(obj));
  }
}

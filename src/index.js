import './styles.css';

import { Task, TaskList } from './class';
import { crearTaskHtml } from './js/componentes';

export const taskList = new TaskList();

taskList.tasks.forEach(crearTaskHtml);

 console.log( taskList.tasks );

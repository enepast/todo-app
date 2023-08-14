import { Todo } from '../models/todo.model';
import { createToDoHTML } from './create-todo-html';

let element;

export const renderTodos = (elementId, todos = []) => {
    if (!element) element = document.querySelector(elementId);
    if (!element) throw new Error(`Element ${elementId} not found`);
    
    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createToDoHTML(todo));
    });
}
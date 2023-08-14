import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";

const ELEMENT_IDS = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
};

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ELEMENT_IDS.TodoList, todos);
    }
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // HTML references
    const newDescriptionInput = document.querySelector(ELEMENT_IDS.NewTodoInput);
    const todoListUL = document.querySelector(ELEMENT_IDS.TodoList);

    // Listeners

    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const dataId = event.target.closest('[data-id]').getAttribute('data-id');
        if ( isDestroyElement ) todoStore.deteleTodo(dataId);
        displayTodos();
    });



}
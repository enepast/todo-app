import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPendingTodos } from "./use-cases";

const ELEMENT_IDS = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count',
};

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ELEMENT_IDS.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPendingTodos(ELEMENT_IDS.PendingCount);
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
    const clearCompletedButton = document.querySelector(ELEMENT_IDS.ClearCompleted);
    const filtersLI = document.querySelectorAll(ELEMENT_IDS.TodoFilters);

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
        if (isDestroyElement) todoStore.deteleTodo(dataId);
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLI.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLI.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');
            switch (element.target.text) {
                case 'All':
                    todoStore.setFilter(Filters.ALL);
                    break;
                case 'Pendings':
                    todoStore.setFilter(Filters.PENDING);
                    break;
                case 'Completed':
                    todoStore.setFilter(Filters.COMPLETED);
                    break;
            }
            displayTodos();
        });
    })


}
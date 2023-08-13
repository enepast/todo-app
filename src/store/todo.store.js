import { Todo } from "../todos/models/todo.model";

const Filters = {
    ALL: 'all',
    COMPLETED: 'Completed',
    PENDING: 'Pending',
};
const state = {
    todos: [
        new Todo('Practice German'),
        new Todo('Learn JavaScript'),
        new Todo('Clean the house'),
        new Todo('Feed the dogs and the cat'),
    ],
    filter: Filters.ALL,
};

const initStore = () => {
    console.log(state);
    console.log('Init Stores');
};

const loadStore = () => {
    throw new Error('Not implemented');
};

const getTodos = (filter = Filters.ALL) => {
    switch (filter) {
        case Filters.ALL:
            return [...state.todos];
        case Filters.COMPLETED:
            return state.todos.filter(todo => todo.done);
        case Filters.PENDING:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid.`);
    }
};

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
};

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) todo.done = !todo.done;
        return todo;
    });
};

const deteleTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done);
};

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.ALL) => {
    if (Object.keys(Filters).includes(newFilter)) state.filter = newFilter;
    else throw new Error(`Filter ${newFilter} is not allowed`);
};

const getCurrentFilter = () => {
    return state.filter;
};
export default {
    addTodo,
    deleteCompleted,
    deteleTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
};
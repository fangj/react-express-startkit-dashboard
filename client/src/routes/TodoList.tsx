import * as React from "react";
import TodoList from "../components/todo/TodoList";
import TodoListStore from "../stores/TodoListStore";
// require ("./TodoList.less");

export default () => {
    const todoListStore=new TodoListStore();
    return (<TodoList store={todoListStore}/>)
}
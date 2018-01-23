/**
 * Created by FangJian on 2017/6/6.
 */
import {computed, observable} from "mobx";

export default class TodoListStore {
    @observable todoItems = [];

    add(title: string) {
        this.todoItems.push(title);
    }

    get count(){
        return this.todoItems.length;
    }

    fetch() {
        this.todoItems.push("hello");
        this.todoItems.push("world");
    }
}
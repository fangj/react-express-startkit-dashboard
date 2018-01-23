/**
 * Created by FangJian on 2018/1/23.
 */

import * as React from "react";
import {observer} from "mobx-react";
import TodoListStore from "../../stores/TodoListStore";
//import * as styles from './TodoList.less';


@observer
export default class TodoList extends React.Component<{store:TodoListStore}, any> {

    componentDidMount() {
        const store=this.props.store;
        store.fetch();
    }


    render() {
        const store=this.props.store;
        return (<div>TodoList
            <ul>
                {store.todoItems.map((item,idx)=><li key={idx}>{item}</li>)}
            </ul>
        </div>)
    }
}
import * as React from "react";
import * as ReactDOM from "react-dom";

import { HashRouter, Route,Switch } from 'react-router-dom';
import HomePage from "./routes/HomePage";
import TodoList from "./routes/TodoList";

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route path="/todo" component={TodoList}/>
            <Route path="*" component={HomePage}/>
        </Switch>
    </HashRouter>

), document.getElementById('root'));
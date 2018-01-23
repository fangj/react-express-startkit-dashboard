import * as React from "react";
import * as ReactDOM from "react-dom";

import { Router, Route,Switch } from 'react-router';
import HomePage from "./routes/HomePage";
import TodoList from "./routes/TodoList";
import hashHistory from "./helpers/hashHistory";
import MainFrame from "./frame/MainFrame";

ReactDOM.render((
    <Router history={hashHistory}>
        <Switch>
            <Route path="/todo" component={TodoList}/>
            <MainFrame>
                <Route path="*" component={HomePage}/>
            </MainFrame>
        </Switch>
    </Router>

), document.getElementById('root'));
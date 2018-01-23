import * as React from "react";
import * as ReactDOM from "react-dom";

import { Router, Route,Switch } from 'react-router';
import HomePage from "./routes/HomePage";
import TodoList from "./routes/TodoList";
import hashHistory from "./helpers/hashHistory";
import MainFrame from "./frame/MainFrame";
import LoginPage from "./routes/LoginPage";
import Lock from "./routes/Lock";

ReactDOM.render((
    <Router history={hashHistory}>
        <Switch>
            <Route path="/todo" component={TodoList}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/lock" component={Lock}/>
            <MainFrame>
                <Route path="*" component={HomePage}/>
            </MainFrame>
        </Switch>
    </Router>

), document.getElementById('root'));
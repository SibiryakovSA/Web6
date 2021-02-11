import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from "./forms/LoginPage/LoginForm";
import MainForm from "./forms/MainPage/MainForm";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


function TaskRouter(){

    return(
        <Router>
            <Switch>
                <Route path="/Login">
                    <SignIn />
                </Route>
                <Route path="/Tasks">
                    <MainForm />
                </Route>
                <Route path="/">
                    <Redirect to="/Login" />
                </Route>
            </Switch>
        </Router>
    );
}

ReactDOM.render(
    <TaskRouter />,
  document.getElementById('root')
);

reportWebVitals();

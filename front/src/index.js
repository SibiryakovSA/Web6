import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from "./forms/LoginPage/LoginForm";
import MainForm from "./forms/MainPage/MainForm";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

function Test(){
    return (
        <div>
            <h1>какой то текст</h1>
            <Link to={"/login"}>login</Link>
        </div>
    );
}


ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/Login">
                <SignIn />
            </Route>
            <Route path="/Tasks">
                <MainForm />
            </Route>
            <Route path="/">
                <Test />
            </Route>
        </Switch>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();

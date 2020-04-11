import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers';
import Welcome from "./components/welcome.component";
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
import UserLogin from "./containers/login.container";
import Pokemons from "./containers/pokemons.container";
import Register from "./containers/register.container";
import LoggedInComponent from './components/loggedin.component'

const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
        <Link to={'/login'}>Login</Link>&nbsp;
        <Link to={'/register'}>Register</Link>
            <Switch>
                <Route path="/welcome" component={Welcome}/>
                <Route path="/login" component={UserLogin}/>
                <Route path="/register" component={Register}/>
                <Route path="/pokemon" component={LoggedInComponent(Pokemons)}/>
                <Redirect exact from="/" to="login"/>
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);
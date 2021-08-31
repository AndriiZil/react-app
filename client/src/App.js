import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateDoc from './pages/CreateDoc';
import 'bootstrap/scss/bootstrap.scss'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/create' component={CreateDoc} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

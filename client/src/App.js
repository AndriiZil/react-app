import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateDoc from './pages/CreateDoc';

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

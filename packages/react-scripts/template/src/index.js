import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Switch } from 'react-router';
import SignUpPage from './SignUpPage/SignUpPage';
import LoginPage from './LoginPage/LoginPage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const routes = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={SignUpPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/instructors" />
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();

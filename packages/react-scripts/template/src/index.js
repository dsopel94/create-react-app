import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Switch } from 'react-router';
import SignUpPage from './SignUpPage/SignUpPage';
import LoginPage from './LoginPage/LoginPage';
import DashboardPage from './DashboardPage/DashboardPage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';
import { Router } from 'react-router';

// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const routes = (
  <Provider store={store}>
    <BrowserRouter>

      <div>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={SignUpPage} />
        <Route exact path="/auth/dashboard" component={DashboardPage} />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();

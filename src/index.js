import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import AccessControl from './components/AccessControl';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import registerServiceWorker from './registerServiceWorker';
import chat from './reducers';
import { handleNewMessage, createNewGame } from './sagas';
import setupSocket from './sockets';
import username from './utils/name';
import { addUser } from './actions';

console.log(username);
const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, ReduxThunk)(createStore);

const store = createStoreWithMiddleware(chat);

// store.dispatch(addUser("Leon"));

const socket = setupSocket(store.dispatch, username);

sagaMiddleware.run(handleNewMessage, { socket, username });
sagaMiddleware.run(createNewGame, { socket });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={AccessControl(App)} exact/>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();

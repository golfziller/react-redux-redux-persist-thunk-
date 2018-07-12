import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configstore';
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/integration/react'

import { BrowserRouter as Router, Route } from "react-router-dom";

import axios from 'axios'
import Login from "./component/login/Login";
import Manage from "./component/manage/Manage";

const { store, persistor } = configureStore();


axios.interceptors.response.use(function (response) {
  
  return response;
}, function (error) {
  
  console.log(error.response.status)
  if (error.response.status == 401) {
    window.location.href = '/login'
  }
  return Promise.reject(error);
});

class App extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <Router>
        <div>

          <Route exact path={"/"} component={Manage} />
          <Route path={"/login"} component={Login} />


        </div>
      </Router>
    )
  }
}
ReactDOM.render(
  <Provider store={store}><PersistGate loading={null} persistor={persistor}>
    <App /></PersistGate></Provider>, document.getElementById('root'));

registerServiceWorker();

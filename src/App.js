import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import Reducers from '../store/index';
import Home from './pages/Home';

const store = createStore(Reducers, applyMiddleware(logger));

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;

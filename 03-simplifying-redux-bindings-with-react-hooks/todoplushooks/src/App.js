import React from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux'

import reducer from './reducer';
import CounterComponent from "./CounterComponent";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <CounterComponent />
        </header>
      </div>
    </Provider>
  );
}

export default App;

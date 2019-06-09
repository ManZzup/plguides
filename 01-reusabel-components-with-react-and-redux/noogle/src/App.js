import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomePageComponent from './pages/HomePageComponent';
import ResultsPageComponent from './pages/ResultsPageComponent';

import { Provider } from 'react-redux'
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={HomePageComponent} />
          <Route path="/results" component={ResultsPageComponent} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

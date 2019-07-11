// App.js

import React from 'react';
import { Provider } from 'react-redux'
import store from './store';
import ViewPageComponent from './ViewPageComponent';

function App() {
  return (
    <Provider store={store}>
      <ViewPageComponent />
    </Provider>
  );
}

export default App;
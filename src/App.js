import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'typeface-roboto';

import Home from './screens/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import './assets/css/fonts.css';

import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

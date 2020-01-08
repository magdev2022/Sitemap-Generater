import React from 'react';
import Home from './view/Home'
import { Switch, Route } from 'react-router-dom'
function App() {
  return (
    <div>
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h1>Sitemap</h1>
        </nav>
      </div>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </div>
  );
}
export default App;

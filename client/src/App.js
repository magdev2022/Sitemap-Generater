import React from 'react';
import Home from './view/Home'
import logo from './logo.png'
import { Switch, Route } from 'react-router-dom'
function App() {
  return (
    <div>
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#00AB23", color: "white", marginBottom: 20 }}>
          <img src={logo} alt="logo" style={{ marginRight: 10 }} />
          <h1>Sitemap Generater</h1>
        </nav>
      </div>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </div >
  );
}
export default App;

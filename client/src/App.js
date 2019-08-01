import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import SavedBooks from "./pages/SavedBooks";



function App() {
    const menuItems = [        
            { href: "/", name: "Search Books" },
            { href: "/saved", name: "Saved Books" }
    ]
  return (
    <Router>
      <div>
              <Nav menuItems={menuItems}/>
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/saved" component={SavedBooks} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

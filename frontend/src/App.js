import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import main from "./pages/main";
import newUser from "./pages/newUser";
import userProfile from "./pages/userProfile";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/user" />
          </Route>
          <Route exact path="/user" component={main} />
          <Route exact path="/user/newUser" component={newUser} />
          <Route exact path="/user/:email" component={userProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

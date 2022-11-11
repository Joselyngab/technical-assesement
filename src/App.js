import React from "react";
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";
import "./App.less";
/** Layouts **/
import DashboardLayoutRoute from "./layouts/dashboardLayoutRoute";
/** Components **/
import Events from "./components/event/events";

function App() {
    return (
      <Router>
        <Switch>
          <Route 
            exact 
            path="/"
            render={() => {
              return <DashboardLayoutRoute exact path="/" component={Events} />         
            }}
          >
          </Route>
        </Switch>
      </Router>
    );
  
}

export default App;
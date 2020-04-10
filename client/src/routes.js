import React from "react";
import { Router, Route, Switch } from "react-router";
import history from "./utils/history";
import Home from "./views/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Routes = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default Routes;

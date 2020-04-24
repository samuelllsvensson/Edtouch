import React, { useContext } from "react";
import { Router, Route, Switch } from "react-router";
import Context from "./utils/context";
import history from "./utils/history";
import Home from "./views/Home";
import Post from "./views/Post";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Callback from "./components/Callback";
import AuthCheck from "./utils/AuthCheck";

const Routes = () => {
  const context = useContext(Context);

  return (
    <div>
      <Router history={history}>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/post/:post_id" component={Post} />
            <Route
              path="/callback"
              render={(props) => {
                context.handleAuth(props);
                return <Callback />;
              }}
            />
            <Route path="/authcheck" component={AuthCheck} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default Routes;

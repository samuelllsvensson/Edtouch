import React, { useContext, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router";
import Context from "./utils/context";
import history from "./utils/history";
import Home from "./views/Home";
import Post from "./views/Post";
import AddPost from "./views/AddPost";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Callback from "./components/Callback";
import AuthCheck from "./utils/AuthCheck";
import Profile from "./views/Profile";

const PrivateRoute = ({ component: Component, auth }) => (
  <Route
    render={(props) =>
      auth === true ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `/authcheck?to=${history.location.pathname.substr(1)}`,
          }}
        />
      )
    }
  />
);

const Routes = () => {
  const context = useContext(Context);

  // Setup auth if access_token is stored.
  useEffect(() => {
    const accessToken = context.authObj.getAccessToken();
    const authenticated = context.authState.authenticated;

    if (accessToken && !authenticated) {
      context.authObj.getProfile();
      setTimeout(() => {
        history.replace(`/authcheck?to=${history.location.pathname.substr(1)}`);
      }, 600);
    }
  }, []);

  return (
    <div>
      <Router history={history}>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/post/:post_id" component={Post} />
            <Route path="/add-post" component={AddPost} />
            <Route
              path="/callback"
              render={(props) => {
                context.handleAuth(props);
                return <Callback />;
              }}
            />
            <Route path="/authcheck" component={AuthCheck} />
            <PrivateRoute
              auth={context.authState.authenticated}
              path="/profile"
              component={Profile}
            />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default Routes;

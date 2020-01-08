import React, { PureComponent } from "react";
import { Route, BrowserRouter, Switch, Redirect  } from 'react-router-dom';

import withAuth from "./withAuth";
import Menu from './Menu';
import RouteHandler from './RouteHandler';
import HomePage from './HomePage';
import UserFeed from './UserFeed';
import UserProfile from './UserProfile';
import Submit from './Submit';

class Routes extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <React.Fragment>
            <Switch>
              <Route path="/" exact render={ props => <Menu top={false}  /> } />    
              <Route path="/*" render={ props => <Menu top={true}  /> } />    
            </Switch>
            <section className="section">
              <div className="container is-fullhd">
                <Switch>
                  <RouteHandler exact path="/" RouteComponent={() => (<Redirect to="/home" />)} FallbackComponent={HomePage} />
                  <RouteHandler exact path="/home" RouteComponent={UserFeed} FallbackComponent={() => (<Redirect to="/login" />)} />
                  <RouteHandler exact path="/http*" RouteComponent={Submit} FallbackComponent={() => (<Redirect to="/login" />)} />

                  <Route path="/@:username" render={ props => <UserProfile key={props.match.params.username} {...props} /> } />                
                </Switch>
              </div>
            </section>
          </React.Fragment>
        </BrowserRouter>
      </React.Fragment>
    );
    
    
  }
}

export default withAuth(Routes);
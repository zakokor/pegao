import React, { PureComponent } from "react";
import { Route, BrowserRouter, Switch  } from 'react-router-dom';
import AccountService from './AccountService';
import Menu from './Menu';
import UserFeed from './UserFeed';
import UserProfile from './UserProfile';
import UserLists from './UserLists';
import UserListing from './UserListing';
//import UserFollowing from './UserFollowing';
import Submit from './Submit';

const accountService = new AccountService();

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        data: null,
      };
  }

  componentDidMount(){
    accountService.getSettings().then(res => {
        console.log('load getSettings');
        console.log(res);

        if(res.status=='200'){
          if(res && res.data)
             this.setState({ data: res.data });
        }

      }).catch(()=>{
          console.log('There was an error!');
      });
  }

  render() {
    const { data } = this.state;

    //<Route path="/@:username/following"  exact  render={ props => <UserFollowing key={props.match.params.username} {...props} /> } />

    return (
      <React.Fragment>
        {data &&
        <BrowserRouter>
          <React.Fragment>
            <Menu username={data.username} photo={data.photo} />
            <section className="section">
              <div className="container is-fullhd ">
                <Route path="/"  exact render={ props => <UserFeed {...props} me={data.username} /> } />
                <Switch>
                  <Route path="/@:username"  exact render={ props => <UserProfile key={props.match.params.username} {...props} /> } />
                  <Route path="/@:username/lists"  exact  render={ props => <UserLists key={props.match.params.username} {...props} /> } />
                  <Route path="/@:username/:list"  exact  render={ props => <UserListing key={props.match.params.username} {...props} /> } />
                </Switch>
                <Route path="/http*" render={ props => <Submit {...props} /> } />
              </div>
            </section>
            <p className="is-size-7 has-text-centered has-padding-20">
              <a className="has-text-grey has-margin-right-10" href="terms" target="_blank">Terms</a>
              <a className="has-text-grey has-margin-right-10" href="privacy" target="_blank">Privacy policy</a>
              <span className="has-text-grey has-margin-right-10">© 2019 Pegao</span>
            </p>
          </React.Fragment>
      </BrowserRouter>
        }
      </React.Fragment>
    );
  }
}

export default App;

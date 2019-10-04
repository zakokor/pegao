import React, { Component } from "react";
import { Route, BrowserRouter, Switch  } from 'react-router-dom';

import Routes from './Routes';
/*import AccountService from './AccountService';
import Menu from './Menu';
import HomePage from './HomePage';
import UserFeed from './UserFeed';
import UserProfile from './UserProfile';*/
/*import UserLists from './UserLists';
import UserListing from './UserListing';*/
//import CommunityFeed from './CommunityFeed';
//import UserFollowing from './UserFollowing';
/*import Submit from './Submit';
import { UserContext } from './Context';

const accountService = new AccountService();*/

//export const UserContext = React.createContext();

class App extends Component {
  /*constructor(props) {
    super(props);

    this.state = {
        currentUser: 1
      };
  }*/

  /*prueba(){
    return 100;
  }
  
  componentDidMount(){
    accountService.getSettings().then(res => {
        console.log('load getSettings');
        console.log(res);

        if(res.status=='200'){
          if(res && res.data){
             this.setState({ currentUser: res.data });
          }
        }
      
      console.log('this.state.currentUser',this.state.currentUser);

      }).catch(()=>{
        console.log('There was an error!');
      });
  }*/

  /*
  {currentUser &&
          <UserContext.Provider value={currentUser}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </UserContext.Provider>
        }
  */
  
  render() {
    //const { currentUser } = this.state;
    
    /*
    <React.Fragment>
        {currentUser &&
          <UserContext.Provider value={currentUser}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </UserContext.Provider>
        }
      </React.Fragment>
    */
    
    return (
      <Routes />
    );
  }
}

export default App;

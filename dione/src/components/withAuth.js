import React, { PureComponent } from "react";
import UserService from './UserService';
import { AuthContext } from './Context';

const userService = new UserService();

const withAuth = Component => {
  class AuthComponent extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
          currentUser: null, isLoadingCurrentUser: true
        };
    }
  
    componentDidMount(){
      userService.getCurrentUser().then(res => {
          console.log('load getCurrentUser');
          console.log(res);

          if(res.status=='200'){
            if(res && res.data){
               this.setState({ currentUser: res.data, isLoadingCurrentUser: false });
            }
          }

        console.log('this.state.currentUser',this.state.currentUser);

        }).catch(()=>{
          console.log('You are not log in!');
          this.setState({ isLoadingCurrentUser: false });
        });
    }
  
    render() {
      const { currentUser, isLoadingCurrentUser } = this.state;
      
      if(isLoadingCurrentUser){
        return (
          <React.Fragment>
            <div className="spinner"></div>
          </React.Fragment>
        );
      }
      
      return (
        <AuthContext.Provider value={{currentUser}}>
          {<Component />}
        </AuthContext.Provider>
      );
    }
  }

  return AuthComponent;
};

export default withAuth;
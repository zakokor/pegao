import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import throttle from 'lodash.throttle';
import Tippy from '@tippy.js/react';
import UserService from './UserService';

const userService = new UserService();
const waitTime = 1000;

class FollowButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { status: "", disabled: false};

    this.SendFollow = throttle(this.SendFollow.bind(this), waitTime); // debouncing function to 200ms and binding this
    this.SendUnFollow = throttle(this.SendUnFollow.bind(this), waitTime); // debouncing function to 200ms and binding this
  }

  componentDidMount(){
    const { username } = this.props;
    console.log('FollowButton username:'+username);

    if(username){
      userService.getFriendship(username).then(res => {
            console.log('load getFriendship');
            console.log(res);
            //console.log(res.data[0].status);
            if(res.status=='200'){
              //const data = res;
              if(res && res.data.length>0)
                 this.setState({ status: res.data[0].status });
              else
                 this.setState({ status: "nofollow" });
            }

        }).catch(()=>{
            console.log('There was an error!');
        });
    }
  }

  handleClickFollow = () => {
    if(!this.state.disabled){
      this.setState({ disabled: true });
      console.log("seguir");

      this.SendFollow();
    }
  }

  handleClickUnFollow = () => {
    if(!this.state.disabled){
      this.setState({ disabled: true });
      console.log("des-seguir");

      this.SendUnFollow();
    }
  }

  SendFollow = () => {
    const {username} = this.props;

    userService.createFriendship(username,
      {
          "status": "following",
      }
    ).then((res)=>{
      console.log("Friendship created!");
      console.log(res);

      if(res.status=='201')
        this.setState({ status: res.data.status, disabled: false });
      else
        this.setState({ status: "nofollow", disabled: false });

    }).catch(()=>{
      console.log('There was an error!.');
      this.setState({ status: "nofollow", disabled: false });
    });
  }

  SendUnFollow = () => {
    const { username } = this.props;

    userService.destroyFriendship(username).then((res)=>{
      console.log("Friendship deleted!");
      console.log(res);

      if(res.status=='204')
        this.setState({ status: "nofollow", disabled: false });
      else
        this.setState({ status: "following", disabled: false });

    }).catch(()=>{
      console.log('There was an error!.');
      this.setState({ status: "following", disabled: false });
    });
  }

  render() {
    const {status,disabled,photo} = this.state;
    const {username,title} = this.props;

    return (
        <React.Fragment>
        <span>
        { status && status=='nofollow' &&
          <a className={!disabled?'button is-small is-rounded has-te1xt-link is-success':'button is-small is-rounded has-text-link is-loading'} onClick={this.handleClickFollow}>
            Follow
          </a>
        }
        { status && status=='following' &&
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button className={!disabled?'button is-small is-rounded is-link':'button is-small is-rounded is-link is-loading'} aria-haspopup="true" aria-controls="dropdown-menu3">
                <span>Following</span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                <a className="dropdown-item is-size-7" onClick={this.handleClickUnFollow}>
                  Unfollow <strong>@{username}</strong>
                </a>
              </div>
            </div>
          </div>
        }
        </span>
        </React.Fragment>
    );
  }
}


export default FollowButton;

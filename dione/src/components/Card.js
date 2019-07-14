import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import throttle from 'lodash.throttle';
import Tippy from '@tippy.js/react';
import UserService from './UserService';
import FollowButton from './FollowButton';

const userService = new UserService();
const waitTime = 1000;

class Card extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { data: null, };
  }

  componentDidMount(){
    const { username } = this.props;
    console.log('Card username:'+username);

    if(username){
      userService.getUser(username).then(res => {
            console.log('load getUser');
            console.log(res);

            if(res.status=='200'){
              const data = res.data;
              this.setState({ data: data });
            }

        }).catch(()=>{
            console.log('There was an error!');
        });
    }
  }

  render() {
    const {data} = this.state;
    const {username} = this.props;
    console.log('render card'+username);

    return (
        <React.Fragment>
          <div className="columns is-gapless is-mobile is-centered has-p1adding-15 has-ma1rgin-bottom-0 is-multiline has-background-white1-bis has-mar1gin-top-10">
            <div className="column is-full has-text-right">
              <div className="icon is-size-5">
                <Tippy arrow={true} theme={'orange'} content="Soon!">
                  <i className="uil uil-angle-down"></i>
                </Tippy>
              </div>
            </div>
            <div className="column is-narrow">
              <div className="has-margin-bottom-10 has-pad1ding-right-15">
                <Link to={`/@`+username} className="has-text-grey is-size-7 is-pull1ed-left">
                  {data && data.photo?
                    <figure className="image avatar is-medium">
                      <img className="is-rounded" src={data.photo} />
                    </figure>
                    :
                    <p className="avatar is-medium has-text-white has-background-orange has-text-centered is-uppercase has-padding-15">
                        {username.charAt(0)}
                    </p>
                  }
                </Link>
              </div>
            </div>
            <div className="column is-full">
              <div className="columns is-multiline is-mobile is-gapless has-margin-bottom-0">
                <div className="column has-margin-lef1t-5">
                  <div className="columns is-multiline is-mobile is-gapless has-margin-bottom-0 has-marg1in-top-5">
                    <div className="column is-full has-margin-b1ottom-5 has-text-centered">
                      <span className="has-text-grey-dark is-size-5 has-text-weight-semibold has-margin-ri1ght-10">{username}</span>
                    </div>
                    <div className="column is-full has-text-centered">
                      <Link to={`#`} className="is-size-7 has-margin-right-10" >
                        <Tippy arrow={true} theme={'orange'} content="Soon!">
                        <span>Following</span>
                        </Tippy>
                      </Link>
                      <Link to={`#`} className="is-size-7 has-margin-right-10" >
                        <Tippy arrow={true} theme={'orange'} content="Soon!">
                        <span>Followers</span>
                        </Tippy>
                      </Link>
                    </div>
                    <div className="column is-full has-margin-top-10 has-text-centered">
                      <FollowButton {...this.props} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </React.Fragment>
    );
  }
}


export default Card;

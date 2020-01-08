import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from './Context';
import UserService from './UserService';
import FollowButton from './FollowButton';

const userService = new UserService();
const waitTime = 1000;

class Card extends PureComponent {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = { data: null, };
  }

  componentDidMount(){
    const { match: { params } } = this.props;
    let currentUser = this.context.currentUser;
    
    console.log('Card params.username:'+params.username);
    console.log('Card currentUser:'+currentUser);
    if(params.username){
      userService.getUser(params.username).then(res => {
            console.log('load getUser');
            console.log(res);

            if(res.status=='200'){
              const data = res.data;
              this.setState({ data: data });
            }

        }).catch(()=>{
            console.log('There was an error!');
        });
    }else if(currentUser){
      this.setState({ data: currentUser });
    }
  }

  render() {
    const {data} = this.state;
    let currentUser = this.context.currentUser;

    let divStyle = null;
    if(data)
      divStyle = {
        width: '100%',
        height: '120px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${data.cover})`,
      };

    return (
        <React.Fragment>
          {data &&
            <React.Fragment>
            <div className="card card-profile">
              <div className="card-content has-padding-0">
                <div className="card-cover">
                  <div className="header" style={divStyle}>
                    <div className="icon is-size-5 is-pulled-right has-text-white">
                        <i className="uil uil-angle-down tooltip tooltip-left" aria-label="Soon!"></i>
                    </div>
                    <div className="card-avatar">
                      <Link to={`/@`+data.username} className="has-text-grey is-size-7">
                        {data && data.photo?
                            <img className="is-rounded" src={data.photo} />
                          :
                          <p className="has-text-white has-background-orange has-text-centered is-uppercase has-padding-5">
                              {data.username.charAt(0)}
                          </p>
                        }
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body has-text-centered">
                  <div className="user-meta">
                    <h3 className="fullname">{data.fullname}</h3>
                    <h5 className="username">@{data.username}</h5>
                  </div>
                  <div className="user-bio has-text-centered">
                    <Link to={`#`} className="has-margin-right-10 tooltip tooltip-top" aria-label="Soon!">
                      <span>Following</span>
                    </Link>
                    <span className="has-text-grey-light">|</span>
                    <Link to={`#`} className="has-margin-left-10 tooltip tooltip-top" aria-label="Soon!">
                      <span>Followers</span>
                    </Link>
                  </div>
                  <div className="user-bio has-text-centered">
                    <p>{data.about}</p>
                  </div>
                  {currentUser && currentUser.username!=data.username &&
                    <div className="has-padding-top-10">
                      <FollowButton username={data.username} />
                    </div>
                  }
                </div>
              </div>
            </div>
            </React.Fragment>
          }
        </React.Fragment>
    );
  }
}

export default Card;
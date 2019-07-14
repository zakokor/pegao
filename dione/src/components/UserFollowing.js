import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import key from "weak-key";
import Card from './Card';
import UserService from './UserService';

const userService = new UserService();

class UserFollowing extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        message: "cargando...",
      };
  }

  componentDidMount(){
    const { match: { params } } = this.props;

    console.log('FollowerLoad username:'+params.username);

    if(params && params.username){
        userService.getFollowing(params.username).then(res => {
          console.log(res);

          if(res.data.length>0)
            this.setState({ data: res.data, message:"" });
          else
            this.setState({ message: "Aún no está siguiendo a nadie :(" });

        }).catch(()=>{
            console.log('There was an error!');
        });
    }
  }

  render() {
    const { data, message } = this.state;
    const { match: { params } } = this.props;

    return (
      <React.Fragment>
        <div className="columns is-desktop has-margin-top-20">
          <div className="column is-one-fifth-desktop">
            {params.username &&
              <Card username={params.username} tab={`Seguidos`} />
            }
          </div>
          <div className="column is-half-desktop">
            <div className="tabs">
              <ul>
                <li className="is-active"><a>Seguidos</a></li>
                <li><a href="followers" className="is-hidden">Seguidores</a></li>
              </ul>
            </div>
            {data && !data.length ? <p>{message}</p> : (
                data.map(hit =>
                  <div key={key(hit)} className="columns is-mobile is-vcentered is-gapless">
                    <div className="column is-narrow has-padding-right-5">
                      <p className="avatar is-medium has-text-white has-background-orange has-text-centered is-uppercase">
                          {hit.following.charAt(0)}
                      </p>
                    </div>
                    <div className="column is-6-desktop is-narrow-tablet has-margin-5">
                      <Link to={`/@`+hit.following} className="is-size-6">@{hit.following}</Link>
                    </div>
                  </div>
                )
              )
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserFollowing;

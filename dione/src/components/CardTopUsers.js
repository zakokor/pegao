import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import key from "weak-key";
import UserService from './UserService';

const userService = new UserService();

class CardTopUsers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        data: null, loaded: false
      };
  }

  componentDidMount(){

    userService.getTopUser().then(res => {
          console.log('load getTopUser',res);

          const data = res.data;
          this.setState({ data: data, loaded: true });

      }).catch(()=>{
          console.log('There was an error!');
          this.setState({ loaded: true });
      });
  }

  render() {
    const { data, loaded } = this.state;

    return (
      <React.Fragment>
        <div className="has-background-white-ter has-border-radius-5 has-padding-10">
          <p className="title is-5">See who’s here</p>
        
          <div>
            {data && data.map(hit =>
                <div key={key(hit)} className="avatar is-inline-flex has-margin-right-5">
                  <Link to={`/@`+hit.username} className="has-text-grey is-size-7">
                    {hit.photo?
                      <figure className="image avatar">
                        <img className="is-rounded" src={hit.photo} />
                      </figure>
                      :
                      <p className="avatar is-medium has-text-white has-background-orange has-text-centered is-uppercase has-padding-15">
                          {hit.username}
                      </p>
                    }
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CardTopUsers;
import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import key from "weak-key";
import UserService from './UserService';

const userService = new UserService();

class CardLists extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        data: null, loaded: false
      };
  }

  componentDidMount(){
    const { username } = this.props;

    if(username){
      userService.getUserList(username).then(res => {
            console.log('load getUserList');
            console.log(res);

            const data = res.data;
            this.setState({ data: data, loaded: true });

        }).catch(()=>{
            console.log('There was an error!');
            this.setState({ loaded: true });
        });
    }
  }

  render() {
    const { data, loaded } = this.state;
    const { username } = this.props;
    
    return (
      <React.Fragment>
        <div className="is-text-wrap">
          <span className="has-text-weight-semibold">Lists</span>
          {data && data.map(hit =>
            <span className="is-siz1e-7 has-margin-left-10" key={key(hit)}><Link to={`/@`+hit.username+`/list/`+hit.list}>{`/`+hit.list}</Link></span>
            )
          }
        </div>
      </React.Fragment>
    );
  }
}

export default CardLists;

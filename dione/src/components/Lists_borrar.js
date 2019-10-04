import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import key from "weak-key";
import Card from './Card';
import EmojiFilter from './EmojiFilter';
import SearchText from './SearchText';
import UserService from './UserService';
import MenuProfile from './MenuProfile';

const userService = new UserService();

class Lists extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        data: null, loaded: false
      };
  }

  componentDidMount(){
    const { match: { params } } = this.props;

    console.log('Lists params.username:'+params.username);
    console.log("Lists this.props.match",this.props.match)
    //console.log("params.path",params.path)

    if(params && params.username){
      userService.getUserList(params.username).then(res => {
            console.log('load Lists');
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
    const { match: { params, path } } = this.props;
    let message;
    
    if(data){
      if(data.length===0){ //si no devuelve datos, data se crea pero data.length no se crea.
        if(params && params.username)
          message = <div className="has-text-centered"><strong>@{params.username} hasn’t pasted any list</strong></div>;
      }
    }

    return (
      <React.Fragment>
        <div className="has-padding-10-15">
          {message}
          {data && data.map(hit =>
              <p key={key(hit)} className="is-size-5"><Link to={`/@`+hit.username+`/list/`+hit.list}>{`/`+hit.list}</Link></p>
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default Lists;
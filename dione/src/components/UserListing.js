import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import key from "weak-key";
import Card from './Card';
import EmojiFilter from './EmojiFilter';
import PostService from './PostService';
import Post from './Post';
import MenuProfile from './MenuProfile';

const postService = new PostService();

class UserListing extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        data: null, loaded: false
      };
  }

  componentDidMount(){
    const { match: { params } } = this.props;

    console.log('params:'+JSON.stringify(params));

    if(params && params.username && params.list){
      postService.getPostsbyUserList(params.username,params.list).then(res => {
            console.log('load getPostsbyUserList');
            //console.log(res);

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
    const { match: { params } } = this.props;
    let search, message;

    if(!loaded)
      message = <div className="help">Loading...</div>;
    else{
      if(data){
        if(data.length && data.length>0) //si no devuelve datos, data se crea pero data.length no se crea.
          search = '';//<SearchText onFilterTextChange={this.handleFilterTextChange} />; //descomentar cuando implemente la busqueda
        else{
          if(params && params.username)
            message = <div className="has-text-centered"><strong>Sorry, that page doesn’t exist!</strong></div>;
        }
      }else
        message = <div className="help">Error occurred while loading page...</div>;
    }

    return (
      <React.Fragment>
      	<div className="columns is-desktop is-gapless is-centered has-marg1in-5 is-ce1ntered has-marg1in-top-10">
      		<div className="column is-two-thirds-desktop is-squ1are has-marg1in-10  has-backgro1und-white has-padd1ing-top-0">
            {params.username && params.list &&
              <Card username={params.username} />
            }
      			<MenuProfile username={params.username} tab="Lists" />
      			<div className="is-square has-margi1n-10  has-background-white">
              <div className="is-size-5 has-margin-bottom-5">{`List /`+params.list}</div>
      				<EmojiFilter />
      				{message}
      				{search}

              {data && data.map(hit =>
                        <Post key={key(hit)} data={hit} onClickEdit={this.handleClickEdit} showphoto={true} />
                      )}
      			</div>
      		</div>
      	</div>
      </React.Fragment>
    );
  }
}

export default UserListing;

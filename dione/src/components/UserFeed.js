import React, { PureComponent } from "react";
import key from "weak-key";
import SearchText from './SearchText';
import Card from './Card';
import EmojiFilter from './EmojiFilter';
import Post from './Post';
import MenuProfile from './MenuProfile';
import PostService from './PostService';

const postService = new PostService();

class UserFeed extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        data: null, loaded: false
      };
  }

  componentDidMount(){
    const { match: { params } } = this.props;

    postService.getPosts().then(res => {
          console.log('load getPosts');
          //console.log(res);

          const data = res.data;
          this.setState({ data: data, loaded: true });

      }).catch(()=>{
          console.log('There was an error!');
          this.setState({ loaded: true });
      });
  }

  render() {
    const { data, loaded } = this.state;
    const { match: { params }, me } = this.props;
    let search, message, emojifilter;

    console.log("render dataload");

    if(!loaded)
      message = <div className="help">Loading...</div>;
    else{
      if(data){
        if(data.length && data.length>0){ //si no devuelve datos, data se crea pero data.length no se crea.
          search = '';//<SearchText onFilterTextChange={this.handleFilterTextChange} />; //descomentar cuando implemente la busqueda
          emojifilter = <React.Fragment>
                          <p className="help has-margin-bottom-5">You can see more pages in</p>
                          <EmojiFilter />
                        </React.Fragment>;
        }else{
          message = <div className="content is-medium has-padding-40">
                      <h3>Hi @{me}!</h3>
                      <p>From now on you can start to paste the links that inspire you and share them with your followers.</p>
                      <p className="has-text-centered">
                        <a href="https://pegao.co/https://pegao.co/getting-started" className="button is-link is-rounded">Paste my first link</a>
                      </p>
                      <p className="has-text-centered">
                        <a href="/getting-started" className="button is-rounded">Getting started</a>
                      </p>
                      <p></p>
                      <p></p>
                    </div>;
        }
      }else
        message = <div className="help">Error occurred while loading page...</div>;
    }

    return (
      <React.Fragment>
      	<div className="columns is-desktop is-gapless is-centered has-marg1in-5 is-ce1ntered has-marg1in-top-10">
      		<div className="column is-half-desktop is-squ1are has-marg1in-10  has-backgro1und-white has-padd1ing-top-0">
      			<MenuProfile username={me} tab="Feed" />
      			<div className="is-square has-margi1n-10  has-background-white">
              {emojifilter}
      				{message}
      				{search}
              {data && data.map(hit =>
                        <Post key={key(hit)} data={hit} onClickEdit={this.handleClickEdit} showphoto={true} />
                      )}
      			</div>
      		</div>
          <div className="column is-one-fifth-desktop">
            <div className="is-hidden-mobile has-margin-bottom-50">
            {me &&
              <Card username={me} />
            }
            </div>
      		</div>
      	</div>
      </React.Fragment>
    );
  }
}

export default UserFeed;

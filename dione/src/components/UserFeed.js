import React, { PureComponent } from "react";
import { Route  } from 'react-router-dom';

import key from "weak-key";
import throttle from 'lodash.throttle';

import { AuthContext } from './Context';

//import SearchText from './SearchText';
import SubmitText from './SubmitText';
import Card from './Card';
//import EmojiFilter from './EmojiFilter';
import Post from './Postv2';
//import MenuProfile from './MenuProfile';
import PostService from './PostService';

const postService = new PostService();
const waitTime = 1000;

class UserFeed extends PureComponent {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
        data: null, 
        loaded: false, 
        next_page: 1,
        disabled: false,
      };
    
    this.fetchPosts = throttle(this.fetchPosts.bind(this), waitTime); // debouncing function to 200ms and binding this
  }

  componentDidMount(){
    this.fetchPosts();
    
    /*const { match: { params } } = this.props;

    postService.getPosts().then(res => {
          console.log('load getPosts');
          //console.log(res);

          const data = res.data;
          this.setState({ data: data, loaded: true });

      }).catch(()=>{
          console.log('There was an error!');
          this.setState({ loaded: true });
      });*/
  }
  
  handleClickMore = () => {
    if(!this.state.disabled){
      this.setState({ loaded: false, disabled: true });

      this.fetchPosts();
    }
  }
  
  handleLinkChange = linkText => {
    console.log('link:'+linkText);
    
    this.props.history.push(linkText);
  };

  fetchPosts = () => {
    const { match: { params } } = this.props;
    
    //console.time("timer fetchPosts");
    
    postService.getPosts(this.state.next_page).then(res => {
          console.log('load getPostsbyUser',this.state.next_page);
          console.log(res);

          const data = res.data.results;
          const next_page = res.data.next;

          //console.log("this.state.data original",this.state.data);

          if(!this.state.data){
            this.setState({ data: data, next_page: next_page, loaded: true, disabled: false });
          }else{
            this.setState({ data: [...this.state.data,...data,], next_page: next_page, loaded: true, disabled: false });
          }
          //console.log("this.state.data joined",this.state.data);

      }).catch(()=>{
          console.log('There was an error!');
          this.setState({ loaded: true, disabled: false });
      });
    
    //console.timeEnd("timer fetchPosts");
  }

  render() {
    const { data, loaded, disabled } = this.state;
    //const { match: { params }, me } = this.props;
    let search, message, emojifilter;
    let currentUser = this.context.currentUser;
    //let isMobile = window.innerWidth < 960;
    
    //console.log("window.innerWidth",window.innerWidth, isMobile)
    
    /*let divStyle = null;
    if(!isMobile){
      divStyle = {height: "480px", overflow: "auto"};
    }*/
    
    /*
                        <p className="has-text-centered">
                      <a href="https://pegao.co/https://pegao.co/getting-started" className="button is-link is-rounded">Paste my first link</a>
                    </p>
    */
    
    search = '';//<SearchText onFilterTextChange={this.handleFilterTextChange} />; //descomentar cuando implemente la busqueda
    /*emojifilter = <React.Fragment>
                    <p className="help has-margin-bottom-5 is-hidden-desktop">You can see more pages in</p>
                    <EmojiFilter />
                  </React.Fragment>;*/
    
    if(loaded && data){
      if(data.length===0){ //si no devuelve datos, data se crea pero data.length no se crea.
        message = <div className="content is-medium has-padding-10 has-padding-top-30">
                    <h3>Hi @{currentUser.username}!</h3>
                    <p>From now on you can start to save the links that inspire you and share them with others.</p>
                    <p className="has-text-centered">
                      <strong>Paste your first link</strong> in the field above and click
                      <span className="icon has-border-radius-5 has-background-link has-margin-5">
                        <i className="uil uil-enter"></i>
                      </span>
                      to save it
                    </p>
                    <p className="has-text-centered">
                       — or  —
                    </p>
                    <p className="has-text-centered">
                      <a href="/tour" target="_blank" className="button is-rounded">Take a tour</a>
                    </p>
                    <p></p>
                    <p></p>
                  </div>;
      }
    }

    //      			<MenuProfile username={me} tab="Feed" />
    //<Card username={currentUser.username} />
    /*
    <div className="column is-narrow has-background-white-bis">
            <div className="emoji-filter">
              {emojifilter}
            </div>
          </div>
    */
    return (
      <React.Fragment>
      	<div className="columns is-desktop is-gapless">
          <div className="column is-one-quarter-desktop has-background-white-bis">
            <div className="is-hidden-mobile">
              <Route component={Card} />
            </div>
          </div>

      		<div className="column is-two-thirds-desktop has-border-left has-border-right">
      			<div className="has-padding-10-15 has-background-white-bis has-box-shadow">
              <SubmitText onLinkChange={this.handleLinkChange} />
      				{message}
            </div>
            <div className="has-padding-top-10">
              {data && data.map(hit =>
                  <Post key={key(hit)} data={hit} onClickEdit={this.handleClickEdit} showphoto={true} />
                )}
              <div className="has-padding-top-30 has-padding-bottom-15 has-text-centered">
                {(loaded && this.state.next_page)
                  ? <a onClick={this.handleClickMore} className={!disabled?'button is-link':'button is-link is-loading'}>
                      <span className="icon">
                        <i className="uil uil-redo is-size-5"></i>
                      </span>
                      <span className="is-size-6">Load more</span>
                    </a>
                  : ""
                }
              </div>
      			</div>
      		</div>
      	</div>
      </React.Fragment>
    );
  }
}

export default UserFeed;

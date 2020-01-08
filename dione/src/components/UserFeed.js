import React, { PureComponent } from "react";
import { Route  } from 'react-router-dom';
import key from "weak-key";
import throttle from 'lodash.throttle';
import { AuthContext } from './Context';
import SubmitText from './SubmitText';
import Card from './Card';
import Post from './Postv2';
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

    let search, message, emojifilter;
    let currentUser = this.context.currentUser;
    
    search = '';//<SearchText onFilterTextChange={this.handleFilterTextChange} />; //descomentar cuando implemente la busqueda
    
    if(loaded && data){
      if(data.length===0){ //si no devuelve datos, data se crea pero data.length no se crea.
        message = <div className="content is-medium has-padding-10 has-padding-top-30">
                    <h3>Hi @{currentUser.username}!</h3>
                    <p>Start now to <strong>remember, organize and share</strong> the <strong>links</strong> that inspire you.</p>
                    <p>
                      <i className="uil uil-spin has-text-link is-size-5"></i>
                      <strong className="is-size-5-1">Paste your first link</strong> in the field above and click
                      <span className="icon has-border-radius-5 has-background-link has-margin-5">
                        <i className="uil uil-enter"></i>
                      </span>
                      to save it
                    </p>
                    <p><i className="uil uil-spin has-text-link is-size-5"></i><strong className="is-size-5-1">Create your own lists</strong> — written with a / symbol — or just choose an emoji.</p>
                    <div className="columns is-desktop is-multiline is-gapless is-centered has-margin-left-50 has-margin-right-50 has-border-radius-5 has-padding-5 has-background-white">
                      <div className="column has-margin-bottom-30 has-text-centered">
                        <div className="is-flex is-horizontal-center">
                          <figure className="image is-400 is-hidden-touch">
                            <img src="static/img/screen-first-list.png" />
                          </figure>
                          <figure className="image is-hidden-desktop">
                            <img src="static/img/screen-first-list.png" />
                          </figure>
                        </div>
                        <p className="has-margin-top-10">
                          <span className="has-margin-right-10"><i className="em em-svg em-speaking_head"></i></span>
                          <span className="has-margin-right-10"><i className="em em-svg em-heart has-padding-5"></i></span>
                          <span className="has-margin-right-10"><i className="em em-svg em-bulb"></i></span>
                          <span className="has-margin-right-10"><i className="em em-svg em-star"></i></span>
                          <span className="has-margin-right-10"><i className="em em-svg em-round_pushpin"></i></span>
                          <span className="has-margin-right-10"><i className="em em-svg em-shopping_trolley"></i></span>
                          <span className="has-margin-right-10"><i className="em em-svg em-gift"></i></span>
                          <i className="em em-svg em-bookmark"></i>
                        </p>
                      </div>
                    </div>
                    <p><i className="uil uil-spin has-text-link is-size-5"></i><strong className="is-size-5-1">Copy your link public profile</strong> <span className="tag is-link is-medium">https://pegao.co/@{currentUser.username}</span> and share it with the world.</p>
                    <p className="has-text-centered">
                       — or  —
                    </p>
                    <p className="has-text-centered has-margin-bottom-20">
                      <a href="/tour" target="_blank" className="button is-rounded">Take a tour</a>
                    </p>
                  </div>;
      }
    }

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

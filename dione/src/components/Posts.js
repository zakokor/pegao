import React, { PureComponent } from "react";
//import { Route, BrowserRouter, Switch  } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import key from "weak-key";
import throttle from 'lodash.throttle';
//import Card from './Card';
//import EmojiFilter from './EmojiFilter';
//import SearchText from './SearchText';
import PostService from './PostService';
import Post from './Postv2';
//import MenuProfile from './MenuProfile';
//import CardLists from './CardLists';

const postService = new PostService();
const waitTime = 1000;

class Posts extends PureComponent {
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

  fetchPosts = () => {
    const { match: { params } } = this.props;

    console.log('Posts params.username:'+params.username);
    console.log("Posts this.props.match",this.props.match)
    
    //console.time("timer fetchPosts");
    
    if(params && params.username && this.state.next_page){
      postService.getPostsbyUser(params.username,this.state.next_page).then(res => {
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
            this.setState({ loaded: true, disabled: false, next_page: null });
        });
    }
    
    //console.timeEnd("timer fetchPosts");
  }

  render() {
    const { data, loaded, disabled } = this.state;
    const { match: { params, path } } = this.props;
    let message;
    
    if(loaded && data){
      if(data.length===0){ //si no devuelve datos, 'data' se crea pero data.length no se crea.
        if(params && params.username)
          message = <div className="has-text-centered"><strong>@{params.username} hasn’t pasted any link</strong></div>;
      }
    }
    if(loaded && !data){
      message = <div className="has-text-centered"><strong>This account does not exist</strong></div>;
    }
    
    return (
      <React.Fragment>
        <div className="has-padding-10-15 has-box-shado1w has-background1-light">
          <span className="title is-4 has-padding-le1ft-10">All Posts</span>
          {message}
        </div>
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
      </React.Fragment>
    );
  }
}

export default Posts;
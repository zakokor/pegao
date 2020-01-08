import React, { PureComponent } from "react";
import key from "weak-key";
import throttle from 'lodash.throttle';
import PostService from './PostService';
import Post from './Postv2';

const postService = new PostService();
const waitTime = 1000;

class HomePosts extends PureComponent {
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
    postService.getRecentPosts(this.state.next_page).then(res => {
          console.log('load getPostsbyUser',this.state.next_page);
          console.log(res);

          const data = res.data.results;
          const next_page = res.data.next;

          if(!this.state.data){
            this.setState({ data: data, next_page: next_page, loaded: true, disabled: false });
          }else{
            this.setState({ data: [...this.state.data,...data,], next_page: next_page, loaded: true, disabled: false });
          }

      }).catch(()=>{
          console.log('There was an error!');
          this.setState({ loaded: true, disabled: false });
      });
  }

  render() {
    const { data, loaded, disabled } = this.state;
    
    let message;
        
    return (
      <React.Fragment>
        <div className="has-padding-10-15 has-box-shadow">
          <p className="title is-4">Recent Links</p>
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

export default HomePosts;
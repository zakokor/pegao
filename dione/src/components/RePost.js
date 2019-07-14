import React, { PureComponent } from "react";
import throttle from 'lodash.throttle';
import PostService from './PostService';

const postService = new PostService();
const waitTime = 1000;

class RePost extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { repost: 0, reposted: this.props.reposted, disabled: false };

    this.SendRePost = throttle(this.SendRePost.bind(this), waitTime); // debouncing function to 200ms and binding this
    this.SendUnRePost = throttle(this.SendUnRePost.bind(this), waitTime); // debouncing function to 200ms and binding this
  }

  componentDidMount(){
    this.setState({ repost: this.props.repost })
  }

  handleClickRepost = () => {
    if(!this.state.disabled){
      this.setState({ disabled: true });
      console.log("votando");

      this.SendRePost();
    }
  }

  handleClickUnRepost = () => {
    if(!this.state.disabled){
      this.setState({ disabled: true });
      console.log("des-votando");

      this.SendUnRePost();
    }
  }

  SendRePost = () => {
    postService.createRePost(
      {
        "post": this.props.id,
        "status": 'repost',
      }
    ).then((res)=>{
      //console.log(res);
      console.log("reposted!");

      if(res.status=='201')
        this.setState({ repost : this.state.repost + 1, reposted: true, disabled: false });
     else
        this.setState({ reposted: false, disabled: false });

    }).catch(()=>{
      console.log('There was an error! Please re-check your form.');
      this.setState({ reposted: false, disabled: false });
    });
  }

  SendUnRePost = () => {
    postService.destroyRePost(this.props.id).then((res)=>{
      //console.log(res);
      console.log("unreposted!");

      if(res.status=='204')
        this.setState({ repost : this.state.repost - 1, reposted: false, disabled: false });
      else
        this.setState({ reposted: true, disabled: false });

    }).catch(()=>{
      console.log('There was an error! Please re-check your form.');
      this.setState({ reposted: true, disabled: false });
    });
  }

  render() {
    const {repost,reposted,disabled} = this.state;

    return (
        <React.Fragment>
        <div className="columns is-mobile is-gapless has-margin-bottom-0">
          <div className="column is-narrow">
          {!reposted ? (
            <a onClick={this.handleClickRepost} className={!disabled?'button is-rounded is-small':'button is-rounded is-small is-loading is-padding1less is-shad1owless is-inl1ine is-whi1te'}>
              <span className="icon">
                <i className="icon-svg icon-pegar"></i>
              </span>
              <span className="is-size-7">repaste</span>
            </a>
          ) : (
            <a onClick={this.handleClickUnRepost} className={!disabled?'button is-rounded is-small':'button is-rounded is-small is-loading is-padding1less is-shad1owless is-inl1ine is-whi1te'}>
              <span className="icon">
                <i className="icon-svg icon-pegar icon-pegao"></i>
              </span>
              {repost>0 &&
                <span className="is-size-7">{repost}</span>
              }
            </a>
          )}
          </div>
        </div>
        </React.Fragment>
    );


  }
}

export default RePost;

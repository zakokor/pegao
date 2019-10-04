import React, { PureComponent } from "react";
import throttle from 'lodash.throttle';

import { AuthContext } from './Context';
import PostService from './PostService';

const postService = new PostService();
const waitTime = 1000;

class Vote extends PureComponent {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = { votes: 0, voted: this.props.voted, disabled: false };

    this.SendVote = throttle(this.SendVote.bind(this), waitTime); // debouncing function to 200ms and binding this
    this.SendUnVote = throttle(this.SendUnVote.bind(this), waitTime); // debouncing function to 200ms and binding this
  }

  componentDidMount(){
    this.setState({ votes: this.props.votes })
  }

  handleClickVote = () => {
    if(!this.state.disabled){
      this.setState({ disabled: true });

      this.SendVote();
    }
  }

  handleClickUnVote = () => {
    if(!this.state.disabled){
      this.setState({ disabled: true });

      this.SendUnVote();
    }
  }

  SendVote = () => {
    postService.updateVote(
      {
        "post": this.props.id,
        "status": 'vote',
      }
    ).then((res)=>{
      console.log("voted!");

      if(res.status=='201')
        this.setState({ votes : this.state.votes + 1, voted: true, disabled: false });
     else
        this.setState({ voted: false, disabled: false });

    }).catch(()=>{
      console.log('There was an error! Please re-check your form.');
      this.setState({ voted: false, disabled: false });
    });
  }

  SendUnVote = () => {
    postService.destroyVote(this.props.id).then((res)=>{
      console.log("unvoted!");

      if(res.status=='204')
        this.setState({ votes : this.state.votes - 1, voted: false, disabled: false });
      else
        this.setState({ voted: true, disabled: false });

    }).catch(()=>{
      console.log('There was an error! Please re-check your form.');
      this.setState({ voted: true, disabled: false });
    });
  }

  render() {
    const {votes,voted,disabled} = this.state;
    let button;
    
    if(this.context.currentUser){
      if(!voted){
        button = <a onClick={this.handleClickVote} className={!disabled?'button is-danger':'button is-danger is-loading'}>
                    <span className="icon">
                      <i className="uil uil-heart is-size-5"></i>
                    </span>
                    {votes>0 &&
                      <span className="is-size-6">{votes}</span>
                    }
                 </a>;
      }else{
        button = <a onClick={this.handleClickUnVote} className={!disabled?'button is-danger':'button is-danger is-loading'}>
                    <span className="icon icon-voted">
                      <i className="uil uil-check is-size-4"></i>
                    </span>
                    {votes>0 &&
                      <span className="is-size-6">{votes}</span>
                    }
                 </a>;
      }
    }else{
      button = <a className={!disabled?'button is-danger tooltip tooltip-top':'button is-danger is-loading'} aria-label="You need to log in to vote! Not registered? Click on 'Log in' to get started for free." >
                  <span className="icon">
                    <i className="uil uil-heart is-size-5"></i>
                  </span>
                  {votes>0 &&
                    <span className="is-size-6">{votes}</span>
                  }
               </a>;
    }

    return (button);
  }
}

export default Vote;

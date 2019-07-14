import React, { PureComponent } from "react";
import throttle from 'lodash.throttle';
import PostService from './PostService';

const postService = new PostService();
const waitTime = 1000;

class Vote extends PureComponent {
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
    postService.createVote(
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

    return (
        <React.Fragment>
        <div className="columns is-mobile is-gapless has-margin-bottom-0">
          <div className="column is-narrow">
          {!voted ? (
            <a onClick={this.handleClickVote} className={!disabled?'button is-rounded is-small':'button is-rounded is-small is-loading is-paddingl1ess is-shadowl1ess is-inl1ine is-wh1ite'}>
              <span className="icon">
                <i className="uil uil-heart"></i>
              </span>
              <span className="is-size-7">vote</span>
            </a>
          ) : (
            <a onClick={this.handleClickUnVote} className={!disabled?'button is-rounded is-small':'button is-rounded is-small is-loading is-paddi1ngless is-shadowle1ss is-in1line is-wh1ite'}>
              <span className="icon icon-voted">
                <i className="uil uil-heart"></i>
              </span>
              {votes>0 &&
                <span className="is-size-7">{votes}</span>
              }
            </a>
          )}
          </div>
        </div>
        </React.Fragment>
    );
  }
}

export default Vote;

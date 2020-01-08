import React, { PureComponent } from "react";
import throttle from 'lodash.throttle';
import { AuthContext } from './Context';
import PostService from './PostService';

const postService = new PostService();
const waitTime = 1000;

class View extends PureComponent {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = { views: this.props.views, viewed: this.props.viewed, disabled: false };

    this.SendView = throttle(this.SendView.bind(this), waitTime); // debouncing function to 200ms and binding this
  }

  handleClickView = () => {
    if(!this.state.disabled){
      this.setState({ disabled: true });

      this.SendView();
    }
  }

  SendView = () => {
    postService.updateView(
      {
        "post": this.props.id,
        "status": 'viewed',
      }
    ).then((res)=>{
      //console.log(res);
      console.log("viewed!");

      if(res.status=='201')
        this.setState({ views : this.state.views + 1, viewed: true, disabled: false });
     else
        this.setState({ viewed: false, disabled: false });

    }).catch(()=>{
      console.log('There was an error! Please re-check your form.');
      this.setState({ viewed: false, disabled: false });
    });
  }

  render() {
    const {views,viewed,disabled} = this.state;
    const {link} = this.props;
    let button;
    
    if(this.context.currentUser){
      if(!viewed){
        button = <a href={link} target="_blank" rel="nofollow" onClick={this.handleClickView} className={!disabled?'button is-black':'button is-loading is-paddingless is-shadowless is-inline is-white'}>
                    <span className="icon">
                      <i className="uil uil-eye is-size-5"></i>
                    </span>
                    {views>0 &&
                      <span className="has-text-gre1y is-size-6 has-paddin1g-left-5">{views}</span>
                    }
                 </a>;
      }else{
        button = <a href={link} target="_blank" rel="nofollow" className="button is-light">
                    <span className="icon">
                      <i className="uil uil-eye is-size-5"></i>
                    </span>
                    {views>0 &&
                      <span className="has-text-gre1y is-size-6 has-paddin1g-left-5">{views}</span>
                    }
                 </a>;
      }
    }else{
      button = <a href={link} target="_blank" rel="nofollow" className="button is-black">
                    <span className="icon">
                      <i className="uil uil-eye is-size-5"></i>
                    </span>
                    {views>0 &&
                      <span className="has-text-gre1y is-size-6 has-paddin1g-left-5">{views}</span>
                    }
                 </a>;
    }

    return (button);
  }
}


export default View;

import React, { PureComponent } from "react";
import throttle from 'lodash.throttle';
import PostService from './PostService';

const postService = new PostService();
const waitTime = 1000;

class View extends PureComponent {
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
    postService.createView(
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

    return (
        <React.Fragment>
        <div className="columns is-mobile is-gapless has-margin-bottom-0">
          <div className="column is-full">
          {views>0 &&
            <span className="has-text-grey is-size-7 has-paddin1g-left-5">{views}</span>
          }
          {!viewed ? (
            <a href={link} target="_blank" onClick={this.handleClickView} className={!disabled?'has-text-link':'has-text-grey-lighter button is-loading is-paddingless is-shadowless is-inline is-white'}>
              <span className="icon">
                <i className="uil uil-window-restore"></i>
              </span>
            </a>
          ) : (
            <a href={link} target="_blank" className={!disabled?'has-text-grey':'has-text-grey-lighter button is-loading is-paddingless is-shadowless is-inline is-white'}>
              <span className="icon">
                <i className="uil uil-window-restore"></i>
              </span>
            </a>
          )}
          </div>

        </div>
        </React.Fragment>
    );


  }
}


export default View;

import React, { PureComponent } from "react";
import Tippy from '@tippy.js/react';
import Emoji from './Emoji';
import Vote from './Vote';

class EmojiFilter extends PureComponent {

  render() {
    return (
        <React.Fragment>
          <div className="field is-grouped is-grouped-multiline">
            <div className="control">
              <Tippy arrow={true} theme={'orange'} content="Soon!">
              <a href="/" className="tags has-addons" onClick={e => e.preventDefault()}>
                <span className="tag is-link has-padding-5"><i className="em em-speech_balloon"></i></span>
              </a>
              </Tippy>
            </div>
            <div href="/" className="control">
              <Tippy arrow={true} theme={'orange'} content="Soon!">
              <a className="tags has-addons" onClick={e => e.preventDefault()}>
                <span className="tag is-danger has-padding-5"><i className="em em-bulb"></i></span>
              </a>
              </Tippy>
            </div>
            <div className="control">
              <Tippy arrow={true} theme={'orange'} content="Soon!">
              <a href="/" className="tags has-addons" onClick={e => e.preventDefault()}>
                <span className="tag is-light-yellow has-padding-5"><i className="em em-heart"></i></span>
              </a>
              </Tippy>
            </div>
            <div href="/" className="control">
              <Tippy arrow={true} theme={'orange'} content="Soon!">
              <a className="tags has-addons" onClick={e => e.preventDefault()}>
                <span className="tag is-purple has-padding-5"><i className="em em-joy"></i></span>
              </a>
              </Tippy>
            </div>
            <div className="control">
              <Tippy arrow={true} theme={'orange'} content="Soon!">
              <a href="/" className="tags has-addons" onClick={e => e.preventDefault()}>
                <span className="tag is-black has-padding-5"><i className="em em-rage"></i></span>
              </a>
              </Tippy>
            </div>
            <div href="/" className="control">
              <Tippy arrow={true} theme={'orange'} content="Soon!">
              <a className="tags has-addons" onClick={e => e.preventDefault()}>
                <span className="tag is-primary has-padding-5"><i className="em em-round_pushpin"></i></span>
              </a>
              </Tippy>
            </div>
            <div href="/" className="control">
              <Tippy arrow={true} theme={'orange'} content="Soon!">
              <a className="tags has-addons" onClick={e => e.preventDefault()}>
                <span className="tag is-warning has-padding-5"><i className="em em-shopping_trolley"></i></span>
              </a>
              </Tippy>
            </div>
            <div href="/" className="control">
              <Tippy arrow={true} theme={'orange'} content="Soon!">
              <a className="tags has-addons" onClick={e => e.preventDefault()}>
                <span className="tag is-light has-padding-5"><i className="em em-bookmark"></i></span>
              </a>
              </Tippy>
            </div>
          </div>
        </React.Fragment>
    );
  }
}


export default EmojiFilter;

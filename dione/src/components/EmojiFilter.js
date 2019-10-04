import React from "react";
import { Link } from 'react-router-dom';

export default function EmojiFilter ({ username }) {  
    return (
        <React.Fragment>
          <p className="buttons has-margin-top-10 has-margin-bottom-0">
            <Link className="button is-light is-outlined" to={`/@`+username+`/emoji/speaking_head`}>
              <span className="icon is-small">
                <i className="em em-speaking_head"></i>
              </span>
            </Link>
            <Link className="button is-light" to={`/@`+username+`/emoji/heart`}>
              <span className="icon is-small">
                <i className="em em-heart"></i>
              </span>
            </Link>
            <Link className="button is-light" to={`/@`+username+`/emoji/bulb`}>
              <span className="icon is-small">
                <i className="em em-bulb"></i>
              </span>
            </Link>
            <Link className="button is-light" to={`/@`+username+`/emoji/star`}>
              <span className="icon is-small">
                <i className="em em-star"></i>
              </span>
            </Link>
            <Link className="button is-light" to={`/@`+username+`/emoji/round_pushpin`}>
              <span className="icon is-small">
                <i className="em em-round_pushpin"></i>
              </span>
            </Link>
            <Link className="button is-light" to={`/@`+username+`/emoji/shopping_trolley`}>
              <span className="icon is-small">
                <i className="em em-shopping_trolley"></i>
              </span>
            </Link>
            <Link className="button is-light" to={`/@`+username+`/emoji/gift`}>
              <span className="icon is-small">
                <i className="em em-gift"></i>
              </span>
            </Link>
            <Link className="button is-light" to={`/@`+username+`/emoji/bookmark`}>
              <span className="icon is-small">
                <i className="em em-bookmark"></i>
              </span>
            </Link>
          </p>
        </React.Fragment>
    );
}
import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import Tippy from '@tippy.js/react';

export default function MenuProfile ({ username, tab }) {

  return (
    <React.Fragment>
    <div className="tabs is-fullwidth is-size1-6-5 has-margin-top-0 has-margin-bottom-0 has-padding-top-0 has-background-white-bis">
      <ul>
        <li className={tab=="Feed"?'has-background-white is-active':undefined}>
          <Link to="/">
            <span className="has-text-weight-semibold has-padding-left-10 has-padding-right-10 has-padding-bottom-5">Wall</span>
          </Link>
        </li>
        <li className={tab=="Posts"?'has-background-white is-active':undefined}>
          <Link to={`/@`+username}>
            <span className="has-text-weight-semibold has-padding-left-10 has-padding-right-10 has-padding-bottom-5">Posts</span>
          </Link>
        </li>
        <li className={tab=="Likes"?'has-background-white is-active':undefined}>
          <Link to={`#`}>
            <Tippy arrow={false} theme={'orange'} content="Soon!">
            <span className="has-text-weight-semibold has-padding-left-10 has-padding-right-10 has-padding-bottom-5">Likes</span>
            </Tippy>
          </Link>
        </li>
        <li className={tab=="Lists"?'has-background-white is-active':undefined}>
          <Link to={`/@`+username+`/lists`}>
            <span className="has-text-weight-semibold has-padding-left-10 has-padding-right-10 has-padding-bottom-5">Lists</span>
          </Link>
        </li>
      </ul>
    </div>
    </React.Fragment>
  )
}

import React from "react";
import { Link } from 'react-router-dom';

export default function MenuProfile ({ username, tab }) {
  return (
    <div>
      <React.Fragment>
        <Link to={`/@`+username}>
          <span>All Posts</span>
        </Link>
        <span className="icon">
          <i className="uil uil-arrow-right is-size-5"></i>
        </span>
        <Link to={`#`} className="tooltip tooltip-top" aria-label="Soon!">
          <span>Likes</span>
        </Link>
      </React.Fragment>
    </div>
  )
}
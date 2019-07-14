import React from "react";

export default function Emoji(props) {

  return (
    <React.Fragment>
    {props.value && 
      <i className={'em em-svg em-'+props.value}></i>
    }
    </React.Fragment>
  );
}

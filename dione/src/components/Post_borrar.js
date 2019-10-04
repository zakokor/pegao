import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import Emoji from './Emoji';
import View from './View';
import Vote from './Vote';
import RePost from './RePost';

class Post extends PureComponent {
  constructor(props) {
    super(props);
    /*this.state = {
      hover: false
    }*/
  }

  /*toggleHover = () => {
    this.setState({hover: !this.state.hover})
  }*/

  render() {
    const { data, showphoto } = this.props;

    //const twitterUrl = `http://twitter.com/share?text=${data.text}&url=${data.link}`;//&hashtags=hashtag1,hashtag2,hashtag3`;
    //const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${data.link}`;

    //console.time("timer");
    let text = data.text;
    if(data.list){
      let [before,after] = data.text.split(' /'+data.list);
      //console.log("before",before,"after",after);

      text = data.list && before?
              <React.Fragment>
                {before}
                <Link to={`/@`+data.username+`/`+data.list}>{`/list/`+data.list}</Link>{after}
              </React.Fragment>
             :
              data.text
         ;
    }
    //console.timeEnd("timer");

    let style = "columns posts is-gapless is-mobile has-margin-bottom-0 is-multiline has-padding-10";

    //<View id={data.id} views={data.views} viewed={data.viewed} link={data.link} />
    
    return (
        <React.Fragment>
          <div className={style} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            <div className="column is-narrow">
              {showphoto &&
              <div className="post-avatar has-margin-5 has-padding-right-10">
                <Link to={`@`+data.username} className="has-text-grey is-size-7">
                  {data.photo?
                    <figure className="image avatar">
                      <img className="is-rounded" src={data.photo} />
                    </figure>
                    :
                    <p className="avatar has-text-white has-background-orange has-text-centered is-uppercase">
                        {data.username.charAt(0)}
                    </p>
                  }
                </Link>
                <div className="emoji-overlay">
                  <Emoji value={data.emoji} />
                </div>
              </div>
              }
            </div>
            <div className="column">
              <div className="columns is-multiline is-mobile is-gapless has-margin-bottom-0">
                <div className="column is-full">
                  <span className="has-text-dark is-size-6-5 has-text-weight-semibold">{data.fullname}</span>
                  <span className="is-size-6-5 has-text-grey has-margin-left-5">@{data.username}</span>
                </div>
                <div className="column">
                  <div className="columns is-multiline is-mobile is-gapless has-margin-bottom-0">
                    <div className="column is-10-touch is-8-desktop has-margin-bottom-15">
                      <p className="has-margin-top-5 is-size-6 has-line-height-15 has-text-dark">{text}</p>
                    </div>
                    <div className="column is-1-touch is-4-desktop">
                      <div className="buttons has-padding-left-5">
                        <View id={data.id} views={data.views} viewed={data.viewed} link={data.link} />
                        <Vote id={data.id} votes={data.votes} voted={data.voted} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="post-separator"><hr/><span className="has-margin-left-25 has-margin-right-25 is-size-7 has-text-grey">{format(data.created_at, 'DD MMMM, YYYY h:mma')}</span><hr/></div>
        </React.Fragment>
    );
  }
}


export default Post;

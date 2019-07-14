import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import Tippy from '@tippy.js/react';
import Emoji from './Emoji';
import View from './View';
import Vote from './Vote';
import RePost from './RePost';

class Post extends PureComponent {
  constructor(props) {
    super(props);
  }


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
                {before} <Link to={`/@`+data.username+`/`+data.list}>{`/`+data.list}</Link>{after}
              </React.Fragment>
             :
              data.text
         ;
    }
    //console.timeEnd("timer");

    return (
        <React.Fragment>
          <div className="columns is-gapless is-mobile has-margin-bottom-0 is-multiline">
            <div className="column is-narrow">
              {showphoto &&
              <div className="has-margin-top-5 has-padding-right-10">
                <Link to={`@`+data.username} className="has-text-grey is-size-7 is-pull1ed-left">
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
              </div>
              }
            </div>
            <div className="column">
              <div className="columns is-multiline is-mobile is-gapless has-margin-bottom-0">
                <div className="column is-full">
                  <span className="has-text-dark is-size-6-5 has-text-weight-semibold">{data.username}</span>
                </div>
                <div className="column is-narrow">
                  <Emoji value={data.emoji} />
                </div>
                <div className="column has-margin-left-5">
                  <div className="columns is-multiline is-mobile is-gapless has-margin-bottom-0">
                    <div className="column is-10-touch is-11-desktop has-margin-bottom-15">
                      <span className="is-size-6-5 has-line-height-15 has-text-dark has-background-war1ning">{text}</span>
                      <span className="has-margin-left-10 is-size-7 has-text-grey-light">via</span> <span className="is-size-7">{data.link.split('/')[2]}</span>
                      <span className="has-margin-left-10 is-size-7 has-text-grey-light">{distanceInWordsToNow(data.created_at)}</span>
                    </div>
                    <div className="column is-2-touch is-1-desktop has-text-right">
                      <View id={data.id} views={data.views} viewed={data.viewed} link={data.link} />
                    </div>
                    <div className="column is-one-quarter-touch is-narrow-desktop">
                      <div className="width80">
                        <Vote id={data.id} votes={data.votes} voted={data.voted} />
                      </div>
                    </div>
                    <div className="column is-one-quarter-touch is-narrow-desktop">
                      <div className="width80">
                        <RePost id={data.id} repost={data.repost} reposted={data.reposted} />
                      </div>
                    </div>
                    <div className="column has-text-right">
                      <div className="icon">
                        <Tippy arrow={true} theme={'orange'} content="Proximamente!">
                          <i className="uil uil-ellipsis-h"></i>
                        </Tippy>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-full has-margin-top-10 has-margin-bottom-10">
              <div className="divider-h"></div>
            </div>
          </div>
        </React.Fragment>
    );
  }
}


export default Post;

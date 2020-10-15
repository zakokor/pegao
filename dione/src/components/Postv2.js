import React, { PureComponent } from "react";
import { Link, useHistory, useParams, useState } from "react-router-dom";
import Emoji from "./Emoji";
import PostService from "./PostService";
import Delete from "./PostDelete";
import UserService from "./UserService";

const userService = new UserService();

class Postv2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
    };
  }
  componentDidMount() {
    userService
      .getCurrentUser()
      .then((res) => {
        console.log("load getCurrentUser");
        console.log(res);

        if (res.status == "200") {
          if (res && res.data) {
            this.setState({
              currentUser: res.data,
              isLoadingCurrentUser: false,
            });
          }
        }

        console.log("this.state.currentUser", this.state.currentUser);
      })
      .catch(() => {
        console.log("You are not log in!");
        this.setState({ isLoadingCurrentUser: false });
      });
  }
  render() {
    const { data, showphoto } = this.props;

    //const twitterUrl = `http://twitter.com/share?text=${data.text}&url=${data.link}`;//&hashtags=hashtag1,hashtag2,hashtag3`;
    //const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${data.link}`;

    //console.time("timer");
    let text;

    let styletext =
      "has-margin-top-5 has-line-height-15 has-text-dark is-size-5-1";

    if (data.list) {
      let [before, after] = data.text.split(" /" + data.list);

      text =
        data.list && before ? (
          <React.Fragment>
            <a href={data.link} rel="nofollow">
              <span className={styletext}>{before}</span>
            </a>{" "}
            <Link to={`/@` + data.username + `/list/` + data.list}>
              {`/` + data.list}
            </Link>{" "}
            <a href={data.link} target="_blank" rel="nofollow">
              <span className={styletext}>{after}</span>
            </a>
          </React.Fragment>
        ) : (
          <a href={data.link} rel="nofollow">
            <span className={styletext}>{data.text}</span>
          </a>
        );
    } else {
      text = (
        <a href={data.link} rel="nofollow">
          <span className={styletext}>{data.text}</span>
        </a>
      );
    }
    //console.timeEnd("timer");

    let style =
      "columns posts is-gapless is-mobile has-margin-bottom-0 is-multiline has-padding-10 has-padding-bottom-15";

    //<View id={data.id} views={data.views} viewed={data.viewed} link={data.link} />
    //{format(data.created_at, 'D MMM H:mm')}

    let dirtyDate = new Date(data.created_at);
    let date = dirtyDate.toDateString(); //.getDate(); //.toString()

    return (
      <React.Fragment>
        <div
          className={style}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        >
          <div className="column is-narrow">
            {showphoto && (
              <div className="post-avatar has-padding-right-20">
                <Link
                  to={`@` + data.username}
                  className="has-text-grey is-size-7"
                >
                  {data.photo ? (
                    <figure className="image avatar">
                      <img className="is-rounded" src={data.photo} />
                    </figure>
                  ) : (
                    <p className="avatar has-text-white has-background-orange has-text-centered is-uppercase">
                      {data.username.charAt(0)}
                    </p>
                  )}
                </Link>
                <div className="emoji-overlay">
                  <Emoji value={data.emoji} />
                </div>
              </div>
            )}
          </div>
          <div className="column">
            <span className="is-size-6-1 has-text-link has-margin-right-5 has-text-weight-semibold">
              <Link to={`@` + data.username}>{data.username}</Link>
            </span>
            {text}
            <br></br>
            <span className="has-margin-left-5 is-size-7 has-text-grey">
              {date}
            </span>
          </div>
          {this.state.currentUser == "" ? (
            ""
          ) : this.state.currentUser.username == data.username ? (
            <Delete username={data.username} id={data.id} />
          ) : (
            ""
          )}
        </div>

        <div className="post-separator">
          <hr />
        </div>
      </React.Fragment>
    );
  }
}

export default Postv2;

import React, { PureComponent } from "react";

import HomePosts from './HomePosts';
import CardTopUsers from './CardTopUsers';

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="columns is-desktop is-multiline is-gapless is-centered">
          <div className="column is-full has-margin-left-50 has-margin-right-50 has-margin-bottom-30 has-text-centered">
            <p className="title is-family-intro has-text-black has-margin-bottom-15"><strong className="has-text-li1nk">Save</strong> your <strong className="has-text-li1nk">links,</strong> it's free and social.</p>
            <p className="is-size-5 has-text-dark">— Pegao helps you organize your links in lists or simply with emojis.</p>
            <p className="has-margin-top-45">
              <a href="login/google-oauth2/" className="button is-google is-rounded is-medium">
                <span className="icon">
                  <i className="uil uil-google"></i>
                </span>
                <span>Sign Up Free</span>
              </a>
            </p>
            <p className="has-text-dark has-margin-top-10 has-margin-bottom-50">
              By using Pegao, you agree to our <a href="privacy" target="_blank" className="has-text-dark">Privacy policy</a> and <a href="terms" target="_blank" className="has-text-dark">Terms of service</a>.
            </p>
          </div>

          <div className="column is-half-desktop">
            <HomePosts />
          </div>

          <div className="column is-one-fifth-desktop has-margin-20">
            <CardTopUsers />
          </div>
      
          <div className="column is-full has-text-centered has-margin-left-50 has-margin-right-50 has-margin-top-50 has-margin-bottom-50">
            <h1 className="title has-margin-top-50">Log in to start</h1>
            <p>
              <a href="login/google-oauth2/" className="button is-google is-rounded is-medium">
                <span className="icon">
                  <i className="uil uil-google"></i>
                </span>
                <span>Sign Up Free</span>
              </a>
            </p>
            <p className="has-text-dark has-margin-top-10 has-margin-bottom-50">
              By using Pegao, you agree to our <a href="privacy" target="_blank" className="has-text-dark">Privacy policy</a> and <a href="terms" target="_blank" className="has-text-dark">Terms of service</a>.
            </p>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;

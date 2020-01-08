import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';

import { AuthContext } from './Context';

class Menu extends PureComponent {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { isActive: false, }
  }

  toggleNav = () => {
    console.log("this.state.isActive",this.state.isActive);

    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }


  render() {
    let currentUser = this.context.currentUser;

    return (
        <React.Fragment>
          {this.context.currentUser &&
            <nav className="navbar is-fixed-top is-pegao has-background-white" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                  <img src="/static/img/big.pegao.svg" width="140px" />
                </Link>

                <Link className="navbar-item"  to="/">
                  <span className="has-text-weight-semibold">Home</span>
                </Link>

                <Link className="navbar-item" to={`/@`+currentUser.username}>
                  <span className="has-text-weight-semibold">Profile</span>
                </Link>
      
                <span class="is-hidden-desktop is-hidden-mobile tag is-link has-margin-top-15 has-margin-right-15">
                  Supports us on  
                  <a class="has-margin-5" href="https://www.patreon.com/zakokor" target="_blank" rel="noopener nofollow noreferrer">
                      <span class="icon has-text-patreon">
                        <svg class="svg-inline" aria-hidden="true" data-prefix="fab" data-icon="patreon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8-101.7 0-184.4-82.4-184.4-183.8 0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z"></path></svg>
                      </span>
                    </a>
                    <a class="has-margin-5" href="https://ko-fi.com/zakokor" target="_blank" rel="noopener nofollow noreferrer">
                      <span class="icon">
                        <svg class="svg-inline" version="1.1" viewBox="0 0 644.8401 410.86875" xmlns="http://www.w3.org/2000/svg">
                          <g transform="translate(-37.58 -135.5)">
                          <g transform="matrix(1.1422 0 0 -1.1422 265.93 460.73)">
                          <g>
                          <path transform="matrix(1.0944 0 0 1.0944 246.86 82.861)" d="m0 0c-19.946-2.492-36.151-0.622-36.151-0.622v122.13h38.02s42.385-11.839 42.385-56.704c0-41.126-21.191-57.328-44.254-64.806m105.06 85.739c-16.628 87.821-104.44 98.734-104.44 98.734h-393.33c-12.99 0-14.588-17.148-14.588-17.148s-1.752-157.43-0.481-254.11c3.524-52.093 55.597-57.435 55.597-57.435s177.7 0.52 257.2 1.039c52.41 9.181 57.674 55.155 57.155 80.3 93.527-5.196 159.52 60.8 142.89 148.62" fill="#fff"/>
                          <path d="m0 0c4.445-2.238 7.285 0.543 7.285 0.543s65.045 59.367 94.348 93.557c26.063 30.586 27.762 82.129-16.997 101.39-44.758 19.258-81.584-22.657-81.584-22.657-31.935 35.123-80.268 33.345-102.62 9.575-22.354-23.77-14.548-64.568 2.129-87.274 15.655-21.314 84.465-82.644 94.894-93.016 0 0 0.76-0.795 2.548-2.116" fill="#ff5f5f"/>
                          </g>
                          </g>
                          </g>
                        </svg>
                      </span>
                    </a>
                    <a class="has-margin-left-5" href="https://github.com/zakokor/pegao" target="_blank" rel="noopener nofollow noreferrer">
                      <span class="icon">
                        <i class="uil uil-github has-text-black is-size-5"></i>
                      </span>
                    </a>
                </span>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarMainMenu" onClick={this.toggleNav}>
                  {currentUser.photo?
                    <div className="image has-margin-5 has-padding-5">
                      <img className="is-rounded has-border-white" src={currentUser.photo} />
                    </div>
                    :
                    <p className="avatar is-small has-text-white has-background-orange has-text-centered is-uppercase has-margin-10 has-padding-5">
                        {currentUser.username && currentUser.username.charAt(0)}
                    </p>
                  }
                </a>
              </div>
              <div id="navbarMainMenu" className={ this.state.isActive ? 'navbar-menu is-active has-background-white' : 'navbar-menu'} >

                <div className="navbar-end">
                  
                  <p class="is-hidden-touch tag is-purple has-margin-top-15 has-margin-right-15">
                    <span>We're open source on</span>
                    <a href="https://github.com/zakokor/pegao" target="_blank" rel="noopener nofollow noreferrer">
                      <i class="uil uil-github has-text-black is-size-5"></i>
                    </a>
                    — Supports us from $3 on  
                    <a class="has-margin-5" href="https://www.patreon.com/zakokor" target="_blank" rel="noopener nofollow noreferrer">
                      <span class="icon has-text-patreon">
                        <svg class="svg-inline" aria-hidden="true" data-prefix="fab" data-icon="patreon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8-101.7 0-184.4-82.4-184.4-183.8 0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z"></path></svg>
                      </span>
                    </a>
                    <a class="has-margin-5" href="https://ko-fi.com/zakokor" target="_blank" rel="noopener nofollow noreferrer">
                      <span class="icon">
                        <svg class="svg-inline" version="1.1" viewBox="0 0 644.8401 410.86875" xmlns="http://www.w3.org/2000/svg">
                          <g transform="translate(-37.58 -135.5)">
                          <g transform="matrix(1.1422 0 0 -1.1422 265.93 460.73)">
                          <g>
                          <path transform="matrix(1.0944 0 0 1.0944 246.86 82.861)" d="m0 0c-19.946-2.492-36.151-0.622-36.151-0.622v122.13h38.02s42.385-11.839 42.385-56.704c0-41.126-21.191-57.328-44.254-64.806m105.06 85.739c-16.628 87.821-104.44 98.734-104.44 98.734h-393.33c-12.99 0-14.588-17.148-14.588-17.148s-1.752-157.43-0.481-254.11c3.524-52.093 55.597-57.435 55.597-57.435s177.7 0.52 257.2 1.039c52.41 9.181 57.674 55.155 57.155 80.3 93.527-5.196 159.52 60.8 142.89 148.62" fill="#fff"/>
                          <path d="m0 0c4.445-2.238 7.285 0.543 7.285 0.543s65.045 59.367 94.348 93.557c26.063 30.586 27.762 82.129-16.997 101.39-44.758 19.258-81.584-22.657-81.584-22.657-31.935 35.123-80.268 33.345-102.62 9.575-22.354-23.77-14.548-64.568 2.129-87.274 15.655-21.314 84.465-82.644 94.894-93.016 0 0 0.76-0.795 2.548-2.116" fill="#ff5f5f"/>
                          </g>
                          </g>
                          </g>
                        </svg>
                      </span>
                    </a>
                    <span class="has-margin-5">|</span>
                    <a href="http://twitter.com/share?text=Pegao is a space to save and share curated pages with others&url=https://pegao.co" target="_blank" rel="noopener nofollow noreferrer">
                      <span class="icon has-text-twitter">
                        <i class="uil uil-twitter has-text-twitter is-size-5"></i>
                      </span>
                    </a>
                  </p>

                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link is-arrowless is-hidden-touch">
                        {currentUser.photo?
                          <figure className="image avatar is-small has-padding-5 has-marg1in-right-10">
                            <img className="is-rounded" src={currentUser.photo} />
                          </figure>
                          :
                          <p className="avatar is-small has-text-white has-background-orange has-text-centered is-uppercase has-padding-5">
                              {currentUser.username && currentUser.username.charAt(0)}
                          </p>
                        }
                    </a>

                    <div className="navbar-dropdown is-right has-padding-top-0">
                      <a className="navbar-item has-padding-left-10 tooltip" aria-label="Soon!" onClick={e => e.preventDefault()} >
                        Account
                      </a>
                      <a className="navbar-item has-padding-left-10 tooltip" aria-label="Soon!" onClick={e => e.preventDefault()} >
                        Help
                      </a>
                      <a href="logged-out/" className="navbar-item has-padding-left-10">
                        Log out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          }
          {!this.context.currentUser &&
            <nav className={this.props.top?'navbar is-fixed-top is-pegao has-background-white':'navbar is-spaced has-background-white'} role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                  <img src="/static/img/big.pegao.svg" width="140px" />
                </Link>

                <a className="navbar-item is-hidden-desktop has-margin-left-auto has-margin-right-10" href="login/google-oauth2/">
                  <span className="icon">
                    <i className="uil uil-google"></i>
                  </span>
                  <span>Log in</span>
                </a>

              </div>

              <div id="navMenuIndex" className="navbar-menu">
                <div className="navbar-end">

                  <a className="navbar-item is-hidden-touch" href="https://www.patreon.com/zakokor" target="_blank">
                    <span className="icon has-text-patreon">
                      <svg className="svg-inline" aria-hidden="true" data-prefix="fab" data-icon="patreon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8-101.7 0-184.4-82.4-184.4-183.8 0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z"></path></svg>
                    </span>
                  </a>

                  <a className="navbar-item is-hidden-touch" href="https://twitter.com/pegaoco" target="_blank">
                    <span className="icon has-text-twitter">
                      <svg className="svg-inline" aria-hidden="true" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
                    </span>
                  </a>

                  <a className="navbar-item is-hidden-touch" href="login/google-oauth2/">
                    <span className="icon">
                      <i className="uil uil-google"></i>
                    </span>
                    <span>Log in</span>
                  </a>
                </div>
              </div>
            </nav>
          }
        </React.Fragment>
    );
  }
}


export default Menu;

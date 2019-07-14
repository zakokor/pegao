import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import Tippy from '@tippy.js/react';

class Menu extends PureComponent {
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
    const { username, photo } = this.props;

    return (
        <React.Fragment>
          <nav className="navbar is-fixed-top is-pegao" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <img src="/static/img/big.pegao.svg" width="140px" />
              </Link>

              <a className="navbar-item is-hidden-desktop" href="https://github.com/zakokor/pegao" target="_blank">
                <span className="icon has-text-github">
                  <svg className="svg-inline" aria-hidden="true" data-prefix="fab" data-icon="github-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512" data-fa-i2svg=""><path fill="currentColor" d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"></path></svg>
                </span>
              </a>

              <a className="navbar-item is-hidden-desktop" href="https://twitter.com/pegaoco" target="_blank">
                <span className="icon has-text-twitter">
                  <svg className="svg-inline" aria-hidden="true" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
                </span>
              </a>

              <a className="navbar-item is-hidden-desktop" href="https://www.patreon.com/zakokor" target="_blank">
                <span className="icon has-text-patreon">
                  <svg className="svg-inline" aria-hidden="true" data-prefix="fab" data-icon="patreon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8-101.7 0-184.4-82.4-184.4-183.8 0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z"></path></svg>
                </span>
              </a>

              <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarMainMenu" onClick={this.toggleNav}>
                {photo?
                  <div className="image avat1ar is-sma1ll has-margin-5 has-padding-5">
                    <img className="is-rounded has-border-white" src={photo} />
                  </div>
                  :
                  <p className="avatar is-small has-text-white has-background-orange has-text-centered is-uppercase has-margin-10 has-padding-5">
                      {username.charAt(0)}
                  </p>
                }
              </a>
            </div>
            <div id="navbarMainMenu" className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'} >
              <div className="navbar-start">

              </div>

              <div className="navbar-end">
                <a className="navbar-item is-hidden-touch" href="https://github.com/zakokor/pegao" target="_blank">
                  <span className="icon has-text-github">
                    <svg className="svg-inline" aria-hidden="true" data-prefix="fab" data-icon="github-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512" data-fa-i2svg=""><path fill="currentColor" d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"></path></svg>
                  </span>
                </a>

                <a className="navbar-item is-hidden-touch" href="https://twitter.com/pegaoco" target="_blank">
                  <span className="icon has-text-twitter">
                    <svg className="svg-inline" aria-hidden="true" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
                  </span>
                </a>

                <div className="navbar-item">
                  <div className="field is-grouped is-grouped-multiline">
                    <p className="control">
                      <a className="bd-patreon-button" href="https://www.patreon.com/zakokor" target="_blank">
                        <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" alt="Become a Patron" width="148" height="36" />
                      </a>
                    </p>
                  </div>
                </div>

                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link is-arrowless is-hidden-touch">

                      {photo?
                        <figure className="image avatar is-small has-padding-5 has-marg1in-right-10">
                          <img className="is-rounded" src={photo} />
                        </figure>
                        :
                        <p className="avatar is-small has-text-white has-background-orange has-text-centered is-uppercase has-padding-5">
                            {username.charAt(0)}
                        </p>
                      }

                  </a>

                  <div className="navbar-dropdown is-right has-padding-top-0">
                    <Tippy arrow={true} theme={'orange'} content="Soon!">
                    <a className="navbar-item has-padding-left-10" onClick={e => e.preventDefault()} >
                      Account
                    </a>
                    </Tippy>
                    <Tippy arrow={true} theme={'orange'} content="Soon!">
                    <a className="navbar-item has-padding-left-10" onClick={e => e.preventDefault()} >
                      Help
                    </a>
                    </Tippy>
                    <a href="logged-out/" className="navbar-item has-padding-left-10">
                      Log out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </React.Fragment>
    );
  }
}


export default Menu;

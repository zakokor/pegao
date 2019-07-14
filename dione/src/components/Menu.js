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

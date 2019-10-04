import React, { PureComponent } from "react";
import { Route, Switch } from 'react-router-dom';
//import { Link } from 'react-router-dom';
//import key from "weak-key";
//import throttle from 'lodash.throttle';
import Card from './Card';
import EmojiFilter from './EmojiFilter';
//import SearchText from './SearchText';
import MenuProfile from './MenuProfile';

import Posts from './Posts';
//import Lists from './Lists';
import List from './List';
import PostsEmoji from './PostsEmoji';
import CardLists from './CardLists';

class UserProfile extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { match: { params } } = this.props;
    let search, emojifilter;

    search = '';//<SearchText onFilterTextChange={this.handleFilterTextChange} />; //descomentar cuando implemente la busqueda
    emojifilter = <React.Fragment>
                    <EmojiFilter />
                  </React.Fragment>;
    
    /*
    <div className="column is-narrow has-background-white-bis">
            <div className="emoji-filter has-text-centered">
              {emojifilter}
            </div>
          </div>
    */
    
    //<Route path="/@:username/lists"  exact  render={ props => <Lists key={props.match.params.username} {...props} /> } />
    
    return (
      <React.Fragment>
      	<div className="columns is-desktop is-gapless">
          <div className="column is-one-quarter-desktop has-background-white-bis">
            <Route component={Card} />
          </div>

      		<div className="column is-two-thirds-desktop has-border-left has-border-right">
            <div className="has-padding-10-15 has-box-shadow has-background-light-blue">
              <MenuProfile username={params.username} tab="Posts" />
              <EmojiFilter username={params.username} />
              <CardLists username={params.username} />
            </div>
            <Switch>
              <Route path="/@:username"  exact render={ props => <Posts key={props.match.params.username} {...props} /> } />
              
              <Route path="/@:username/emoji/:emoji"  exact  render={ props => <PostsEmoji key={props.match.params.username+props.match.params.emoji} {...props} /> } />
      
              <Route path="/@:username/list/:list"  exact  render={ props => <List key={props.match.params.username+props.match.params.list} {...props} /> } />
            </Switch>
      		</div>
      	</div>
      </React.Fragment>
    );
  }
}

export default UserProfile;

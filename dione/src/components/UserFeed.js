import React, { PureComponent } from "react";
import key from "weak-key";
import SearchText from './SearchText';
import Card from './Card';
import EmojiFilter from './EmojiFilter';
import Post from './Post';
import MenuProfile from './MenuProfile';
import PostService from './PostService';

const postService = new PostService();

class UserFeed extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        data: null, loaded: false
      };
  }

  componentDidMount(){
    const { match: { params } } = this.props;

    postService.getPosts().then(res => {
          console.log('load getPosts');
          //console.log(res);

          const data = res.data;
          this.setState({ data: data, loaded: true });

      }).catch(()=>{
          console.log('There was an error!');
          this.setState({ loaded: true });
      });
  }

  render() {
    const { data, loaded } = this.state;
    const { match: { params }, me } = this.props;
    let search, message, emojifilter;

    console.log("render dataload");

    if(!loaded)
      message = <div className="help">Loading...</div>;
    else{
      if(data){
        if(data.length && data.length>0){ //si no devuelve datos, data se crea pero data.length no se crea.
          search = '';//<SearchText onFilterTextChange={this.handleFilterTextChange} />; //descomentar cuando implemente la busqueda
          emojifilter = <React.Fragment>
                          <p className="help has-margin-bottom-5">You can see more pages in</p>
                          <EmojiFilter />
                        </React.Fragment>;
        }else{
          message = <div class="content">
                      <div class='is-flex is-horizontal-center has-margin-top-15'>
                        <figure class="image is-64x64">
                          <img src="static/img/1f603.svg" />
                        </figure>
                      </div>
                      <h1>Hi @{me}! Start saving and sharing pages!</h1>
                      <p>From now on you can start to paste the links that inspire you and share them with your followers.</p>
                      <p>Pasting a link is very simple, write in the address bar of the browser <strong>"pegao.co<span className="is-size-6">/</span>"</strong> before the link you want to share and press "Paste".</p>
                      <div className="has-text-centered has-margin-top-15"><img src="static/img/howtopost.gif" width="500px" /></div>
                      <h3>How to use lists</h3>
                      <p>A list —written with a <strong>/</strong> symbol— is a curated group of links. You can create your own lists with your links to easily categorize them.</p>
                      <ul>
                        <li>Only one list can be included by post, and we recommend type a list at the end in a post.</li>
                        <li>You cannot add spaces or punctuation in a list, or it will not work properly.</li>
                        <li>You can see your own lists, or someone else's, by visiting the profile page. Note that lists are public and anyone can view them.</li>
                      </ul>
                      <p className="has-text-weight-semibold">Example of a post with a list:</p>
                      <div class="has-text-centered width1010 has-margin-left-30 has-margin-right-30">
                        <textarea class="textarea is-info is-small" rows="2" readonly="readonly">Example Domain /myfirstlist</textarea>
                        <p class="is-size-7 has-text-right has-text-link">example.com</p>
                      </div>
                      <p></p>
                      <p></p>
                    </div>;
        }
      }else
        message = <div className="help">Error occurred while loading page...</div>;
    }

    return (
      <React.Fragment>
      	<div className="columns is-desktop is-gapless is-centered has-marg1in-5 is-ce1ntered has-marg1in-top-10">
      		<div className="column is-half-desktop is-squ1are has-marg1in-10  has-backgro1und-white has-padd1ing-top-0">
      			<MenuProfile username={me} tab="Feed" />
      			<div className="is-square has-margi1n-10  has-background-white">
              {emojifilter}
      				{message}
      				{search}
              {data && data.map(hit =>
                        <Post key={key(hit)} data={hit} onClickEdit={this.handleClickEdit} showphoto={true} />
                      )}
      			</div>
      		</div>
          <div className="column is-one-fifth-desktop">
            <div className="is-hidden-mobile has-margin-bottom-50">
            {me &&
              <Card username={me} />
            }
            </div>
      		</div>
      	</div>
      </React.Fragment>
    );
  }
}

export default UserFeed;

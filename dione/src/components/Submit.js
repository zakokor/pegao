import React, { PureComponent } from "react";
import throttle from 'lodash.throttle';
import queryString from 'query-string';
import Tippy from '@tippy.js/react';
import ContentEditable from "react-contenteditable";
import PostService from './PostService';

const postService = new PostService();
const waitTime = 1000;

class Submit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
				formFields: {
					link: '',
          emoji: '',
					text: '',
				},
        emojis: [
          {
            emoji:'speaking_head',
            label: 'Share',
          },
          {
            emoji:'smiley',
            label: 'Like',
          },
          {
            emoji:'rage',
            label: 'Angry',
          },
          {
            emoji:'bulb',
            label: 'Idea',
          },
          {
            emoji:'star',
            label: 'Fav page',
          },
          {
            emoji:'round_pushpin',
            label: 'Place',
          },
          {
            emoji:'shopping_trolley',
            label: 'Shopping',
          },
          {
            emoji:'gift',
            label: 'Gift list',
          },
          {
            emoji:'bookmark',
            label: 'Read later',
          },
        ],
        currentcolumn: -1,
        disabled: false,
        sent: false,
        message: '',
      };

    this.SendPost = throttle(this.SendPost.bind(this), waitTime); // debouncing function to 200ms and binding this
  }

  handleClickEmoji = column => {
    const {formFields,currentcolumn} = this.state;
    const emojis = this.state.emojis.slice();

    console.log('column',column);
    console.log('currentcolumn',currentcolumn);
    console.log('emojis[column]',emojis[column]);

    if(column != currentcolumn){
      formFields['emoji'] = emojis[column].emoji;
      console.log("formFields['emoji']",formFields['emoji']);

      return this.setState({ currentcolumn: column, formFields: {...formFields } });
    }
    console.log('es la misma columna');

    const emojilists = [
        /*{
          id: 0,
          list: [
            {
              emoji:'speaking_head',
              label: 'Share',
            },
            {
              emoji:'computer',
              label: 'Tech',
            },
            {
              emoji:'family',
              label: 'Family',
            },
            {
              emoji:'woman_lifting_weights',
              label: 'Fit',
            },
          ]
        },*/
        {
          id: 1,
          list: [
            {
              emoji:'smiley',
              label: 'Like',
            },
            {
              emoji:'heart',
              label: 'Love',
            },
          ]
        },
        {
          id: 2,
          list: [
            {
              emoji:'rage',
              label: 'Angru',
            },
            {
              emoji:'hushed',
              label: 'Wow',
            },
            {
              emoji:'cry',
              label: 'Sad',
            },
          ]
        },
    ];

    //se ubica en la lista correcta
    let emojilist = emojilists.find(item => {
      return item.id === column;
    });
    console.log('emojilist',emojilist)

    //busca el siguiente emoji de la columna
    if(emojilist){
      let index = emojilist.list.findIndex(item => {
        return item.emoji === emojis[column].emoji;
      }) + 1;
      console.log("index",index);

      if(index == emojilist.list.length)
        index = 0;

      console.log('next:',emojilist.list[index].emoji);

      emojis[column] = emojilist.list[index];

      formFields['emoji'] = emojilist.list[index].emoji;
      console.log("formFields['emoji']",formFields['emoji']);

      this.setState({ emojis, currentcolumn: column, formFields: {...formFields } });
    }
  }

  componentDidMount(){
    const { match: { params } } = this.props;
		const {formFields} = this.state;

    //suma a la url el valor en location.search, en caso que el link tengo query string ej. /?q=something
    postService.getSubmit(this.props.location.pathname.substr(1, this.props.location.pathname.length)+this.props.location.search).then(res => {
        console.log('load getSubmit');
        console.log(res);

        if(res.data.url.length>0){
          formFields['text'] = res.data.title;
          formFields['link'] = res.data.url;

          this.setState({ formFields: {...formFields } });
        }else{
          this.setState({disabled: true, message:'There was an error loading the page! Try again.'});
        }

      }).catch(()=>{
          console.log('There was an error!');
          this.setState({disabled: true, message:'There was an error loading the page! Try again.'});
      });

  }

  handleSubmit = e => {
    e.preventDefault();

    if(!this.state.disabled){
      const {formFields} = this.state;

      if(!formFields['text'] || formFields['text'].length<=0){
        this.setState({message: 'Write a text before pasting!'});
      }else if(formFields['text'].length>150){
        this.setState({message: 'Write a shorter text before pasting: '+(150-formFields['text'].length) });
      }else if(!formFields['emoji'] || formFields['emoji'].length<=0){
        this.setState({message: 'Choose an emoji before pasting!'});
      }else{
        this.setState({ disabled: true });

        this.SendPost();
      }
    }
  }

  SendPost(){
    const {formFields} = this.state;

    postService.createPost(
      formFields
    ).then((result)=>{
      console.log("Post created!");

      if(result.status=='201'){
        this.setState({ sent: true, message: '' });

        this.props.history.push("/");
      }else
        this.setState({message: 'There was an error! Try again.', disabled: false});

    }).catch(()=>{
      console.log('There was an error!');
      this.setState({message: 'There was an error! Try again.', disabled: false});
    });
  }

  handleChange = e => {
    const {formFields} = this.state;

    formFields['text'] = e.target.value;

    if(formFields['text'].length>120)
      this.setState({message: (150-formFields['text'].length) });

    this.setState({ formFields: {...formFields } });
  };

  handleKeyDown = event => {
    const keyCode = event.keyCode || event.which

    //this.setState({message: keyCode});

    if (keyCode === 13) {
      event.returnValue = false
      if (event.preventDefault) event.preventDefault()
    }
  }

  render() {
    const {formFields,disabled,message,sent,emojis} = this.state;

    const emojilist = emojis.map((emojis,index) =>
        <Tippy key={index} hideOnClick={false} arrow={true} theme={'grey'} content={emojis.label}>
          <span key={index} className="button is-white is-rounded is-paddingless is-shadowless is-inline-table has-margin-5">
            <a onClick={() => this.handleClickEmoji(index)}>
              <i className={formFields['emoji']==emojis.emoji?'em em-svg em-'+emojis.emoji+' is-extra-large':'em em-svg em-'+emojis.emoji+' is-large'}></i>
            </a>
          </span>
        </Tippy>
    );

    return (
      <React.Fragment>
      <section className="hero is-white is-fullheight-with-navbar">
        <div className="hero-body has-padding-top-0">
          <div className="container">
            <form onSubmit={this.handleSubmit} className="has-backg1round-white">
              <div className="columns is-multiline is-mobile is-centered is-gapless">
                <div className="column is-three-fifths-desktop is-full-touch has-margin-bottom-10">
                  <h1 className="title is-auto-3 has-text-info">Save and share as...</h1>
                </div>
                <div className="column is-three-fifths-desktop is-full-touch has-text-centered">
                  <textarea className="textarea is-info is-large"
                      value={formFields['text']}

                      onKeyDown={this.handleKeyDown}
                      onChange={this.handleChange}
                  />
                  <h2 className="is-size-6 has-text-right">
                    <a href={formFields['link']}>{formFields['link'].split('/')[2]}</a>
                  </h2>
                </div>
                <div className="column is-full has-text-centered">
                  {emojilist}
                </div>
                <div className="column is-full has-margin-top-50">
                  <div className="is-pulled-right has-padding-right-10">
                    <span className="has-text-gray">
                      <span className="has-padding-right-10">
                        <i className="uil uil-globe is-size-3"></i>
                      </span>
                    </span>
                    {!sent? (
                      <button className={!disabled?'button is-medium is-link':'button is-medium is-link is-loading'}>Paste</button>
                    ):(
                      <button className="button is-medium is-link" disabled>Done!</button>
                    )}
                  </div>
                </div>
                <div className="column is-full has-margin-top-10">
                  <div className="is-pulled-right has-padding-right-10">
                    <span className="has-text-black-bis">{message}</span>
                  </div>
                </div>
              </div>
            </form>
            </div>
        </div>
      </section>
      </React.Fragment>
    );
  }
}

export default Submit;

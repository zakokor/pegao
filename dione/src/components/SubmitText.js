import React, { PureComponent } from "react";
//import Validator from 'validatorjs';
//import en from 'validatorjs/src/lang/en';

class SubmitText extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      message: null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    
    let index = 1;
    const value = e.target.link.value;
    
    //let re = /^(?:(?:https?):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    //let re = /^(?:(https?):\/\/)(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    let re = /^(?:(https?):\/\/)(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[a-zA-Z0-9&=?@_\-+.:%\/#(),]*)?$/;
    console.log(re.test(value));
    
    if(re.test(value)){
      this.setState({ message: null });
      
      this.props.onLinkChange(e.target.link.value);
    }else{
      this.setState({ message: 'Invalid URL. Please make sure your URLs begin with \"http\"' });
    }
    
    //Validator.setMessages('en', en);
    //Validator.useLang('en');
    //let validation = new Validator({ link: value }, {link: 'required|url|max:200'}, { url: 'Invalid URL. Please make sure your URLs begin with "http..."' });
    
    
    //console.log("validation.passes()",validation.passes());
    //console.log("validation.errors.all();",validation.errors.all());
    
    /*if(validation.passes()){
      index = value.indexOf(' ');
      if(index>0){
        this.setState({ message: 'Invalid URL. Your URLs contain spaces. Please replace any spaces with the appropriate URL encoded entities.' });
        
        return;
      }
      
      index = value.indexOf('\\');
      if(index>0){
        this.setState({ message: 'Invalid URL. Your URLs contain backslashes. Please make sure your URLs only contain forward slashes (\/).' });
        
        return;
      }
      
      this.setState({ message: null });
      this.props.onLinkChange(e.target.link.value);
      
    }else{
      this.setState({ message: validation.errors.first('link') });
    }*/
    
  };

  render() {
    const {message} = this.state;
    let notification;
    if(message)
      notification = <p className="has-text-weight-semibold">{message}</p>;
    //<p className="help is-danger">{formErrors['link']}</p>
    return (
      <div className="field">
        <form onSubmit={this.handleSubmit}>
          <div className="field has-addons">
            <p className="control is-expanded">
              <input className="input" name="link" type="text" placeholder="https://" value={this.props.linkText} autoComplete="off" />
            </p>
            <p className="control">
              <button type="submit" className="button is-link">
                <span className="icon">
                  <i className="uil uil-enter"></i>
                </span>
              </button>
            </p>
          </div>
          {notification}
        </form>
      </div>
    );
  }
}

export default SubmitText;
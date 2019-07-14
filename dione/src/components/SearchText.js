import React, { PureComponent } from "react";

class SearchText extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    this.props.onFilterTextChange(e.target.search.value);
    e.preventDefault();
  };

  render() {
    return (
      <div className="field">
        <form onSubmit={this.handleSubmit}>
          <div className="field has-addons">
            <p className="control is-expanded">
              <input className="input" name="search" type="text" placeholder="Buscar" value={this.props.filterText} />
            </p>
            <p className="control">
              <button type="submit" className="button is-link">
                <span className="icon">
                  <i className="uil uil-search"></i>
                </span>
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchText;
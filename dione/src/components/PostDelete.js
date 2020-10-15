import React, { PureComponent, useState } from "react";
import { Modal } from "./Modal";
import UserService from "./UserService";

const userService = new UserService();

class Delete extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalState: false,
      username: this.props.username,
      id: this.props.id,
      currentUser: "",
      isLoadingCurrentUser: true,
    };

    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal() {
  
      this.setState((prev, props) => {
        const newState = !prev.modalState;

        return { modalState: newState };
      });
    
  }

  render() {
  
    

    return (
      <div className="column is-gapless is-narrow">
        {this.state.currentUser.username == this.state.username
          ?  <Modal
          isErrorModal={false}
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          title="Delete item"
          data={{ uname: this.state.username, id: this.state.id }}
        >Are you sure want to delete this item?</Modal>
          : <Modal 
          isErrorModal={true}
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          title="Error"
          data={{ uname: this.state.username, id: this.state.id }}
        >You are not the author of this post.</Modal>}

        <a onClick={this.toggleModal}>
          <span className="icon">
            <i className="uil uil-trash"></i>
          </span>
        </a>
      </div>
    );
  }
}

export default Delete;

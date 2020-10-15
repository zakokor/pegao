import React, { useState } from "react";
import PropTypes from "prop-types";
import PostService from "./PostService";
import { Link, useHistory, useParams } from "react-router-dom";

const postService = new PostService();

export const Modal = ({
  children,
  closeModal,
  modalState,
  isErrorModal,
  title,
  data,
}) => {
  if (!modalState) {
    return null;
  }
  const history = useHistory();
  const handleDelete = () => {
    postService
      .deletePost(data.uname, data.id)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(closeModal)
      .then(function () {
        history.push({
          pathname: "/",
        });
        window.location.reload();
      });
  };
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">
        <article
          className={isErrorModal ? "message is-danger" : "message is-warning"}
        >
          <div class="message-header">
            <p>{title}</p>
            <button
              className="delete"
              aria-label="delete"
              onClick={closeModal}
            ></button>
          </div>
          <div className="message-body">
            <div className="columns">
              <div className="column">
                <p>{children}</p>
              </div>
              <div className="column is-narrow">
                <p className="mx-1">
                  <button
                    id="delete-item"
                    className="button is-primary px-1"
                    onClick={isErrorModal ? closeModal : handleDelete}
                  >
                    Ok
                  </button>

                  {isErrorModal ? (
                    ""
                  ) : (
                    <button
                      className="button is-danger px-1"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
      {/* <button class="modal-close is-large" aria-label="close"></button> */}
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

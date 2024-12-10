import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Modal.css";
import { Link } from "react-router-dom";

const AnimatedModal = ({ isOpen, onRequestClose, closeModal }) => {
  const [modalClass, setModalClass] = useState("modal-translate");

  useEffect(() => {
    if (isOpen) {
      setTimeout(
        () => setModalClass("modal-translate modal-translate-active"),
        10
      );
    } else {
      setModalClass("modal-translate"); // Reset class when modal is closed
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen} // This controls the visibility of the modal
      onRequestClose={onRequestClose} // This will close the modal when clicked outside
      className={modalClass}
      overlayClassName="Overlay" // Add correct class for styling
    >
      <div className="choose-account">
        <h2>Choose Account</h2>
        <div>
          <div className="guest-account">
            <h4>Guest</h4>
            <p>features</p>
            <ul>
              <li>Can rate movies/TV shows.</li>
              <li>Ratings are anonymous and not linked to a user profile.</li>
              <li>
                Cannot create watchlists, add favorites, or track viewing
                history.
              </li>
              <li>session is valid for about 24 hours</li>
            </ul>
            <Link
              to={"/create-guest"}
              style={{
                all: "unset",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className="button guest">Create guest Account</button>
            </Link>
          </div>
          <div className="login-account">
            <h4>Login</h4>
            <p>features</p>
            <ul>
              <li>Create Watchlists , favorites , personal lists.</li>
              <li>Persistent account </li>
              <li>
                Can rate movies/TV shows and ratings are tied to the user
                profile.
              </li>
              <li>Can track viewing history and mark content as watched.</li>
            </ul>
            <Link
              to={"/login"}
              style={{
                all: "unset",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className="button">Login</button>
            </Link>
          </div>
        </div>
        <button onClick={closeModal} className="close-button">
          <span className="X"></span>
          <span className="Y"></span>
          <div className="close">Close</div>
        </button>
      </div>
    </Modal>
  );
};

export default AnimatedModal;

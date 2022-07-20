import React, { Component } from "react";
import { createPortal } from 'react-dom';
import { ReactComponent as Close } from '../Images/close.svg';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  state = {
    status: 'idle',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  };

  handleBackdrop = e => {
    const {onClick} = this.props;
    if (e.currentTarget === e.target) onClick();
  };

  handleEscape = e => {
    const {onClick} = this.props;
    if (e.code === "Escape") onClick();
  };

  render() {
    const {onClick, src} = this.props;
    return createPortal(
      <div
        className={css.overlay}
        onClick={this.handleBackdrop}
      >
        <div className={css.modal}>
          <Close
            className={css.icon}
            onClick={onClick}
           />
           <img src={src} alt=""/>
        </div>
      </div>,
      modalRoot
    );
  }
};

export default Modal;

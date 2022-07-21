import React, { useEffect } from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ReactComponent as Close } from '../Images/close.svg';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({onClick, src}) {

  useEffect(() => {
    const  handleEscape = e => {
    if (e.code === "Escape") onClick();
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    }
  }, [onClick]);

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) onClick();
  };

    return createPortal(
      <div
        className={css.overlay}
        onClick={handleBackdrop}
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
};

export default Modal;

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string,
}

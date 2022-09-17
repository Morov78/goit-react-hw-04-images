import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackDropClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    ModalRoot
  );
}

Modal.prototype = {
  onClose: PropTypes.func.isRequired,
};

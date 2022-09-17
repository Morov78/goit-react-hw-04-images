import css from './ImageGalleryItem.module.css';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ smallPicture, largePicture, tags }) {
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <img
        onClick={toggleShowModal}
        className={css['ImageGalleryItem-image']}
        src={smallPicture}
        alt={tags}
      />
      {showModal && (
        <Modal onClose={toggleShowModal}>
          <img
            className={css['ImageGalleryItem-large-image']}
            src={largePicture}
            alt={tags}
            loading="lazy"
          />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.prototype = {
  smallPicture: PropTypes.string.isRequired,
  largePicture: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

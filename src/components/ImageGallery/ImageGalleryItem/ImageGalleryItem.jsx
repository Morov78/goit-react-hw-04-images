import css from './ImageGalleryItem.module.css';
import { Component } from 'react';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { smallPicture, largePicture, tags } = this.props;

    return (
      <>
        <img
          onClick={this.toggleShowModal}
          className={css['ImageGalleryItem-image']}
          src={smallPicture}
          alt={tags}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleShowModal}>
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
}

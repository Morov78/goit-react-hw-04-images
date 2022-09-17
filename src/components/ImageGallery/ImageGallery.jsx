import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ pictures }) {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <li className={css.ImageGalleryItem} key={id}>
            <ImageGalleryItem
              smallPicture={webformatURL}
              largePicture={largeImageURL}
              tags={tags}
            />
          </li>
        );
      })}
    </ul>
  );
}

ImageGallery.prototype = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

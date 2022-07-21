import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({webformatURL, tags, largeImageURL, imagesClick}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
          className={css.imageGalleryItem__image}
          src={webformatURL}
          alt={tags}
          onClick={() => imagesClick(largeImageURL)}
      />
    </li>
  )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
}

import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({images, imagesClick}) => {
  return (
    <ul className={css.gallery}>
      {images.map(({id, webformatURL, tags, largeImageURL}) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          imagesClick={imagesClick}
        />
      ) )}
    </ul>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ),
  imagesClick: PropTypes.func,
}

export default ImageGallery;

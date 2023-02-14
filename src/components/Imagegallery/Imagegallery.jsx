import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css'

export function Imagegallery({ images, onClick }) {
    return (
      <ul className={css.gallery} onClick={onClick}>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            pageUrl={webformatURL}
            alt={tags}
            datalargeimg={largeImageURL}
          />
        ))}
      </ul>
    );
}
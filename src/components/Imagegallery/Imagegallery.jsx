import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css'

export function Imagegallery({ images }) {
    return (
      <ul className={css.gallery}>
        {images.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem key={id} pageUrl={webformatURL} alt={tags} />
        ))}
      </ul>
    );
}
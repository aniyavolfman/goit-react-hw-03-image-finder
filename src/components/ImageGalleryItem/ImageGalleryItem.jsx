import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export function ImageGalleryItem({ pageUrl, alt }) {

  return (
    <li className={css.galleryItem}>
      <img src={pageUrl} alt={alt} className={css.galleryItemImage} />
    </li>
  );
}

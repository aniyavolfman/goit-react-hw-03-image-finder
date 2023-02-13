import PropTypes from 'prop-types';

export function ImageGalleryItem({ pageUrl, alt }) {

    console.log(pageUrl, alt)
  return (
    <li className="gallery-item">
      <img src={pageUrl} alt={alt} />
    </li>
  );
}

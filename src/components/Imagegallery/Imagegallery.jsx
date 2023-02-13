import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export function Imagegallery({ images }) {
    console.log(images)
    return (
      <ul className="gallery">
        {images.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem key={id} pageUrl={webformatURL} alt={tags} />
        ))}
      </ul>
    );
}
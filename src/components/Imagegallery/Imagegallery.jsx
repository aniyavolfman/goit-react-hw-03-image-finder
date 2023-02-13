import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export function Imagegallery({ images }) {
    console.log(images)
    return (
      <ul className="gallery">
        {images.map(({ id, previewURL, tags }) => 
          (<ImageGalleryItem
            key={id}
            pageUrl={previewURL}
            alt={tags}
          />)
        )}
      </ul>
    );
}
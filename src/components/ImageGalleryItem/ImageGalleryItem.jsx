import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformat,
  largeImage,
  tag,
  onOpenModal,
  }) => {
  return (
    <Item onClick={() => onOpenModal(largeImage)}>
      <Image src={webformat} alt={tag} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webformat: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  };

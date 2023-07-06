import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <LoadMoreBtn type="button" onClick={onLoadMore}>
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

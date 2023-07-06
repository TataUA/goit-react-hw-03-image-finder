import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    onSubmit(value);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <span>🔍</span>
        </SearchFormButton>

        <Input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

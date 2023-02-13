import PropTypes from 'prop-types';

export function Searchbar() {
  return (
    <form class="search-form" id="search-form">
      <input
        type="text"
        name="searchQuery"
        autocomplete="off"
        placeholder="Search images and photos"
      />
      <button type="submit">Search</button>
    </form>
  );
}

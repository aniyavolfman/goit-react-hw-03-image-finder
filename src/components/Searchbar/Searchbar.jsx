import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleInput = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { onSubmit } = this.props;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={onSubmit}>
          <button type="submit" className={css.button}>
            <ImSearch />
            <span className={css.buttonLabel}>Search</span>
          </button>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="name"
            value={this.state.name}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };
  

  handleOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImg, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleOverlay}>
        <div className={css.modal}>
          <img src={largeImg} alt={alt} />
        </div>
      </div>
    );
  }
}

 Modal.propTypes = {
   largeImg: PropTypes.string.isRequired,
   closeModal: PropTypes.func.isRequired,
   alt: PropTypes.string.isRequired,
 };
import React, { Component } from 'react';
import { Button } from './Button/Button';
import { Container } from './Container/Container';
import { Imagegallery } from './Imagegallery/Imagegallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { requestImages } from '../services/api';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    query: null,
    currentImg: null,
    per_page: 12,
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchImages(this.state.page, this.state.query, this.state.per_page);
    }

    if (prevState.images.length > 0 && this.state.currentImg === null) {
      window.scrollBy({ top: 1200, behavior: 'smooth' });
    }
  }

  async fetchImages(page, query, per_page) {
    try {
      this.setState({ isLoading: true });

      const images = await requestImages(page, query, per_page);
      this.setState({
        images: [...this.state.images, ...images.hits],
        totalImages: images.total,
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ images: [] });
    const inputValue = event.target.elements[1].value;
    this.setState({
      query: inputValue,
      page: 1,
    });
  };

  handleGallery = event => {
    this.setState({ currentImg: event.target.dataset.largeimg });
  };

  closeModal = () => {
    this.setState({ currentImg: null });
  };

  render() {
    const { images } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        <Imagegallery images={images} onClick={this.handleGallery} />
        {(this.state.images.length > 0 &&
          this.state.page < (Math.ceil(this.state.totalImages / this.state.per_page))) && (
            <Button onClick={this.handleButton} />
          )}
        {this.state.currentImg && (
          <Modal
            largeImg={this.state.currentImg}
            onClose={this.handleModal}
            alt={this.state.query}
            closeModal={this.closeModal}
          />
        )}
      </Container>
    );
  }
}

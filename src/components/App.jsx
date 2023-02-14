import React, { Component } from 'react';
import { Button } from './Button/Button';
import { Container } from './Container/Container';
import { Imagegallery } from './Imagegallery/Imagegallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { requestImages } from './services/api';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    query: null,
    currentImg: null,
  };

  async fetchImages(page, query) {
    try {
      this.setState({ isLoading: true });

      const images = await requestImages(page, query);
      this.setState({ images: images.hits });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  // componentDidMount = () => {
  //   this.fetchImages(this.state.page, this.state.query);

  // };

  handleButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements[1].value;
    this.setState({
      query: inputValue,
      page: 1,
    });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchImages(this.state.page, this.state.query);
    }
  }

  handleGallery = event => {
    if (event.target.tagName === 'IMG') {
      console.log('hello')
      this.setState({ currentImg: event.target.dataset.largeimg });
    }
  };
  
  render() {
    const { images } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        <Imagegallery images={images} onClick={this.handleGallery} />
        {this.state.images.length > 0 && <Button onClick={this.handleButton} />}
        <Modal largeImg={this.state.currentImg} />
      </Container>
    );
  }
}

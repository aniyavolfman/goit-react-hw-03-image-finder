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
    per_page: 12,
  };

  async fetchImages(page, query, per_page) {
    try {
      this.setState({ isLoading: true });

      const images = await requestImages(page, query, per_page);
      this.setState({
        images: [...this.state.images, ...images.hits],
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount=()=>{
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({images : []})
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
      this.fetchImages(this.state.page, this.state.query, this.state.per_page);
    }
  }

  handleGallery = event => {
    if (event.target.tagName === 'IMG') {
      this.setState({ currentImg: event.target.dataset.largeimg });
    }
  };

  handleModal = event => {
    if (event.target === event.currentTarget) {
      this.setState({ currentImg: null });
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') { this.setState({ currentImg: null }); };
  }
   
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { images } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        <Imagegallery images={images} onClick={this.handleGallery} />
        {this.state.images.length > 0 && <Button onClick={this.handleButton} />}
        {this.state.currentImg && (
          <Modal
            largeImg={this.state.currentImg}
            onClose={this.handleModal}
            alt={this.state.query}
          />
        )}
      </Container>
    );
  }
}

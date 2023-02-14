import React, { Component } from 'react';
import { Button } from './Button/Button';
import { Container } from './Container/Container';
import { Imagegallery } from './Imagegallery/Imagegallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { requestImages } from './services/api';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
  };

  async fetchImages(page) {
    try {
      this.setState({ isLoading: true });

      const images = await requestImages(page);
      this.setState({ images: images.hits });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount = () => {
    this.fetchImages(this.state.page);
  };

  handleButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchImages(this.state.page);
    }
  }

  render() {
    const { images } = this.state;
    return (
      <Container>
        <Searchbar />
        {this.state.isLoading && <Loader />}
        <Imagegallery images={images} />
        <Button onClick={this.handleButton} />
      </Container>
    );
  }
}

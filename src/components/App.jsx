import React, { Component } from "react";
import axios from 'axios';
import { Button } from "./Button/Button";
import { Container } from "./Container/Container";
import { Imagegallery } from "./Imagegallery/Imagegallery";
import { Searchbar } from "./Searchbar/Searchbar";

axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      '?key=32728160-634e7d154d1682a06810c8278&q=cat&page=1&image_type=photo&orientation=horizontal&per_page=12'
    );
    this.setState({ images: response.data.hits });
  }

  render() {
    return (
      <Container>
        <Searchbar />
        <Imagegallery images={this.state.images} />
        <Button />
      </Container>
    );
  }
};

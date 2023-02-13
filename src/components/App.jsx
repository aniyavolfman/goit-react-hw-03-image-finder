import React, { Component } from "react";
import { Button } from "./Button/Button";
import { Container } from "./Container/Container";
import { Imagegallery } from "./Imagegallery/Imagegallery";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  render() {
    return (
    <Container>
      <Searchbar />
      <Imagegallery />
      <Button />
    </Container>
  )}
};

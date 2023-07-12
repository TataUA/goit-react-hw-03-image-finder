import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from 'services/API';
import { Container, Err } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    loading: false,
    gallery: [],
    totalHits: 0,
    page: 1,
    modal: null,
    error: null,
  };

  handleChange = value => {
    if (value === '') {
      alert('You need write something...');
      return;
    }
    this.setState({
      query: value.toLowerCase(),
      gallery: [],
      totalHits: 0,
      page: 1,
    });
  };

  async componentDidUpdate(_, prevState) {
    const { query, gallery, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const response = await fetchImages(query, page);
        const images = response.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        this.setState({
          gallery: [...gallery, ...images],
          totalHits: response.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = (image = null) => {
    this.setState({ modal: image });
  };

  render() {
    const { loading, gallery, modal, totalHits, error } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleChange} />
        {loading && <Loader />}
        <ImageGallery images={gallery} onOpenModal={this.toggleModal} />
        {gallery.length > 0 && gallery.length < totalHits && (
          <Button onLoadMore={this.onLoadMoreBtn} />
        )}
        {modal && <Modal largeImage={modal} onCloseModal={this.toggleModal} />}
        {error && <Err>Something went wrong... &#128576;</Err>}
      </Container>
    );
  }
}

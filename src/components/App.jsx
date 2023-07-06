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
    modal: { isOpen: false, visibleImage: null },
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
        this.setState({
          gallery: [...gallery, ...response.hits],
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

  onOpenModal = image => {
    this.setState({ modal: { isOpen: true, visibleImage: image } });
  };

  onCloseModal = () => {
    this.setState({ modal: { isOpen: false, visibleImage: null } });
  };

  render() {
    const {
      loading,
      gallery,
      modal: { isOpen, visibleImage },
      totalHits,
      error,
    } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleChange} />
        {loading && <Loader />}
        <ImageGallery
          images={gallery}
          onOpenModal={this.onOpenModal}
          onCloseModal={this.onCloseModal}
        />
        {gallery.length > 0 && gallery.length < totalHits && (
          <Button onLoadMore={this.onLoadMoreBtn} />
        )}
        {isOpen && (
          <Modal largeImage={visibleImage} onCloseModal={this.onCloseModal} />
        )}
        {error && <Err>Something went wrong... &#128576;</Err>}
      </Container>
    );
  }
}

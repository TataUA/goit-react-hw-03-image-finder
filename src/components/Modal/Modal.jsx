import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWindow>
          <img src={this.props.largeImage} alt={this.props.largeImage} />
        </ModalWindow>
      </Overlay>
    );
  }
}
Modal.propTypes = {
  largeImage: PropTypes.string,
  onCloseModal: PropTypes.func.isRequired,
};

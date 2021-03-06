import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';

const Disclaimer = props => (
  <Modal
    contentLabel="Disclaimer modal"
    overlayClassName="modal-overlay"
    className="modal-content"
    isOpen={props.isVisible}
    shouldCloseOnOverlayClick={false}
  >
    <h2>Disclaimer</h2>

    <p>
      Franklin is a Proof of Concept. It is not suitable for a realistic
      analysis (yet). You can&nbsp;
      <a href="https://tailordev.fr/blog/2016/06/09/le-lab-3-franklin-dna-sequence-annotation-tool">
        read the story behind it
      </a>,&nbsp;
      <a href="https://github.com/TailorDev/franklin">checkout the sources</a> and&nbsp;
      <a href="https://github.com/TailorDev/franklin/issues">give us feedback</a>!
    </p>

    <p>That said, now choose your way:</p>

    <button
      className="button primary"
      onClick={props.onDemoClick}
    >
      Test Franklin with sample data
    </button>

    <button
      className="button secondary"
      onClick={props.onCloseClick}
    >
      Please leave me alone
    </button>
  </Modal>
);

Disclaimer.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onDemoClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default Disclaimer;

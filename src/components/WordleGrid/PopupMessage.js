/* ./src/components/WordleGrid/PopupMessage.js */

import React from 'react';
import PropTypes from 'prop-types';

const PopupMessage = ({ message }) => (
  <div className="popup-message">{message}</div>
);

PopupMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default PopupMessage;
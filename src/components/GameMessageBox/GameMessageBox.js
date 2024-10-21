// .src/components/GameMessageBox/GameMessageBox.js 

import React from 'react';
import PropTypes from 'prop-types';
import './GameMessageBox.css';

const GameMessageBox = ({ message }) => {
  return (
    <div className={`game-message-box ${message ? 'show' : 'hide'}`}>
      {message ? <p className="game-message">{message}</p> : <p className="game-message">&nbsp;</p>}
    </div>
  );
};

GameMessageBox.propTypes = {
  message: PropTypes.string.isRequired,
};

export default GameMessageBox;

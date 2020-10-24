import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App, { handleAnimationSpeed, resetCamera } from './App';
import Controls from './components/Controls'

App()

ReactDOM.render(
  <Controls
    handleOnPress={() => resetCamera()}
    handleAnimationSpeed={(value) => handleAnimationSpeed(value)}
  />,
  document.querySelector('#root')
)


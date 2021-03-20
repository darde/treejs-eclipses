import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App, { 
  handleAnimationSpeed,
  resetCamera,
  handleFreeCamera,
  setCameraPosition,
  toggleEcliptic,
 } from './App';
import Controls from './components/Controls'

let freeCamera = false

App((day, _freeCamera) => {
  if (_freeCamera !== freeCamera) {
    freeCamera = _freeCamera
  }
  
  render(day, freeCamera)
})

const container = document.querySelector('#root')

function render(day, freeCamera) {
  ReactDOM.render(
    <Controls
      day={day}
      customCameraPosition={freeCamera}
      handleFreeCamera={handleFreeCamera}
      toggleEcliptic={toggleEcliptic}
      handleOnPress={() => resetCamera()}
      handleAnimationSpeed={(value) => handleAnimationSpeed(value)}
    />,
    container
  )
}

render(1, freeCamera)

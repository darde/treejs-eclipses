import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App, { 
  handleAnimationSpeed,
  handleFreeCamera,
  toggleEcliptic,
  toggleMoonOrbit,
 } from './App';
import Controls from './components/Controls'

let freeCamera = false
let sideralDay = 0
let sinodicDay = 1 //It's not being used (Moon age) 0 = New Moon

const controlsCallbackInterface = {
  resetCameraCallback() {
    render({ resetCamera: true, sideralDay, sinodicDay })
  },

  updateSideralAndSinodicDays(_sideralDay, _sinodicDay, _freeCamera) {
    sideralDay = _sideralDay
    sinodicDay = _sinodicDay
    if (_freeCamera !== freeCamera) {
      freeCamera = _freeCamera
    }
    render({ sideralDay, sinodicDay, freeCamera })
  },
}

App(controlsCallbackInterface)

const AppControls = ({ sideralDay, freeCamera, sinodicDay, resetCamera = false }) => (
  <Controls
    sideralDay={sideralDay}
    sinodicDay={sinodicDay}
    customCameraPosition={freeCamera}
    handleFreeCamera={handleFreeCamera}
    toggleEcliptic={toggleEcliptic}
    toggleMoonOrbit={toggleMoonOrbit}
    resetCamera={resetCamera}
    handleAnimationSpeed={(value) => handleAnimationSpeed(value)}
  />
)

const container = document.querySelector('#root')

function render(props) {
  ReactDOM.render(
    <AppControls {...props} />,
    container
  )
}

render({ sideralDay, sinodicDay, freeCamera })

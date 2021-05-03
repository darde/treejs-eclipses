import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App, { 
  handleAnimationSpeed,
  handleFreeCamera,
  handleTotalSolarEclipse,
  toggleEcliptic,
  toggleMoonOrbit,
  closeSimulation,
 } from './App';
import Controls from './components/Controls'
import EclipsesControls from './components/Controls/EclipsesControls/'

let state = {
  sideralDay: 0,
  sinodicDay: 1,
  freeCamera: false,
  controlsVisibility: true,
}

function handleCloseSimulation() {
  closeSimulation()
  state.controlsVisibility = !state.controlsVisibility

  render({ ...state })
}

const controlsCallbackInterface = {
  resetCameraCallback() {
    state = { ...state, resetCamera: true }
    render({ ...state })
  },

  updateSideralAndSinodicDays(sideralDay, sinodicDay, freeCamera) {
    if (freeCamera !== state.freeCamera) {
      state.freeCamera = freeCamera
    }

    state = {
      ...state,
      sideralDay,
      sinodicDay,
    }

    render({ ...state })
  },

  setControlsVisibility(controlsVisibility) {
    state = { ...state, controlsVisibility }
    render({ ...state })
  }
}

App(controlsCallbackInterface)

const AppControls = ({ sideralDay, freeCamera, sinodicDay, resetCamera = false, controlsVisibility }) => (
  <>
    <Controls
      visibility={controlsVisibility}
      sideralDay={sideralDay}
      sinodicDay={sinodicDay}
      customCameraPosition={freeCamera}
      handleFreeCamera={handleFreeCamera}
      toggleEcliptic={toggleEcliptic}
      toggleMoonOrbit={toggleMoonOrbit}
      resetCamera={resetCamera}
      handleAnimationSpeed={(value) => handleAnimationSpeed(value)}
    />
    <EclipsesControls
      startTotalSolarEclipse={handleTotalSolarEclipse}
      handleOnClose={handleCloseSimulation}
      visibility={controlsVisibility}
    />
  </>
)

const container = document.querySelector('#root')

function render(props) {
  ReactDOM.render(
    <AppControls {...props} />,
    container
  )
}

render({ ...state })

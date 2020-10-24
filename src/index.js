import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App, { handleAnimationSpeed, resetCamera } from './App';
import Controls from './components/Controls'

App((day) => {
  render(day)
})

const container = document.querySelector('#root')

function render(day) {
  ReactDOM.render(
    <Controls
      day={day}
      handleOnPress={() => resetCamera()}
      handleAnimationSpeed={(value) => handleAnimationSpeed(value)}
    />,
    container
  )
}

render(1)

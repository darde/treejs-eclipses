import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import SwitchControl from './SwitchControl'
import Slider from './Slider'
import CameraControls from './CameraControls'
import ControlItem from './ControlItem'
import Fieldset from '../Fieldset'
import '../fontawesome'
import MoonPhaseDisplay from './MoonPhaseDisplay'

const PanelContainer = styled.div`
  position: relative;
  width: 200px;
  max-height: 900px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  bottom: 0;
  // left: -195px;
  // background: rgba(34,141,255,0.3);
  // border-top-right-radius: 4px;
  // border-bottom-right-radius: 4px;
  // box-shadow: 0 0 2px rgba(255,255,255,0.3), 0 0 5px rgba(255,255,255,0.3), 0 0 7px rgba(255,255,255,0.3), 0 0 5px rgba(34,141,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 20px rgba(34,141,255,0.3), 0 0 25px rgba(34,141,255,0.3);
  transition: left 0.3s ease;

  ${({ open }) => open && css`
    // left: 0
  `}
  `

function Controls({
  customCameraPosition,
  handleAnimationSpeed,
  sideralDay,
  sinodicDay,
  handleFreeCamera,
  resetCamera,
  toggleEcliptic,
  toggleMoonOrbit,
 }) {
  const [open, setOpen] = useState(true)

  return ReactDOM.createPortal(
    <PanelContainer open={open}>
      <MoonPhaseDisplay
        legend={'Fase da Lua'}
        sinodicDay={sinodicDay}
        sideralDay={sideralDay}
      />
      <ControlItem>
        <CameraControls
          legend={'Câmera'}
          customCameraPosition={customCameraPosition}
          handleFreeCamera={handleFreeCamera}
          resetCamera={resetCamera}
        />
      </ControlItem>
      <Fieldset legend={'Animação'}>
        <ControlItem>
          <Slider
            label={'Velocidade da animação'}
            width={150}
            min={0}
            max={10}
            value={2}
            step={2}
            graduationLabels={[0, 1, 2, 3, 4, 5]}
            handleAnimationSpeed={handleAnimationSpeed}
          />
        </ControlItem>
        <ControlItem>
          <SwitchControl
            label="Órbita lunar"
            callback={toggleMoonOrbit}
            id="moonOrbit"
          />
        </ControlItem>
        <ControlItem>
          <SwitchControl
            label="Eclíptica"
            callback={toggleEcliptic}
            id="ecliptica"
          />
        </ControlItem>
      </Fieldset>
    </PanelContainer>,
    document.querySelector('#right-panel')
  )
}

export default Controls

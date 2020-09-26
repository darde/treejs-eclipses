import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import SwitchControl from './SwitchControl'
import { faCoffee, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../fontawesome'

const PanelContainer = styled.div`
  position: relative;
  width: 200px;
  max-height: 800px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  bottom: 0;
  left: -195px;
  background: rgba(34,141,255,0.3);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 0 2px rgba(255,255,255,0.3), 0 0 5px rgba(255,255,255,0.3), 0 0 7px rgba(255,255,255,0.3), 0 0 5px rgba(34,141,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 20px rgba(34,141,255,0.3), 0 0 25px rgba(34,141,255,0.3);
  transition: left 0.3s ease;

  ${({ open }) => open && css`
    left: 0
  `}
  `

const ControlButton = styled.button`
  background: #35A6FF;
  color: #000;
  font-size: 10px;
  padding: 10px 4px;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
`
const ToogleButtonContainer = styled.div`
  position: absolute;
  width: 30px;
  height: 50px;
  right: -32px;
  overflow: hidden;
  top: calc(50% - 25px);
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 0 0 2px rgba(255,255,255,0.3), 0 0 5px rgba(255,255,255,0.3), 0 0 7px rgba(255,255,255,0.3), 0 0 5px rgba(34,141,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 20px rgba(34,141,255,0.3), 0 0 25px rgba(34,141,255,0.3);

  &:hover {
    box-shadow: 0 0 6px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.3), 0 0 13px rgba(255,255,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 22px rgba(34,141,255,0.3), 0 0 30px rgba(34,141,255,0.3), 0 0 35px rgba(34,141,255,0.3);
  }
`

const ToggleButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  right: 0;
  background: rgba(34,141,255,0.3);
  border: none;
  outline: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
`

function Controls({ handleOnPress }) {
  const [open, setOpen] = useState(true)

  return ReactDOM.createPortal(
    <PanelContainer open={open}>
      <ToogleButtonContainer>
        <ToggleButton onClick={() => setOpen(!open)}>
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            size="1x"
            color="#fff"
            rotation={open ? 180 : 0}
          />
        </ToggleButton>
      </ToogleButtonContainer>
      <SwitchControl
        label="Eclíptica"
        handleOnChange={() => {}}
        id="ecliptica"
      />
    </PanelContainer>,
    document.querySelector('#controls')  
  )
}

export default Controls

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import EclipseButton from './EclipseButton'
import Fieldset from '../../Fieldset'
import Screen from '../../Screen'

const EclipsesControlsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1px 8px 8px;
`

const Box = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  height: 360px;
`

const StatusPanel = styled.div`
  position: fixed;
  top: ${({ visible }) => visible ? 0 : '-65px'};
  width: 95%;
  height: 65px;
  padding-top: 15px;
  transform: translateX(2.5%);
  transition: all 0.3s ease;
`

const CloseSimulationButton = styled.button`
  position: absolute;
  right: 0;
  top: 15px;
  width: 140px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid red;
  background: rgba(255,0,0,0.2);
  color: red;
  cursor: pointer;
  z-index: 20;
  box-shadow: 0 0 2px rgba(255,0,0,0.3), 0 0 5px rgba(255,0,0,0.3), 0 0 7px rgba(255,0,0,0.3), 0 0 5px rgba(255,0,0,0.3);
`

const Message = styled.div`
  width: 50%;
  transform: translateX(50%);
  text-align: center;

  label {
    color: #fff;
    font-family: 'Titillium Web', sans-serif;
    font-size: 22px;
  }
`

const LeftPanel = styled.div`
  position: absolute;
  left: ${({ visible }) => visible ? 0 : '-190px'};
  width: 190px;
  height: 400px;
  transition: all 0.3s ease;
`

const EclipsesControls = ({ startTotalSolarEclipse, handleOnClose, visibility }) => {
  const [statusPanelLabel, setStatusPanelLabel] = useState('')

  const handleOnClick = (e) => {
    switch (e.target.id) {
      case 'solarTotalBtn':
        setStatusPanelLabel('Eclipse Total do Sol')
        break
      case 'anullarBtn':
        setStatusPanelLabel('Eclipse Anular do Sol')
        break
      case 'lunarBtn':
        setStatusPanelLabel('Eclipse da Lua')
        break
      default:
        setStatusPanelLabel('')
    }
    startTotalSolarEclipse()
  }

  return ReactDOM.createPortal(
    <EclipsesControlsWrapper>
      <Screen visible={visibility} />
      <StatusPanel visible={!visibility}>
        <Message>
          <label>Simulação Iniciada - {statusPanelLabel}</label>
        </Message>
        <CloseSimulationButton
          onClick={handleOnClose}
        >
          Encerrar Simulação
        </CloseSimulationButton>
      </StatusPanel>
      <LeftPanel visible={visibility}>
        <Fieldset>
          <legend>Simular Eclipse</legend>
          <Box>
            <EclipseButton
              label={'Eclipse Solar Total'}
              type="total-solar"
              handleOnClick={handleOnClick}
            />
            <EclipseButton
              label={'Eclipse Solar Anular'}
              type="anullar-solar"
              handleOnClick={handleOnClick}
            />
            <EclipseButton
              label={'Eclipse Lunar'}
              type="moon"
              handleOnClick={handleOnClick}
            />
          </Box>
        </Fieldset>
      </LeftPanel>
    </EclipsesControlsWrapper>,
    document.getElementById('left-panel')
  )
}

export default EclipsesControls

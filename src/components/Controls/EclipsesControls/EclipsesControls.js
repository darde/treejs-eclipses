import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import EclipseButton from './EclipseButton'
import Fieldset from '../../Fieldset'

const EclipsesControlsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1px 8px 8px;
  // background: rgba(34,141,255,0.3);
  // border-top-left-radius: 4px;
  // border-top-right-radius: 4px;
  // box-shadow: 0 0 2px rgba(255,255,255,0.3), 0 0 5px rgba(255,255,255,0.3), 0 0 7px rgba(255,255,255,0.3), 0 0 5px rgba(34,141,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 20px rgba(34,141,255,0.3), 0 0 25px rgba(34,141,255,0.3);
  // transition: left 0.3s ease;
`

// const Fieldset = styled.fieldset`
//   border: 1px solid white;
//   border-radius: 4px;
//   padding: 10px;
//   height: 100%;

//   legend {
//     text-align: center;
//     font-size: 14px;
//     padding: 0 5px;
//     color: white;
//   }
// `

const Box = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  // border: 1px solid red;
  height: 360px;
`

const EclipsesControls = () =>
  ReactDOM.createPortal(
    <EclipsesControlsWrapper>
      <Fieldset>
        <legend>Simular Eclipse</legend>
        <Box>
          <EclipseButton label={'Eclipse Solar Total'} type="total-solar" />
          <EclipseButton label={'Eclipse Solar Anular'} type="anullar-solar" />
          <EclipseButton label={'Eclipse Lunar'} type="moon" />
        </Box>
      </Fieldset>
    </EclipsesControlsWrapper>,
    document.getElementById('left-panel')
  )

export default EclipsesControls

import { faDivide } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import styled from 'styled-components'
import ControlItem from './ControlItem'
import GlassButton from './GlassButton'
import Fieldset from '../Fieldset'

const Box = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  min-height: 65px;
  padding-bottom: 10px;
  margin-top: 20px;
  font-size: 13px;
  border-bottom: 1px solid #fff;

  &:last-child {
    margin-bottom: 0;
    border: none;
  }
`

const Label = styled.div`
  font-size: 13px;
  color: white;
`

const EclipsesControls = () => (
  <ControlItem>
    <Fieldset legend={'Eclipses'}>
      <Box>
        <Label>Eclipse Lunar</Label>
        <GlassButton>Simular</GlassButton>
      </Box>
      <Box>
        <Label>Eclipse Solar Total</Label>
        <GlassButton>Simular</GlassButton>
      </Box>
      <Box>
        <Label>Eclipse Solar Anular</Label>
        <GlassButton>Simular</GlassButton>
      </Box>
    </Fieldset>
  </ControlItem>
)

export default EclipsesControls

import React from 'react'
import styled from 'styled-components'
import Switch from "react-switch";
import { shade } from 'polished'

const SwitchContainer = styled.label`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  width: 100%;

  span {
    font-size: 14px;
    color: #fff;
    margin-right: 8px;
  }
`

function SwitchControl({ label, handleOnChange, id }) {
  return (
    <SwitchContainer htmlFor={id}>
      <span>{label}</span>
      <Switch
        onChange={handleOnChange}
        checked={false}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        handleDiameter={20}
        onHandleColor="#ffff00"
        offHandleColor="#228DFF"
        offColor={shade(1, '#228DFF')}
        onColor={shade(0, '#228DFF')}
        id={id}
      />
    </SwitchContainer>
  )
}

export default SwitchControl

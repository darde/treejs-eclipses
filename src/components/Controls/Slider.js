import React, { useState } from 'react'
import styled from 'styled-components'

const SliderContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const SliderControl = styled.input`
  width: ${({ width }) => width}px;
  height: 30px;
  padding: 0;
  margin: 0;
  cursor: pointer;
`
const Label = styled.label`
  color: #fff;
  font-size: 14px;
`

function Slider({ width = 100, min = 1, max = 100, step = 1, label, handleAnimationSpeed }) {
  const [value, setValue] = useState(0)

  const handleOnChange = (e) => {
    setValue(e.target.value)
    handleAnimationSpeed(e.target.value)
  }

  return (
    <SliderContainer>
      <Label>{label}</Label>
      <SliderControl
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        width={width}
        onChange={handleOnChange}
      />
    </SliderContainer>
  )
}

export default Slider

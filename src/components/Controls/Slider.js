import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
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

const GraduationLabels = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  list-style-type: none;
  width: ${({ width }) => width}px;
  justify-content: space-between;
`

const GraduationItem = styled.li`
  color: white;
  font-size: 12px;
`

function Slider({ width = 100, min = 1, max = 100, step = 1, label, graduationLabels, handleAnimationSpeed }) {
  const [value, setValue] = useState(1)

  const handleOnChange = (e) => {
    setValue(e.target.value)
  }

  const handleOnMouseUp = (e) => {
    handleAnimationSpeed(value)
  }
console.log('render')
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
        onMouseUp={handleOnMouseUp}
        onChange={handleOnChange}
      />
      {
        graduationLabels && (
          <GraduationLabels width={width}>
          {
            graduationLabels.map(
              label => <GraduationItem key={uuidv4()}>{label}</GraduationItem>
            )
          }
          </GraduationLabels>
        )
      }
    </SliderContainer>
  )
}

export default Slider

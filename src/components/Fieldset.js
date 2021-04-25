import React from 'react'
import styled from 'styled-components'

const FieldsetContainer = styled.fieldset`
  border: none;
  border-radius: 4px;
  padding: 10px;
  border-top: 1px solid #fff;
  margin-bottom: 15px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;

  legend {
    font-size: 14px;
    padding: 0 5px;
    color: white;
    text-align: center;
  }
`

function Fieldset({ legend, children }) {
  return (
    <FieldsetContainer>
      { legend && <legend>{legend}</legend>}
      { children }
    </FieldsetContainer>
  )
}

export default Fieldset

import React from 'react'
import styled from 'styled-components'

const FieldsetContainer = styled.fieldset`
  border: 1px solid white;
  border-radius: 4px;
  padding: 10px;

  legend {
    font-size: 14px;
    padding: 0 5px;
    color: white;
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

import React from 'react'
import styled from 'styled-components'

const LabelInfoWrapper = styled.label`
  margin-right: 10px;
  color: white;
`

const LabelInfo = ({ children }) => (
  <LabelInfoWrapper>
    { children }
  </LabelInfoWrapper>
)

export default LabelInfo

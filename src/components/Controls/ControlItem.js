import React from 'react'
import styled from 'styled-components'

const ControlItemWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const ControlItem = ({ children }) => (
  <ControlItemWrapper>
    {children}
  </ControlItemWrapper>
) 

export default ControlItem

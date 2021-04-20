import React from 'react'
import styled from 'styled-components'

const GlassButtonWrapper = styled.button`
  margin-top: 7px;
  background: rgba(34,141,255,0.3);
  border: 1px solid rgba(34,141,255,1);
  color: #fff;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(255,255,255,0.3), 0 0 5px rgba(255,255,255,0.3), 0 0 7px rgba(255,255,255,0.3), 0 0 5px rgba(34,141,255,0.3);
`

const GlassButton = ({ children, handleOnClick = () => {}, id }) => (
  <GlassButtonWrapper onClick={handleOnClick} id={id}>
    {children}
  </GlassButtonWrapper>
)

export default GlassButton

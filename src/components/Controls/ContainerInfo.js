import React from 'react'
import styled from 'styled-components'

const ContainerInfoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-size: 13px;
  // margin-bottom: 15px;
  justify-content: center;
`

const ContainerInfo = ({ children }) => (
  <ContainerInfoWrapper>
    { children }
  </ContainerInfoWrapper>
)

export default ContainerInfo

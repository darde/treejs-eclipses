import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 140px;
  // height: 80px;
  display: flex;
  border-top: 1px dotted #fff;
  padding-top: 10px;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;

  &:first-child {
    border: none;
    padding: 0;
  }
`

const TotalSolarEclipseButton = styled.button`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: rgba(0,0,0,0.6);
  border: transparent;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(255,240,20,.3), 0 0 5px rgba(255,240,20,.3), 0 0 7px rgba(255,240,20,.3), 0 0 5px rgba(34,141,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 20px rgba(34,141,255,0.3), 0 0 25px rgba(34,141,255,0.3);
`

const AnullarSolarEclipseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,240,20,.5);
  border: transparent;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(255,240,20,.3), 0 0 5px rgba(255,240,20,.3), 0 0 7px rgba(255,240,20,.3), 0 0 5px rgba(34,141,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 20px rgba(34,141,255,0.3), 0 0 25px rgba(34,141,255,0.3);

  &:after {
    content: '';
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(0,0,0,0.6);
  }
`

const LunarEclipseButton = styled.button`
  position: relative;
  width: 56px;
  overflow: hidden;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,.5);
  border: transparent;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(255,255,255,0.3), 0 0 5px rgba(255,255,255,0.3), 0 0 7px rgba(255,255,255,0.3), 0 0 5px rgba(34,141,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 20px rgba(34,141,255,0.3), 0 0 25px rgba(34,141,255,0.3);

  &:after {
    position: absolute;
    content: '';
    right: -35px;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background: rgba(0,0,0,0.6);
  }
`

const Label = styled.div`
  font-size: 13px;
  color: white;
  padding-bottom: 10px;
`

const getButtonShapeByType = (type) => {
  switch (type) {
    case 'total-solar':
      return <TotalSolarEclipseButton />
    case 'anullar-solar':
      return <AnullarSolarEclipseButton />
    default:
      return <LunarEclipseButton />
  }
}

const EclipseButton = ({ label, type }) => (
  <Container>
    <Label>{label}</Label>
    {getButtonShapeByType(type)}
  </Container>
)

export default EclipseButton

import React, { useReducer, useEffect } from 'react'
import styled, { css } from 'styled-components'

const CameraControlsContainer = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 20px 0 35px;
  padding: 0;
  left: 22%;
  top: 25px;
  box-sizing: border-box;
`

const CubeFace = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  ${({ face }) => {
    switch(face) {
      case 'left':
        return css`
          transform: rotateX(30deg) rotateY(50deg);
          background: ${({ active }) => active === 'enabled' ? '#acd8e6' : '#c7c7c7'};
        `
      case 'right':
        return css`
          left: 72%;
          transform: rotateX(-30deg) rotateY(50deg);
          background: ${({ active }) => active === 'enabled' ? '#81b0bf' : '#737373'};
        `
      case 'top':
        return css`
          left: 39%;
          top: -68%;
          width: 95%;
          height: 95%;
          transform: rotateX(54deg) rotateZ(45deg);
          background: ${({ active }) => active === 'enabled' ? '#81b0bf' : '#f1f1f1'};
        `
      default:
        return css``
    }
  }}
`

const Labels = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: rgba(255,255,0,0);
`

const Label = styled.label`
  position: absolute;
  color: white;
  font-size: 13px;

  ${({ face }) => {
    switch(face) {
      case 'left':
        return css`
          top: 20%;
          left: -55%;
        `
      case 'top':
        return css`
          top: -45px;
          left: 25px;
          top: -115%;
          left: 65%;
        `
      case 'right':
        return css`
          left: 30px;
          top: 10px;
          left: 170%;
          top: 20%;
        `
      default:
        return css`
          top: 0;
          left: 0;
        `
    }
  }}
`

const initialState = {
  top: 'disabled',
  left: 'enabled',
  right: 'disabled',
}

function handleState(state, action) {
  switch (action) {
    case 'top':
      return {
        top: 'enabled',
        left: 'disabled',
        right: 'disabled',
      }
    case 'left':
      return {
        top: 'disabled',
        left: 'enabled',
        right: 'disabled',
      }
    case 'right':
      return {
        top: 'disabled',
        left: 'disabled',
        right: 'enabled',
      }
    default:
      return initialState
  }
}

function CameraControls({ customCameraPosition, handleFreeCamera }) {
  const [state, dispatch] = useReducer(handleState, initialState)

  const { top, left, right } = state

  useEffect(() => {
    customCameraPosition && dispatch()
  }, [customCameraPosition])

  function handleOnClick(value) {
    handleFreeCamera(false, value)
    dispatch(value)
  }

  return (
    <CameraControlsContainer>
      <CubeFace face={'top'} active={top} onClick={() => handleOnClick('top')} />
      <CubeFace face={'left'} active={left} onClick={() => handleOnClick('left')} />
      <CubeFace face={'right'} active={right} onClick={() => handleOnClick('right')} />
      <Labels>
        <Label face={'left'}>[x,y]</Label>
        <Label face={'top'}>[x,z]</Label>
        <Label face={'right'}>[y,z]</Label>
      </Labels>
    </CameraControlsContainer>
  )
}

export default CameraControls

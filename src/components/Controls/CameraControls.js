import React, { useReducer, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Fieldset from '../Fieldset'
import GlassButton from './GlassButton'
import LabelInfo from './LabelInfo'

const CameraControlsContainer = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 20px 0 50px;
  padding: 0;
  left: -13px;
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
          top: 0;
          left: -56px;
          width: 55px;
          text-align: right;
        `
      case 'top':
        return css`
          top: -115%;
          left: -10px;
          width: 95px;
          text-align: center;
          
        `
      case 'right':
        return css`
          top: 0;
          width: 55px;
          left: 70px;
          text-align: left;
        `
      default:
        return css`
          top: 0;
          left: 0;
        `
    }
  }}
`

const SubTitle = styled.label`
  color: white;
  font-size: 13px;
`

const EarthButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;
  margin-top: 7px;
  cursor: pointer;
  outline: none;
  background: ${({ active }) => active === 'enabled' ? '#81b0bf' : '#c7c7c7'};
`

const initialState = {
  top: 'disabled',
  left: 'disabled',
  right: 'disabled',
  earth: 'disabled',
}

function handleState(state, action) {
  console.log('action: ', action)
  switch (action) {
    case 'top':
      return {
        top: 'enabled',
        left: 'disabled',
        right: 'disabled',
        earth: 'disabled',
      }
    case 'left':
      return {
        top: 'disabled',
        left: 'enabled',
        right: 'disabled',
        earth: 'disabled',
      }
    case 'right':
      return {
        top: 'disabled',
        left: 'disabled',
        right: 'enabled',
        earth: 'disabled',
      }
    case 'earth':
      return {
        top: 'disabled',
        left: 'disabled',
        right: 'disabled',
        earth: 'enabled'
      }
    default:
      return initialState
  }
}

function CameraControls({ customCameraPosition, handleFreeCamera, resetCamera, legend }) {
  const [state, dispatch] = useReducer(handleState, initialState)
  const { top, left, right, earth } = state

  useEffect(() => {
    dispatch(null)
  }, [resetCamera])

  useEffect(() => {
    customCameraPosition && dispatch()
  }, [customCameraPosition])

  function handleOnClick(e) {
    const { id } = e.target
    handleFreeCamera(false, id)
    dispatch(id)
  }

  return (
    <Fieldset legend={legend}>
      <CameraControlsContainer>
        <CubeFace face={'top'} active={top} id={'top'} onClick={handleOnClick} />
        <CubeFace face={'left'} active={left} id={'left'} onClick={handleOnClick} />
        <CubeFace face={'right'} active={right} id={'right'} onClick={handleOnClick} />
        <Labels>
          <Label face={'left'}>visão lateral 1</Label>
          <Label face={'top'}>visão superior</Label>
          <Label face={'right'}>visão lateral 2</Label>
        </Labels>
      </CameraControlsContainer>
      <SubTitle>visão da terra</SubTitle>
      <EarthButton
        id={'earth'}
        onMouseDown={handleOnClick}
        active={earth}
      />
    </Fieldset>
  )
}

export default CameraControls

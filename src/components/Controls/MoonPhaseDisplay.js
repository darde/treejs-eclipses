import React from 'react'
import styled from 'styled-components'
import ControlItem from './ControlItem'
import ContainerInfo from './ContainerInfo'
import LabelInfo from './LabelInfo'
import Fieldset from '../Fieldset'
import MoonPicture from '../img/moon.png'

const moonShadowWidth = 78

const MoonMask = styled.div`
  width: 76px;
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 38px;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;

  img {
    position: absolute;
    border: 1px solid green;
  }
`

const MoonShadow = styled.div`
  width: ${moonShadowWidth}px;
  height: ${moonShadowWidth}px;
  border-radius: 30px / 100px;
  background: rgba(0,0,0,0.8);
  z-index: 20;
  position: absolute;
  // transition: all 0.5s ease;
  left: ${({ moonAge }) => getShadowRelativeToMoonAge(moonAge, moonShadowWidth)}px;
  // left: 0;
`

const InputInfo = styled.div`
  height: 25px;
  width: 35px;
  padding: 3px 10px;
  display: flex;
  text-align: center;
  border: 1px solid white;
  border-radius: 4px;
  color: white
`

const Label = styled.label`
  color: white;
  font-size: 13px;
`

const getShadowRelativeToMoonAge = (moonAge = 0, width) => {
  let position = (width * (moonAge / (14.8))).toFixed(2)

  if (position >= width) {
    position = (-width + (width * ((moonAge - 14.8) / (27.3 - 14.8)))).toFixed(2)
  }

  return position
}


const getMoonPhase = (moonAge) => {
  if (moonAge >= 20.475) {
    return 'Minguante'
  } else if (moonAge >= 13.65) {
    return 'Cheia'
  } else if (moonAge >= 6.825) {
    return 'Crescente'
  } else {
    return 'Nova'
  }
}

// In order to use sinodicDay (moonAge) to calculate the moon phases I should move the earth around the sun
const MoonPhaseDisplay = ({ legend, sideralDay, sinodicDay: moonAge }) => {
  return (
    <ControlItem>
      <Fieldset legend={legend}>
        {/* <ContainerInfo>
          <LabelInfo>Dia Sideral</LabelInfo>
          <InputInfo>{sideralDay}</InputInfo>
        </ContainerInfo> */}
        {/* <ContainerInfo>
          <LabelInfo>Dia Sinódico</LabelInfo>
          <InputInfo>{moonAge}</InputInfo>
        </ContainerInfo> */}
        <ContainerInfo>
          {/* <LabelInfo>Fase</LabelInfo> */}
          <MoonMask>
            <MoonShadow moonAge={sideralDay} />
            <img src={MoonPicture} />
          </MoonMask>
          <Label>{getMoonPhase(moonAge)}</Label>
          <Label>{moonAge}</Label>
        </ContainerInfo>
      </Fieldset>
    </ControlItem>
  )
}

export default MoonPhaseDisplay

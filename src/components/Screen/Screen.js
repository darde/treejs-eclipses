import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const ScreenContainer = styled.div`
  position: fixed;
  top: 100px;
  right: ${({ visible }) => visible ? '100px' : '-500px'};
  width: 0;
  height: 0;
  opacity: ${({ visible }) => visible ? 1 : 0.2};
  transition: all 0.3s ease;
`
const ScreenContent = styled.div`
  position: relative;
  padding: 15px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  left: -500px;
  width: 500px;
  min-height: 280px;
  border: 1px solid rgba(34,141,255,1);
  box-shadow: 0 0 5px rgba(34,141,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 20px rgba(34,141,255,0.3), 0 0 25px rgba(34,141,255,0.3);

  p {
    color: rgb(136, 194, 255);
    font-size: 18px;
    line-height: 28px;
  }
  `
  
  const CloseButton = styled.button`
  cursor: pointer;
  color: rgb(136, 194, 255);
  font-size: 14px;
  position: absolute;
  z-index: 20;
  top: 10px;
  right: 10px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  height: 20px;
  border: 1px solid rgba(34,141,255,1);
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(34,141,255,0.3), 0 0 10px rgba(34,141,255,0.3), 0 0 15px rgba(34,141,255,0.3), 0 0 20px rgba(34,141,255,0.3), 0 0 25px rgba(34,141,255,0.3);
`


const Screen = ({ visible }) => {
  const [opacity, setOpacity] = useState(true)

  useEffect(() => {
    setOpacity(true)
  }, [visible])

  function handleOnClick() {
    setOpacity(!opacity)
  }

  return (
    <ScreenContainer visible={(!visible && opacity)}>
      <CloseButton onClick={handleOnClick}>X</CloseButton>
      <ScreenContent>
        <p>A órbita da lua é levemente inclinada em relação ao plano da eclíptica, cerca de 5˚.
          Se não existisse essa inclinação teríamos um eclipse solar a cada lua nova e um eclipse
          lunar a cada lua cheia.</p>
        <p>Os eclipses ocorrem porque apesar da órbita lunar ser inclinada ela também executa uma rotação
          ao redor da terra. A órbita lunar leva cerca de 18 anos e meio para completar uma volta completa
          ao redor do nosso planeta.
        </p>
        <p>Os eclipses ocorrem quando os nodos de intersecção entre a órbita lunar e o plano da eclíptica
          se encontram alinhados com o sol, a terra e a lua.
        </p>
        <p>Gira a câmera para ver o alinhamento dos elementos.</p>
      </ScreenContent>
    </ScreenContainer>
  )
}



export default Screen



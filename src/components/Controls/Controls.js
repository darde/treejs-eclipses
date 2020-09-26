import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const PanelContainer = styled.div`
  position: relative;
  padding: 10px 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  left: 20px;
  background: rgba(0,0,0,0.4);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const ControlButton = styled.button`
  background: #35A6FF;
  color: #000;
  font-size: 10px;
  padding: 10px 4px;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
`

function Controls({ handleOnPress }) {

  return ReactDOM.createPortal(
    <PanelContainer>
      <ControlButton onClick={handleOnPress}>RESET</ControlButton>
    </PanelContainer>,
    document.querySelector('#controls')  
  )
}


// const Controls = (function() {
//   const _public = {}

//   _public.init = (elem) => {
//     // const div = document.createElement('div')
//     // div.style.width = '80%'
//     // div.style.height = '100px'
//     // div.style.position = 'fixed'
//     // div.style.bottom = '0'
//     // div.style.background = 'rgba(0,0,0,0.4'

//     elem.appendChild(Panel)
//   }

//   return _public
// })()

// export default Controls
export default Controls

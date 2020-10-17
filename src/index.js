import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './App';
import Controls from './components/Controls'

App()

ReactDOM.render(
  <Controls
    handleOnPress={() => App().handleResetCamera()}
    handleAnimationSpeed={(value) => App().handleAnimationSpeed(value)}
  />,
  document.querySelector('#root')
)

// function ViewPort() {
//   const [width, setWidth] = React.useState(window.innerWidth)
//   const [height, setHeight] = React.useState(window.innerHeight)

//   React.useEffect(() => {
//     window.addEventListener('resize', () => {
//       setWidth(window.innerWidth)
//       setHeight(window.innerHeight)
//     })

//     return () => {
//       window.removeEventListener('resize', () => {
//         setWidth(window.innerWidth)
//         setHeight(window.innerHeight)
//       })
//     }
//   }, [])
  
//   return <App screenWidth={width} screenHeight={height} />
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <ViewPort />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

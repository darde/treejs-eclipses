import React from 'react'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import './App.css'

const renderer = new WebGLRenderer({ antialias: true })
const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

function App({ screenWidth, screenHeight }) {
  const appRef = React.useRef()
  
  renderer.setClearColor('#e5e5e5')
  renderer.setSize(screenWidth, screenHeight)

  React.useEffect(() => {
    appRef.current.appendChild(renderer.domElement)
  }, [])

  React.useEffect(() => {
    renderer.setSize(screenWidth, screenHeight)
    camera.aspect = screenWidth / screenHeight
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
  }, [screenWidth, screenHeight])

  return (
    <div className="App" ref={appRef} />
  );
}

export default App

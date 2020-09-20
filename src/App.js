import React from 'react'
import { PerspectiveCamera, Scene, WebGLRenderer, PointLight } from 'three'
import Sphere from './components/primitives/Sphere'
import Box from './components/primitives/Box'
import './App.css'

const renderer = new WebGLRenderer({ antialias: true })
const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const light = new PointLight(0xFFFFFF, 1, 500)
light.position.set(10,0,25)
scene.add(light)

camera.position.z = 5

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
    <div className="App" ref={appRef}>
      <Sphere scene={scene} />
      <Box scene={scene} position={[2, 0, -1]} />
    </div>
  );
}

export default App

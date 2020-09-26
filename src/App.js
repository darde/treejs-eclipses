import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
} from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import EarthMoonSystem from './components/EarthMoonSystem'
import Skybox from './components/Skybox'
import './App.css'

let renderer, camera, controls, scene, ambientLight, directionalLight
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

function init() {
  const canvas = document.getElementById('canvas')

  // RENDERER
  renderer = new WebGLRenderer({
    canvas,
    antialias: true
  })
  renderer.setClearColor('#000000')
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(screenWidth, screenHeight)
  document.body.appendChild(renderer.domElement)

  // CAMERA
  camera = new PerspectiveCamera(80, screenWidth / screenHeight, 0.1, 1000)
  camera.position.z = 5
  
  // CONTROLS
  controls = new TrackballControls(camera, canvas)
  controls.addEventListener('change', render)

  // LIGHTS
  ambientLight = new AmbientLight(0xffffff, 0.2)
  directionalLight = new DirectionalLight(0xffffff, 1)
  directionalLight.position.set(-40,0,0)
  
  // RESIZE LISTENER
  window.addEventListener('resize', onWindowResize, false)
  
  // SCENE
  scene = new Scene()
  scene.add(ambientLight)
  scene.add(directionalLight)
}

let angle = 0

function animate() {
  window.requestAnimationFrame(animate)
  render()
  angle = angle > 359 ? 0 : angle + 0.2
  EarthMoonSystem.animateMoon(angle)
  EarthMoonSystem.animateEarth(0.01)
  controls.update()
}

function render() {
  renderer.render(scene, camera)
}

function resetCamera() {
  camera.position.set(0,0,5)
}

function onWindowResize() {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  renderer.setSize(screenWidth, screenHeight)
  camera.aspect = screenWidth / screenHeight
  camera.updateProjectionMatrix()
  controls.handleResize()
}

function App() {
  init()
  animate()
  scene.add(Skybox)
  scene.add(EarthMoonSystem.system)

  return {
    handleResetCamera: resetCamera
  }
}

// const light = new PointLight(0xFFFFFF, 1, 500)
// light.position.set(10,0,25)
// scene.add(light)

// function App({ screenWidth, screenHeight }) {

//   document.body.appendChild(renderer.domElement)
  
  // const earthRotation = [0, 0, 0]
  // const earth = Earth()

  // const moon = Moon()
  // moon.position.set(3,0,0)
  // const moonAxis = new Vector3(0, 0, 0).normalize()
  // const groupMoon = new Group()
  // groupMoon.rotateOnAxis(moonAxis, degToRad(0))
  // groupMoon.add(moon)
  
  // const groupEarth = new Group()
  // const earthAxis = new Vector3(0, 0, degToRad(-23.44)).normalize()
  // // groupEarth.rotateOnAxis(earthAxis, degToRad(23.44))
  // groupEarth.add(earth)
  

  // const systemEarthMoon = new Group()
  // const systemEarthMoonAxis = new Vector3(0,0,0)
  // systemEarthMoon.rotateOnAxis(systemEarthMoonAxis, degToRad(0))
  // systemEarthMoon.add(groupMoon)
  // systemEarthMoon.add(groupEarth)
  // scene.add(systemEarthMoon)

  // function render() {
  //   requestAnimationFrame(render)
  //   renderer.setSize(screenWidth, screenHeight)
  //   camera.aspect = screenWidth / screenHeight
  //   camera.updateProjectionMatrix()


    
  //   // earthRotation[1] = earthRotation[1] -= 0.01
  //   // earth.rotation.y = earthRotation[1]

  //   // systemEarthMoon.rotation.y += 0.005
    
  //   renderer.render(scene, camera)
  // }
  
  // render()
  
  

//   return true
// }

export default App

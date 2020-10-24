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
import Ecliptic from './components/Ecliptic'
import { degToRad } from './components/helpers'
import './App.css'

let renderer, camera, controls, scene, ambientLight, directionalLight
let earthRotationAngle = 0,
  moonTranslationAngle = 0

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
  camera.position.set(0,1,5)
  camera.rotation.set(degToRad(15),0,0)
  
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

const moontTranslationIncrement = Number(1 / 27.3)
let days = 0
let moonTranslation = 0
let speedAnimation = 1

function animateEarthMoonSystem() {
  if (earthRotationAngle > 359) {
    earthRotationAngle = 0
    days += 1
    // console.log('moon angle: ', moonTranslationAngle)
  } else {
    earthRotationAngle += 1 * speedAnimation
    // moonTranslationAngle = Number(moonTranslationAngle + moontTranslationIncrement)
    moonTranslationAngle = Number(moonTranslationAngle + (moontTranslationIncrement * speedAnimation) )
  }
  
  if (moonTranslationAngle > 359) {
    moonTranslationAngle = 0
    moonTranslation += 1
    // console.log('translações lunar: ', moonTranslation)
  }
  
  // console.log('dias: ', days)
  EarthMoonSystem.animateMoon(moonTranslationAngle)
  EarthMoonSystem.animateEarth(earthRotationAngle)
}

function animate() {
  window.requestAnimationFrame(animate)
  render()
  animateEarthMoonSystem()
  controls.update()
}

function render() {
  renderer.render(scene, camera)
}

export const resetCamera = () => {
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

export const handleAnimationSpeed = (value) => {
  // console.log(value)
  speedAnimation = value
}

function App() {
  init()
  animate()
  scene.add(Skybox)
  scene.add(EarthMoonSystem.system)
  scene.add(Ecliptic.system)
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

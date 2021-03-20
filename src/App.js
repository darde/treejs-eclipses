import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AxesHelper,
} from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import EarthMoonSystem from './components/EarthMoonSystem'
import Sun from './components/Sun'
import Skybox from './components/Skybox'
import Ecliptic from './components/Ecliptic'
import { degToRad } from './components/helpers'
import './App.css'

let renderer, camera, controls, scene, directionalLight

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const moontTranslationIncrement = Number(1 / 27.3)
let day = 1
let freeCamera = false
let moonTranslation = 0
let earthRotationAngle = 0
let moonTranslationAngle = 0
let sunAngle = 0
let speedAnimation = 1
let updateAnimationProperties
let axesHelper

function init(updateAnimationProperties) {
  const canvas = document.getElementById('canvas')

  // HELPER
  axesHelper = new AxesHelper(20)

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
  controls.addEventListener('start', () => {
    freeCamera = true
    updateAnimationProperties(day, freeCamera)
  })

  // LIGHTS
  // ambientLight = new AmbientLight(0xffffff, 0.2)
  // directionalLight = new DirectionalLight(0xffffff, 1)
  
  // SETUP SUN
  Sun.setPosition(-60, 0, 0)
  
  // RESIZE LISTENER
  window.addEventListener('resize', onWindowResize, false)
  
  // SCENE
  scene = new Scene()
  // scene.add(ambientLight)
  // scene.add(directionalLight)
}

function animateEarthMoonSystem() {
  if (earthRotationAngle > 359) {
    earthRotationAngle = 0
    day = day >= 27 ? 1 : day + 1
    updateAnimationProperties(day, freeCamera)
  } else {
    earthRotationAngle += 1 * speedAnimation
    moonTranslationAngle = Number(moonTranslationAngle + (moontTranslationIncrement * speedAnimation) )
  }
  
  if (moonTranslationAngle === 359) {
    moonTranslationAngle = 0
    moonTranslation += 1
  }
  
  EarthMoonSystem.animateMoon(moonTranslationAngle)
  EarthMoonSystem.animateEarth(earthRotationAngle)
}

function animateSun() {
  if (sunAngle < 359) {
    sunAngle += 0.1
  } else {
    sunAngle = 0
  }
  
  Sun.rotateSun(sunAngle)
}

function animate() {
  window.requestAnimationFrame(animate)
  render()
  animateEarthMoonSystem()
  animateSun()
  controls.update()
}

function render() {
  renderer.render(scene, camera)
}

export const resetCamera = () => {
  camera.position.set(0,0,5)
}

const setCameraPosition = (position) => {
  switch (position) {
    case 'top':
      camera.position.set(0, 5, 0)
      break;
    case 'left':
      camera.position.set(0, 1, 5)
      break;
    case 'right':
      // camera.position.set(0, 1, -5)
      camera.position.set(5, 1, 0)
      break;
    default:
      camera.position.set(0, 1, 5)
  }
  // controls.reset()
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
  speedAnimation = value
}

export const handleFreeCamera = (value, position) => {
  setCameraPosition(position)
  freeCamera = value
  updateAnimationProperties(day, freeCamera)
}

export const toggleEcliptic = () => {
  Ecliptic.toggleEcliptic()
  // Ecliptic.system.material.opacity = 0;
}

function App(updatePropertiesCallback) {
  updateAnimationProperties = updatePropertiesCallback
  
  init(updateAnimationProperties)
  animate()
  // alignDirectionLightWithSun()
  scene.add(Skybox)
  scene.add(EarthMoonSystem.system)
  scene.add(Ecliptic.system)
  scene.add(Sun.entity)
  scene.add(axesHelper)
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

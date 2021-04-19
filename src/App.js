import * as THREE from 'three'
import EarthMoonSystem from './components/EarthMoonSystem'
import Sun from './components/Sun'
import Skybox from './components/Skybox'
import Ecliptic from './components/Ecliptic'
import { degToRad } from './components/helpers'
import './App.css'
import OrbitControls from 'three-orbitcontrols'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const moontTranslationIncrement = Number(1 / 27.3)
const moonAgeIncrement = Number(1 / 29.5)
const cameraPosition = { x: 0, y: 1, z: 5}
let sideralDay = 1
let sinodicDay = 1
let renderer
let camera
let controls
let scene
let freeCamera = false
let moonTranslation = 0
let earthTranslationAngle = 0
let moonTranslationAngle = 0
let moonOrbitAngle = 0
let moonAge = 0
let sunAngle = 0
let speedAnimation = 1
let updateAnimationProperties
let axesHelper

function init() {
  const canvas = document.getElementById('canvas')

  // HELPER
  axesHelper = new THREE.AxesHelper(20)

  // RENDERER
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  })
  renderer.setClearColor('#000000')
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(screenWidth, screenHeight)
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement)

  // CAMERA
  camera = new THREE.PerspectiveCamera(80, screenWidth / screenHeight, 0.1, 1000)
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
  camera.lookAt(0, 0, 0)
  // camera.rotation.set(degToRad(15),0,0)
  
  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enablePan = false
  controls.maxPolarAngle = Math.PI / 2
  controls.enableDamping = true
  controls.addEventListener('start', () => {
    updateAnimationProperties.resetCameraCallback()
  })
  // const orbitControls = new OrbitControls(camera, renderer.domElement);
  
  // SETUP SUN
  Sun.setPosition(-170, 0, 0)
  
  // RESIZE LISTENER
  window.addEventListener('resize', onWindowResize, false)
  
  // SCENE
  scene = new THREE.Scene()
}

function animateEarthMoonSystem() {
  const { updateSideralAndSinodicDays, updateMoonAge } = updateAnimationProperties

  if (earthTranslationAngle > 359) {
    earthTranslationAngle = 0
    sideralDay = sideralDay >= 27 ? 1 : sideralDay + 1
    sinodicDay = sinodicDay >= 29 ? 1 : sinodicDay + 1
    updateSideralAndSinodicDays(sideralDay, sinodicDay, freeCamera)
  } else {
    earthTranslationAngle += 1 * speedAnimation
    moonTranslationAngle = Number(moonTranslationAngle + (moontTranslationIncrement * speedAnimation))
  }
  
  if (moonTranslationAngle === 359) {
    moonTranslationAngle = 0
    moonTranslation += 1
  }

  if (moonOrbitAngle === 359) {
    moonOrbitAngle = 0
  } else {
    moonOrbitAngle = Number(moonOrbitAngle + (moontTranslationIncrement * 0.001 * speedAnimation))
  }
  
  EarthMoonSystem.animateMoon(moonTranslationAngle)
  EarthMoonSystem.animateEarth(earthTranslationAngle)
  // EarthMoonSystem.rotateMoonOrbit(moonOrbitAngle)
}

function animateSun() {
  if (sunAngle < 359) {
    sunAngle += 0.1
  } else {
    sunAngle = 0
  }
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

const setCameraPosition = (position) => {
  switch (position) {
    case 'top':
      camera.position.set(0, 5, 0)
      break;
    case 'left':
      camera.position.set(0, 1, 5)
      break;
    case 'right':
      camera.position.set(0, 1, -5)
      break;
    default:
      camera.position.set(0, 1, 5)
  }
}


function onWindowResize() {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  
  renderer.setSize(screenWidth, screenHeight)
  camera.aspect = screenWidth / screenHeight
  camera.updateProjectionMatrix()
}

export const handleMoonDistance = (valueX) => {
  EarthMoonSystem.setMoonDistance(valueX)
}

export const toggleMoonOrbit = () => {
  EarthMoonSystem.toggleMoonOrbit()
}

export const handleAnimationSpeed = (value) => {
  speedAnimation = value
}

export const handleFreeCamera = (value, position) => {
  setCameraPosition(position)
  freeCamera = value
  const { updateSideralAndSinodicDays } = updateAnimationProperties

  updateSideralAndSinodicDays(sideralDay, sinodicDay, freeCamera)
}

export const toggleEcliptic = () => {
  Ecliptic.toggleEcliptic()
}

function App(updatePropertiesCallback) {
  updateAnimationProperties = updatePropertiesCallback

  init(updatePropertiesCallback)
  animate()

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
  // const moonAxis = new THREE.Vector3(0, 0, 0).normalize()
  // const groupMoon = new Group()
  // groupMoon.rotateOnAxis(moonAxis, degToRad(0))
  // groupMoon.add(moon)
  
  // const groupEarth = new Group()
  // const earthAxis = new THREE.Vector3(0, 0, degToRad(-23.44)).normalize()
  // // groupEarth.rotateOnAxis(earthAxis, degToRad(23.44))
  // groupEarth.add(earth)
  

  // const systemEarthMoon = new Group()
  // const systemEarthMoonAxis = new THREE.Vector3(0,0,0)
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

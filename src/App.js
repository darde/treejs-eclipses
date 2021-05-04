import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import EarthMoonSystem from './components/EarthMoonSystem'
import Sun from './components/Sun'
import Skybox from './components/Skybox'
import Ecliptic from './components/Ecliptic'
import { degToRad } from './components/helpers'
import { animateCamera }  from './utils'

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
let earthRotationAngle = 0
let moonTranslationAngle = 0
let moonOrbitAngle = 0
let moonAge = 0
let sunAngle = 0
let speedAnimation = 1
let updateAnimationProperties
let axesHelper
let lookAtMoon = false
let memory = []
let simulationRunning = false

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
  
  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enablePan = false
  controls.maxPolarAngle = Math.PI / 2
  controls.enableDamping = true
  controls.addEventListener('start', handleOrbitControlStart)
  
  // SETUP SUN
  Sun.setPosition(-170, 0, 0)
  
  // RESIZE LISTENER
  window.addEventListener('resize', onWindowResize, false)
  
  // SCENE
  scene = new THREE.Scene()
}

function handleOrbitControlStart() {
  if (lookAtMoon) {
    lookAtMoon = false;
    const earthPosition = EarthMoonSystem.getEarthPosition()
    const { x, y } = earthPosition
    camera.position.set(x, y, cameraPosition.z)
  }
  updateAnimationProperties.resetCameraCallback()
}

/* SIMULATE TOTAL SOLAR ECLIPSE */
function setupMoon(moonPositionAngle) {
  EarthMoonSystem.animateMoon(moonPositionAngle)
  EarthMoonSystem
    .moonOrbit
    .lookAt(-10,0,0)

  EarthMoonSystem.moonOrbitTurnOn()
  Ecliptic.turnOn()

  function animate() {
    console.log('Angle: ', moonPositionAngle)
    if (moonPositionAngle <= 90) {
      window.requestAnimationFrame(animate)
    }

    EarthMoonSystem.animateMoon(moonPositionAngle)
    moonTranslationAngle = Number(moonTranslationAngle + (moontTranslationIncrement * speedAnimation))
    
    moonPositionAngle += 0.1
  }

  animate()
}

function simulateTotalSolarEclipse() {
  simulationRunning = true
  // camera.position.set(-3, 2, 4)
  camera.position.set(-6, 1, 1.5)
  
  camera.lookAt(0, 0, 0)
  setupMoon(80)
}

function animateEarthMoonSystem() {
  if (simulationRunning) {
    return
  }

  const { updateSideralAndSinodicDays } = updateAnimationProperties

  if (earthRotationAngle > 359) {
    earthRotationAngle = 0
    sideralDay = sideralDay >= 27 ? 1 : sideralDay + 1
    sinodicDay = sinodicDay >= 29 ? 1 : sinodicDay + 1
    updateSideralAndSinodicDays(sideralDay, sinodicDay, freeCamera)
  } else {
    earthRotationAngle += 1 * speedAnimation
    moonTranslationAngle = Number(moonTranslationAngle + (moontTranslationIncrement * speedAnimation))
    // sideralDay = (27.3 * moonTranslationAngle) / 360
    // updateSideralAndSinodicDays(sideralDay, sinodicDay, freeCamera)
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
  EarthMoonSystem.animateEarth(earthRotationAngle)
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

function setCameraFollowMoon() {
  const moonPosition = EarthMoonSystem.getMoonPosition()
  const earthPosition = EarthMoonSystem.getEarthPosition()
  const { x, y, z } = earthPosition

  camera.position.set(x, (y + 1.4), z)
  camera.lookAt(moonPosition)
}

function render() {
  if (lookAtMoon) {
    setCameraFollowMoon()
  }

  renderer.render(scene, camera)
}

const setCameraPosition = (position) => {
  switch (position) {
    case 'top':
      lookAtMoon = false
      camera.position.set(0, 5, 0)
      break;
    case 'left':
      lookAtMoon = false
      camera.position.set(0, 1, 5)
      break;
    case 'right':
      lookAtMoon = false
      camera.position.set(0, 1, -5)
      break;
    case 'earth':
      lookAtMoon = true
      break;
    default:
      lookAtMoon = false
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

function pauseOrbitControls() {
  // controls.enabled = false
  memory.push({ speedAnimation })
  handleAnimationSpeed(0)
  updateAnimationProperties.setControlsVisibility(false)
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

export const handleTotalSolarEclipse = () => {
  pauseOrbitControls()
  simulateTotalSolarEclipse()
  
}

export function closeSimulation() {
  const { speedAnimation: speed } = memory.find(item => item.speedAnimation)
  handleAnimationSpeed(speed)
  controls.enabled = true
  EarthMoonSystem.moonOrbitTurnOff()
  Ecliptic.turnOff()
  simulationRunning = false
}

function App(updatePropertiesCallback) {
  updateAnimationProperties = updatePropertiesCallback

  init(updatePropertiesCallback)
  animate()

  scene.add(Skybox)
  scene.add(EarthMoonSystem.moonOrbit)
  scene.add(Ecliptic.system)
  scene.add(Sun.entity)
  scene.add(axesHelper)
}

export default App

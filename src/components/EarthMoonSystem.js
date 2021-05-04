import { Group, Vector3 } from 'three'
import Circle from './primitives/Circle'
import Earth from './Earth'
import Moon from './Moon'
import { degToRad } from './helpers'

function fillMoonOrbit({ radius, position }) {
  const circle = Circle(radius, 0x00CED1, 0)
  const orbit = circle.entity
  const material = circle.material
  orbit.position.set(position.x, position.y, position.z)
  orbit.rotation.set(degToRad(90), 0, 0)

  return { orbit, material }
}

function EarthMoonSystem() {
  const orbitRadius = 4
  const earthMoonSystem = new Group()
  const moonOrbitSystem = new Group()
  earthMoonSystem.rotateOnAxis(new Vector3(0, 0, 1), degToRad(20))
  
  const earth = Earth.system
  const moon = Moon.system
  
  const moonPosition = -orbitRadius
  earth.position.set(0,0,0)
  moon.position.set(moonPosition,0,0)
  
  const moonOrbit = fillMoonOrbit({ radius: orbitRadius, position: {x: 0, y: 0, z: 0}})
  const { orbit } = moonOrbit

  earthMoonSystem.add(earth)
  earthMoonSystem.add(moon)
  earthMoonSystem.add(orbit)

  moonOrbitSystem.add(earthMoonSystem)

  function animateMoon(angle) { // degrees
    moon.position.x = moonPosition * Math.cos(-degToRad(angle))
    moon.position.z = moonPosition * Math.sin(-degToRad(angle))
    Moon.rotateMoon(angle)
  }

  function animateEarth(increment) {
    
    Earth.rotateEarth(increment)
  }

  function toggleMoonOrbit() {
    const { material, material: { opacity }} = moonOrbit
    material.opacity = opacity > 0 ? 0 : 0.2
  }

  function moonOrbitTurnOn() {
    moonOrbit.material.opacity = 0.2
  }

  function moonOrbitTurnOff() {
    moonOrbit.material.opacity = 0
  }

  function rotateMoonOrbit(increment) {
    moonOrbitSystem.rotateOnAxis(new Vector3(0, 1, 0), degToRad(increment))
  }

  function getMoonPosition() {
    return moon.position
  }

  function getEarthPosition() {
    return earth.position
  }

  return {
    moonOrbit: moonOrbitSystem,
    animateMoon,
    animateEarth,
    toggleMoonOrbit,
    moonOrbitTurnOn,
    moonOrbitTurnOff,
    rotateMoonOrbit,
    getMoonPosition,
    getEarthPosition,
  }
}

export default EarthMoonSystem()

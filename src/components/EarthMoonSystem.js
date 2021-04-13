import { Group, Vector3 } from 'three'
import Circle from './primitives/Circle'
import Earth from './Earth'
import Moon from './Moon'
import { degToRad } from './helpers'

function fillOrbit({ radius, position }) {
  const circle = Circle(radius, 0x0000ff, 0)
  const orbit = circle.entity
  const material = circle.material
  orbit.position.set(0,0,0)
  orbit.rotation.set(degToRad(90), 0, 0)

  return { orbit, material }
}

function EarthMoonSystem() {
  const orbitRadius = 4
  const earthMoonSystem = new Group()
  const earthMoonSystemAxis = new Vector3(0, 0, 0)
  earthMoonSystem.rotateOnAxis(earthMoonSystemAxis, degToRad(0))
  
  const earth = Earth.system
  const moon = Moon.system
  
  const moonPosition = orbitRadius
  earth.position.set(0,0,0)
  moon.position.set(moonPosition,0,0)
  
  const moonOrbit = fillOrbit({ radius: orbitRadius, position: {x: 0, y: 0, z: 0}})
  const { orbit } = moonOrbit

  earthMoonSystem.add(earth)
  earthMoonSystem.add(moon)
  earthMoonSystem.add(orbit)

  function animateMoon(angle) { // degrees
    moon.position.x = moonPosition * Math.cos(-degToRad(angle))
    moon.position.z = moonPosition * Math.sin(-degToRad(angle))
    Moon.rotateMoon(angle)
  }

  function animateEarth(increment) {
    
    Earth.rotateEarth(increment)
  }

  function setMoonDistance(value) {
    moon.position.set(value, 0, 0)
  }

  function toggleMoonOrbit() {
    const { material, material: { opacity }} = moonOrbit
    material.opacity = opacity > 0 ? 0 : 0.2
  }

  return {
    system: earthMoonSystem,
    setMoonDistance,
    animateMoon,
    animateEarth,
    toggleMoonOrbit,
  }
}

export default EarthMoonSystem()

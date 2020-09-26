import { Group, Vector3 } from 'three'
import Earth from './Earth'
import Moon from './Moon'
import { degToRad } from './helpers'

function EarthMoonSystem() {
  const orbitRadius = 4
  const earthMoonSystem = new Group()
  const earthMoonSystemAxis = new Vector3(0, 0, 0)
  earthMoonSystem.rotateOnAxis(earthMoonSystemAxis, degToRad(0))
  const earth = Earth.system
  const moon = Moon.system
  moon.position.x = orbitRadius
  earth.position.set(0,0,0)
  moon.position.set(1,0,0)
  earthMoonSystem.add(earth)
  earthMoonSystem.add(moon)


  function animateMoon(angle) {
    moon.position.x = orbitRadius * Math.cos(-degToRad(angle))
    moon.position.z = orbitRadius * Math.sin(-degToRad(angle))
    Moon.rotateMoon(angle)
  }

  function animateEarth(increment) {
    Earth.rotateEarth(increment)
  }

  return {
    system: earthMoonSystem,
    animateMoon,
    animateEarth,
  }
}

export default EarthMoonSystem()

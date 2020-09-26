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
  Moon.position.x = orbitRadius
  earthMoonSystem.add(earth)
  earthMoonSystem.add(Moon)


  function animateMoon(angle) {
    Moon.position.x = orbitRadius * Math.cos(-degToRad(angle))
    Moon.position.z = orbitRadius * Math.sin(-degToRad(angle))
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

import { Group, Vector3 } from 'three'
import { degToRad } from '../helpers'
import Sphere from '../primitives/Sphere'

function Earth(color = 0x18B6EC) {
  const earthSystem = new Group()
  const earth = Sphere({ color })
  const earthAxis = new Vector3(0, 0, degToRad(-23.44)).normalize()
  earthSystem.rotateOnAxis(earthAxis, degToRad(23.44))
  earthSystem.add(earth)

  function rotateEarth(increment) {
    earth.rotation.y += increment
  }

  return {
    system: earthSystem,
    rotateEarth,
  }
}

export default Earth()

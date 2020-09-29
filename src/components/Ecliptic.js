import Plane from './primitives/Plane'
import { degToRad } from './helpers'

function Ecliptic() {
  const props = {
    width: 90,
    height: 90,
    planeOpacity: 0.2,
  }

  const eclipticPlane = Plane(props)
  eclipticPlane.system.position.set(0,0,0)
  eclipticPlane.system.rotation.set(degToRad(90),0,0)

  return {
    system: eclipticPlane.system,
    toggleEcliptic: eclipticPlane.toggleEcliptic,
  }
}

export default Ecliptic()

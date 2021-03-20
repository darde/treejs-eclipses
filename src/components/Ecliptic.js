import Plane from './primitives/Plane'
import { DoubleSide, Mesh, MeshBasicMaterial, CircleGeometry } from 'three'
import { degToRad } from './helpers'

function Ecliptic() {
  const geometry = new CircleGeometry(90, 60, 0, 6.3)
  const material = new MeshBasicMaterial({ wireframe: false, color: 0xffffff, side: DoubleSide })
  material.transparent = true
  material.opacity = 0
  let plane = new Mesh(geometry, material)

  plane.position.set(0, 0, 0)
  plane.rotation.set(degToRad(90), 0, 0)

  function toggleEcliptic() {
    const opacity = material.opacity
    
    material.opacity = opacity > 0 ? 0 : 0.2
  }

  return {
    toggleEcliptic,
    system: plane,
  }
}

export default Ecliptic()

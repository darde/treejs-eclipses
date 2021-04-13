import Circle from './primitives/Circle'
import { DoubleSide, Mesh, MeshBasicMaterial, CircleGeometry } from 'three'
import { degToRad } from './helpers'

function Ecliptic() {
  let circle = Circle(90, 0xffffff, 0)
  let plane = circle.entity
  let material = circle.material

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

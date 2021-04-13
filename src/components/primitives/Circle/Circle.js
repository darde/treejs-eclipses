import { DoubleSide, Mesh, MeshBasicMaterial, CircleGeometry } from 'three'
function Circle(radius, color, opacity = 1) {
  const geometry = new CircleGeometry(radius, 60, 0, 6.3)
  const material = new MeshBasicMaterial({ wireframe: false, color, side: DoubleSide })
  material.transparent = true
  material.opacity = opacity
  let entity = new Mesh(geometry, material)

  return { entity, material }
}

export default Circle

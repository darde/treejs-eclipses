import { SphereGeometry, MeshLambertMaterial, MeshBasicMaterial, Mesh } from 'three'

function Sphere({
  radius = 1,
  widthSegments = 20,
  heightSegments = 20,
  color = 0xffcc00,
}) {
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments)
  const material = new MeshLambertMaterial({ color, wireframe: true })
  return new Mesh(geometry, material)
}

export default Sphere

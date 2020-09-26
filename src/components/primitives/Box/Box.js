import { BoxGeometry, MeshLambertMaterial, Mesh } from 'three'

function Box({
  dimension = [1,1,1],
  widthSegments = 1,
  heightSegments = 1,
  depthSegments = 1,
  color = 0xffcc00,
}) {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshLambertMaterial({ color })
  return new Mesh(geometry, material)
}

export default Box

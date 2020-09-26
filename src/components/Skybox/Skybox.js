import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  BackSide,
} from 'three'
import SpaceBackground from './textures/milkway.jpg'

function Skybox() {
  const geometry = new SphereGeometry(90, 64, 64)
  const material = new MeshBasicMaterial({
    map: new TextureLoader().load(SpaceBackground),
    side: BackSide,
  })

  return new Mesh(geometry, material)
}

export default Skybox()

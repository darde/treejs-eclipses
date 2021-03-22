import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
  DirectionalLight,
  Color,
} from 'three'
import { degToRad } from '../helpers'
import SunTexture from './textures/sun.jpeg'

const geometry = new SphereGeometry(3.3, 32, 32)
const material = new MeshPhongMaterial({
  emissive: new Color('#ffffff'),
  emissiveIntensity: 2,
  emissiveMap: new TextureLoader().load(SunTexture),
  map: new TextureLoader().load(SunTexture),
})
const sun = new Mesh(geometry, material)
const directionalLight = new DirectionalLight(0xffffff, 1)

sun.add(directionalLight)

function rotateSun(angle = 0) {
  sun.rotation.y = degToRad(angle)
}

function setPosition(x = -10, y = 0, z = 0) {
  sun.position.set(x, y, z)
}

function Sun() {
  setPosition()

  return {
    entity: sun,
    setPosition,
    rotateSun,
  }
}

export default Sun()

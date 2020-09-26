import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
  Group,
  Vector3,
} from 'three'
import { degToRad } from '../helpers'
import MoonTexture from './textures/moonmap1k.jpg'
import MoonBumpTexture from './textures/moonbump1k.jpg'

const geometry = new SphereGeometry(0.27, 32, 32)
const material = new MeshPhongMaterial({
  map: new TextureLoader().load(MoonTexture),
  bumpMap: new TextureLoader().load(MoonBumpTexture),
  bumpScale: 0.005,
})
const moon = new Mesh(geometry, material)

const moonSystem = new Group()
const moonAxisX = new Vector3(degToRad(20), 0, 0).normalize()
const moonAxisY = new Vector3(0, degToRad(170), 0).normalize()
moonSystem.rotateOnAxis(moonAxisX, degToRad(20))
moonSystem.rotateOnAxis(moonAxisY, degToRad(170))
moonSystem.add(moon)

function rotateMoon(angle) {
  moon.rotation.y = degToRad(angle)
}

function Moon(color = 0xdedede) {
  // mesh.rotation.set(degToRad(45), degToRad(0), degToRad(0))
  return {
    system: moonSystem,
    rotateMoon,
  }
}

export default Moon()

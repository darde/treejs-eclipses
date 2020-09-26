import {
  Group,
  Vector3,
  SphereGeometry,
  MeshLambertMaterial,
  Mesh,
  TextureLoader,
 } from 'three'
import { degToRad } from '../helpers'
import EarthTexture from './textures/earth.jpg'
// import Sphere from '../primitives/Sphere'

const geometry = new SphereGeometry(1, 32, 32)
const material = new MeshLambertMaterial({
  map: new TextureLoader().load(EarthTexture)
})
const mesh = new Mesh(geometry, material)

function Earth(color = 0x18B6EC) {
  const earthSystem = new Group()
  const earth = mesh
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

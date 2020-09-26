import {
  Group,
  Color,
  Vector3,
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
 } from 'three'
import { degToRad } from '../helpers'
import EarthTexture from './textures/earth.jpg'
import ElevBump from './textures/elev_bump_4k.jpg'
import Water from './textures/water_4k.png'
import Clouds from './textures/fair_clouds_4k.png'


const geometry = new SphereGeometry(1, 32, 32)
const material = new MeshPhongMaterial({
  map: new TextureLoader().load(EarthTexture),
  bumpMap: new TextureLoader().load(ElevBump),
  bumpScale: 0.01,
  specularMap: new TextureLoader().load(Water),
  specular: new Color('#444444')
})
const earthMesh = new Mesh(geometry, material)

const cloudsGeometry = new SphereGeometry(1.02, 32, 32)
const cloudsMaterial = new MeshPhongMaterial({
  map: new TextureLoader().load(Clouds),
  transparent: true,
})
const cloudsMesh = new Mesh(cloudsGeometry, cloudsMaterial)

function Earth(color = 0x18B6EC) {
  const earthSystem = new Group()
  const earth = earthMesh
  const clouds = cloudsMesh
  const earthAxis = new Vector3(0, 0, degToRad(-23.44)).normalize()
  earthSystem.rotateOnAxis(earthAxis, degToRad(23.44))
  earthSystem.add(earth)
  earthSystem.add(clouds)

  function rotateEarth(increment) {
    earth.rotation.y += increment
    clouds.rotation.y += increment * 0.5
  }

  return {
    system: earthSystem,
    rotateEarth,
  }
}

export default Earth()

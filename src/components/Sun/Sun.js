import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
  DirectionalLight,
  DirectionalLightHelper,
  CameraHelper,
  Color,
  SpotLight,
} from 'three'
import { degToRad } from '../helpers'
import SunTexture from './textures/sun.jpeg'

const geometry = new SphereGeometry(9.8, 32, 32)
const material = new MeshPhongMaterial({
  emissive: new Color('#ffffff'),
  emissiveIntensity: 2,
  emissiveMap: new TextureLoader().load(SunTexture),
  map: new TextureLoader().load(SunTexture),
})
const sun = new Mesh(geometry, material)

const spotLight = new SpotLight(0xffffff, 1, 0, 60, 1, 1)
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 4096;
spotLight.shadow.mapSize.height = 4096;


sun.add(spotLight)

// const directionalLight = new DirectionalLight(0xffffff, 1)
// directionalLight.castShadow = true

// const lightHelper = new DirectionalLightHelper(directionalLight)
// const helper = new CameraHelper(directionalLight.shadow.camera)

// sun.add(helper)
// sun.add(directionalLight)
// sun.add(lightHelper)

function rotateSun(angle = 0) {
  sun.rotation.y = degToRad(angle)
}

function setPosition(x = -10, y = 0, z = 0) {
  sun.position.set(x, y, z)
  // directionalLight.position.set(x, y, z)
  spotLight.position.set(x, y, z)
}

function getPosition() {
  return sun.position
}

function Sun() {
  setPosition()

  return {
    entity: sun,
    setPosition,
    rotateSun,
    getPosition,
  }
}

export default Sun()

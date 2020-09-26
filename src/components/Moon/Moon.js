import Sphere from '../primitives/Sphere'

function Moon(color = 0xdedede) {
  return Sphere({ color, radius: 0.6 })
}

export default Moon()

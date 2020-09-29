import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three'


function Plane({ width = 30, height = 30, widthSegments = 30, heightSegments = 30, planeOpacity = 1 }) {
  const geometry = new PlaneGeometry(width, height, widthSegments, heightSegments)
  const material = new MeshBasicMaterial({
    color: '#35A6FF',
    side: DoubleSide,
    transparent: true,
    opacity: planeOpacity,
  })

  function toggleEcliptic() {
    planeOpacity = planeOpacity === 0 ? 0.2 : 0

    material.setValues({ opacity: planeOpacity })
  }

  const system = new Mesh(geometry, material)
  
  return {
    system,
    toggleEcliptic,
  }
}

export default Plane

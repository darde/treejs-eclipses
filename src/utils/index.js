export const animateCamera = (props) => {
  const { camera, targetPosition } = props

  camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z)
}

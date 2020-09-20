import React from 'react'
import { SphereGeometry, MeshLambertMaterial, Mesh } from 'three'

function Sphere({
  scene,
  radius = 1,
  position = [0,0,0],
  widthSegments = 10,
  heightSegments = 10,
  color = 0xffcc00,
}) {
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments)
  const material = new MeshLambertMaterial({ color })
  const mesh = new Mesh(geometry, material)
  mesh.position.set(...position)
  scene.add(mesh)

  return <div />
}

export default Sphere

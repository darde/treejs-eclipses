import React from 'react'
import { BoxGeometry, MeshLambertMaterial, Mesh } from 'three'

function Box({
  scene,
  dimension = [1,1,1],
  position = [0,0,0],
  widthSegments = 10,
  heightSegments = 10,
  depthSegments = 10,
  color = 0xffcc00,
}) {
  const geometry = new BoxGeometry(...dimension, widthSegments, heightSegments, depthSegments)
  const material = new MeshLambertMaterial({ color })
  const mesh = new Mesh(geometry, material)
  mesh.position.set(...position)
  scene.add(mesh)

  return <div />
}

export default Box

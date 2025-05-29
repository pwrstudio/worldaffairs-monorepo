<script lang="ts">
  import { onMount } from "svelte"
  import * as THREE from "three"

  let container: HTMLDivElement
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let sphere: THREE.Mesh

  onMount(() => {
    // Initialize scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // Initialize camera
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Initialize renderer
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // Create wireframe sphere
    const geometry = new THREE.SphereGeometry(1, 16, 16)
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    })
    sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      sphere.rotation.y += 0.005
      sphere.rotation.x += 0.001
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  })
</script>

<div
  bind:this={container}
  style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 100;"
/>

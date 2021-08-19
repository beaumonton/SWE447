import * as THREE from 'https://cdn.skypack.dev/three@0.131.3'
import {FlyControls} from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/FlyControls'
import gsap from 'gsap'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import atmosVertShader from './shaders/atmosVert.glsl'
import atmosFragShader from './shaders/atmosFrag.glsl'
import { SourceMapConsumer } from 'source-map-js'
import gsapCore from 'gsap/gsap-core'

//Create basic scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    antialias: true //Smoothens jagged edges
})

renderer.setSize(innerWidth, innerHeight)
//Increase resolution
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const sphereGeo = new THREE.SphereGeometry(4, 50, 50);
const earthShaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load('./img/earth.jpg')
        },
        atmosphereColor: {
            value: new THREE.Vector3(0.3, 0.6, 1.0)
        }
    }
})
const earthAtmoShaderMaterial =  new THREE.ShaderMaterial({
    vertexShader: atmosVertShader,
    fragmentShader: atmosFragShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    uniforms: {
        atmosphereColor: {
            value: new THREE.Vector4(0.3, 0.6, 1.0, 1.0)
        }
    }
})
const marsShaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load('./img/mars.jpg')
        },
        atmosphereColor: {
            value: new THREE.Vector3(1.0, 0.0, 0.0)
        }
    }
})
const marsAtmoShaderMaterial =  new THREE.ShaderMaterial({
    vertexShader: atmosVertShader,
    fragmentShader: atmosFragShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    uniforms: {
        atmosphereColor: {
            value: new THREE.Vector4(1, 0.6, 0.3, 1.0)
        }
    }
})

//Create Earth-----------------------------------------------------------------
const earth = new THREE.Mesh(
    sphereGeo,
    earthShaderMaterial
)
//scene.add(earth)

//Create Earth Atmosphere------------------------------------------------------------
const atmosphere = new THREE.Mesh(
    sphereGeo,
    earthAtmoShaderMaterial
)
atmosphere.scale.set(1.3, 1.3, 1.3)
//scene.add(atmosphere)

//Group Earth Planet + Atmosphere
const earthGroup = new THREE.Group()
earthGroup.add(earth)
earthGroup.add(atmosphere)
scene.add(earthGroup)

//Create Mars-----------------------------------------------------------------
const mars = new THREE.Mesh(
    sphereGeo, 
    marsShaderMaterial
)
//mars.position.z = 200;
scene.add(mars)

//Create Mars Atmosphere------------------------------------------------------------
const marsAtmosphere = new THREE.Mesh(
    sphereGeo,
    marsAtmoShaderMaterial
)
marsAtmosphere.scale.set(1.14, 1.14, 1.14)
//scene.add(atmosphere)

//Group Mars Planet + Atmosphere
const marsGroup = new THREE.Group()
const marsDistance = 3000
marsGroup.add(mars)
marsGroup.add(marsAtmosphere)
marsGroup.position.z += marsDistance;
scene.add(marsGroup)

//USED FOR OLD MOUSE ROTATION
// const group = new THREE.Group()
// group.add(earth)
// scene.add(group)

//Create Starfield------------------------------------------------------------------
const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
})

const starVertices = []
for(let i = 0; i < 30000; i++) {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const z = (Math.random() - 0.5) * 10000
    starVertices.push(x, y, z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(
    starVertices, 3
))

const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)


//Move camera back
camera.position.z = 12

const controls = new FlyControls( camera, renderer.domElement );
const clock = new THREE.Clock()

//FLY CONTROL VARIABLES--------------------------------------------------
const moveSpeed = 70
const sprintSpeedMultiplier = 3
controls.domElement = renderer.domElement
controls.rollSpeed = 0.5
controls.autoForward = false
controls.dragToLook = false

const mouse = {
    x: 0,
    y: 0
}

const spaceEnabled = true

function animate()
{
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    earthGroup.rotation.y += 0.006
    marsGroup.rotation.y += 0.003
    const delta = clock.getDelta();

    //Returns distance from camera to Earth
    const dEarth = camera.position.length();
    //Barrier distance
    const d = (dEarth - 4 * 1.01);


    //OLD EARTH ROTATION BASED ON MOUSE
    // gsap.to(group.rotation, {
    //     x: -mouse.y * 2,
    //     y: -mouse.x * 2,
    //     duration: 2
    // })


    //MOUSE LOOK AROUND
    // gsap.to(camera.rotation, {
    //     x: mouse.y * 2,
    //     y: -mouse.x * 2
    // })

    stars.rotation.z += 0.00008

    //PLANET SLOWDOWN
    //controls.movementSpeed = 0.33 * d;

    //Fly Controls
	//controls.update( delta );
}

animate()

addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

addEventListener('Space', (e) => {
    console.log(e.key)
    if(spaceEnabled) {
        spaceEnabled = false
        gsap.to(camera.rotation, {
            x: Math.PI,
            ease: 'power3.inOut',
            duration: 1.5
        })
    }
    //controls.movementSpeed *= 10;
    //console.log(controls.movementSpeed);
})

addEventListener('keydown', (e) => {
    if(e.key === 'Shift')
    {
        controls.movementSpeed = moveSpeed * sprintSpeedMultiplier;
    }
    //controls.movementSpeed *= 10;
    //console.log(controls.movementSpeed);
})

addEventListener('keyup', (e) => {
    if(e.key === 'Shift')
    {
        controls.movementSpeed = moveSpeed;
    }
    //controls.movementSpeed *= 10;
    //console.log(controls.movementSpeed);
})

document.querySelector('#marsButton').addEventListener('click', () => {
    console.log('go')

    gsap.to(camera.rotation, {
        y: Math.PI,
        ease: 'power3.inOut',
        duration: 4
    })

    gsap.to(camera.position, {
        z:marsDistance - 20,
        ease: 'power3.in',
        duration: 3,
        delay: 4
    })
})
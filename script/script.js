import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl')

const SEPARATION = 40, AMOUNTX = 130, AMOUNTY = 35;

let container;
let camera, scene, renderer;

let particles, count = 0;

//size
var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

init();
animate();

function init() {


    container = document.createElement( 'div' );
    // document.body.appendChild( container );
    document.getElementById('header_id').appendChild(container);

    camera = new THREE.PerspectiveCamera( 120, (window.innerWidth / window.innerHeight), 1, 10000 );
    camera.position.y = 150;
    camera.position.z = 300;
    // camera.rotation.x = 0.35;

    scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0x050b14 );
    scene.background = new THREE.Color( 0x101117 );

    //

    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array( numParticles * 3 );
    const scales = new Float32Array( numParticles );

    let i = 0, j = 0;

    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {

        for ( let iy = 0; iy < AMOUNTY; iy ++ ) {

            positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
            positions[ i + 1 ] = 0; // y
            positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) - 10); // z

            scales[ j ] = 8;

            i += 3;
            j ++;

        }

    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1) );

    const material = new THREE.ShaderMaterial( {

        uniforms: {
            color: { value: new THREE.Color( 0xF5F5F5 ) }, 
        },
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent

    } );

    //

    particles = new THREE.Points( geometry, material );
    scene.add( particles );

    //

    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(( window.innerWidth) * 0.989, window.innerHeight * 0.95);
    container.appendChild( renderer.domElement );

    //
    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

     sizes.width = window.innerWidth
     sizes.height = window.innerHeight

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()

    renderer.setSize(( window.innerWidth) * 0.989, window.innerHeight * 0.9);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

}



function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {


    const positions = particles.geometry.attributes.position.array;
    const scales = particles.geometry.attributes.scale.array;

    let i = 0;

    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {

        for ( let iy = 0; iy < AMOUNTY; iy ++ ) {

            positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                            ( Math.sin( ( iy + count ) * 0.5 ) * 50 );

            i += 3;

        }

    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;

    renderer.render( scene, camera );

    count += 0.06;

}
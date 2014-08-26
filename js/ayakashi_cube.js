var camera, scene, renderer, canvas;
var loader, mesh, light;

init();
animate();

function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 300;

    loader = new THREE.JSONLoader();

    loader.load( "3D/Aya_01.js", function( geometry, materials ) {
        mesh = new THREE.Mesh( geometry , new THREE.MeshFaceMaterial( materials ) );
        scene.add( mesh );
        mesh.rotation.x += 0.45;
    } );

    // A light shining from the direction of the camera.
    light = new THREE.DirectionalLight();
    light.position.set(0,0,1);
    scene.add(light);

    canvas = document.getElementById("CubeCanvas") ;
    renderer = new THREE.WebGLRenderer( {canvas: canvas, alpha: true} );
    renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
}

function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.y += 0.01;
    renderer.render( scene, camera );
}
var camera, scene, renderer, canvas;
var loader, mesh, light;

var canvasHolder = $("#aya-cube-holder");
var isAyaCubeLoaded = false;

window.addEventListener( 'resize', onWindowResize, false );

init();
animate();

function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera( 75, canvasHolder.width() / canvasHolder.height(), 1, 10000 );
    camera.position.z = 350;
    camera.position.y = -14;

    loader = new THREE.JSONLoader();

    loader.load( "js/3dcube_model.js", function( geometry, materials ) {
        //mesh = new THREE.Mesh( geometry , new THREE.MeshFaceMaterial( materials ) );

        var newMat = new THREE.MeshFaceMaterial( materials );
        
        //DEBUG
        //console.log(newMat);
        //newMat.materials[0] = new THREE.MeshLambertMaterial( { color: 0x99FF99 } );
        //newMat.materials[1] = new THREE.MeshLambertMaterial( { color: 0x000088 } );

        mesh = new THREE.Mesh( geometry , newMat );

        scene.add( mesh );
        mesh.rotation.x += 0.6;
        isAyaCubeLoaded = true;
    } );

    // A light shining from the direction of the camera.
    light = new THREE.DirectionalLight("#fff", 2);
    light.position.set(0,-0.2,1);
    scene.add(light);

    canvas = document.getElementById("aya-cube-canvas") ;
    renderer = new THREE.WebGLRenderer( {canvas: canvas, alpha: true, antialias: true} );
    renderer.setSize( canvasHolder.width(), canvasHolder.height() );
}

function animate() {
    requestAnimationFrame( animate );

    if(isAyaCubeLoaded){
        mesh.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}

function onWindowResize(){
    camera.aspect = canvasHolder.width() / canvasHolder.height();
    camera.updateProjectionMatrix();
    renderer.setSize( canvasHolder.width(), canvasHolder.height() );
}
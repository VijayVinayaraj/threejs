import * as THREE from "./node_modules/three/build/three.module.js";
import {OrbitControls} from "./node_modules/three/examples/jsm/controls/OrbitControls.js"
import {FirstPersonControls} from "./node_modules/three/examples/jsm/controls/FirstPersonControls.js"
import {PointerLockControls} from "./node_modules/three/examples/jsm/controls/PointerLockControls.js"

const scene = new THREE.Scene();
const camera =new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,1000);
const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color( 0x000000 );
//const controls=new OrbitControls(camera,renderer.domElement);

// const geometry=new THREE.BoxGeometry(10,10,50);
// const material =new THREE.MeshBasicMaterial({color :0x00ff00});
// const cube= new THREE.Mesh(geometry,material);
// scene.add(cube);


const cubeGeo= new THREE.BoxGeometry();
const cubeMat= new THREE.MeshPhongMaterial({color:0x3366ff});
const cube =new THREE.Mesh(cubeGeo,cubeMat);
cube.position.set(-12,0.5,-5)
scene.add(cube);




function addcorridor(width,height,clr,x,y,z,X,Y,Z){

    const Geo= new THREE.PlaneBufferGeometry(width,height);
    const Mat = new THREE.MeshBasicMaterial({color:clr, side:THREE.DoubleSide});
    const corridorPlane = new THREE.Mesh(Geo,Mat);
    scene.add(corridorPlane);
    corridorPlane.position.set(x,y,z);
    corridorPlane.rotation.set(X,Y,Z);
}

addcorridor(1,10,0x00bfff,-0.5,0,0,0,1.57,1.57);
addcorridor(1,11,0x00bfff,0.5,0,-0.5,0,-1.57,-1.57);
addcorridor(1,10,0x000000,0,-0.5,0,-1.57,0,0);
addcorridor(1,10,0x00bfff,0,0.5,0,1.57,0,0);

//left corridor

addcorridor(1,10,0x00bfff,-4.5,0,-6,0,0,1.57);
addcorridor(1,9,0x00bfff,-5,0,-5,0,0,1.57);
addcorridor(1,10,0x000000,-4.5,-0.5,-5.5,1.57,0,1.57);
addcorridor(1,10,0x00bfff,-4.5,0.5,-5.5,1.57,0,1.57);



function addroom(width,height,clr,x,y,z,X,Y,Z){

        const roomGeo= new THREE.PlaneBufferGeometry(width,height);
        const roomMat = new THREE.MeshBasicMaterial({color:clr, side:THREE.DoubleSide});
        const roomPlane = new THREE.Mesh(roomGeo,roomMat);
        scene.add(roomPlane);
        roomPlane.position.set(x,y,z);
        roomPlane.rotation.set(X,Y,Z);
}

addroom(5,5,0xffffff,-12,-0.5,-5,1.57,0,0)
addroom(5,5,0xffbf00,-12,4.5,-5,1.57,0,0)
addroom(5,5,0xff99ff,-14.5,2,-5,0,1.57,0)
addroom(5,5,0xffbf00,-12,2,-7.5,0,0,0)
addroom(5,5,0xffbf00,-12,2,-2.5,0,0,0)

// rezize window
window.addEventListener('resize',() => {
camera.aspect=window.innerHeight/window.innerHeight;
camera.updateProjectMatrix();
renderer.setSize(window.innerWidth,window.innerHeight)
controls.handleResize();
render();
},false)


const controls = new PointerLockControls( camera, document.body );

const blocker = document.getElementById( 'blocker' );
				const instructions = document.getElementById( 'instructions' );

				instructions.addEventListener( 'click', function () {

					controls.lock();

				}, false );

				controls.addEventListener( 'lock', function () {

					instructions.style.display = 'none';
					blocker.style.display = 'none';

				} );

				controls.addEventListener( 'unlock', function () {

					blocker.style.display = 'block';
					instructions.style.display = '';

                } );
                
                let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
            let moveRight = false;
            
            let prevTime = performance.now();
			const velocity = new THREE.Vector3();
			const direction = new THREE.Vector3();

                const onKeyDown = function ( event ) {

					switch ( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = true;
							break;

						case 37: // left
						case 65: // a
							moveLeft = true;
							break;

						case 40: // down
						case 83: // s
							moveBackward = true;
							break;

						case 39: // right
						case 68: // d
							moveRight = true;
							break;

						case 32: // space
							if ( canJump === true ) velocity.y += 350;
							canJump = false;
							break;

					}

				};

				const onKeyUp = function ( event ) {

					switch ( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = false;
							break;

						case 37: // left
						case 65: // a
							moveLeft = false;
							break;

						case 40: // down
						case 83: // s
							moveBackward = false;
							break;

						case 39: // right
						case 68: // d
							moveRight = false;
							break;

					}

				};

				document.addEventListener( 'keydown', onKeyDown, false );
				document.addEventListener( 'keyup', onKeyUp, false );



                const light = new THREE.HemisphereLight( 0x9933ff, 0x080820, 5);
                scene.add( light );


function animate(){

  cube.rotation.x += 0.1
  cube.rotation.y+= 0.1


 requestAnimationFrame(animate);
 const time =performance.now();

 if ( controls.isLocked === true ) {

  const delta =(time - prevTime)/1000;
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 15.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 15.0 * delta;

    
    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    

}
  
  render();
  prevTime=time;
} 

const render =()=>{
    renderer.render(scene,camera);
}

animate();
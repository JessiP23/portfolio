import React, { useEffect, useMemo, useRef, useCallback} from "react";
import * as THREE from "three";
//import 3d bookcase
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader';
//mouse camera movement
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import "./App.css";

const ThreeDRoom = () => {
  //empty array
  const paintingClickable = useMemo(() => {
    const clickableObjects = [];
    //story clickable objects
    return clickableObjects;
    }, []);

  const canvasRef = useRef(null);

  //initialize scene, camera, and renderer
  const scene = useMemo(() => new THREE.Scene(), []);
  const camera = useMemo(
    () => new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1300),
    []
  );
  camera.position.set(0, 0, 560);

  const renderer = useMemo(() => new THREE.WebGLRenderer({ antialias: true }), []);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  //light
  const ambientLight = new THREE.AmbientLight(0xff00ff);
  ambientLight.intensity = 0.9;
  scene.add(ambientLight);

  //light origin centered in neon bulb
  const spotLight = new THREE.SpotLight(0xffffff, 1); //white intensity 1
  spotLight.position.set(0, 300, 0);
  spotLight.castShadow = true;//shadows in scene
  spotLight.shadow.mapSize.width = 100;
  spotLight.shadow.mapSize.height = 100;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 800;
  scene.add(spotLight);
 
   //walls
   const textureLoader = new THREE.TextureLoader();
   const floorTexture = textureLoader.load('./images/floor_texture.jpg');
   //floor patterns
   floorTexture.wrapS = THREE.RepeatWrapping;
   floorTexture.wrapT = THREE.RepeatWrapping;
   //three horizontal and 8 vertical textures
   floorTexture.repeat.set(3,8);  

 
   //wall texture
   const wallTexture = textureLoader.load('./images/wall_texture.jpg');
   const roomGeometry = new THREE.BoxGeometry(600,400,1100);
   const roomSettings = [
    //dark textures by using MeshPhongMaterial
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide, color: 0x404040}),
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide, color: 0x404040}),
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide}),
     new THREE.MeshPhongMaterial({ map: floorTexture, side: THREE.BackSide}),
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide, color: 0x404040}),
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide, color: 0x404040})
   ];

   //room setup
   const room = new THREE.Mesh(roomGeometry, roomSettings);
   room.castShadow = true;
   scene.add(room);

   //bulb
   //Optime performance
   const neonBulb = useMemo(() => {
    const neonMaterial = new THREE.MeshBasicMaterial({
      //neon green color
      color: 0x00ff00, 
    });
    
    const neonGeometry = new THREE.SphereGeometry(10, 32, 32);
    const neonBulb = new THREE.Mesh(neonGeometry, neonMaterial);
    neonBulb.position.set(0, 200, 0); 
    scene.add(neonBulb);
    paintingClickable.push(neonBulb);

    return neonBulb;
   }, [scene, paintingClickable]);//dependecies

   //painting textures setup
   const paintingLoader = new THREE.TextureLoader();
   const paintingTexture1 = paintingLoader.load('./images/calculator.png');
   const paintingTexture2 = paintingLoader.load('./images/universe.png');
   const paintingTexture3 = paintingLoader.load('./images/myApp1.jpg');
   const paintingTexture4 = paintingLoader.load('./images/business_photo.png');
   const paintingTexture5 = paintingLoader.load('./images/math.png');
   const paintingTexture6 = paintingLoader.load('./images/stream.png');

   //paintings positioned with different textures.
   const painting1 = useMemo(() => {
    const paintingGeometry1 = new THREE.PlaneGeometry(90, 90);
    const paintingMaterial1 = new THREE.MeshPhongMaterial({map: paintingTexture1, side: THREE.DoubleSide});
    return new THREE.Mesh(paintingGeometry1, paintingMaterial1);
   }, [paintingTexture1]); //receive the paintingTexture1
   //Painting added to the paintingClickable empty array
   paintingClickable.push(painting1);

   const painting2 = useMemo(() => {
    const paintingGeometry2 = new THREE.PlaneGeometry(90, 90);
    const paintingMaterial2 = new THREE.MeshPhongMaterial({map: paintingTexture2, side: THREE.DoubleSide});
    return new THREE.Mesh(paintingGeometry2, paintingMaterial2);
   }, [paintingTexture2]);
   //link painting2 to app's info
   paintingClickable.push(painting2);

   const painting3 = useMemo(() => {
    const paintingGeometry3 = new THREE.PlaneGeometry(90, 90);
    const paintingMaterial3 = new THREE.MeshPhongMaterial({map: paintingTexture3, side: THREE.DoubleSide});
    return new THREE.Mesh(paintingGeometry3, paintingMaterial3);
   }, [paintingTexture3]);
   //link painting3 to app's info
   paintingClickable.push(painting3);

   const painting4 = useMemo(() => {
    const paintingGeometry4 = new THREE.PlaneGeometry(90,90);
    const paintingMaterial4 = new THREE.MeshPhongMaterial({ map: paintingTexture4, side: THREE.DoubleSide });
    return new THREE.Mesh(paintingGeometry4, paintingMaterial4);
    //link painting4 to app's info
   }, [paintingTexture4]);

   paintingClickable.push(painting4);

   const painting5 = useMemo(() => {
    const paintingGeometry5 = new THREE.PlaneGeometry(90,90);
    const paintingMaterial5 = new THREE.MeshPhongMaterial({ map: paintingTexture5, side: THREE.DoubleSide });
    return new THREE.Mesh(paintingGeometry5, paintingMaterial5);
    //link painting5 to app's ingo
   }, [paintingTexture5]);

   paintingClickable.push(painting5);

   const painting6 = useMemo(() => {
    const paintingGeometry6 = new THREE.PlaneGeometry(90,90);
    const paintingMaterial6 = new THREE.MeshPhongMaterial({ map: paintingTexture6, side: THREE.DoubleSide });
    return new THREE.Mesh(paintingGeometry6, paintingMaterial6);
    //link painting5 to app's ingo
   }, [paintingTexture6]);

   paintingClickable.push(painting6);

   painting1.position.set(259, 100, 100);
   painting2.position.set(-259, 100, 100);
   painting3.position.set(-259, 100, -100);
   painting4.position.set(259, 100, -100);
   painting5.position.set(259, -30, 0);
   painting6.position.set(-259, -30, 0);
   painting1.rotation.y = Math.PI / 2;
   painting2.rotation.y = Math.PI / 2;
   painting3.rotation.y = Math.PI / 2;
   painting4.rotation.y = Math.PI / 2;
   painting5.rotation.y = Math.PI / 2;
   painting6.rotation.y = Math.PI / 2;

   scene.add(painting1);
   scene.add(painting2);
   scene.add(painting3);
   scene.add(painting4);
   scene.add(painting5);
   scene.add(painting6);
  
   //Reusable window function
   function windowPaintings(scene, width, height, depth, positions){
     const windowShape = new THREE.Shape();
     windowShape.moveTo(-width / 2, -height / 2);
     windowShape.lineTo(width / 2, -height /2 );
     windowShape.lineTo(width / 2, height /2);
     windowShape.lineTo(-width / 2, height / 2);
     windowShape.lineTo(-width / 2, -height / 2);

     //window shapes using extrude Geometry
     const holeWindow = new THREE.ExtrudeGeometry(windowShape, {
       depth: depth,
       bevelEnabled: false,
     });
     const holeMaterial = new THREE.MeshBasicMaterial({color: 'brown'});

     const windowMesh = new THREE.Mesh(holeWindow, holeMaterial);

     //Positions for windows
     positions.forEach((position) => {
       const clonedWindow = windowMesh.clone();
       clonedWindow.position.set(position.x, position.y, position.z);
       clonedWindow.rotation.set(0, position.rotation, 0);
       scene.add(clonedWindow);
     });
   }

   const windowWidth = 100;
   const windowHeight = 100;
   const windowDepth = 30;

   const windowPositions = [
     {x: 290, y: 100, z: 100, rotation: -Math.PI /2},
     {x: -260, y: 100, z: 100, rotation: -Math.PI / 2},
     {x: -260, y: 100, z: -100, rotation: -Math.PI / 2},
     {x: 290, y: 100, z: -100, rotation: -Math.PI / 2},
     {x: 290, y: -30, z: 0, rotation: -Math.PI / 2},
     {x: -260, y: -30, z: 0, rotation: -Math.PI /2},
   ];

   windowPaintings(scene, windowWidth, windowHeight, windowDepth, windowPositions);

   //camera boundaries
   const checkBoundary = useCallback((newPosition) => {
    //limit boundaries
    const minX = -200; 
    const maxX = 200;  
    const minY = -200;
    const maxY = 0;
    const minZ = -450;
    const maxZ = 450; 
  
    // Check if the new position is within the boundaries by using clamp method from Math.Utils
    newPosition.x = THREE.MathUtils.clamp(newPosition.x, minX, maxX);
    newPosition.y = THREE.MathUtils.clamp(newPosition.y, minY, maxY);
    newPosition.z = THREE.MathUtils.clamp(newPosition.z, minZ, maxZ);
    //set camera to new clamped position
    camera.position.set(newPosition.x, newPosition.y, newPosition.z);
  },[camera.position]);
   
  useEffect(() => {
    //Add renderer to canvas reference
    canvasRef.current.appendChild(renderer.domElement);
    //camera movement
    const controls = new OrbitControls(camera, renderer.domElement);

    //orbitcontrols limit
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = 0;
    const maxSize = Math.PI / 4;
    const minSize = -Math.PI / 4;
    controls.maxAzimuthAngle = maxSize;
    controls.minAzimuthAngle = minSize;

    //mouse interaction
    const raycaster = new THREE.Raycaster();

    //3d model bookcase imported
    const loader = new GLTFLoader();
    loader.load('/models/bookcase.glb', (gltf) => {
      const bookcase = gltf.scene;
      bookcase.castShadow = true;
      bookcase.position.set(-50,-20,-380);
      bookcase.rotation.set(0,0,0);
      bookcase.scale.set(40,40,20);
      scene.add(bookcase);
    });

    const handleMouseClick = (event) => {
      //event.clientX = X-coordinate of mouse in pixels
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      //Y-axis increases from top to bottom
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      
      //intersections for clickable objects
      const intersects = raycaster.intersectObjects(paintingClickable);

      //if intersections exist, different objects will redirect different pages' URLs
      if(intersects && intersects.length > 0){
        const paintingClicked = intersects[0].object;
        const BASE_URL = 'http://localhost:8000';
        if(paintingClicked === painting1){
          const url = BASE_URL; 
          window.location.href = url;
        } else if (paintingClicked === painting2){
          const url = BASE_URL + '/universe_app'
          window.location.href = url;
        } else if (paintingClicked === painting3){
          const url = BASE_URL + '/quiz_app';
          window.location.href = url;
        } else if(paintingClicked === neonBulb){
          const url = BASE_URL + '/about_me';
          window.location.href = url;
        } else if (paintingClicked === painting4) {
          const url = BASE_URL + '/business_application';
          window.location.href = url;
        } else if (paintingClicked === painting5) {
          const url = BASE_URL + '/math';
          window.location.href = url;
        } else if (paintingClicked === painting6) {
          const url = BASE_URL + '/streamm';
          window.location.href = url;
        }
      };  
    }    

    //camera movement with keys
    const handleKeyDown = (event) => {
      event.preventDefault();
      const distanceMovement = 8;
    
      let movementVector = new THREE.Vector3(0, 0, 0);
    
      //pressed arrow keys and behavior
      switch (event.key) {
        case "ArrowUp":
          movementVector.z = -1;
          break;
        case "ArrowDown":
          movementVector.z = 1
          break;
        case "ArrowLeft":
          movementVector.x = -1;
          break;
        case "ArrowRight":
          movementVector.x = 1;
          break;
        default:
          break;
      }
    
      //update camera's position
      camera.position.add(movementVector.multiplyScalar(distanceMovement));
      //camera's boundaries
      checkBoundary(camera.position);
    };
    
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    renderer.domElement.style.display = "block";

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleMouseClick);

    //animation loop
    function animate() {
      controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    //cleanup, dispose controls, stop animation loop
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleMouseClick);
      renderer.setAnimationLoop(null);
      controls.dispose();
    };
  }, [renderer, scene, camera, checkBoundary, paintingClickable, painting1, painting2, painting3, neonBulb]);

  //three-room for only styling page. 
  return( 
    <div className="three-room">
      <div className="myCanvas" ref={canvasRef} tabIndex={0} ></div>
    </div>
  );
}

export default ThreeDRoom;
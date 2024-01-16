import React, { useEffect, useMemo, useRef, useCallback } from "react";
import * as THREE from "three";
import "./App.css";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader';

const ThreeDRoom = () => {
  //painting1 clicking feature
  const paintingClickable = useMemo(() => {
    const clickableObjects = [];
    return clickableObjects;
    }, []);

  const canvasRef = useRef();

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

  const ambientLight = new THREE.AmbientLight(0xff00ff);
  ambientLight.intensity = 0.9;
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 300, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 100;
  spotLight.shadow.mapSize.height = 100;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 800;
  scene.add(spotLight);

   //walls
   const textureLoader = new THREE.TextureLoader();
   const floorTexture = textureLoader.load('./images/floor_texture.jpg');
   
   floorTexture.wrapS = THREE.RepeatWrapping;
   floorTexture.wrapT = THREE.RepeatWrapping;
   floorTexture.repeat.set(3,8);  

 
   
   const wallTexture = textureLoader.load('./images/wall_texture.jpg');
   const roomGeometry = new THREE.BoxGeometry(600,400,1100);
   const roomSettings = [
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide, color: 0x404040}),
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide, color: 0x404040}),
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide}),
     new THREE.MeshPhongMaterial({ map: floorTexture, side: THREE.BackSide}),
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide, color: 0x404040}),
     new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.BackSide, color: 0x404040})
   ];

   const room = new THREE.Mesh(roomGeometry, roomSettings);
   room.castShadow = true;
   scene.add(room);

   const neonBulb = useMemo(() => {
    const neonMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00, 
    });
    
    const neonGeometry = new THREE.SphereGeometry(10, 32, 32);
    const neonBulb = new THREE.Mesh(neonGeometry, neonMaterial);
    neonBulb.position.set(0, 200, 0); 
    scene.add(neonBulb);
    paintingClickable.push(neonBulb);

    return neonBulb;
   }, [scene, paintingClickable]);

   const paintingLoader = new THREE.TextureLoader();
   const paintingTexture1 = paintingLoader.load('./images/calculator.png');
   const paintingTexture2 = paintingLoader.load('./images/universe.png');
   const paintingTexture3 = paintingLoader.load('./images/myApp1.jpg');

   const painting1 = useMemo(() => {
    const paintingGeometry1 = new THREE.PlaneGeometry(90, 90);
    const paintingMaterial1 = new THREE.MeshPhongMaterial({map: paintingTexture1, side: THREE.DoubleSide});
    return new THREE.Mesh(paintingGeometry1, paintingMaterial1);
   }, [paintingTexture1]);
   //link painting to Django 
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

   painting1.position.set(259, 100, 100);
   painting2.position.set(-259, 100, 100);
   painting3.position.set(-259, 100, -100);
   painting1.rotation.y = Math.PI/2;
   painting2.rotation.y = Math.PI / 2;
   painting3.rotation.y = Math.PI / 2;

   scene.add(painting1);
   scene.add(painting2);
   scene.add(painting3);
  
   //window
   function windowPaintings(scene, width, height, depth, positions){
     const windowShape = new THREE.Shape();
     windowShape.moveTo(-width / 2, -height / 2);
     windowShape.lineTo(width / 2, -height /2 );
     windowShape.lineTo(width / 2, height /2);
     windowShape.lineTo(-width / 2, height / 2);
     windowShape.lineTo(-width / 2, -height / 2);

     const holeWindow = new THREE.ExtrudeGeometry(windowShape, {
       depth: depth,
       bevelEnabled: false,
     });
     const holeMaterial = new THREE.MeshBasicMaterial({color: 'brown'});

     const windowMesh = new THREE.Mesh(holeWindow, holeMaterial);

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
   ];

   windowPaintings(scene, windowWidth, windowHeight, windowDepth, windowPositions);

   const checkBoundary = useCallback((newPosition) => {
    const minX = -200; 
    const maxX = 200;  
    const minZ = -450;
    const maxZ = 450;  
  
    // Check if the new position is within the boundaries
    if (newPosition.x >= minX && newPosition.x <= maxX && newPosition.z >= minZ && newPosition.z <= maxZ) {
      camera.position.set(newPosition.x, newPosition.y, newPosition.z);
    }
  },[camera.position]);


   
  useEffect(() => {
    canvasRef.current.appendChild(renderer.domElement);
    const raycaster = new THREE.Raycaster();

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
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(paintingClickable);

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
        }
      };  
    }    

    const handleKeyDown = (event) => {
      event.preventDefault();
      const distanceMovement = 5;
    
      let movementVector = new THREE.Vector3(0, 0, 0);
    
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
    
      camera.position.add(movementVector.multiplyScalar(distanceMovement));
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

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleMouseClick);
      renderer.setAnimationLoop(null);
    };
  }, [renderer, scene, camera, checkBoundary, paintingClickable, painting1, painting2, painting3, neonBulb]);

  return <div className="myCanvas" ref={canvasRef} tabIndex={0} ></div>;
}

export default ThreeDRoom;
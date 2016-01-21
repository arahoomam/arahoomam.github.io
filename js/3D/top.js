/*==============================================
=            Threejs header portion            =
==============================================*/
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseX = 0, mouseY = 0;
var scene, camera, renderer, geosphere;
var size = 0.3;
var expand = false;
var id;

function startup(){
	console.log("Rendering top banner");
	init();
	animate();
};

function init(){
	//====================================================================
	/* boiler plate */
	scene = new THREE.Scene();
	var canvas = document.getElementById('canvas');
	var width = window.innerWidth;
	var height = parseInt($('#canvas').css('height'));

	//====================================================================
	/*setting up the camera*/
	camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
	camera.position.set(0,0,100);
	// scene.add(camera);

	//====================================================================
	/* setting up renderer */
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(width, height);
	canvas.appendChild(renderer.domElement);

	//====================================================================
	/* creating objects */
	
	// point light
	var light = createLight(0xffffff);
	light.position.set(0,0,0);
	scene.add(light);

	// wireframe sphere
	var geometry = new THREE.SphereGeometry( 20, 10, 6 );
	var material = new THREE.MeshPhongMaterial( { 
													color: 0x15c6ff,
													wireframe: true,
													side: THREE.DoubleSide  
												} );
	geosphere = new THREE.Mesh( geometry, material );
	scene.add(geosphere);

	//====================================================================
	/* light */
	var hemlight = new THREE.HemisphereLight(0xffbf67, 0x15c6ff);
	scene.add(hemlight);

	//====================================================================
	/*dynamic resize*/
 	window.addEventListener( 'resize', onWindowResize, false );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
};

function animate(){
	id = requestAnimationFrame(animate);
	
	if(expand){
		// setting height to resize to 
		var resizer = parseInt($('#canvas').css('height'));
		resizer += 11.5;

		// set the renderer
		renderer.setSize(window.innerWidth, resizer );

		// change the acutal DOM element height
		$('#canvas').css('height', resizer);

		// update camera properties
		camera.aspect = window.innerWidth / parseInt($('#canvas').css('height'));
	  	camera.updateProjectionMatrix();

		if(camera.position.z != 8){
			camera.position.z-=1;
		}else{
			cancelAnimationFrame(id);
			window.location.href = "resume.html";
		}
	}
	geosphere.rotation.x = mouseY*0.0033;
	geosphere.rotation.z = mouseX*-0.0033;	
	

 	renderer.render(scene, camera);
};

/*========================================
=            Helper functions            =
========================================*/

function createLight( color ) {
	var pointLight = new THREE.PointLight( color, 1, 6000 );
	pointLight.castShadow = true;
	pointLight.shadowCameraNear = 1;
	pointLight.shadowCameraFar = 30;
	// pointLight.shadowCameraVisible = true;
	pointLight.shadowMapWidth = 2048;
	pointLight.shadowMapHeight = 1024;
	pointLight.shadowBias = 0.01;
	pointLight.shadowDarkness = 0.5;

	var geometry = new THREE.SphereGeometry( 6, 20, 20 );
	var material = new THREE.MeshBasicMaterial( { color: color,
													wireframe: false
												} );
	var sphere = new THREE.Mesh( geometry, material );	
	
	pointLight.add( sphere );

	return pointLight;
};


function onWindowResize() {
  camera.aspect = window.innerWidth / parseInt($('#canvas').css('height'));
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, parseInt($('#canvas').css('height')));
};

function onDocumentMouseMove( event ) {
	mouseX = event.clientX;
	mouseY = event.clientY;
};


function changePage(){
	$("body").removeClass("blue lighten-1");
	$("body").addClass("black");
	$("body").css("overflow", "hidden");

	$("div:not(#canvas").transit({rotateX: 90}, 500, 'ease-out', function(){
		$("div:not(#canvas),footer").remove();
		expand = true;					
	});
};



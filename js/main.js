/*Created by vanelizarov 2016*/

$(function() {

    var camera;
    var scene;
    var renderer;
    var controls;

    function init() {

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height(), 1, 2000);
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });


        renderer.setSize($(window).width(), $(window).height());
        //renderer.setClearColor(0xFFFFFF);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        camera.position.set(500, 500, 500);
        camera.lookAt(scene.position);


        var axisHelper = new THREE.AxisHelper(500);
        scene.add(axisHelper);


        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        //controls.addEventListener('change', render) - for using without animate

        var planeGeometry = new THREE.PlaneGeometry(500, 500);
        var planeMaterial = new THREE.MeshLambertMaterial({
            //wireframe: true,
            color: 0x999999
        });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        scene.add(plane);


        // var loader = new THREE.TextureLoader();
        // loader.load('assets/cryintower.png', function(texture) {
        //     var material = new THREE.MeshBasicMaterial({
        //         map: texture,
        //         color: 0xffffff,
        //         overdraw: true
        //     });
        //
        // });

        var cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
        var cubeMaterial = new THREE.MeshLambertMaterial({
            //wireframe: true,
            color: 0xff00ff
        })
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.name = "cube";
        cube.position.set(0, 25, 0);
        cube.castShadow = true;
        scene.add(cube);


        var light = new THREE.SpotLight(0xffffff, 0.8);
        light.position.set(200, 200, 0);
        light.castShadow = true;
        scene.add(light);

        $("#scene-output").append(renderer.domElement);


    }

    $(window).resize(function() {

        camera.aspect = $(window).width() / $(window).height();
        camera.updateProjectionMatrix();

        renderer.setSize($(window).width(), $(window).height());

    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        var cubeObject = scene.getObjectByName("cube");
        cubeObject.rotation.y += 0.01;

        render();
    }

    function render() {
        //camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    init();
    animate();

});

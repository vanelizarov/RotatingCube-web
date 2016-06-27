$(function() {

    var camera;
    var scene;
    var renderer;


    function init() {

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height(), 1, 2000);
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });


        renderer.setSize($(window).width(), $(window).height());
        renderer.setClearColor(0xFFFFFF);
        renderer.shadowMap.enabled = true;


        camera.position.set(500, 500, 500);
        camera.lookAt(scene.position);


        var axisHelper = new THREE.AxisHelper(500);
        scene.add(axisHelper);


        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        // controls.enableDamping = true;
        // controls.dampingFactor = 0.25;
        controls.addEventListener('change', render)

        var planeGeometry = new THREE.PlaneGeometry(500, 500);
        var planeMaterial = new THREE.MeshLambertMaterial({
            //wireframe: true
            color: 0xffffff
        });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        scene.add(plane);


        var cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
        var cubeMaterial = new THREE.MeshLambertMaterial({
            //wireframe: true,
            color: 0xff00ff
        })
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(0, 25, 0);
        cube.rotation.x = -Math.PI / 2;
        cube.castShadow = true;
        scene.add(cube);


        var light = new THREE.SpotLight(0xffffff);
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


    function render() {
        //camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    init();
    render();

});

let scene, renderer, panningCamera, demonstrationCamera, camera, controls, c = true, p2, r = true;

init();
animate();

function init() {
    scene = new THREE.Scene();
    panningCamera = new THREE.OrthographicCamera(-180, 180, -90, 90, -1, 1);
    const offset = 50;
    demonstrationCamera = new THREE.OrthographicCamera(-180 - offset, 180 + offset, -90 - offset, 90 + offset, -1, 1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = panningCamera;
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enableZoom = false;  

    const geometry1 = new THREE.PlaneGeometry(360, 180);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
    const plane1 = new THREE.Mesh(geometry1, material1);
    plane1.position.x = 0;
    scene.add(plane1);

    const geometry2 = new THREE.PlaneGeometry(360, 180);
    const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
    const plane2 = new THREE.Mesh(geometry2, material2);
    plane2.position.x = 360;
    scene.add(plane2);

    p2 = plane2;

}

function animate() {
    if (camera.position.x < 0) {
        camera.position.x = 360;
        controls.target.x = 360;
        camera.updateProjectionMatrix();
        console.log("Switched to right copy");
    } else if (camera.position.x > 360) {
        camera.position.x = 0;
        controls.target.x = 0;
        camera.updateProjectionMatrix();
        console.log("Switched to left copy");
    }

    camera.position.y = 0;
    controls.target.y = 0;
    camera.updateProjectionMatrix();

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

// Window Resizing
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Key Controls
document.onkeydown = function(e) {
    // Path visibility
    if (e.key === 'c') {
        if(c) {
            c = false;
            camera = demonstrationCamera;
            controls.object = camera;
        } else {
            c = true;
            camera = panningCamera;
            controls.object = camera;
        }
        camera.position.x = 0;
        controls.target.x = 0;
        controls.update();
        
    }
    if(e.key === "r") {
        if(r) {
            r = false;
            p2.material.color.set(0xffff00);
        } else {
            r = true;
            p2.material.color.set(0xFF0000);
        }
    }
}

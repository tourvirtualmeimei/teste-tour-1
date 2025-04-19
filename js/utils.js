// Função que carrega uma nova esfera (ou cilindro) com textura e aplica um efeito de fade-in
export function loadNewSphere(imagePath, projection, scene, camera, textureLoader, oldSphere, callback) {
    textureLoader.load(imagePath, function (texture) {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.99, 1);

        // Remove esfera anterior
        if (oldSphere) scene.remove(oldSphere);

        // Remove planos de fade antigos
        scene.children.forEach(child => {
            if (child.isFade) {
                scene.remove(child);
                child.geometry.dispose();
                child.material.dispose();
            }
        });

        // Cria nova geometria com base na projeção
        let geometry;
        if (projection === 'spherical') {
            geometry = new THREE.SphereGeometry(500, 60, 40);
        } else {
            geometry = new THREE.CylinderGeometry(500, 500, 1000, 60, 1, true);
        }
        geometry.scale(-1, 1, 1);

        // Cria material e mesh da esfera
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Adiciona fade visual (topo e base) se for cilíndrica
        if (projection === 'cylindrical') {
            const fadeTexture = textureLoader.load('images/fade_gradient.png');
            
            const fadeMaterial = new THREE.MeshBasicMaterial({
                map: fadeTexture,
                transparent: true,
                opacity: 1,
                depthWrite: false,
                side: THREE.BackSide
            });
        
            // Top fade
            const topFade = new THREE.Mesh(
                new THREE.PlaneGeometry(1000, 400),
                fadeMaterial
            );
            topFade.position.y = 180;
            topFade.rotation.x = Math.PI / 2;
            topFade.isFade = true;
            scene.add(topFade);
        
            // Bottom fade
            const bottomFade = new THREE.Mesh(
                new THREE.PlaneGeometry(1000, 400),
                fadeMaterial
            );
            bottomFade.position.y = -180;
            bottomFade.rotation.x = -Math.PI / 2;
            bottomFade.isFade = true;
            scene.add(bottomFade);
        }
        

        // Animação de fade-in
        const duration = 500;
        let start = null;

        function fadeIn(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;

            material.opacity = Math.min(progress / duration, 1);
            camera.fov = 65 + (progress / duration) * 10;
            camera.updateProjectionMatrix();

            if (progress < duration) {
                requestAnimationFrame(fadeIn);
            } else {
                material.opacity = 1;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                if (callback) callback(sphere);
            }
        }

        requestAnimationFrame(fadeIn);
    });
}


// Função que realiza a transição entre esferas com efeito de fade-out e fade-in
export function fadeTransition(newImagePath, projection, scene, camera, textureLoader, oldSphere, callback) {
    const duration = 500; // duração da transição
    let start = null;

    // Função que reduz gradualmente a opacidade da esfera atual
    function fadeOut(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Reduz a opacidade da esfera antiga
        if (oldSphere && oldSphere.material) {
            oldSphere.material.opacity = Math.max(1 - progress / duration, 0);
            oldSphere.material.transparent = true;
        }

        // Efeito de "zoom out" na câmera
        camera.fov = 75 - (progress / duration) * 10;
        camera.updateProjectionMatrix();

        if (progress < duration) {
            requestAnimationFrame(fadeOut); // continua a animação
        } else {
            // Remove a esfera antiga e carrega a nova com fade-in
            if (oldSphere) scene.remove(oldSphere);
            
            loadNewSphere(
                newImagePath,
                projection,
                scene,
                camera,
                textureLoader,
                oldSphere,
                callback
            );
        }
    }

    // Inicia a animação de fade-out
    requestAnimationFrame(fadeOut);
}

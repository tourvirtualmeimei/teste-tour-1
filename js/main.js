// Importa as configurações de cenas, funções para POIs, utilitários e controles
import { sceneConfigurations } from './scenes.js';
import { createPOIMesh, updatePOIs } from './pois.js';
import { loadNewSphere, fadeTransition } from './utils.js';
import { setupControls, updateCameraView } from './controls.js';

// Declara variáveis principais
let container, scene, camera, renderer, sphere, material;
let textureLoader = new THREE.TextureLoader(); // Carregador de texturas
let currentScene = 1; // Cena inicial
window.currentProjection = 'spherical';
let isTransitioning = false;

// Obtém o elemento HTML onde será exibido o tour
container = document.getElementById('container');

// Cria a cena 3D
scene = new THREE.Scene();

window.addTestPOI = function (x, y, z) {
    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    scene.add(sphere);
}

// Cria a câmera com campo de visão de 75°, proporção da tela e profundidade
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.target = new THREE.Vector3(); // Alvo da câmera

// Cria o renderizador WebGL e define o tamanho igual ao da janela
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Adiciona o renderizador (canvas) ao HTML
container.appendChild(renderer.domElement);

// Função para trocar de cena
function switchScene(sceneNumber) {
    if (isTransitioning) return; // Ignora se já estiver em transição

    isTransitioning = true;
    currentScene = sceneNumber;
    window.currentProjection = sceneConfigurations[sceneNumber].projection || 'spherical';

    fadeTransition(
        sceneConfigurations[sceneNumber].image,
        currentProjection,
        scene,
        camera,
        textureLoader,
        sphere,
        (newSphere) => {
            sphere = newSphere;
            updatePOIs(sceneNumber, scene, camera);
            isTransitioning = false; // Libera novas transições
        }
    );
}

// Torna a função `switchScene` acessível no navegador
window.switchScene = switchScene;

// Função global para exibir vídeo
window.showVideo = function () {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.style.display = 'block'; // Mostra o elemento
    videoPlayer.play(); // Inicia o vídeo
};

// Inicializa os controles de câmera
setupControls(container, camera);

// Carrega a cena inicial
switchScene(currentScene);

// Função de renderização (loop)
function render() {
    updateCameraView(camera, currentProjection); // <- agora passa o tipo de projeção

    scene.children.forEach(child => {
        if (child.isPOI) child.lookAt(camera.position);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render(); // Inicia o loop de renderização

// Evento de clique para interação com POIs e vídeo
container.addEventListener('click', function (event) {
    // Converte a posição do clique para coordenadas normalizadas
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    // Cria um raycaster para detectar objetos clicados
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Verifica se algum objeto foi clicado
    const intersects = raycaster.intersectObjects(scene.children);

    intersects.forEach(intersect => {
        if (intersect.object.isPOI && intersect.object.action) {
            intersect.object.action(); // Executa a ação do POI
        }
    });

    // Esconde o vídeo se o clique for fora dele
    const videoPlayer = document.getElementById('videoPlayer');
    const clickedPOIVideo = intersects.some(intersect => intersect.object.poiType === 'video');

    // Só fecha o vídeo se o clique não foi em um POI de vídeo
    if (!clickedPOIVideo && event.target !== videoPlayer) {
        videoPlayer.pause();
        videoPlayer.style.display = 'none';
    }
});

// Evento de movimento do mouse para destaque visual nos POIs
container.addEventListener('mousemove', function (event) {
    // Converte posição do mouse para coordenadas normalizadas
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    // Cria raycaster baseado na posição do mouse
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Reseta o tamanho de todos os POIs
    scene.children.forEach(child => {
        if (child.isPOI) child.scale.set(1, 1, 1);
    });

    // Aumenta o POI que estiver sob o mouse
    const intersects = raycaster.intersectObjects(scene.children);
    intersects.forEach(intersect => {
        if (intersect.object.isPOI) {
            intersect.object.scale.set(1.2, 1.2, 1.2); // Destaca visualmente
        }
    });
});
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Bloqueia o menu do botão direito

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(sphere);

    if (intersects.length > 0) {
        const point = intersects[0].point;
        console.log('📌 Coordenada clicada:', point);

        // Adiciona esfera para visualização (opcional)
        const marker = new THREE.Mesh(
            new THREE.SphereGeometry(10, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        marker.position.copy(point);
        scene.add(marker);
    } else {
        console.log('❌ Nenhuma interseção com a esfera encontrada.');
    }
});

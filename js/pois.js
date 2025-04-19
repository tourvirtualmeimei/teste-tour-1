// Função que cria um POI (ponto de interesse) visual na cena
export function createPOIMesh(poiConfig, camera) {
    const textureLoader = new THREE.TextureLoader(); // Carregador de texturas
    const geometry = new THREE.PlaneGeometry(20, 20); // Geometria plana (tipo um plano 2D)

    let material;

    // Define o material conforme o tipo de POI
    if (poiConfig.type === 'navigation') {
        // Se for um POI de navegação, usa um ícone de seta
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/arrow.png'), // Ícone da seta
            transparent: true,           // Permite transparência
            alphaTest: 0.5,              // Define o limiar de transparência
            side: THREE.DoubleSide       // Renderiza dos dois lados do plano
        });
    } else if (poiConfig.type === 'video') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/play_icon.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'info') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/play_icon.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'recepcao') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/recepcao.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'cinema') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/cinema.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'lavanderia') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/lavanderia.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'menino') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/menino.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } 
    else if (poiConfig.type === 'menina') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/menina.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'playground') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/playground.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'bercario') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/bercario.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'refeitorio') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/refeitorio.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'cozinha') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/cozinha.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'eventos') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/eventos.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    } else if (poiConfig.type === 'playbebe') {
        // Se for um POI de vídeo, usa um ícone de play
        material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/icon/playbebe.png'), // Ícone de vídeo
            transparent: true,
            alphaTest: 0.5,
            side: THREE.DoubleSide
        });
    }

    // Cria o mesh (objeto 3D) do POI com geometria e material definidos
    const poiMesh = new THREE.Mesh(geometry, material);

    // Posiciona o POI na posição definida na configuração
    poiMesh.position.copy(poiConfig.position);

    // Faz o POI "olhar" para a câmera
    poiMesh.lookAt(camera.position);

    // Define propriedades auxiliares no objeto para controle futuro
    poiMesh.isPOI = true;             // Marca como POI
    poiMesh.poiType = poiConfig.type; // Armazena o tipo (navigation ou video)
    poiMesh.action = poiConfig.action; // Armazena a ação a ser executada ao clicar

    return poiMesh; // Retorna o POI pronto para ser adicionado na cena
}

// Função que atualiza os POIs de uma cena específica
export function updatePOIs(sceneNumber, scene, camera) {
    import('./scenes.js').then(({ sceneConfigurations }) => {
        // Remove POIs antigos de forma segura
        const poisToRemove = scene.children.filter(child => child.isPOI);
        poisToRemove.forEach(poi => {
            scene.remove(poi);              // Remove da cena
            poi.geometry.dispose();        // Libera memória da geometria
            poi.material.dispose();        // Libera memória do material
        });

        // Adiciona os POIs da nova cena
        sceneConfigurations[sceneNumber].pois.forEach(poiConfig => {
            const poi = createPOIMesh(poiConfig, camera);
            scene.add(poi);
        });
    });
}


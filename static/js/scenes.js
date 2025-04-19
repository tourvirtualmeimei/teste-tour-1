// Define e exporta um objeto contendo a configuração de todas as cenas do tour virtual
export const sceneConfigurations = {
    // Cena 1: Frente do portão
    1: {
        image: '/static/images/frente_portao.jpeg', // Caminho da imagem equiretangular ou cilíndrica
        projection: 'spherical', // Tipo de projeção (esférica)
        pois: [ // Pontos de interesse da cena
            {
                type: 'navigation', // Tipo de POI: navegação entre cenas
                //position: new THREE.Vector3(20, 100, -400), // Posição 3D do POI
                //position: new THREE.Vector3(-360, 50, 300), // Posição 3D do POI
                position: new THREE.Vector3(-394, -57, -263), // Posição 3D do POI
                action: () => switchScene(2) // Ação ao clicar: muda para a cena 2
            }
        ]
    },

    // Cena 2: Frente da recepção
    2: {
        image: '/static/images/frente_recepcao.jpeg',
        projection: 'spherical',
        pois: [
            { type: 'recepcao', position: new THREE.Vector3(-426, 144, 215), action: () => switchScene(6) },
            { type: 'cinema', position: new THREE.Vector3(-347, 138, 330), action: () => switchScene(7) },
            { type: 'lavanderia', position: new THREE.Vector3(-337, 180, 320), action: () => switchScene(8) },
            { type: 'playground', position: new THREE.Vector3(42, 171, 467), action: () => switchScene(10) },
            { type: 'navigation', position: new THREE.Vector3(-31, -64, -493), action: () => switchScene(1) },
            { type: 'eventos', position: new THREE.Vector3(-478, 141, 16), action: () => switchScene(9) },
            { type: 'navigation', position: new THREE.Vector3(-165, 127, 453), action: () => switchScene(3) }
        ]
    },

    // Cena 3: Curva da rua
    3: {
        image: '/static/images/curva_rua.jpeg',
        projection: 'cylindrical', // Aqui usamos projeção cilíndrica
        pois: [
            { type: 'navigation', position: new THREE.Vector3(93, -281, -490), action: () => switchScene(2) },
            { type: 'navigation', position: new THREE.Vector3(230, -111, 442), action: () => switchScene(4) },
            { type: 'menino', position: new THREE.Vector3(-204, -151, 456), action: () => switchScene(16) },
            { type: 'playground', position: new THREE.Vector3(459, -125, -171), action: () => switchScene(10) }
        ]
    },

    // Cena 4: Topo da rua
    4: {
        image: '/static/images/topo rua.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-332, -51, -373), action: () => switchScene(3) },
            { type: 'navigation', position: new THREE.Vector3(126, 122, 482), action: () => switchScene(5) }
        ]
    },

    // Cena 5: Hall do refeitório e quartos
    5: {
        image: '/static/images/hall_refeitorio_quartos.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-77, -65, -493), action: () => switchScene(4) },
            { type: 'refeitorio', position: new THREE.Vector3(-0.8, 45, 499), action: () => switchScene(15) },
            { type: 'menina', position: new THREE.Vector3(490, 101, 95), action: () => switchScene(11) },
            { type: 'playbebe', position: new THREE.Vector3(317, 82, 385), action: () => switchScene(12) }
        ]
    },

    // Cena 6: Recepção
    6: {
        image: '/static/images/recepcao.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(89, 22, -491), action: () => switchScene(2) },
            { type: 'video', position: new THREE.Vector3(-335, 99, 350), action: () => showVideo() }
        ]
    },

    // Cena 7: Cinema
    7: {
        image: '/static/images/Cinema.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-374, 20, -331), action: () => switchScene(2) }
        ]
    },

    // Cena 8: Lavanderia
    8: {
        image: '/static/images/lavanderia.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-497, 51, -53), action: () => switchScene(2) },
            { type: 'eventos', position: new THREE.Vector3(470, 98, 166), action: () => switchScene(9) }
        ]
    },

    // Cena 9: Espaço de eventos
    9: {
        image: '/static/images/eventos.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-486, 117, 115), action: () => switchScene(2) },
            { type: 'lavanderia', position: new THREE.Vector3(432, 51, -250), action: () => switchScene(8) }
        ]
    },

    // Cena 10: Playground e bosque
    10: {
        image: '/static/images/playground_bosque.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(419, -246, -270), action: () => switchScene(2) },
            { type: 'navigation', position: new THREE.Vector3(-228, -149, -444), action: () => switchScene(3) }
        ]
    },

    // Cena 11: Quarto das meninas
    11: {
        image: '/static/images/quarto meninas.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-487, 76, -110), action: () => switchScene(5) }
        ]
    },

    // Cena 12: Playground bebê
    12: {
        image: '/static/images/PLAYGROUND BEBE.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-375, -14, -330), action: () => switchScene(5) },
            { type: 'bercario', position: new THREE.Vector3(-216, 85, 450), action: () => switchScene(13) }
        ]
    },

    // Cena 13: Berçário
    13: {
        image: '/static/images/bercario.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'playbebe', position: new THREE.Vector3(-407, 47, 288), action: () => switchScene(12) }
        ]
    },

    // Cena 14: Cozinha
    14: {
        image: '/static/images/cozinha.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'refeitorio', position: new THREE.Vector3(-359, 15, 346), action: () => switchScene(15) }
        ]
    },

    // Cena 15: Refeitório
    15: {
        image: '/static/images/refeitorio.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'cozinha', position: new THREE.Vector3(461, 14, -191), action: () => switchScene(14) },
            { type: 'navigation', position: new THREE.Vector3(38, 25, -497), action: () => switchScene(5) }
        ]
    },

    // Cena 16 está comentada por enquanto
    16: {
        image: '/static/images/quarto_meninos.jpg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(336, 7, 369), action: () => switchScene(3) }
        ]
    }
};

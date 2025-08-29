const menuData = [
    {
        id: 'p1',
        name: 'Huevona',
        description: 'Pan brioche, carne de hamburguesa, queso, arepita blanca coronada con huevo frito, tocineta ahumada, vegetales frescos y salsas artesanales de la casa.',
        price: 19900,
        image: 'img/hamburguesas/huevona.jpg',
        category: 'hamburguesas',
        recommended: false
    },
    {
        id: 'p2',
        name: 'Forajida',
        description: 'Pan brioche, carne de hamburguesa, tiras de carne oreada receta de la mamá Marina, pollo desmechado en tártara SALOON, chorizo parillero, arepita blanca, queso cheddar, queso mozzarela, vegetales frescos y salsas artesanales de la casa.',
        price: 28900,
        image: 'img/hamburguesas/chori-burger.jpg',
        category: 'hamburguesas',
        recommended: true
    },
    {
        id: 'p3',
        name: 'Quesuda',
        description: 'Pan brioche, carne de hamburguesa con queso cheddar, papa triturada, vegetales frescos y todo esto sobre una cama de mix de quesos y tártara, además de una lluvia de crocante de tocineta + porción de papas. ',
        price: 22900,
        image: 'img/hamburguesas/quesuda.jpg',
        category: 'hamburguesas',
        recommended: true
    },
    {
        id: 'p4',
        name: 'Salchi Burger',
        description: 'Disfruta de una severa SALCHIBURGER REINA APOTEÓSICA!!! 🤙',
        price: 23900,
        image: 'img/hamburguesas/salchi-burger.jpg',
        category: 'hamburguesas',
        recommended: false
    },
    {
        id: 'p5',
        name: 'Ganadora del Burguer Fest 2022',
        description: 'Pan brioche, carne de hamburguesa, tiras de carne oreada receta de la mamá Marina, tocineta ahumada bañada en BBQ artesanal, arepa santandereana, queso, vegetales frescos y salsas artesanales de la casa.',
        price: 23900,
        image: 'img/hamburguesas/burguer-fest.jpg',
        category: 'hamburguesas',
        recommended: false
    },
    {
        id: 'p6',
        name: 'Billy Boy',
        description: 'Pan brioche, carne de hamburguesa, mazorca desgranada salteada a la plancha, con trozos de tocineta ahumada gratinados, vegetales frescos y salsas artesanales de la casa.',
        price: 19900,
        image: 'img/hamburguesas/billy-boy.jpg',
        category: 'hamburguesas',
        recommended: false
    },
    {
        id: 'p7',
        name: 'Pollo Salvaje',
        description: 'Pan brioche, carne de hamburguesa, pollo desmechado en tártara SALOON, champiñones, doble tocineta ahumada, arepita blanca, queso, vegetales frescos y salsas artesanales de la casa.',
        price: 24900,
        image: 'img/hamburguesas/pollo-salcaje.jpg',
        category: 'hamburguesas',
        recommended: false
    },
    {
        id: 'p8',
        name: 'Tocino Salvaje',
        description: 'Pan brioche, doble carne de hamburguesa, triple tocineta ahumada, queso cheddar y doble queso mozzarela, salsas artesanales de la casa',
        price: 26900,
        image: 'img/hamburguesas/tocino-salvaje.jpg',
        category: 'hamburguesas',
        recommended: false
    },
    {
        id: 'p9',
        name: 'Hot Bronco',
        description: 'Pan brioche, carne de hamburguesa, sobrebarriga desmechada, jalapeños, guacamole, chorizo parrillero, queso, vegetales frescos y salsas artesanales de la casa.',
        price: 23900,
        image: 'img/perros/hot-bronco.jpg',
        category: 'hamburguesas',
        recommended: true
    },
    {
        id: 'p10',
        name: 'Jesse James',
        description: 'Pan brioche, carne de hamburguesa, arepa Santandereana, deliciosa combinación de chorizo parrillero y champiñón salteado a la plancha fundidos en queso, vegetales frescos y salsas artesanales de la casa.',
        price: 22900,
        image: 'img/perros/jesse-james.jpg',
        category: 'hamburguesas',
        recommended: false
    },
    {
        id: 'p11',
        name: 'Bby Sheriff',
        description: 'Pan brioche, carne de hamburguesa, lomo de cerdo a la parrilla, corte de piña asada y gratinada, tocineta ahumada, queso, queso cheddar, vegetales frescos y salsas artesanales de la casa.',
        price: 23900,
        image: 'img/perros/bby-sheriff.jpg',
        category: 'hamburguesas',
        recommended: false
    },
    {
        id: 'p12',
        name: 'Vaquera',
        description: 'Pan brioche, carne de hamburguesa( o pollo desmechado), tocineta ahumada, queso, vegetales frescos y salsas artesanales de la casa - Opción Doble: $24900',
        price: 17900,
        image: 'img/perros/vaquera.jpg',
        category: 'hamburguesas',
        recommended: false
    },
    {
        id: 'p13',
        name: 'Salchi Perra',
        description: '',
        price: 22900,
        image: 'img/perros/salchi-perra.jpg',
        category: 'perros',
        recommended: false
    },
    {
        id: 'p14',
        name: 'Perra Loca',
        description: 'Doble pan brioche de perro, triple salchicha Americana, papa triturada, pollo y carne desmechado en tartara, corona de choripapa, queso gratinado X4, triple tocineta, salsas artesanales de la casa.',
        price: 49900,
        image: 'img/perros/perra-loca.jpg',
        category: 'perros',
        recommended: false
    },
    {
        id: 'p15',
        name: 'Cuba Libre',
        description: 'Cóctel clásico y sencillo que se prepara mezclando ron (tradicionalmente con ron blanco o dorado) con refresco de cola y jugo de lima en un vaso con hielo, decorado con una rodaja de lima.',
        price: 16000,
        image: 'img/bebidas/cuba-libre.jpg',
        category: 'bebidas',
        recommended: false
    },
    {
        id: 'p16',
        name: 'Malteada Saloon',
        description: 'Nuestras malteadas son esas bebidas clásicas que jamás pasan de moda, conocidas por su textura cremosa y dulce que se logra al mezclar helado con leche.',
        price: 14000,
        image: 'img/bebidas/malteada.jpg',
        category: 'bebidas',
        recommended: true
    },
    {
        id: 'p17',
        name: 'Mojito de Maracuyá',
        description: 'Te invitamos a probar nuestra bebida originaria de Cuba que se prepara con ron, zumo de limón, agua, hielo y azúcar, y se adorna con una rama de hierbabuena.',
        price: 16000,
        image: 'img/bebidas/mojito.jpg',
        category: 'bebidas',
        recommended: false
    },
    {
        id: 'p18',
        name: 'Caipiroska',
        description: 'Licor, pulpa de tu elección, hierbabuena, zumo de limón, gaseosa cuatro, hielo',
        price: 16000,
        image: 'img/bebidas/mojito.jpg',
        category: 'bebidas',
        recommended: true
    },
    {
        id: 'p19',
        name: 'Daiquiri',
        description: 'Licor, zumo de naranja, zumo de limón, hielo',
        price: 2.00,
        image: 'img/bebidas/mojito.jpg',
        category: 'bebidas',
        recommended: false
    },
];
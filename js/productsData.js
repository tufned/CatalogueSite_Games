const productsData = {
    'gow-2105': {
        'name': 'God of War',
        'price': 100,
        'img-url': '../images/product-photos/godOfWar.webp',
        'options': {
            'category': ['open world', 'action-adventure', 'rpg', 'exclusive'],
            'best-offer': false,
            'hit': false,
            'release-date': [4, 2018],
            // 'sale': false,
        },

    },
    'ft13-2105': {
        'name': 'Friday the 13th: The Game',
        'price': 90,
        'img-url': '../images/product-photos/fridayThe13th.webp',
       'options': {
           'category': ['survival', 'online'],
           'best-offer': false,
           'hit': false,
           'release-date': [5, 2017],
        },
    },
    'sbz-2105': {
        'name': 'Subnautica: Below Zero',
        'price': 120,
        'img-url': '../images/product-photos/SabnauticaBelowZero.webp',
        'options': {
            'category': ['survival', 'open world'],
            'best-offer': false,
            'hit': false,
            'release-date': [5, 2021],
         },
    },
    'rev-2105': {
        'name': 'Resident Evil Village',
        'price': 140,
        'img-url': '../images/product-photos/rev.webp',
        'options': {
            'category': ['shooter', 'action-adventure'],
            'best-offer': false,
            'hit': false,
            'release-date': [5, 2021],
         },
    },
    'c2077-2105': {
        'name': 'Cyberpunk 2077',
        'price': 100,
        'img-url': '../images/product-photos/c20077.webp',
        'options': {
            'category': ['shooter', 'action-adventure', 'rpg'],
            'best-offer': false,
            'hit': false,
            'release-date': [12, 2020],
         },
    },
    'b3-2105': {
        'name': 'Borderlands 3',
        'price': 110,
        'img-url': '../images/product-photos/b3.webp',
        'options': {
            'category': ['shooter', 'action-adventure', 'rpg'],
            'best-offer': false,
            'hit': false,
            'release-date': [9, 2019],
         },
    },
    'bord-2105': {
        'name': 'Borderlands',
        'price': 90,
        'img-url': '../images/product-photos/borderlands.jpeg',
        'options': {
            'category': ['shooter', 'action-adventure', 'rpg'],
            'best-offer': false,
            'hit': false,
            'release-date': [10, 2009],
         },
    },
    'b2-2105': {
        'name': 'Borderlands: The Handsome Collection',
        'price': 100,
        'img-url': '../images/product-photos/b2.webp',
        'options': {
            'category': ['shooter', 'action-adventure', 'rpg'],
            'best-offer': false,
            'hit': true,
            'release-date': [9, 2012],
         },
    },
    'dstr-2105': {
        'name': 'Death Stranding',
        'price': 120,
        'img-url': '../images/product-photos/dstr.jpg',
        'options': {
            'category': ['action-adventure', 'online', 'open world'],
            'best-offer': true,
            'hit': false,
            'release-date': [11, 2019],
         },
    },
    'doome-2105': {
        'name': 'Doom Eternal',
        'price': 140,
        'img-url': '../images/product-photos/doomE.webp',
        'options': {
            'category': ['shooter', 'action-adventure', 'rpg'],
            'best-offer': false,
            'hit': true,
            'release-date': [3, 2020],
         },
    },
    'mssmmm-2105': {
        'name': 'Spider-Man Miles Morales',
        'price': 140,
        'img-url': '../images/product-photos/spiderman-miles-morales-sku-standard-edition.jpeg',
        'options': {
            'category': ['action-adventure', 'exclusive'],
            'best-offer': false,
            'hit': false,
            'release-date': [11, 2020],
         },
    },
    'tloup2-2106': {
        'name': 'The Last of Us Part II',
        'price': 110,
        'img-url': '../images/product-photos/tloup2.webp',
        'options': {
            'category': ['action-adventure', 'shooter', 'exclusive'],
            'best-offer': true,
            'hit': false,
            'release-date': [6, 2020],
         },
    },
    'mdmx-2106': {
        'name': 'Mad Max',
        'price': 75,
        'img-url': '../images/product-photos/madmax.jpeg',
        'options': {
            'category': ['action-adventure'],
            'best-offer': false,
            'hit': false,
            'release-date': [9, 2015],
         },
    },
    'owle-2106': {
        'name': 'Overwatch: Legendary Edition',
        'price': 80,
        'img-url': '../images/product-photos/owle.webp',
        'options': {
            'category': ['online', 'shooter'],
            'best-offer': false,
            'hit': false,
            'release-date': [5, 2016],
         },
    },
    'skyse-2106': {
        'name': 'The Elder Scrolls V: Skyrim. Special Edition',
        'price': 100,
        'img-url': '../images/product-photos/skyse.jpg',
        'options': {
            'category': ['action-adventure', 'rpg', 'open world'],
            'best-offer': false,
            'hit': true,
            'release-date': [11, 2011],
         },
    },
    'bat1-2106': {
        'name': 'Battlefield 1',
        'price': 90,
        'img-url': '../images/product-photos/bat1.webp',
        'options': {
            'category': ['online', 'shooter'],
            'best-offer': false,
            'hit': false,
            'release-date': [10, 2016],
         },
    },
    'batv-2106': {
        'name': 'Battlefield V',
        'price': 120,
        'img-url': '../images/product-photos/batv.jpeg',
        'options': {
            'category': ['online', 'shooter'],
            'best-offer': false,
            'hit': false,
            'release-date': [11, 2018],
         },
    },
    'gtavpe-2106': {
        'name': 'Grand Theft Auto V: Premium Edition',
        'price': 100,
        'img-url': '../images/product-photos/gtavpe.webp',
        'options': {
            'category': ['online', 'shooter', 'open wolrd'],
            'best-offer': false,
            'hit': false,
            'release-date': [9, 2013],
         },
    },
    'rdr2-2106': {
        'name': 'Red Dead Redemption 2',
        'price': 125,
        'img-url': '../images/product-photos/rdr2.jpeg',
        'options': {
            'category': ['action-adventure', 'rpg', 'open world'],
            'best-offer': false,
            'hit': false,
            'release-date': [10, 2018],
         },
    },
    'tw3wh-2106': {
        'name': 'The Witcher 3: Wild Hunt',
        'price': 120,
        'img-url': '../images/product-photos/tw3wh.webp',
        'options': {
            'category': ['action-adventure', 'rpg', 'open world'],
            'best-offer': false,
            'hit': true,
            'release-date': [5, 2015],
         },
    },
    'mncrft-2106': {
        'name': 'Minecraft',
        'price': 100,
        'img-url': '../images/product-photos/mncrft.webp',
        'options': {
            'category': ['survival', 'open world'],
            'best-offer': false,
            'hit': false,
            'release-date': [11, 2011],
         },
    },
}








const sliderScreensData = {
    'firstPage': {
        'img': '../images/products-photos_slider/6098050.jpg',
        'info': 'Pre-Order',
    },
    'secondPage': {
        'img': '../images/products-photos_slider/4021334.jpg',
        'info': `${productsData['rev-2105']['price']}₴ UAH`,
    },
    'thirdPage': {
        'img': '../images/products-photos_slider/1270499.jpg',
        'info': '110₴ UAH',
        'info': `${productsData['b3-2105']['price']}₴ UAH`,
    },
}
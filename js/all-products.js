const goods = document.querySelector('.goods');

const moreGamesCard = `<div class="product red">
                        <div class="product-main">
                            <img src="/icons/icons8-medium-icons-96.png" alt="Game" class="product-photo photo-more">
                        </div>
                        <div class="product-footer more">
                            <div class="product-footer_left-side">
                                <h3>More Games</h3>
                            </div>
                            <img class="next-page-icon" src="/icons/icons8-next-page-90.png" alt="">
                        </div>
                    </div>`;

if (goods) {
    for (let key in productsData) {
        const article = key;
        const img = productsData[key]['img-url'];
        const name = productsData[key]['name'];
        const price = `${productsData[key]['price']}₴ UAH`;
        productCardRender(article, img, name, price);
    }
    goods.innerHTML += moreGamesCard;
}


function productCardRender(article, imgUrl, name, price) {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('product');
    mainDiv.setAttribute('data-article', article); //------------ article ------------
    goods.append(mainDiv);

    const productMain = document.createElement('div');
    productMain.classList.add('product-main');
    mainDiv.append(productMain);
    const img = document.createElement('img');
    img.classList.add('product-photo');
    img.src = imgUrl; //------------ img-url ------------
    productMain.append(img);
    
    const productFooter = document.createElement('div');
    productFooter.classList.add('product-footer');
    mainDiv.append(productFooter);
    const productFooter_leftSide = document.createElement('div');
    productFooter_leftSide.classList.add('product-footer_left-side');
    productFooter.append(productFooter_leftSide);
    const h3 = document.createElement('h3');
    h3.textContent = name; //------------ name ------------
    const p = document.createElement('p');
    p.textContent = price; //------------ price ------------
    productFooter_leftSide.append(h3, p);

    const productFooter_onhover = document.createElement('div');
    productFooter_onhover.classList.add('product-footer_onhover');
    mainDiv.append(productFooter_onhover);
    const clickableArea = document.createElement('div');
    clickableArea.classList.add('clickable-area_product');
    clickableArea.setAttribute('data-article', article);
    productFooter_onhover.append(clickableArea);


    const productFooter_lS_onhover = document.createElement('div');
    productFooter_lS_onhover.classList.add('product-footer_left-side');
    productFooter_onhover.append(productFooter_lS_onhover);
    const p_onhover = document.createElement('p');
    p_onhover.classList.add('add-to-cart')
    p_onhover.textContent = 'ADD TO CART';
    productFooter_lS_onhover.append(p_onhover);

    const productFooter_rS_onhover = document.createElement('div');
    productFooter_rS_onhover.classList.add('product-footer_right-side');
    productFooter_onhover.append(productFooter_rS_onhover);
    const img_onhover = document.createElement('img');
    img_onhover.classList.add('add-to-cart-icon');
    img_onhover.src = '../icons/icons8-add-shopping-cart-90.png';
    productFooter_rS_onhover.append(img_onhover);

    const productChild = document.createElement('div');
    productChild.classList.add('product-child');
    mainDiv.append(productChild);
} 




// const products = document.querySelectorAll('.product');
// let cartPositions = {};
// if (localStorage.getItem('cart') !== null) {
//     cartPositions = localStorage.getItem('cart');
// }

// for (let elem of products) {
//     elem.addEventListener('click', () => {
//         const article = elem.getAttribute('data-article');

//         for (let key in productsData) {
//             if (article == key) {
//                 key[cartPositions] = key;
//                 cartPositions[key] = productsData[key];
//             }
//         }
//         localStorage.setItem('cart', JSON.stringify(cartPositions));
//     });
// }


let cartPositions = {};
if (localStorage.getItem('cart') !== null) {
    cartPositions = localStorage.getItem('cart');
    cartPositions = JSON.parse(cartPositions);
}

goods.addEventListener('click', e => {
    if (e.target.classList.contains('clickable-area_product')) {
        const article = e.target.dataset.article;
        for (let key in productsData) {
            if (article == key) {
                key[cartPositions] = key;
                cartPositions[key] = productsData[key];
                cartPositions[key]['count'] = 1;
                cartPositions[key]['first-price'] = cartPositions[key]['price'];
            }
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartPositions));
});


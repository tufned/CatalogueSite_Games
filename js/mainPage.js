const cartProducts = document.querySelector('.cart-products');
if (cartProducts) {
    if (localStorage.getItem('cart') !== null) {
        let cartPositions = localStorage.getItem('cart');
        cartPositions = JSON.parse(cartPositions);

        for (let key in cartPositions) {
            const article = key;
            const img = cartPositions[key]['img-url'];
            const name = cartPositions[key]['name'];
            const price = `${cartPositions[key]['price']}₴ UAH`;
            productCardRender(cartProducts, article, img, name, price);
        }
    }
}




// Slider
const sliderDotsBlock = document.querySelector('.slider-block_dots');
const sliderPrice = document.querySelector('.slider-block_price');
const sliderBlockWidth = document.querySelector('.slider-block-shell').offsetWidth;
const sliderBlock = document.querySelector('.slider-block');

let maxCount = -1;
let sliderPages = ``;
let dots = ``;
for (let key in sliderScreensData) {
    maxCount++;
    sliderPages += `<div class="slider-page" style="width: ${sliderBlockWidth}px">
                            <img class="slider-block_photo" src="${sliderScreensData[key]['img']}" alt="photo">
                            <div class="slider-block_info">${sliderScreensData[key]['info']}</div>
                        </div>`;
    dots += `<div class="dot"></div>`;
}
sliderBlock.innerHTML = sliderPages;
sliderDotsBlock.innerHTML = dots;


const slider_leftArrow = document.querySelector('.slider-block_left-arrow');
const slider_rightArrow = document.querySelector('.slider-block_right-arrow');
const widthBetweenSliderPages = +sliderBlockWidth + 50
const allDots = document.querySelectorAll('.dot');
allDots[0].classList.add('current-dot');

let widthToMove = 0;
let count = 0;
slider_leftArrow.addEventListener('click', sliderPagesMove_back);
slider_rightArrow.addEventListener('click', sliderPagesMove_forward);
setInterval(sliderPagesMove_forward, 15000);

function sliderPagesMove_back() {
    if (count == 0) {
        count = maxCount;
        allDots[0].classList.remove('current-dot');
        allDots[count].classList.add('current-dot');
        widthToMove = -((sliderBlockWidth + 50) * maxCount);
        sliderBlock.style.transform = `translateX(${widthToMove}px)`;
    }
    else {
        count--;
        widthToMove = widthToMove + widthBetweenSliderPages;
        sliderBlock.style.transform = `translateX(${widthToMove}px)`;
        allDots[count + 1].classList.remove('current-dot');
        allDots[count].classList.add('current-dot');
    }
}

function sliderPagesMove_forward() {
    if (count == maxCount) {
        count = 0;
        allDots[maxCount].classList.remove('current-dot');
        allDots[count].classList.add('current-dot');
        widthToMove = 0;
        sliderBlock.style.transform = `translateX(${widthToMove}px)`;
    }
    else {
        count++;
        widthToMove = widthToMove - widthBetweenSliderPages;
        sliderBlock.style.transform = `translateX(${widthToMove}px)`;
        allDots[count - 1].classList.remove('current-dot');
        allDots[count].classList.add('current-dot');
    }
}



// BEST OFFERS
const bestOffersParent = document.querySelector('.products_best-offers');
const newReleasesParent = document.querySelector('.new-releases');
const hitParent = document.querySelector('.hit-products');

let k = 0;
const currentDate = new Date();
const currentYear = +currentDate.getFullYear();
const currentMounth = +currentDate.getMonth() + 1;

for (let key in productsData) {
    const bestOffer = productsData[key]['options']['best-offer'];
    if (bestOffer == true) {
        if (k < 2) {
            k++;
            const article = key;
            const img = productsData[key]['img-url'];
            const name = productsData[key]['name'];
            const price = `${productsData[key]['price']}₴ UAH`;
            productCardRender(bestOffersParent, article, img, name, price);
        }
        else console.log(`(Best Offers) Extra game: ${productsData[key]['name']}`);
    }

    const gameMonth = +productsData[key]['options']['release-date'][0];
    const gameYear = +productsData[key]['options']['release-date'][1];
    if (currentYear == gameYear) {
        if (currentMounth == gameMonth || currentMounth - 1 == gameMonth || currentMounth - 2 == gameMonth) {
            const article = key;
            const img = productsData[key]['img-url'];
            const name = productsData[key]['name'];
            const price = `${productsData[key]['price']}₴ UAH`;
            productCardRender(newReleasesParent, article, img, name, price);
        }
    }

    const hit = productsData[key]['options']['hit'];
    if (hit == true) {
        const article = key;
        const img = productsData[key]['img-url'];
        const name = productsData[key]['name'];
        const price = `${productsData[key]['price']}₴ UAH`;
        productCardRender(hitParent, article, img, name, price);
    }
}




articles = JSON.parse(articles);
// checking added products
const products = document.querySelectorAll('.product');
for (let product of products) {
    if (product.parentNode != bestOffersParent) {
        for (let key in articles) {
            const neededArticle = product.dataset.article;
            if (neededArticle == key) {
                addedProductRender(product);
            }   
        }
    } 
    else {
        for (let key in articles) {
            const neededArticle = product.dataset.article;
            if (neededArticle == key) {
                addedProductRender_bestOffer(product);
            }   
        }
    }
}


function addedProductRender_bestOffer(element) {
    const elem = element;
    elem.querySelector('.add-to-cart-icon').src = '../icons/icons8-checkout-90.png';
    elem.querySelector('.add-to-cart').innerHTML = 'GO TO CART';
    elem.querySelector('.product-footer_onhover').classList.add('added');
    
    elem.querySelector('.product-child').style.backgroundColor = 'rgb(34, 34, 34)';
    elem.style.boxShadow = 'none';
    elem.addEventListener('mousemove', () => {
            elem.querySelector('.product-child').style.backgroundColor = 'rgb(48, 48, 48)';
    });
    elem.addEventListener('mouseleave', () => {
        elem.querySelector('.product-child').style.backgroundColor = 'rgb(34, 34, 34)';
    });
    const priceElem = elem.querySelector('.product-price');
    priceElem.innerHTML = 'ADDED TO CART';
    priceElem.style.color = 'rgb(79, 201, 116)';
    elem.querySelector('.clickable-area_product').addEventListener('click', () => {
        document.location.href = '/html/cart.html';
    });
}



// adding to cart
let cartPositions = {};
if (localStorage.getItem('cart') !== null) {
    cartPositions = localStorage.getItem('cart');
    cartPositions = JSON.parse(cartPositions);
}

const gameCompilationsArea = document.querySelector('.game-compilations');
gameCompilationsArea.addEventListener('click', e => {
    if (e.target.classList.contains('clickable-area_product')) {
        const product = e.target.parentNode.parentNode;
        const article = product.dataset.article;
        article[cartPositions] = article;
        cartPositions[article] = productsData[article];
        cartPositions[article]['count'] = 1;
        cartPositions[article]['first-price'] = cartPositions[article]['price'];
        cartProductsAmount.innerHTML = +cartProductsAmount.innerHTML + 1;

        addedProductRender(product);
    }
    localStorage.setItem('cart', JSON.stringify(cartPositions));
});


bestOffersParent.addEventListener('click', e => {
    if (e.target.classList.contains('clickable-area_product')) {
        const product = e.target.parentNode.parentNode;
        const article = product.dataset.article;
        article[cartPositions] = article;
        cartPositions[article] = productsData[article];
        cartPositions[article]['count'] = 1;
        cartPositions[article]['first-price'] = cartPositions[article]['price'];
        cartProductsAmount.innerHTML = +cartProductsAmount.innerHTML + 1;

        addedProductRender_bestOffer(product);
    }
    localStorage.setItem('cart', JSON.stringify(cartPositions));
});




// filter by category (remembering category)
const categories = document.querySelector('.categories');
const pageHref = 'http://127.0.0.1:5500/html/all-products.html';
let filter_category = {};

categories.addEventListener('click', e => {
    if (e.target.classList.contains('category')) {
        const categoryName = e.target.innerHTML.trim().toLowerCase();
        filter_category[categoryName] = [];
        localStorage.setItem('filter_category', JSON.stringify(filter_category));
        window.location.href = pageHref;
    }
});
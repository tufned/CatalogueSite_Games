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

// rendering all products 
const searchResBlock = document.querySelector('.search-results');

if (goods) {
    for (let key in productsData) {
        const article = key;
        const img = productsData[key]['img-url'];
        const name = productsData[key]['name'];
        const price = `${productsData[key]['price']}₴ UAH`;
        productCardRender(article, img, name, price);

        const div = document.createElement('div');
        div.classList.add('search-result');
        div.classList.add('hide');
        div.innerHTML = name;
        searchResBlock.append(div);
    }
    // goods.innerHTML += moreGamesCard;
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
    h3.classList.add('product-name');
    h3.textContent = name; //------------ name ------------
    const p = document.createElement('p');
    p.classList.add('product-price');
    p.textContent = price; //------------ price ------------
    productFooter_leftSide.append(h3, p);

    const productFooter_onhover = document.createElement('div');
    productFooter_onhover.classList.add('product-footer_onhover');
    mainDiv.append(productFooter_onhover);
    const clickableArea = document.createElement('div');
    clickableArea.classList.add('clickable-area_product');
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





// adding to cart
let cartPositions = {};
if (localStorage.getItem('cart') !== null) {
    cartPositions = localStorage.getItem('cart');
    cartPositions = JSON.parse(cartPositions);
}

goods.addEventListener('click', e => {
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




// checking added products
articles = JSON.parse(articles);
const products = document.querySelectorAll('.product');
for (let product of products) {
    for (let key in articles) {
        const neededArticle = product.dataset.article;
        if (neededArticle == key) {
            addedProductRender(product);
        }   
    }
}


function addedProductRender(element) {
    const elem = element;
    elem.querySelector('.add-to-cart-icon').src = '../icons/icons8-checkout-90.png';
    elem.querySelector('.add-to-cart').innerHTML = 'GO TO CART';
    elem.querySelector('.product-footer_onhover').classList.add('added');
    elem.querySelector('.product-footer_onhover').addEventListener('mousemove', () => {
        elem.querySelector('.product-child').style.backgroundColor = 'rgb(255, 83, 99)';
    });
    elem.querySelector('.product-footer_onhover').addEventListener('mouseleave', () => {
        elem.querySelector('.product-child').style.backgroundColor = 'rgb(34, 34, 34)';
    });
    const priceElem = elem.querySelector('.product-price');
    priceElem.innerHTML = 'ADDED TO CART';
    priceElem.style.color = 'rgb(79, 201, 116)';
    elem.querySelector('.clickable-area_product').addEventListener('click', () => {
        document.location.href = '/html/cart.html';
    });
}





// search
const searchInput = document.querySelector('.search');
const searchIcon = document.querySelector('.search-icon');
const searchResultBlocks = document.querySelectorAll('.search-result');
const searchResulstShell = document.querySelector('.search-results');


window.addEventListener('click', e => {
    if (e.target.classList.contains('search')) {
        searchInput.addEventListener('input', searchResultsFunc);
        searchInput.addEventListener('focus', searchResultsFunc);
    }
    else if (e.target.classList.contains('search-result')) {
        searchInput.value = e.target.innerHTML;
        productNameChecking();
        searchResulstShell.classList.add('hide');
    }
    else if (e.target.classList.contains('search-button')) {
        productNameChecking();
        searchResulstShell.classList.add('hide');
    }
    else if (e.target.classList.contains('search-icon')) {
        const value = searchInput.value.trim().toLowerCase();
        if (value != '') {
            for (let elem of products) {
                elem.classList.remove('hide');
            }
            searchInput.value = '';
            searchIcon.src = '../icons/icons8-search.png';
            searchIcon.classList.remove('clear-search-icon');
            for (let elem of searchResultBlocks) {
                elem.classList.add('hide');
            }
        }
    }
    else {
        searchResulstShell.classList.add('hide');
    }
    
});



function searchResultsFunc() {
    searchResulstShell.classList.remove('hide');
    const value = searchInput.value.trim().toLowerCase();
    if (value != '') {
        for (let elem of searchResultBlocks) {
            const productName_correct = elem.innerHTML.trim().toLowerCase(); 
            if (productName_correct.search(value) == -1) elem.classList.add('hide');
            else elem.classList.remove('hide');
        }
        searchIcon.src = '../icons/icons8-clear-search-90.png';
        searchIcon.classList.add('clear-search-icon');
    }
    else {
        searchIcon.src = '../icons/icons8-search.png';
        searchIcon.classList.remove('clear-search-icon');
    }
}

function productNameChecking() {
    const value = searchInput.value.trim().toLowerCase();
        if (value != '') {
            for (let elem of products) { 
                const productName_correct = elem.querySelector('.product-name').innerHTML.trim().toLowerCase(); 
                if (productName_correct.search(value) == -1) elem.classList.add('hide');
                else elem.classList.remove('hide');
            }
        }
}
let articles = localStorage.getItem('cart');
const cartIcon = document.querySelector('.cart-icon');
const cartProductsAmount = document.querySelector('.cart-products-amount');
let products = document.querySelectorAll('.product');


if (articles !== null && articles !== '{}') {
    if (window.location.href.search('index.html') != -1) cartIcon.src = 'icons/icons8-buying-90.png';
    else cartIcon.src = '../icons/icons8-buying-90.png';
    cartProductsAmount.innerHTML = Object.keys(JSON.parse(articles)).length;
}
else {
    if (window.location.href.search('index.html') != -1) cartIcon.src = 'icons/icons8-shopping-cart-90.png';
    else cartIcon.src = '../icons/icons8-shopping-cart-90.png';
    cartProductsAmount.innerHTML = 0;
}



const goods = document.querySelector('.goods');
const goodsElemsArr = [];

let url = new URL(location.href);
if (url.searchParams.get('page') == null) url.searchParams.set('page', 1);




function productCardRender(parent, article, imgUrl, name, price) {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('product');
    mainDiv.setAttribute('data-article', article); //------------ article ------------
    parent.append(mainDiv);

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
    if (window.location.href.search('index.html') != -1) img_onhover.src = 'icons/icons8-add-shopping-cart-90.png';
    else img_onhover.src = '../icons/icons8-add-shopping-cart-90.png';
    productFooter_rS_onhover.append(img_onhover);

    const productChild = document.createElement('div');
    productChild.classList.add('product-child');
    mainDiv.append(productChild);



    goodsElemsArr.push(mainDiv);
} 






function addedProductRender(element) {
    const elem = element;
    if (window.location.href.search('index.html') != -1) elem.querySelector('.add-to-cart-icon').src = 'icons/icons8-checkout-90.png';
    else elem.querySelector('.add-to-cart-icon').src = '../icons/icons8-checkout-90.png';
    
    elem.querySelector('.add-to-cart').innerHTML = 'GO TO CART';
    elem.querySelector('.product-footer_onhover').classList.add('added');
    elem.querySelector('.product-footer_onhover').addEventListener('mouseenter', () => {
        elem.querySelector('.product-child').style.backgroundColor = 'rgb(255, 83, 99)';
    });
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
        document.location.href = 'https://tufned.github.io/CatalogueSite_Games/html/cart.html';  // LINK
    });
}




const searchResulstShell = document.querySelector('.search-results');

for (let key in productsData) {
    const div = document.createElement('div');
    div.classList.add('search-result');
    div.classList.add('hide');
    div.innerHTML = productsData[key]['name'];
    searchResulstShell.append(div);
}


// search
const searchInput = document.querySelector('.search');
const searchIcon = document.querySelector('.search-icon');
const searchResultBlocks = document.querySelectorAll('.search-result');


window.addEventListener('click', e => {
    if (e.target.classList.contains('search')) {
        searchInput.addEventListener('input', searchResultsFunc);
        searchInput.addEventListener('focus', searchResultsFunc);
    }
    else if (e.target.classList.contains('search-result')) {
        if (window.location.href.search('index.html') != -1) {
            searchInput.value = e.target.innerHTML;
            window.location.href = 'https://tufned.github.io/CatalogueSite_Games/html/all-products.html';  //  LINK
            localStorage.setItem('searchResult', searchInput.value);
        }
        else {
            searchInput.value = e.target.innerHTML;
            productNameChecking();
            searchResulstShell.classList.add('hide');
        }
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
            if (window.location.href.search('index.html') != -1) searchIcon.src = 'icons/icons8-search.png';
            else searchIcon.src = '../icons/icons8-search.png';
            searchIcon.classList.remove('clear-search-icon');
            
            for (let elem of searchResultBlocks) {
                elem.classList.add('hide');
            }
        }
    }
    // else if (e.target.classList.contains('slider-block_photo')) {
    // }
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
        if (window.location.href.search('index.html') != -1) searchIcon.src = 'icons/icons8-clear-search-90.png';
        else searchIcon.src = '../icons/icons8-clear-search-90.png';
        searchIcon.classList.add('clear-search-icon');
    }
    else {
        if (window.location.href.search('index.html') != -1) searchIcon.src = 'icons/icons8-search.png';
        else searchIcon.src = '../icons/icons8-search.png';
        searchIcon.classList.remove('clear-search-icon');
    }
}

function productNameChecking() {
    document.querySelector('.buttons-section').classList.add('hide');

    const value = searchInput.value.trim().toLowerCase();
    if (value != '') {
        for (let elem of goodsElemsArr) {
            const productName_correct = elem.querySelector('.product-name').innerHTML.trim().toLowerCase();
            if (productName_correct.search(value) == -1) {
                elem.classList.add('hide');
            }
            else {
                elem.classList.remove('hide');
                goods.append(elem);
            }
        }
    }
}
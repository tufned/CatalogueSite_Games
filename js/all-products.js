const productNum = 7;

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


// const searchResBlock = document.querySelector('.search-results');


const filterSelect = document.querySelector('.filter-select');
const filterSelectOptions = document.querySelectorAll('.filter-select option');
let filter_category = {};
if (localStorage.getItem('filter_category') !== null) {
    filter_category = localStorage.getItem('filter_category');
    filter_category = JSON.parse(filter_category);
    localStorage.removeItem('filter_category');
}


if (goods) {
    for (let key in productsData) {
        const article = key;
        const img = `../${productsData[key]['img-url']}`;
        const name = productsData[key]['name'];
        const price = `${productsData[key]['price']}₴ UAH`;
        productCardRender(goods, article, img, name, price);  // in script.js

        // const div = document.createElement('div');
        // div.classList.add('search-result');
        // div.classList.add('hide');
        // div.innerHTML = name;
        // searchResBlock.append(div);

        if (Object.keys(filter_category).length !== 0 && Object.keys(filter_category)[0] !== 'all games') {
            for (let option of filterSelectOptions) {
                if (option.innerHTML.trim().toLowerCase() == Object.keys(filter_category)[0]) {
                    option.selected = 'selected';
                }
            }
            const categories = productsData[key]['options']['category'];
            if (categories.includes(Object.keys(filter_category)[0])) filter_category[Object.keys(filter_category)[0]].push(name);
        }
    }
    // goods.innerHTML += moreGamesCard;
}



// -------------------- Page Change -----------------------------
let pageMarkers = [];
for (let i = 1; i <= goodsElemsArr.length; i++) {
    if (i % productNum == 0) pageMarkers.push(i);
}
if (goodsElemsArr.length > 0) pageMarkers.push(goodsElemsArr.length);


let goods_packs = {};
let products_onPage = [];
for (let i = 0; i < pageMarkers.length; i++) {
    products_onPage = []
    if (pageMarkers[i-1] == undefined) pageMarkers[i-1] = 0;
    for (let j = 0; j < goodsElemsArr.length; j++) {
        if (j >= pageMarkers[i-1] && j < pageMarkers[i]) {
            products_onPage.push(goodsElemsArr[j]);
            goods_packs[i] = products_onPage;
        }
    }
}



let urlParam_page = +url.searchParams.get('page')



const buttonForward = document.querySelector('.button-forward');
buttonForward.addEventListener('click', onbuttonForward);
function onbuttonForward() {
    if (url.searchParams.get('page') == null) url.searchParams.set('page', 1);
    url.searchParams.set('page', urlParam_page + 1);
    location.href = url.href;
}
if (urlParam_page == pageMarkers.length) buttonForward.removeEventListener('click', onbuttonForward);


const buttonPrevious = document.querySelector('.button-previous');
buttonPrevious.addEventListener('click', onbuttonPrevious);
function onbuttonPrevious() {
    url.searchParams.set('page', urlParam_page - 1);
    location.href = url.href;
}
if (urlParam_page == 1) buttonPrevious.removeEventListener('click', onbuttonPrevious);




let curGoods = [];
let num = 0;

for (let key in goods_packs) {
    num++;
    if (url.searchParams.get('page') == num) {
        curGoods = goods_packs[key];
        goods.innerHTML = '';
        for (let product of curGoods) {
            goods.appendChild(product);
        }
    }
}





let div = document.createElement('div');
const productsPageList = document.querySelector('.products-page-list');


let count = 0;
for (let key in goods_packs) {
    count++;
    div = document.createElement('div');
    div.classList.add('page-num');
    div.innerHTML = count;
    if (url.searchParams.get('page') == count) div.classList.add('page-num_active');
    productsPageList.append(div);
}

const pageNum_all = document.querySelectorAll('.page-num');
for (let elem of pageNum_all) {
    elem.addEventListener('click', () => {
        url.searchParams.set('page', elem.innerHTML);
        location.href = url.href;
    });
}
// -------------------------------------------------







// checking added products
for (let product of goodsElemsArr) {
    for (let key in JSON.parse(articles)) {
        const neededArticle = product.dataset.article;
        if (neededArticle == key) {
            addedProductRender(product);  // in script.js
        }   
    }
}


// filter by category
if (Object.keys(filter_category)[0] !== 'all games' && Object.keys(filter_category).length !== 0) {
    let curProducts = [];
    const filteredProductsNames = filter_category[Object.keys(filter_category)[0]];

    for (let product of goodsElemsArr) {
        const productsName = product.querySelector('.product-name').innerHTML;
        if (filteredProductsNames.includes(productsName) != false) {
            curProducts.push(product);
        }
        product.remove();
    } 
    
    goods.innerHTML = '';
    for (let elem of curProducts) {
        goods.append(elem);
    }
    document.querySelector('.buttons-section').classList.add('hide');
}




filterSelect.addEventListener('change', () => {
    filter_category = {};
    const names = [];
    let filterSelect_value = filterSelect.options[filterSelect.selectedIndex].text.trim().toLowerCase();
    let curProducts = [];

    if (filterSelect_value !== 'all games') {
        for (let key in productsData) {
            const categories = productsData[key]['options']['category'];
            if (categories.includes(filterSelect_value)) names.push(productsData[key]['name']);
            filter_category[filterSelect_value] = names;
        }

        for (let product of goodsElemsArr) {
            if (Object.keys(filter_category)[0] !== 'all games') {
                const filteredProductsNames = filter_category[Object.keys(filter_category)[0]];
                const productsName = product.querySelector('.product-name').innerHTML;
                if (filteredProductsNames.includes(productsName) != false) {
                    curProducts.push(product);
                }
                product.remove();
            }
        }

        goods.innerHTML = '';
        for (let elem of curProducts) {
            goods.append(elem);
        }

        document.querySelector('.buttons-section').classList.add('hide');
    }
    else {
        location.reload();
    }
});





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
        product.style.animationName = 'adding-to-cart';

        addedProductRender(product);
    }
    localStorage.setItem('cart', JSON.stringify(cartPositions));
});






// search (extra)
if (localStorage.getItem('searchResult') !== null) {
    const searchResValue = localStorage.getItem('searchResult');
    localStorage.removeItem('searchResult');
    searchInput.value = searchResValue;
    productNameChecking();
    searchIcon.src = '../icons/icons8-clear-search-90.png';
    searchIcon.classList.add('clear-search-icon');
}


document.querySelector('.search-icon').addEventListener('click', () => {
    const value = searchInput.value.trim().toLowerCase();
    if (value != '') location.reload();
});
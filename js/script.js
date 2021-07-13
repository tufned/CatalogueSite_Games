let articles = localStorage.getItem('cart');
const cartIcon = document.querySelector('.cart-icon');
const cartProductsAmount = document.querySelector('.cart-products-amount');


if (articles !== null && articles !== '{}') {
    cartIcon.src = '../icons/icons8-buying-90.png';
    cartProductsAmount.innerHTML = Object.keys(JSON.parse(articles)).length;
}
else {
    cartIcon.src = '../icons/icons8-shopping-cart-90.png';
    cartProductsAmount.innerHTML = 0;
}



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
    img_onhover.src = '../icons/icons8-add-shopping-cart-90.png';
    productFooter_rS_onhover.append(img_onhover);

    const productChild = document.createElement('div');
    productChild.classList.add('product-child');
    mainDiv.append(productChild);
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
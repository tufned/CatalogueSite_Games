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
const cart = document.querySelector('.cart-positions-shell');
// articles announced in script.js

function emptyCartFunc() {
    const emptyCart = 
    `<div class="else-case">
        <p>Your cart is empty...</p>
    </div>`;
    cart.innerHTML = emptyCart;
}


if (articles !== null && articles !== '{}') {
    articles = JSON.parse(articles);
    let totalPrice = 0;

    for (let key in articles) {
        totalPrice += +articles[key]['price'];
        const cartPositionRender = 
        `<div class="cart-position">
            <div class="photo-section">
                <img src="${articles[key]['img-url']}" alt="">
            </div>
            <div class="name-section">
                <h2>${articles[key]['name']}</h2>
            </div>
            <div class="count-section">
                <div class="price_mobile-view">
                    <p class="price">${articles[key]['price']}</p>
                    <p>₴ UAH</p>
                </div>
                <div class="count-shell" data-article='${key}'>
                    <p class="minus">-</p>
                    <p class="count">${articles[key]['count']}</p>
                    <p class="plus">+</p>
                </div>
            </div>
            <div class="price-section">
                <p class="price">${articles[key]['price']}</p>
                <p>₴ UAH</p>
            </div>
            <div class="delete-section">
                <img class="delete-icon" data-article='${key}' src="../icons/icons8-delete-bin-90.png"  alt="">
            </div>
        </div>`;
        cart.innerHTML += cartPositionRender;
    }

    
    const totalPriceRender = 
    `<div class="total-block-shell">
        <div class="total-sum">
            <p>Total: <span class="sum">${totalPrice}</span>₴ UAH</p>
        </div>
    </div>`;
    cart.innerHTML += totalPriceRender;
    


    // ------ deleteButton ------
    cart.addEventListener('click', e => {
        const sum = document.querySelector('.sum');
        if (e.target.classList.contains('delete-icon')) {
            const currentArticle = e.target.dataset.article;
            const currentPrice = articles[currentArticle]['price'];
            totalPrice = totalPrice - currentPrice
            delete articles[currentArticle];

            const productCard = e.target.parentNode.parentNode;
            productCard.remove();

            sum.innerHTML = totalPrice;
            if (cartProductsAmount.innerHTML > 0) cartProductsAmount.innerHTML = +cartProductsAmount.innerHTML - 1;

            if (Object.keys(articles).length == 0) {
                const totalPriceBlock = document.querySelector('.total-block-shell');
                totalPriceBlock.remove();
                emptyCartFunc();
            }
            localStorage.setItem('cart', JSON.stringify(articles));
        }
        // ------ plusMinusButtons ------
        else if (e.target.classList.contains('minus')) {
            const countParent = e.target.parentNode;
            const count = countParent.querySelector('.count');
            const currentArticle = countParent.dataset.article;
            if (count.innerHTML > 1) {
                count.innerHTML -= 1;
                
                const coreParent = e.target.parentNode.parentNode.parentNode;
                const priceElems = coreParent.querySelectorAll('.price');
                const firstPrice = +articles[currentArticle]['first-price'];
                for (let elem of priceElems) {
                    if (elem.innerHTML >= firstPrice) elem.innerHTML = elem.innerHTML - firstPrice;
                }

                totalPrice -= firstPrice;
                sum.innerHTML = totalPrice;

                articles[currentArticle]['count'] = +count.innerHTML;
                articles[currentArticle]['price'] = +priceElems[0].innerHTML;
            }
            localStorage.setItem('cart', JSON.stringify(articles));
        }
        else if (e.target.classList.contains('plus')) {
            const countParent = e.target.parentNode;
            const count = countParent.querySelector('.count');
            const currentArticle = countParent.dataset.article;
            count.innerHTML = +count.innerHTML + 1;
            
            const coreParent = e.target.parentNode.parentNode.parentNode;
            const priceElems = coreParent.querySelectorAll('.price');
            const firstPrice = +articles[currentArticle]['first-price'];
            for (let elem of priceElems) {
                elem.innerHTML = +elem.innerHTML + firstPrice;
            }

            totalPrice += firstPrice;
            sum.innerHTML = totalPrice;

            articles[currentArticle]['count'] = +count.innerHTML;
            articles[currentArticle]['price'] = +priceElems[0].innerHTML;

            localStorage.setItem('cart', JSON.stringify(articles));
        }
    });
}
else {
    emptyCartFunc();
}
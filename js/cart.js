const cart = document.querySelector('.cart-positions-shell');
let articles = localStorage.getItem('cart');


if (articles !== null && articles !== '[]') {
    articles = JSON.parse(articles);
    let totalPrice = 0;

    for (let elem of articles) {
        for (let key in productsData) {
            if (elem == key) {
                totalPrice += productsData[key]['price'];
                const cartPositionRender = 
                `<div class="cart-position">
                    <div class="photo-section">
                        <img src="${productsData[key]['img-url']}" alt="">
                    </div>
                    <div class="name-section">
                        <h2>${productsData[key]['name']}</h2>
                    </div>
                    <div class="count-section">
                        <div class="count-shell">
                            <p class="minus">-</p>
                            <p class="count">1</p>
                            <p class="plus">+</p>
                        </div>
                    </div>
                    <div class="price-section">
                        <p class="price">${productsData[key]['price']}</p>
                        <p>₴ UAH</p>
                    </div>
                    <div class="delete-section">
                        <img class="delete-icon" data-article='${key}' src="../icons/icons8-delete-bin-90.png"  alt="">
                    </div>
                </div>`;
                cart.innerHTML += cartPositionRender;
            }    
        }
    }

    const totalSumRender = 
    `<div class="total-block-shell">
        <div class="total-sum">
            <p>Total: ${totalPrice}₴ UAH</p>
        </div>
    </div>`;
    cart.innerHTML += totalSumRender;


    // ------ deleteButton ------
    cart.addEventListener('click', e => {
        if (e.target.classList.contains('delete-icon')) {
            const currentArticle = e.target.getAttribute('data-article');
            for (let i = 0; i < articles.length; i++) {
                if (articles[i] === currentArticle) {
                    articles.splice(i, 1);
                }
            }
            location.reload()
            localStorage.setItem('cart', JSON.stringify(articles));
        }
        // ------ plusMinusButtons ------
        else if (e.target.classList.contains('minus')) {
            const currentArticle = e.target.parentNode;
            const count = currentArticle.querySelector('.count');
            if (count.innerHTML > 1) count.innerHTML = +count.innerHTML - 1;
        }
        else if (e.target.classList.contains('plus')) {
            const countParent = e.target.parentNode;
            // const currentArticle = countParent.getAttribute('data-article');
            const count = countParent.querySelector('.count');
            count.innerHTML = +count.innerHTML + 1;

            const coreParent = e.target.parentNode.parentNode.parentNode;
            const priceElem = coreParent.querySelector('.price');
            const price = +priceElem.innerHTML;
            priceElem.innerHTML = +(price + price);
        }
    });
}
else {
    const emptyCart = 
    `<div class="else-case">
        <p>Your cart is empty...</p>
    </div>`;
    cart.innerHTML = emptyCart;
}
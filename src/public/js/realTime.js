const socket = io();

socket.on('updateProducts', (products) => {
    const container = document.getElementById('products-container');

    container.innerHTML = '';

    products.forEach(prod => {
        const article = document.createElement('article');
        article.classList.add('product-card');

        article.innerHTML = `
            <h3>${prod.title}</h3>
            <p class="price">Precio: ${prod.price} </p>
            <p class="desc"> ${prod.description}</p>
            <span class="category"> ${prod.category}</span>
        `;

        container.appendChild(article);
    });
});

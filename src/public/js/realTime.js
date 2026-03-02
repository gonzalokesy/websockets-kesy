const socket = io();

socket.on('updateProducts', (products) => {
    const container = document.getElementById('products-container');

    container.innerHTML = '';

    products.forEach(prod => {
        const article = document.createElement('article');
        article.classList.add('product-card');

        article.innerHTML = `
            <h3>{{this.title}}</h3>
            <p class="price">Precio: ${this.price}</p>
            <p class="desc">{{this.description}}</p>
            <span class="category">{{this.category}}</span>
        `;

        container.appendChild(article);
    });
});

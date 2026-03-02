// Uso el módulo fs promises para poder usar los métodos asincronos y que el servidor no se detenga en las peticiones a la espera de la finalziación. 
import fs from 'fs/promises';
import path from 'path';

// Envolví todas las funciones sueltas en una clase para luego poder instanciarla y mediante el uso de la ruta, poder utilziar los métodos. 
class ProductManager {
    constructor(pathFile) {
        this.path = path.resolve(pathFile);
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const search = products.find(product => product.id === id);
        return search || null;
    }

    async addProduct(productCharge) {
        const products = await this.getProducts();
        const newId = products.length === 0 ? 1 : products[products.length - 1].id + 1;
        const newProduct = {
            id: newId,
            ...productCharge,
        };
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedData) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedData, id };
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        }
        return null;
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);
        if (products.length === filteredProducts.length) {
            return false
        } else {
            await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
            return true;
        };
    };
};

export default ProductManager
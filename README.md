# 🛒 E-commerce Backend - Entrega Final

Este proyecto consiste en un servidor robusto para un E-commerce desarrollado con **Node.js** y **Express**, integrando **MongoDB** para la persistencia de datos, **Handlebars** para el renderizado de vistas y **WebSockets** para actualizaciones en tiempo real.

---

## 🚀 Tecnologías Utilizadas

* **Node.js & Express**: Framework principal del servidor.
* **MongoDB & Mongoose**: Base de datos NoSQL y modelado de datos.
* **Mongoose Paginate V2**: Gestión profesional de paginación.
* **Handlebars**: Motor de plantillas para Server Side Rendering (SSR).
* **Socket.io**: Comunicación bidireccional en tiempo real para la lista de productos.

---

## 🛠️ Instalación y Configuración

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar la base de datos:**
    Asegurate de tener tu URI de MongoDB en `src/config/db/connect.config.js`.

3.  **Iniciar el servidor:**
    * Modo producción: `npm start`
    * Modo desarrollo: `npm run dev` (con nodemon)

El servidor corre por defecto en: `http://localhost:3000`

---

## 📂 Estructura Principal del Código

* **`src/managers/`**: Contiene `ProductManagerMongoDB.js` y `CartManagerMongoDB.js`.
* **`src/models/`**: Esquemas de Mongoose para `productos` y `carrito`.
* **`src/routes/`**: 
    * `products.router.js`: Endpoints de la API de productos.
    * `carrito.router.js`: Endpoints de la API de carritos.
    * `views.router.js`: Rutas que renderizan las vistas de Handlebars.
* **`src/views/`**: Plantillas `.hbs` (Home, RealTime, Products y Carrito).
* **`src/public/`**: Scripts de frontend (`main.js` para el carrito y `realTime.js` para sockets).

---

## 🛣️ Rutas de Vistas Disponibles

* **Home (`/`)**: Catálogo estático básico.
* **Real Time (`/realtimeproducts`)**: Lista que se actualiza vía Sockets al crear/eliminar productos.
* **Productos con Paginación (`/productsPaginated`)**: 
    * Soporta queries: `limit`, `page`, `sort` (asc/desc) y `query` (categoría).
    * Ejemplo: `/productsPaginated?limit=5&page=1&sort=desc&query=Teclados`
* **Carrito (`/cart/:cid`)**: Muestra los productos de un carrito específico usando `.populate()`.

---

## ✨ Funcionalidades Clave

* **Paginación Avanzada**: Uso de `mongoose-paginate-v2` para una navegación eficiente.
* **Populate**: El carrito carga la información completa del producto vinculado, no solo el ID.
* **Interactividad Fetch**: El botón "Agregar al Carrito" en la vista de productos envía peticiones `POST` asíncronas sin recargar la página.
* **WebSockets**: Sincronización en tiempo real para la gestión de productos en la vista dinámica.

---

**Desarrollado por:** Gonzalo Kesy
// Atención!!!!!!! Agregar ID de carrito aquí para probar agregar carritos desde la interface
const idCarrito = "69bb5232eabda48f63ed90a2"

async function agregarAlCarrito() {
    const botones = document.querySelectorAll('.btn-agregar');

    botones.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            try {
                const idBtn = e.currentTarget.id
                const respuesta = await fetch(`/api/cart/${idCarrito}/product/${idBtn}`, { method: 'POST' })

                if (respuesta.ok) {
                    alert("✅ Producto agregado al carrito con éxito");
                } else {
                    alert("❌ Hubo un error al agregar el producto");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        })
    })
}

agregarAlCarrito()
document.getElementById('producto-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;

    const response = await fetch('/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, cantidad, precio, descripcion })
    });

    if (response.ok) {
        alert('Producto agregado con éxito');
        loadProductos();
    } else {
        alert('Error al agregar producto');
    }
});

async function loadProductos() {
    const response = await fetch('/productos');
    const productos = await response.json();
    const tbody = document.querySelector('#productos-table tbody');
    tbody.innerHTML = '';

    productos.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>${producto.descripcion}</td>
            <td>
                <button onclick="editProducto(${producto.id})">Editar</button>
                <button onclick="deleteProducto(${producto.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function editProducto(id) {
    const nombre = prompt("Nuevo nombre:");
    const cantidad = prompt("Nueva cantidad:");
    const precio = prompt("Nuevo precio:");
    const descripcion = prompt("Nueva descripción:");

    const response = await fetch(`/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, cantidad, precio, descripcion })
    });

    if (response.ok) {
        alert('Producto actualizado con éxito');
        loadProductos();
    } else {
        alert('Error al actualizar producto');
    }
}

async function deleteProducto(id) {
    const response = await fetch(`/productos/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Producto eliminado con éxito');
        loadProductos();
    } else {
        alert('Error al eliminar producto');
    }
}

let slideIndex = 0;
showSlides();

function changeSlide(n) {
    slideIndex += n;
    showSlides();
}

function showSlides() {
    const slides = document.querySelectorAll(".carousel img");
    slides.forEach((slide, index) => {
        slide.classList.remove("active");
        if (index === slideIndex) {
            slide.classList.add("active");
        }
    });
    
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
}

setInterval(() => {
    changeSlide(1); 
}, 3000);


loadProductos();

let productos = [
    {
        id: "lacteos-01",
        titulo: "Abrigo 01",
        imagen: "./img/lácteos/p1.webp",
        categoria: {
            nombre: "Abrigos",
            id: "lacteos"
        },
        "precio": 1000
    },
    {
        id: "lacteos-02",
        titulo: "Abrigo 02",
        imagen: "./img/lácteos/p2.webp",
        categoria: {
            nombre: "Abrigos",
            id: "lacteos"
        },
        "precio": 1000
    },{
        id: "lacteos-03",
        titulo: "Abrigo 013",
        imagen: "./img/lácteos/p3.webp",
        categoria: {
            nombre: "Abrigos",
            id: "lacteos"
        },
        "precio": 1000
    },{
        id: "lacteos-04",
        titulo: "Abrigo 04",
        imagen: "./img/lácteos/p4.webp",
        categoria: {
            nombre: "Abrigos",
            id: "lacteos"
        },
        "precio": 1000
    },{
        id: "lacteos-05",
        titulo: "Abrigo 05",
        imagen: "./img/lácteos/p5.webp",
        categoria: {
            nombre: "Abrigos",
            id: "lacteos"
        },
        "precio": 1000
    },
    {
        id: "bebidas-01",
        titulo: "bebidas 01",
        imagen: "./img/bebidas/i1.webp",
        categoria: {
            nombre: "bebidas",
            id: "bebidas"
        },
        "precio": 1000
    },
    {
        id: "bebidas-02",
        titulo: "bebidas 02",
        imagen: "./img/bebidas/i2.webp",
        categoria: {
            nombre: "bebidas",
            id: "bebidas"
        },
        "precio": 1000
    },{
        id: "bebidas-03",
        titulo: "bebidas 03",
        imagen: "./img/bebidas/i3.webp",
        categoria: {
            nombre: "bebidas",
            id: "bebidas"
        },
        "precio": 1000
    },{
        id: "bebidas-04",
        titulo: "bebidas 04",
        imagen: "./img/bebidas/i4.webp",
        categoria: {
            nombre: "bebidas",
            id: "bebidas"
        },
        "precio": 1000
    },{
        id: "bebidas-05",
        titulo: "bebidas 05",
        imagen: "./img/bebidas/i5.webp",
        categoria: {
            nombre: "bebidas",
            id: "bebidas"
        },
        "precio": 1000
    },
    {
        id: "pasteleria-01",
        titulo: "Pantalón 01",
        imagen: "./img/pasteleria/o1.webp",
        categoria: {
            nombre: "pasteleria",
            id: "pasteleria"
        },
        "precio": 1000
    },
    {
        id: "pasteleria-02",
        titulo: "Pantalón 02",
        imagen: "./img/pasteleria/o2.webp",
        categoria: {
            nombre: "pasteleria",
            id: "pasteleria"
        },
        "precio": 1000
    },{
        id: "pasteleria-03",
        titulo: "Pantalón 03",
        imagen: "./img/pasteleria/o3.webp",
        categoria: {
            nombre: "pasteleria",
            id: "pasteleria"
        },
        "precio": 1000
    },{
        id: "pasteleria-04",
        titulo: "Pantalón 04",
        imagen: "./img/pasteleria/o4.webp",
        categoria: {
            nombre: "pasteleria",
            id: "pasteleria"
        },
        "precio": 1000
    },{
        id: "pasteleria-05",
        titulo: "Pantalón 05",
        imagen: "./img/pasteleria/o5.webp",
        categoria: {
            nombre: "pasteleria",
            id: "pasteleria"
        },
        "precio": 1000
    },
];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
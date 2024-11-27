// Array de productos
const productos = [
  // Nike
  {
    id: 1,
    nombre: 'Nike Air Max 90',
    categoria: 'nike',
    precio: 120,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623429/Proyect1/JD/nike1_1_2_vy8mfs.png'
  },
  {
    id: 2,
    nombre: 'Nike Revolution 6',
    categoria: 'nike',
    precio: 90,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623430/Proyect1/JD/nike1_1_uje3da.png'
  },
  {
    id: 3,
    nombre: 'Nike ZoomX',
    categoria: 'nike',
    precio: 150,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623429/Proyect1/JD/nike1_1_3_cgt0de.png'
  },
  {
    id: 4,
    nombre: 'Nike Pegasus 39',
    categoria: 'nike',
    precio: 110,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623429/Proyect1/JD/nike1_1_1_y9frp8.png'
  },

  // Adidas
  {
    id: 5,
    nombre: 'Adidas Ultraboost 22',
    categoria: 'adidas',
    precio: 140,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623427/Proyect1/JD/nike1_1_6_evrnyb.png'
  },
  {
    id: 6,
    nombre: 'Adidas Superstar',
    categoria: 'adidas',
    precio: 100,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623427/Proyect1/JD/nike1_1_4_vcbgd5.png'
  },
  {
    id: 7,
    nombre: 'Adidas NMD R1',
    categoria: 'adidas',
    precio: 130,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623427/Proyect1/JD/nike1_1_5_i5jmxn.png'
  },
  {
    id: 8,
    nombre: 'Adidas Samba OG',
    categoria: 'adidas',
    precio: 85,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623427/Proyect1/JD/nike1_1_7_o2rcsp.png'
  },

  // New Balance
  {
    id: 9,
    nombre: 'New Balance 574',
    categoria: 'new balance',
    precio: 100,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623427/Proyect1/JD/nike1_1_8_apgled.png'
  },
  {
    id: 10,
    nombre: 'New Balance 990v5',
    categoria: 'new balance',
    precio: 175,
    imagen:
      'https://res.cloudinary.com/dhs3auft4/image/upload/v1732623426/Proyect1/JD/nike1_1_11_ilcont.png'
  }
]

// Contenedor de productos
const productosContainer = document.getElementById('productos')

// Pintar productos en el DOM
function pintarProductos(lista) {
  productosContainer.innerHTML = '' // Limpiamos el contenedor

  // Recorremos la lista y creamos los productos
  lista.forEach((producto) => {
    const productoHTML = `
          <div class="producto">
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <h3>${producto.nombre}</h3>
              <p>Precio: €${producto.precio.toFixed(2)}</p>
              <button class="btn">Comprar</button>
          </div>
      `
    productosContainer.innerHTML += productoHTML
  })
}

// Inicializamos pintando todos los productos
pintarProductos(productos)

/// Manejamos el filtrado de productos
document.getElementById('filtrar').addEventListener('click', () => {
  const categoria = document
    .getElementById('categoria')
    .value.toLowerCase()
    .trim()
  const precio = parseFloat(document.getElementById('precio').value)

  // Eliminar el mensaje anterior si existe
  const mensajeAnterior = document.querySelector('.mensaje-centrado')
  if (mensajeAnterior) {
    mensajeAnterior.remove()
  }

  // Filtrar los productos según la categoría y el precio
  const filtrados = productos.filter((producto) => {
    const cumpleCategoria =
      !categoria || producto.categoria.toLowerCase() === categoria
    const cumplePrecio = isNaN(precio) || producto.precio <= precio
    return cumpleCategoria && cumplePrecio
  })

  // Si no se encuentran productos, mostrar productos sugeridos
  if (filtrados.length === 0) {
    mostrarProductosSugeridos()
  } else {
    pintarProductos(filtrados)
  }
})

function mostrarProductosSugeridos() {
  // Seleccionamos 3 productos aleatorios
  const productosSugeridos = productos
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  // Agregamos el mensaje en un contenedor independiente porque se alineaba con los productos filtrados
  const mensaje = document.createElement('p')
  mensaje.textContent =
    'No se encontraron productos con los filtros aplicados. Aquí tienes algunos productos sugeridos:'
  mensaje.classList.add('mensaje-centrado')
  productosContainer.parentElement.insertBefore(mensaje, productosContainer) // Insertamos el mensaje arriba del contenedor

  // Pintamos los productos sugeridos
  productosContainer.innerHTML = ''
  productosSugeridos.forEach((producto) => {
    const productoHTML = `
          <div class="producto">
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <h3>${producto.nombre}</h3>
              <p>Precio: €${producto.precio.toFixed(2)}</p>
              <button class="btn">Comprar</button>
          </div>
      `
    productosContainer.innerHTML += productoHTML
  })
}
document.getElementById('limpiar').addEventListener('click', () => {
  // Limpiar los inputs de los filtros
  document.getElementById('categoria').value = ''
  document.getElementById('precio').value = ''

  // Eliminar el mensaje de sugerencias si existe
  const mensajeAnterior = document.querySelector('.mensaje-centrado')
  if (mensajeAnterior) {
    mensajeAnterior.remove()
  }

  // Mostrar todos los productos
  pintarProductos(productos)
})

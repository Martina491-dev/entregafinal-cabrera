//Autos
const listaProductos = [
  { id: 1, nombre: 'Eleanor pony', precio: 100000, stock: 2 },
  { id: 2, nombre: 'Mustang', precio: 200000, stock: 3 },
  { id: 3, nombre: 'Aston Martin', precio: 300000, stock: 1 },
  { id: 4, nombre: 'Jaguar E-Type', precio: 400000, stock: 2 },
  { id: 5, nombre: 'Lamborghini Miura', precio: 500000, stock: 4 },
];

// Función para encontrar un producto por ID
function findProductById(id) {
  return listaProductos.find(producto => producto.id === id);
}

// Función para filtrar productos por precio máximo
function filterProductsByPriceMax(maxPrice) {
  return listaProductos.filter(producto => producto.precio <= maxPrice);
}


// Función para alquilar un producto
function alquilarProducto(id) {
  const product = findProductById(id);
  if (product) {
    if (product.stock > 0) {
      product.stock--;
      return `Producto alquilado - ID: ${product.id}, Nombre: ${product.nombre}, Precio: $${product.precio}`;
    } else {
      return `Producto sin stock disponible.`;
    }
  }
  return `Producto con ID ${id} no encontrado.`;
}

// Función principal
function rentCar() {
  const nombreUsuario = prompt("¡Bienvenido Classy Cars! Por favor, ingrese su nombre:");

  alert(`Hola, ${nombreUsuario}.\nBienvenido a la mejor concesionaria de autos clásicos.`);

  let continuar = true;

  while (continuar) {
    const opcion = prompt("Elija una opción:\n1. Ver lista de productos\n2. Alquilar un producto \n3. Filtrar por precio \n4. Salir");

    switch (opcion) {
      case '1':
        let lista = 'Lista de productos:\n';
        for (const producto of listaProductos) {
          lista += `ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: $${producto.precio}, Stock: ${producto.stock}\n`;
        }
        alert(lista);
        break;

      case '2':
        const productId = parseInt(prompt("Por favor, ingrese el ID (1-5) del producto que desea alquilar:"));
        const result = alquilarProducto(productId);
        alert(result);
        break;

      case '3':
        const maxPrice = parseFloat(prompt("Ingrese el precio máximo:"));
        if (!isNaN(maxPrice)) {
          const productosFiltrados = filterProductsByPriceMax(maxPrice);
          if (productosFiltrados.length > 0) {
            let lista = 'Productos dentro del rango de precio:\n';
            for (const producto of productosFiltrados) {
              lista += `ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: $${producto.precio}, Stock: ${producto.stock}\n`;
            }
            alert(lista);
          } else {
            alert("No se encontraron productos dentro del rango de precio especificado.");
          }
        } else {
          alert("Precio no válido. Por favor, ingrese un número válido.");
        }
        break;
      case '4':
        continuar = false;
        alert('¡Gracias por visitar Classy Cars!');
        break;

      default:
        alert('Opción no válida. Por favor, seleccione una opción válida.');
    }
  }
}

rentCar();

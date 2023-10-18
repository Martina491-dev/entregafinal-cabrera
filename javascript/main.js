//tarifas
const rates = {
  economico: 30,
  estandar: 50,
  lujo: 100,
};

//Autos
const autosClasicos = ['Ford Mustang', 'Eleanor Pony', 'Lamborghini Miura', 'Aston Martin', 'Jaguar E-Type'];

// Función para calcular el costo total
function calculateTotal(selectedRate, rentalDays) {
  const rate = rates[selectedRate] || 0;
  return rate * rentalDays;
}

// Función para mostrar el menú y obtener la opción del usuario
function mostrarMenu() {
  console.log("Menú de opciones:");
  console.log("1. Ver automóviles disponibles");
  console.log("2. Hacer una reserva");
  console.log("3. Ver historial de alquileres");
  console.log("4. Salir");
  const opcion =parseInt(prompt("Por favor, seleccione una opción :\n 1) Ver autos disponibles \n 2) Hacer una reserva \n 3) Ver historial de alquiler \n 4) Salir\n"));
  return parseInt(opcion);
}

// Función para interactuar con el cliente
function runCarRentalSimulator() {
const nombreIngresado = prompt("Ingresar nombre").toLocaleLowerCase();
  alert("Bienvenido a Classy Cars, " + nombreIngresado + ". Aquí podrás encontrar el mejor auto y precio de alquiler. Presione 'aceptar' o 'enter' para ver las mejores opciones de autos.");
  let continuar = true;

  let opcionSeleccionada;

while (continuar) {
  opcionSeleccionada = mostrarMenu();

  switch (opcionSeleccionada) {
    case 1:
      console.log("Automóviles disponibles:");
      alert("Automóviles disponibles:\n" + autosClasicos.join("\n"));
      break;

    case 2:
      // Hacer una reserva
      console.log("Por favor, seleccione un automóvil:");
      for (const key in autosClasicos) {
        if (autosClasicos.hasOwnProperty(key)) {
          console.log(`${key}: ${autosClasicos[key]}`);
        }
      }
    
      const selectedCarNumber = parseInt(prompt("Seleccione un automóvil \n1)Ford Mustang, \n2)Eleanor Pony, \n3)Lamborghini Miura, \n4) Aston Martin, \n5)Jaguar E-Type \n6) Salir"));
      
      if (selectedCarNumber === 6) {
        alert("Saliendo del simulador. ¡Hasta luego!");
        continuar = true;
      } else if (selectedCarNumber >= 1 && selectedCarNumber <= autosClasicos.length) {
        const selectedCarNumber = autosClasicos[selectedCarNumber - 1];
      } else {
        alert("Opción no válida. Por favor, seleccione un automóvil válido.");
      
    

        // SERVICIO QUE SE ELIGE
        console.log("Seleccione el tipo de servicio: 1) económico, 2) estándar, 3) lujo");
        const selectedServiceInput = parseInt(prompt("Tipo de servicio: \n1) económico 30USD, \n2) estándar 50USD, \n3) lujo 100USD"));

        let selectedService;

        switch (selectedServiceInput) {
          case 1:
            selectedService = 'economico';
            break;
          case 2:
            selectedService = 'estandar';
            break;
          case 3:
            selectedService = 'lujo';
            break;
          default:
            alert("Tipo de servicio no válido. Por favor, seleccione un servicio nuevamente.");
            return;
        }

        // DIAS DE ALQUILER
        const rentalDays = parseInt(prompt("Número de días de alquiler:"));
        if (isNaN(rentalDays) || rentalDays <= 0) {
          alert("Número de días no válido. Por favor, ingrese nuevamente un número de días de alquiler.");
          return
        }

        // Calculo final
        const totalCost = calculateTotal(selectedService, rentalDays);
        alert(`${nombreIngresado}, reservaste un ${selectedCar} (${selectedService}) por ${rentalDays} días. El costo total del alquiler es: $${totalCost}`);
        alert("Opción no válida. Por favor, seleccione un automóvil válido.");
        continuar = true;
      }
  
    
      return;
      

    case 3:
      // Aquí puedes agregar la lógica para ver el historial de alquileres.
      break;

    case 4:
      alert("Saliendo del simulador. ¡Hasta luego!");
    return;

    default:
      alert("Opción no válida. Por favor, seleccione una opción válida.");
      return;
  }
}
}

runCarRentalSimulator();

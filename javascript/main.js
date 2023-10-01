//tarifas
const rates = {
    economico: 30,
    estandar: 50,
    lujo: 100,
  };
  
  //Autos
  const autosClasicos = {
    '1': 'Ford Mustang',
    '2': 'Eleanor Pony',
    '3': 'Lamborghini Miura',
    '4': 'Aston Martin',
  };
  
  // Función para calcular el costo total
  function calculateTotal(selectedRate, rentalDays) {
    const rate = rates[selectedRate] || 0;
    return rate * rentalDays;
  }
  
// Función para interactuar con el cliente
function runCarRentalSimulator() {
  const nombreIngresado = prompt("Ingresar nombre");
  alert("Bienvenido a Classy Cars, " + nombreIngresado + ". Aquí podrás encontrar el mejor auto y precio de alquiler. Presione 'aceptar' o 'enter' para ver las mejores opciones de autos.");
  let continuar = true;

  while (continuar) {
    console.log("Por favor, seleccione un automóvil:");
    for (const key in autosClasicos) {
      if (autosClasicos.hasOwnProperty(key)) {
        console.log(`${key}: ${autosClasicos[key]}`);
      }
    }

    const selectedCarNumber = prompt("Seleccione un automóvil 1)Ford Mustang, 2)Eleanor Pony, 3) Lamborghini Miuraz, 4) Aston Martin o escriba 'salir' para finalizar:").toLowerCase();

    if (selectedCarNumber === 'salir') {
      alert("Saliendo del simulador. ¡Hasta luego!");
      continuar = true;
    } else if (autosClasicos[selectedCarNumber]) {
      const selectedCar = autosClasicos[selectedCarNumber];

      // SERVICIO QUE SE ELIGE
      console.log("Seleccione el tipo de servicio: 1) economico, 2) estandar, 3) lujo o escriba 'economico', 'estandar' o 'lujo'");
      const selectedServiceInput = prompt("Tipo de servicio: 1) economico 30USD, 2) estandar 50USD, 3) lujo 100USD o escriba 'economico', 'estandar' o 'lujo'").toLowerCase();

      let selectedService;
      
      if (selectedServiceInput === 'economico' || selectedServiceInput === '1') {
        selectedService = 'economico';
      } else if (selectedServiceInput === 'estandar' || selectedServiceInput === '2') {
        selectedService = 'estandar';
      } else if (selectedServiceInput === 'lujo' || selectedServiceInput === '3') {
        selectedService = 'lujo';
      } else {
        alert("Tipo de servicio no válido. Por favor, seleccione un servicio nuevamente.");
        continue;
      }

      

      // DIAS DE ALQUILER
      const rentalDays = parseInt(prompt("Número de días de alquiler:"));
      if (isNaN(rentalDays) || rentalDays <= 0) {
        alert("Número de días no válido. Por favor, ingrese nuevamente un número de días de alquiler.");
        continue; 
      }

      // Calculo final
      const totalCost = calculateTotal(selectedService, rentalDays);
      alert(`${nombreIngresado} El costo total del alquiler de un ${selectedCar} (${selectedService}) por ${rentalDays} días es: $${totalCost}`);
    } else {
      alert("Opción no válida. Por favor, seleccione un automóvil válido.");
    }
  }
}

runCarRentalSimulator();

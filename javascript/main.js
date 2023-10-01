//tarifas
const rates = {
    economy: 30,
    standard: 50,
    luxury: 100,
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
    alert("Bienvenido a Classy Cars, " + nombreIngresado + ". Aquí podrás encontrar el mejor auto y precio de alquiler.");
  
    while (true) {
      console.log("Por favor, seleccione un automóvil:");
      for (const key in autosClasicos) {
        if (autosClasicos.hasOwnProperty(key)) {
          console.log(`${key}: ${autosClasicos[key]}`);
        }
      }
   
      const selectedCarNumber = prompt("Seleccione un automóvil 1)Ford Mustang, 2)Eleanor Pony, 3) Lamborghini Miuraz, 4) Aston Martin o escriba 'salir' para finalizar:");
      if (selectedCarNumber === 'salir') {
        alert("Saliendo del simulador. ¡Hasta luego!");
        continue;
      }
  
      const selectedCar = autosClasicos[selectedCarNumber];
      if(!selectedCar) {
        alert("Opción no válida. Por favor, seleccione un automóvil válido.");
        continue; 
      }
      // SERVICIO QUE SE ELIGE
      console.log("Seleccione el tipo de servicio: economy, standard o luxury");
      const selectedService = prompt("Tipo de servicio: economy 30USD, standard 50USD, luxury 100USD");
      if (!rates[selectedService]) {
        alert("Tipo de servicio no válido. Por favor, seleccione un servicio válido.");
        continue; 
      }
  
      // DIAS DE ALQUILER
      const rentalDays = parseInt(prompt("Número de días de alquiler:"));
      if (isNaN(rentalDays) || rentalDays <= 0) {
        alert("Número de días no válido. Por favor, ingrese un número válido de días de alquiler.");
        continue; 
      }
     //calculo final
      const totalCost = calculateTotal(selectedService, rentalDays);
      alert(`El costo total del alquiler de un ${selectedCar} (${selectedService}) por ${rentalDays} días es: $${totalCost}`);
      return;
    }
    
  }

  // Ejecutar el simulador
  runCarRentalSimulator();
  
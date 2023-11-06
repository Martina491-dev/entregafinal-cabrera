document.getElementById("guardarBtn").addEventListener("click", function () {
  const selectedModel = document.getElementById("modelo").value;
  const selectedFechaRetiro = document.getElementById("fecha-retiro").value;
  const selectedFechaDevolucion = document.getElementById("fecha-devolucion").value;
  const selectedUbicacionRetiro = document.getElementById("ubicacion-retiro").value;
  const userEmail = document.getElementById("email").value;

  // Verificar que la fecha de retiro no sea posterior a la fecha de devolución
  if (selectedFechaRetiro > selectedFechaDevolucion) {
    alert("La fecha de retiro no puede ser posterior a la fecha de devolución. Por favor, seleccione fechas válidas.");
    return; // Salir de la función si hay un error
  }

  const reservationDetails = {
    model: selectedModel,
    fechaRetiro: selectedFechaRetiro,
    fechaDevolucion: selectedFechaDevolucion,
    ubicacionRetiro: selectedUbicacionRetiro,
    email: userEmail,
  };

  // Guardar el objeto reservationDetails en un array
  let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations.push(reservationDetails);

  localStorage.setItem("reservations", JSON.stringify(reservations));

  alert("Reserva realizada con éxito. En la brevedad le estaremos enviando detalles por email.");
});


window.addEventListener("load", function() {
  const reservationDetailsString = localStorage.getItem("reservationDetails");
  if (reservationDetailsString) {
    const reservationDetails = JSON.parse(reservationDetailsString);
    document.getElementById("mensaje").textContent = "Última reserva guardada: Modelo: " + reservationDetails.model + ", Fecha de Retiro: " + reservationDetails.fechaRetiro + ", Fecha de Devolución: " + reservationDetails.fechaDevolucion + ", Ubicación de Retiro: " + reservationDetails.ubicacionRetiro + ", Correo Electrónico: " + reservationDetails.email;
  }
});
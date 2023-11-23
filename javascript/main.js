
document.getElementById("guardarBtn").addEventListener("click", function() {
const modelosAutos = ["Jaguar E-Type 60", "Ford Mustang", "Chevrolet Camaro", "Aston Martin"];
const fechasRetiro = ["10-11-2023", "15-11-2023", "20-11-2023", "25-11-2023", "30-11-2023", "05-12-2023"];
const fechasDevolucion = ["15-11-2023", "20-11-2023", "25-11-2023", "30-11-2023", "05-12-2023", "10-12-2023"];
const ubicacionesRetiro = ["Aeropuerto de Palermo", "Centro de la Ciudad", "Estación de Tren Roca", "Oficina Local en Puerto Madero"];

document.getElementById("guardarBtn").addEventListener("click", function() {
  const selectedModel = document.getElementById("modelo").value;
  const selectedFechaRetiro = document.getElementById("fecha-retiro").value;
  const selectedFechaDevolucion = document.getElementById("fecha-devolucion").value;
  const selectedUbicacionRetiro = document.getElementById("ubicacion-retiro").value;
  const userEmail = document.getElementById("email").value;

  if (
    selectedFechaRetiro === "" || 
    selectedFechaDevolucion === "" || 
    userEmail === ""
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, complete todos los campos antes de guardar la selección.',
    });
  } else {
    const fechaRetiroDate = new Date(selectedFechaRetiro);
    const fechaDevolucionDate = new Date(selectedFechaDevolucion);

    if (fechaRetiroDate > fechaDevolucionDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de retiro no puede ser igual o posterior a la fecha de devolución.',
      });
    } else {
      const reservationDetails = {
        model: selectedModel,
        fechaRetiro: selectedFechaRetiro,
        fechaDevolucion: selectedFechaDevolucion,
        ubicacionRetiro: selectedUbicacionRetiro,
        email: userEmail,
      };
      let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
      reservations.push(reservationDetails);
      localStorage.setItem("reservations", JSON.stringify(reservations));
      Swal.fire({
        icon: 'success',
        title: 'Reserva realizada con éxito',
        text: 'En breve le enviaremos detalles por correo electrónico.',
      });

      // Actualizar la última reserva
      updateLastReservation(reservationDetails);
    }
  }
});

// Función para actualizar la última reserva 
function updateLastReservation(reservation) {
  const mensajeElement = document.getElementById("mensaje");
  mensajeElement.innerHTML = '';
  
  const messagePara = document.createElement("p");
  messagePara.textContent = "Última reserva guardada:";
  mensajeElement.appendChild(messagePara);

  const details = [
    "Modelo: " + reservation.model,
    "Fecha de Retiro: " + reservation.fechaRetiro,
    "Fecha de Devolución: " + reservation.fechaDevolucion,
    "Ubicación de Retiro: " + reservation.ubicacionRetiro,
    "Correo Electrónico: " + reservation.email
  ];
  details.forEach(detail => {
    const p = document.createElement("p");
    p.textContent = detail;
    mensajeElement.appendChild(p);
  });
}
fetch('URL_DEL_SERVIDOR', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(reservationDetails),
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
})
.then(data => {
  
  console.log('Respuesta del servidor:', data);
  
  
  updateLastReservation(reservationDetails);
  

  Swal.fire({
    icon: 'success',
    title: 'Reserva realizada con éxito',
    text: 'En breve le enviaremos detalles por correo electrónico.',
  });
})
.catch(error => {
  console.error('Error en la solicitud al servidor:', error);
  
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Hubo un error al procesar la reserva. Por favor, inténtelo nuevamente.',
  });
});
});
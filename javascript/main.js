const firebaseConfig = {
  apiKey: "AIzaSyCLm4fv-FWmFHOZkHFLYiOk-bBqqD0mOKc",
  authDomain: "entregafinal-cabrera.firebaseapp.com",
  projectId: "entregafinal-cabrera",
  storageBucket: "entregafinal-cabrera.appspot.com",
  messagingSenderId: "722774666215",
  appId: "1:722774666215:web:8c05983d153461346dab42",
  measurementId: "G-V1ZB3K6VV4"
};

document.getElementById("guardarBtn").addEventListener("click", function () {
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

    if (fechaRetiroDate >= fechaDevolucionDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de retiro debe ser anterior a la fecha de devolución.',
      });
    } else {
      const reservationDetails = {
        model: selectedModel,
        fechaRetiro: selectedFechaRetiro,
        fechaDevolucion: selectedFechaDevolucion,
        ubicacionRetiro: selectedUbicacionRetiro,
        email: userEmail,
      };
      
      // Actualizar la última reserva
      updateLastReservation(reservationDetails);

      // Realizar la reserva
      makeReservation(reservationDetails);
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

// Función para realizar la reserva
function makeReservation(reservationDetails) {
  fetch('https://martina491-dev.github.io/entregafinal-cabrera/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationDetails),
  })
    .then(response => {
      console.log('Response from server:', response);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error en la solicitud al servidor:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al procesar la reserva. Por favor, inténtelo nuevamente.',
      });
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
      Swal.fire({
        icon: 'success',
        title: 'Reserva realizada con éxito',
        text: 'En breve le enviaremos detalles por correo electrónico.',
      });
    });
   
}

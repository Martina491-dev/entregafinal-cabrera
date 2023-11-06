document.getElementById("guardarBtn").addEventListener("click", function() {
  const selectedModel = document.getElementById("modelo").value;
  const selectedFechaRetiro = document.getElementById("fecha-retiro").value;
  const selectedFechaDevolucion = document.getElementById("fecha-devolucion").value;
  const selectedUbicacionRetiro = document.getElementById("ubicacion-retiro").value;
  const userEmail = document.getElementById("email").value;

  if (selectedModel === "" || selectedFechaRetiro === "" || selectedFechaDevolucion === "" || selectedUbicacionRetiro === "" || userEmail === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, complete todos los campos antes de guardar la selección.',
    });
  } else if (new Date(selectedFechaRetiro) > new Date(selectedFechaDevolucion)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La fecha de retiro no puede ser posterior a la fecha de devolución.',
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
      text: 'En la brevedad le estaremos enviando detalles por email.',
    });
  }
});

window.addEventListener("load", function() {
  const reservationsString = localStorage.getItem("reservations");
  if (reservationsString) {
    const reservations = JSON.parse(reservationsString);
    const lastReservation = reservations[reservations.length - 1]; // Obtén la última reserva de la lista

    const mensajeElement = document.getElementById("mensaje");
    mensajeElement.innerHTML = ''; // Borra el contenido existente

    if (lastReservation) {
      // Agrega el mensaje "Última reserva guardada" como primer párrafo
      const messagePara = document.createElement("p");
      messagePara.textContent = "Última reserva guardada:";
      mensajeElement.appendChild(messagePara);

      // Crea párrafos para cada detalle de la reserva y añádelos al elemento mensaje
      const details = [
        "Modelo: " + lastReservation.model,
        "Fecha de Retiro: " + lastReservation.fechaRetiro,
        "Fecha de Devolución: " + lastReservation.fechaDevolucion,
        "Ubicación de Retiro: " + lastReservation.ubicacionRetiro,
        "Correo Electrónico: " + lastReservation.email
      ];

      details.forEach(detail => {
        const p = document.createElement("p");
        p.textContent = detail;
        mensajeElement.appendChild(p);
      });
    }
  }
});

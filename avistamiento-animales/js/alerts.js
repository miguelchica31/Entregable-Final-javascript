// Alertas con SweetAlert2 (la librería se carga por CDN en cada HTML).

// Muestra una alerta con temporizador y, al cerrarse, redirige a la url indicada.
export function redirectAlert(message, icon, url) {
  let timerInterval;
  Swal.fire({
    title: message,
    html: "Esta ventana se cierra en <b></b> milisegundos.",
    timer: 2000,
    timerProgressBar: true,
    icon: icon,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      window.location.href = url;
    },
  });
}

// Alerta simple, sin redirección (para avisar errores de validación
// sin perder lo que el usuario ya escribió en el formulario).
export function mensajeAlert(message, icon) {
  Swal.fire({
    title: message,
    icon: icon,
    confirmButtonText: "Entendido",
  });
}

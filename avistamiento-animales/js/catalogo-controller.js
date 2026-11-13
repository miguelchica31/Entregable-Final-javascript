import { getLocalStorage } from "./local-storage.js";
import {
  especies,
  tipoanimal,
  alimentacion,
  estadosConservacion,
  habitats,
  nombreDe,
  emojiDe,
  codigoEspecie,
} from "./data.js";

// Usuario con sesión iniciada
let usuario = getLocalStorage("usuario") || { nombre: "Invitado" };
document.querySelector("#nombre-usuario").textContent = "SESIÓN: " + usuario.nombre;

// Equivale al procedimiento usp_TotalEspecies: SELECT COUNT(*) FROM Especie
document.querySelector("#total-especies").textContent = especies.length;

// Construye la tarjeta de una especie
function crearTarjeta(especie) {
  let tarjeta = document.createElement("article");
  tarjeta.className = "b-card";

  tarjeta.innerHTML = `
    <div class="card-header">
      <span class="tag tag-accent"></span>
      <span class="mono ref-codigo"></span>
    </div>
    <div class="item-img-container">
      <span class="item-emoji" aria-hidden="true"></span>
    </div>
    <div class="card-body">
      <h2 class="item-title"></h2>
      <p class="item-desc"></p>
      <table class="specs-table">
        <tr><td>ALIMENTACIÓN:</td><td class="dato-alimentacion"></td></tr>
        <tr><td>HÁBITAT:</td><td class="dato-habitat"></td></tr>
        <tr><td>ESTADO:</td><td class="dato-estado"></td></tr>
      </table>
    </div>
    <div class="card-footer">
      <span class="mono fecha-registro"></span>
      <a class="btn btn-sm btn-primary">Ver ficha</a>
    </div>
  `;

  // Todo se escribe con textContent para no interpretar HTML del usuario
  tarjeta.querySelector(".tag-accent").textContent = nombreDe(tipoanimal, especie.id_tipo);
  tarjeta.querySelector(".ref-codigo").textContent = codigoEspecie(especie.id_especie);
  tarjeta.querySelector(".item-emoji").textContent = emojiDe(especie);
  tarjeta.querySelector(".item-title").textContent = especie.nombre;

  if (especie.observaciones) {
    tarjeta.querySelector(".item-desc").textContent = especie.observaciones;
  } else {
    tarjeta.querySelector(".item-desc").textContent = "Sin observaciones registradas.";
  }

  tarjeta.querySelector(".dato-alimentacion").textContent = nombreDe(
    alimentacion,
    especie.id_alimentacion,
  );
  tarjeta.querySelector(".dato-estado").textContent = nombreDe(
    estadosConservacion,
    especie.id_estado,
  );

  // Una especie puede vivir en varios hábitats (tabla EspecieHabitat)
  if (especie.habitats.length > 0) {
    let nombresHabitats = especie.habitats.map((id) => nombreDe(habitats, id));
    tarjeta.querySelector(".dato-habitat").textContent = nombresHabitats.join(", ");
  } else {
    tarjeta.querySelector(".dato-habitat").textContent = "Sin dato";
  }

  tarjeta.querySelector(".fecha-registro").textContent = "REGISTRO: " + especie.fecha_registro;
  tarjeta
    .querySelector(".btn")
    .setAttribute("href", "detalle-especie.html?id=" + encodeURIComponent(especie.id_especie));

  return tarjeta;
}

let catalogo = document.querySelector("#catalogo");

especies.forEach((especie) => {
  catalogo.appendChild(crearTarjeta(especie));
});

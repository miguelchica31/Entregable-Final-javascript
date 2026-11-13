import { getLocalStorage } from "./local-storage.js";
import {
  especies,
  tipoanimal,
  alimentacion,
  estadosConservacion,
  habitats,
  caracteristicas,
  nombreDe,
  emojiDe,
  codigoEspecie,
} from "./data.js";

// Usuario con sesión iniciada
let usuario = getLocalStorage("usuario") || { nombre: "Invitado" };
document.querySelector("#nombre-usuario").textContent = "SESIÓN: " + usuario.nombre;

// El id de la especie llega en la url: detalle-especie.html?id=3
let parametros = new URLSearchParams(window.location.search);
let id = parametros.get("id");

let especie = especies.find((item) => String(item.id_especie) == id);

let contenedor = document.querySelector("#detalle");

// Llena una lista de "chips" con los nombres de un catálogo
function llenarChips(selector, ids, catalogo) {
  let lista = document.querySelector(selector);
  if (ids.length == 0) {
    lista.textContent = "Sin datos registrados";
    return;
  }
  ids.forEach((idItem) => {
    let chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = nombreDe(catalogo, idItem);
    lista.appendChild(chip);
  });
}

if (especie) {
  document.title = especie.nombre + " — AVISTAMIENTO";

  contenedor.innerHTML = `
    <div class="detail-image-box">
      <span class="detail-emoji" aria-hidden="true"></span>
    </div>

    <div class="detail-info">
      <div class="detail-header-tags">
        <span class="tag tag-accent" id="d-tipo"></span>
        <span class="tag" id="d-codigo"></span>
        <span class="tag tag-dark" id="d-estado"></span>
      </div>

      <h1 class="detail-title" id="d-nombre"></h1>

      <div class="detail-strip">
        <span class="mono" id="d-fecha"></span>
      </div>

      <p class="detail-description" id="d-observaciones"></p>

      <table class="specs-table specs-table-lg">
        <tr><td>TIPO DE ANIMAL:</td><td id="t-tipo"></td></tr>
        <tr><td>ALIMENTACIÓN:</td><td id="t-alimentacion"></td></tr>
        <tr><td>ESTADO DE CONSERVACIÓN:</td><td id="t-estado"></td></tr>
        <tr><td>FECHA DE REGISTRO:</td><td id="t-fecha"></td></tr>
      </table>

      <h3 class="detail-subtitle">Hábitats</h3>
      <div class="chip-list" id="lista-habitats"></div>

      <h3 class="detail-subtitle">Características</h3>
      <div class="chip-list" id="lista-caracteristicas"></div>
    </div>
  `;

  let tipo = nombreDe(tipoanimal, especie.id_tipo);
  let comida = nombreDe(alimentacion, especie.id_alimentacion);
  let estado = nombreDe(estadosConservacion, especie.id_estado);

  contenedor.querySelector(".detail-emoji").textContent = emojiDe(especie);
  document.querySelector("#d-tipo").textContent = tipo;
  document.querySelector("#d-codigo").textContent = "REF: " + codigoEspecie(especie.id_especie);
  document.querySelector("#d-estado").textContent = estado;
  document.querySelector("#d-nombre").textContent = especie.nombre;
  document.querySelector("#d-fecha").textContent = "REGISTRADA EL " + especie.fecha_registro;

  if (especie.observaciones) {
    document.querySelector("#d-observaciones").textContent = especie.observaciones;
  } else {
    document.querySelector("#d-observaciones").textContent =
      "Esta especie aún no tiene observaciones registradas.";
  }

  document.querySelector("#t-tipo").textContent = tipo;
  document.querySelector("#t-alimentacion").textContent = comida;
  document.querySelector("#t-estado").textContent = estado;
  document.querySelector("#t-fecha").textContent = especie.fecha_registro;

  llenarChips("#lista-habitats", especie.habitats, habitats);
  llenarChips("#lista-caracteristicas", especie.caracteristicas, caracteristicas);
} else {
  contenedor.innerHTML = `
    <div class="empty-state">
      <span class="tag tag-dark">ERROR 404</span>
      <h1>No encontramos esa especie</h1>
      <p>El registro que buscas no existe o fue eliminado.</p>
      <a href="catalogo.html" class="btn btn-primary">Volver al catálogo</a>
    </div>
  `;
}

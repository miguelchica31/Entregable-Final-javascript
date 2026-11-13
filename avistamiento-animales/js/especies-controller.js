import { getLocalStorage } from "./local-storage.js";
import {
  especies,
  tipoanimal,
  alimentacion,
  estadosConservacion,
  habitats,
  caracteristicas,
  registrarEspecie,
} from "./data.js";
import { redirectAlert, mensajeAlert } from "./alerts.js";
import { idGenerator } from "./generators.js";

// Usuario con sesión iniciada
let usuario = getLocalStorage("usuario") || { nombre: "Invitado" };
document.querySelector("#nombre-usuario").textContent = "SESIÓN: " + usuario.nombre;

// ---------------------------------------------------------------
// Llenar los campos del formulario con las tablas catálogo
// ---------------------------------------------------------------
function llenarSelect(selector, lista) {
  let select = document.querySelector(selector);
  lista.forEach((item) => {
    let opcion = document.createElement("option");
    opcion.value = item.id;
    opcion.textContent = item.nombre;
    select.appendChild(opcion);
  });
}

// Lista de casillas (checkbox) para las relaciones muchos a muchos
function llenarChecks(selector, lista, nombreCampo) {
  let contenedor = document.querySelector(selector);
  lista.forEach((item) => {
    let etiqueta = document.createElement("label");
    etiqueta.className = "form-check";

    let casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.name = nombreCampo;
    casilla.value = item.id;

    let texto = document.createElement("span");
    texto.textContent = item.nombre;

    etiqueta.appendChild(casilla);
    etiqueta.appendChild(texto);
    contenedor.appendChild(etiqueta);
  });
}

llenarSelect("#tipo", tipoanimal);
llenarSelect("#alimentacion", alimentacion);
llenarSelect("#estado", estadosConservacion);
llenarChecks("#lista-habitats", habitats, "habitat");
llenarChecks("#lista-caracteristicas", caracteristicas, "caracteristica");

// ---------------------------------------------------------------
// Registrar la especie (equivale a usp_InsertarEspecie + las tablas
// EspecieHabitat y EspecieCaracteristica)
// ---------------------------------------------------------------
function crearEspecie() {
  let nombre = document.querySelector("#nombre-especie").value.trim();
  let id_tipo = document.querySelector("#tipo").value;
  let id_alimentacion = document.querySelector("#alimentacion").value;
  let id_estado = document.querySelector("#estado").value;
  let observaciones = document.querySelector("#observaciones").value.trim();

  // Los campos NOT NULL de la tabla Especie son obligatorios
  if (nombre == "" || id_tipo == "" || id_alimentacion == "" || id_estado == "") {
    mensajeAlert("Completa el nombre, el tipo, la alimentación y el estado", "warning");
    return;
  }

  // La columna nombre es UNIQUE en la base de datos
  let repetida = especies.find((item) => item.nombre.toLowerCase() == nombre.toLowerCase());
  if (repetida) {
    mensajeAlert("Ya existe una especie llamada " + repetida.nombre, "error");
    return;
  }

  // Código único para la nueva especie
  let id_especie = idGenerator("ESP-");
  while (especies.find((item) => item.id_especie == id_especie)) {
    id_especie = idGenerator("ESP-");
  }

  // Casillas marcadas
  let habitatsMarcados = Array.from(
    document.querySelectorAll("input[name='habitat']:checked"),
  ).map((casilla) => Number(casilla.value));
  let caracteristicasMarcadas = Array.from(
    document.querySelectorAll("input[name='caracteristica']:checked"),
  ).map((casilla) => Number(casilla.value));

  // fecha_registro DATE DEFAULT GETDATE(): la fecha de hoy (AAAA-MM-DD)
  let hoy = new Date();
  let fecha_registro =
    hoy.getFullYear() +
    "-" +
    String(hoy.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(hoy.getDate()).padStart(2, "0");

  let especie = {
    id_especie,
    nombre,
    id_tipo: Number(id_tipo),
    id_alimentacion: Number(id_alimentacion),
    id_estado: Number(id_estado),
    fecha_registro,
    observaciones,
    habitats: habitatsMarcados,
    caracteristicas: caracteristicasMarcadas,
  };

  especies.push(especie);
  registrarEspecie("especies", especies);
  redirectAlert("Especie registrada con éxito", "success", "./catalogo.html");
}

let btn_registrar_especie = document.querySelector("#btn-registrar-especie");
if (btn_registrar_especie) {
  btn_registrar_especie.addEventListener("click", crearEspecie);
}

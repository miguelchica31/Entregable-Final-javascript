// Datos de la aplicación. Reproducen la base de datos AvistamientoDeAnimales
// (SQL Server): tablas catálogo, tabla Especie y las tablas intermedias
// EspecieHabitat y EspecieCaracteristica (aquí viven dentro de cada especie
// como los arreglos "habitats" y "caracteristicas", con los id de cada catálogo).

import { getLocalStorage, setLocalStorage } from "./local-storage.js";

// ---------------------------------------------------------------
// Usuarios de prueba (para el inicio de sesión)
// ---------------------------------------------------------------
let usuarios = [
  {
    id: "id1",
    nombre: "Ana Observadora",
    correo: "ana@correo.com",
    telefono: "3001234567",
    contrasena: "12345",
  },
  {
    id: "id2",
    nombre: "Luis Naturalista",
    correo: "luis@correo.com",
    telefono: "3219876543",
    contrasena: "12345",
  },
];

// ---------------------------------------------------------------
// Tablas catálogo: cada una es [{ id, nombre }] igual que en SQL
// (el id es el IDENTITY(1,1): empieza en 1 y sube de uno en uno)
// ---------------------------------------------------------------
function crearLista(nombres) {
  return nombres.map(function (nombre, posicion) {
    return { id: posicion + 1, nombre: nombre };
  });
}

// Tabla tipoanimal
export const tipoanimal = crearLista([
  "Mamifero", "Ave", "Reptil", "Anfibio", "Pez",
  "Insecto", "Aracnido", "Crustaceo", "Molusco", "Equinodermo",
  "Anelido", "Porifero", "Cnidario", "Miriapodo", "Quelicerado",
  "Cefalopodo", "Gasteropodo", "Bivalvo", "Roedor", "Marsupial",
]);

// Tabla alimentacion
export const alimentacion = crearLista([
  "Carnivoro", "Herbivoro", "Omnivoro", "Insectivoro", "Frugivoro",
  "Granivoro", "Nectarivoro", "Piscivoro", "Detritivoro", "Filtrador",
  "Hematofago", "Carroñero", "Folivoro", "Malacofago", "Crustaceivoro",
  "Planctivoro", "Semillero", "Polinivoro", "Coprofago", "Generalista",
]);

// Tabla Habitad (en la interfaz se escribe "Hábitat")
export const habitats = crearLista([
  "Bosque tropical", "Bosque seco", "Selva", "Sabana", "Desierto",
  "Montaña", "Rio", "Lago", "Mar", "Oceano",
  "Humedal", "Manglar", "Pradera", "Paramo", "Cueva",
  "Zona urbana", "Bosque de niebla", "Arrecife", "Playa", "Pantano",
]);

// Tabla Caracteristicas (columna descripcion; aquí también se llama "nombre")
export const caracteristicas = crearLista([
  "Tiene pelaje", "Tiene plumas", "Tiene escamas", "Puede volar", "Vive en grupos",
  "Es nocturno", "Es diurno", "Es depredador", "Es herbivoro", "Es omnivoro",
  "Puede nadar", "Puede trepar arboles", "Tiene pico", "Tiene garras", "Tiene cola",
  "Tiene caparazon", "Produce veneno", "Tiene alas", "Tiene antenas", "Tiene branquias",
]);

// Tabla EstadoConservacion
export const estadosConservacion = crearLista([
  "Preocupacion menor", "Casi amenazado", "Vulnerable", "En peligro", "En peligro critico",
  "Extinto en estado silvestre", "Extinto", "Datos insuficientes", "No evaluado", "Amenazado",
  "Estable", "En recuperacion", "Poblacion reducida", "Protegido", "Proteccion especial",
  "Riesgo bajo", "Riesgo moderado", "Riesgo alto", "Riesgo muy alto", "Conservacion prioritaria",
]);

// ---------------------------------------------------------------
// Tabla Especie (datos semilla del INSERT del script SQL)
// El campo "emoji" no existe en la base de datos: solo sirve para
// ilustrar la tarjeta, ya que la base no guarda fotografías.
// ---------------------------------------------------------------
const especiesIniciales = [
  { id_especie: 1, nombre: "Jaguar", id_tipo: 1, id_alimentacion: 1, id_estado: 3, fecha_registro: "2026-01-01", observaciones: "Especie de interes para la aplicacion", habitats: [1], caracteristicas: [1], emoji: "🐆" },
  { id_especie: 2, nombre: "Oso de anteojos", id_tipo: 1, id_alimentacion: 3, id_estado: 3, fecha_registro: "2026-01-02", observaciones: "Registrar informacion de conservacion", habitats: [6], caracteristicas: [1], emoji: "🐻" },
  { id_especie: 3, nombre: "Mono aullador", id_tipo: 1, id_alimentacion: 3, id_estado: 1, fecha_registro: "2026-01-03", observaciones: "", habitats: [3], caracteristicas: [1], emoji: "🐒" },
  { id_especie: 4, nombre: "Perezoso", id_tipo: 1, id_alimentacion: 2, id_estado: 1, fecha_registro: "2026-01-04", observaciones: "", habitats: [3], caracteristicas: [1], emoji: "🦥" },
  { id_especie: 5, nombre: "Tapir", id_tipo: 1, id_alimentacion: 2, id_estado: 3, fecha_registro: "2026-01-05", observaciones: "", habitats: [4], caracteristicas: [1], emoji: "🐗" },
  { id_especie: 6, nombre: "Condor de los Andes", id_tipo: 2, id_alimentacion: 12, id_estado: 4, fecha_registro: "2026-01-06", observaciones: "", habitats: [14], caracteristicas: [2], emoji: "🦅" },
  { id_especie: 7, nombre: "Aguila real", id_tipo: 2, id_alimentacion: 1, id_estado: 2, fecha_registro: "2026-01-07", observaciones: "", habitats: [6], caracteristicas: [2], emoji: "🦅" },
  { id_especie: 8, nombre: "Tucan", id_tipo: 2, id_alimentacion: 5, id_estado: 1, fecha_registro: "2026-01-08", observaciones: "", habitats: [1], caracteristicas: [2], emoji: "🦜" },
  { id_especie: 9, nombre: "Flamenco", id_tipo: 2, id_alimentacion: 10, id_estado: 1, fecha_registro: "2026-01-09", observaciones: "", habitats: [11], caracteristicas: [2], emoji: "🦩" },
  { id_especie: 10, nombre: "Iguana verde", id_tipo: 3, id_alimentacion: 2, id_estado: 1, fecha_registro: "2026-01-10", observaciones: "", habitats: [3], caracteristicas: [3], emoji: "🦎" },
  { id_especie: 11, nombre: "Tortuga marina", id_tipo: 3, id_alimentacion: 2, id_estado: 3, fecha_registro: "2026-01-11", observaciones: "", habitats: [9], caracteristicas: [3], emoji: "🐢" },
  { id_especie: 12, nombre: "Caiman", id_tipo: 3, id_alimentacion: 1, id_estado: 1, fecha_registro: "2026-01-12", observaciones: "", habitats: [7], caracteristicas: [3], emoji: "🐊" },
  { id_especie: 13, nombre: "Rana de cristal", id_tipo: 4, id_alimentacion: 4, id_estado: 3, fecha_registro: "2026-01-13", observaciones: "", habitats: [1], caracteristicas: [3], emoji: "🐸" },
  { id_especie: 14, nombre: "Salamandra", id_tipo: 4, id_alimentacion: 4, id_estado: 1, fecha_registro: "2026-01-14", observaciones: "", habitats: [6], caracteristicas: [3], emoji: "🦎" },
  { id_especie: 15, nombre: "Trucha", id_tipo: 5, id_alimentacion: 8, id_estado: 1, fecha_registro: "2026-01-15", observaciones: "", habitats: [7], caracteristicas: [20], emoji: "🐟" },
  { id_especie: 16, nombre: "Mariposa monarca", id_tipo: 6, id_alimentacion: 7, id_estado: 2, fecha_registro: "2026-01-16", observaciones: "", habitats: [13], caracteristicas: [18], emoji: "🦋" },
  { id_especie: 17, nombre: "Tarantula", id_tipo: 7, id_alimentacion: 1, id_estado: 1, fecha_registro: "2026-01-17", observaciones: "", habitats: [1], caracteristicas: [17], emoji: "🕷️" },
  { id_especie: 18, nombre: "Cangrejo azul", id_tipo: 8, id_alimentacion: 15, id_estado: 1, fecha_registro: "2026-01-18", observaciones: "", habitats: [12], caracteristicas: [16], emoji: "🦀" },
  { id_especie: 19, nombre: "Pulpo comun", id_tipo: 9, id_alimentacion: 1, id_estado: 1, fecha_registro: "2026-01-19", observaciones: "", habitats: [9], caracteristicas: [11], emoji: "🐙" },
  { id_especie: 20, nombre: "Delfin nariz de botella", id_tipo: 1, id_alimentacion: 8, id_estado: 1, fecha_registro: "2026-01-20", observaciones: "", habitats: [9], caracteristicas: [11], emoji: "🐬" },
];

// Emoji de respaldo para las especies nuevas (se elige según el tipo de animal)
const emojiPorTipo = {
  1: "🐾", 2: "🐦", 3: "🦎", 4: "🐸", 5: "🐟",
  6: "🐛", 7: "🕷️", 8: "🦀", 9: "🐚", 10: "⭐",
  11: "🪱", 12: "🧽", 13: "🪼", 14: "🐛", 15: "🦂",
  16: "🐙", 17: "🐌", 18: "🦪", 19: "🐭", 20: "🦘",
};

// Si ya hay especies guardadas en el navegador se usan esas;
// si no, se parte de los datos semilla.
export let especies = getLocalStorage("especies") || especiesIniciales;

// ---------------------------------------------------------------
// Funciones
// ---------------------------------------------------------------
export function buscarUsuario(correo, clave) {
  let auth = usuarios.find(
    (usuario) =>
      correo.trim().toLowerCase() == usuario.correo && clave == usuario.contrasena,
  );
  return auth;
}

// Equivale a la consulta: SELECT nombre FROM tabla WHERE id = ...
export function nombreDe(lista, id) {
  let encontrado = lista.find((item) => item.id == id);
  if (encontrado) {
    return encontrado.nombre;
  }
  return "Sin dato";
}

export function emojiDe(especie) {
  if (especie.emoji) {
    return especie.emoji;
  }
  return emojiPorTipo[especie.id_tipo] || "🐾";
}

// Código visible de la especie: las de la base de datos son números (1, 2, 3...)
// y las nuevas ya traen su código generado (ESP-48213).
export function codigoEspecie(id_especie) {
  if (typeof id_especie == "number") {
    return "ESP-" + String(id_especie).padStart(3, "0");
  }
  return id_especie;
}

export function registrarEspecie(key, value) {
  setLocalStorage(key, value);
}

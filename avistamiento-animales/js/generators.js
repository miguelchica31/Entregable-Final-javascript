// Generador de identificadores: etiqueta + 5 dígitos aleatorios (ej. "ESP-48213").

export function idGenerator(label) {
  let id = Math.random().toString().substring(2, 7);
  return label + id;
}

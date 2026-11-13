# AVISTAMIENTO — Catálogo de especies de animales

Página web (HTML, CSS y JavaScript puro) basada en la base de datos **AvistamientoDeAnimales** (SQL Server) y en la estructura del repositorio *kosas-studio*.

## Cómo ejecutarla

Los módulos de JavaScript (`import` / `export`) **no funcionan abriendo el HTML con doble clic** (`file://`). Hay que servir la carpeta:

- **VS Code:** extensión *Live Server* → clic derecho en `index.html` → *Open with Live Server*.
- **Python:** `python -m http.server 8000` dentro de la carpeta y abrir `http://localhost:8000`.

Necesita internet para cargar SweetAlert2 (alertas) y las fuentes de Google.

**Usuarios de prueba:** `ana@correo.com` / `12345` y `luis@correo.com` / `12345`.

## Estructura

```text
avistamiento-animales/
├── index.html                    # Inicio de sesión
├── pages/
│   ├── catalogo.html             # Tarjetas de todas las especies
│   ├── detalle-especie.html      # Ficha de una especie (?id=...)
│   └── agregar-especie.html      # Formulario para registrar una especie
├── css/                          # base, components, pages → style.css
└── js/
    ├── data.js                   # Datos del SQL + buscarUsuario, registrarEspecie
    ├── local-storage.js          # get / set / remove en localStorage
    ├── alerts.js                 # redirectAlert y mensajeAlert (SweetAlert2)
    ├── generators.js             # idGenerator("ESP-") → ESP-48213
    ├── auth-controller.js        # Lógica del login
    ├── catalogo-controller.js    # Pinta las tarjetas del catálogo
    ├── detalle-controller.js     # Pinta la ficha de una especie
    └── especies-controller.js    # Lógica del formulario de registro
```

## De la base de datos a JavaScript

| SQL Server | JavaScript |
|---|---|
| `tipoanimal`, `alimentacion`, `Habitad`, `Caracteristicas`, `EstadoConservacion` | Arreglos `[{ id, nombre }]` en `data.js` |
| `Especie` (20 INSERT del script) | Arreglo `especies` en `data.js` |
| `EspecieHabitat`, `EspecieCaracteristica` | Arreglos `habitats` y `caracteristicas` dentro de cada especie |
| `Especie.observaciones` (VARCHAR 70) | Campo `observaciones` (máx. 70 caracteres) |
| `usp_InsertarEspecie` | Botón del formulario → `crearEspecie()` |
| `usp_TotalEspecies` | Contador del catálogo → `especies.length` |
| `nombre UNIQUE` / campos `NOT NULL` | Validaciones del formulario |
| `fecha_registro DEFAULT GETDATE()` | Fecha de hoy al registrar |

Las especies nuevas se guardan en `localStorage` (clave `especies`) y siguen ahí al recargar la página.

// Servidor con Express:
const express = require("express");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOST = process.env.HOST ? process.env.HOST : "localhost";

const app = express(); //* { use: () => {...}, ... }

const personajes = [
  {
    id: "1",
    nombre: "Homero Simpson",
    edad: 39,
    ocupacion: "Inspector de seguridad en la Planta Nuclear",
    frases: ["¡D'oh!", "Mmm... donas"],
  },
  {
    id: "2",
    nombre: "Marge Simpson",
    edad: 36,
    ocupacion: "Ama de casa",
    frases: ["Homero...", "Mmmhh..."],
  },
  {
    id: "3",
    nombre: "Sr. Burns",
    edad: 104,
    ocupacion: "Dueño de la Planta Nuclear",
    frases: ["¡Excelente!", "Liberen a los sabuesos"],
  },
  {
    id: "4",
    nombre: "Ned Flanders",
    edad: 60,
    ocupacion: "Propietario de la tienda zurditorium",
    frases: ["¡Okily dokily!", "¡Hola vecinillo!"],
  },
];

// Middleware simple de logger:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} [${new Date().toISOString()}]`);
  console.log(req);
  next();
});
// Middleware para poder interpretar JSON por Body;
app.use(express.json());

// Ruta raíz:
app.get("/", (req, res) => {
  res.send("¡Hola! Este es un servidor con Express 🚀");
});

// Listar todos los personajes
app.get("/personajes", (req, res) => {
  res.json(personajes);
});

// Buscar personaje por id:
app.get("/personajes/:id", (req, res) => {
  const personaje = personajes.find((p) => p.id === req.params.id);

  if (personaje) {
    res.json(personaje);
  } else {
    res.status(404).json({ error: "Personaje no encontrado" });
  }
});

// Manejo de rutas no encontradas con Middleware:
app.use((req, res) => {
  res.status(404).send("404 - Ruta no encontrada");
});

// Server:
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://${HOST}:${PORT}`);
});

//* MIDDLEWARES EN EXPRESS → Cada filtro o control por el que pasa la request.
//* next() → Le da paso al siguiente control ("puede continuar").
//* Endpoint (ruta final) → Donde realmente se entrega la respuesta (El pasajero sube al avión).
/*
┌───────────────────────┬─────────────────────────────────────────────┬─────────────────────────────┐
│   Middleware          │  Ejemplo en un aeropuerto                   │   Ejemplo en Express        │
├───────────────────────┼─────────────────────────────────────────────┼─────────────────────────────┤
│ Logger                │ Pasajero entra y una cámara registra hora   │ app.use((req,res,next)=>{   │
│                       │ y puerta de ingreso.                        │   console.log(req.method);  │
│                       │                                             │   next(); });               │
├───────────────────────┼─────────────────────────────────────────────┼─────────────────────────────┤
│ Seguridad             │ Control policial revisa pasaporte y         │ app.use(checkAuth);         │
│ (autenticación)       │ documentos.                                 │                             │
├───────────────────────┼─────────────────────────────────────────────┼─────────────────────────────┤
│ Chequeo de equipaje   │ Rayos X revisan la valija para que no lleve │ app.use(checkBaggage);      │
│ (validación de datos) │ objetos no permitidos.                      │                             │
├───────────────────────┼─────────────────────────────────────────────┼─────────────────────────────┤
│ Migraciones           │ Control de migraciones verifica si puede    │ app.use(checkVisa);         │
│ (autorización)        │ salir del país.                             │                             │
├───────────────────────┼─────────────────────────────────────────────┼─────────────────────────────┤
│ Puerta de embarque    │ Pasajero entrega tarjeta de embarque y      │ app.get("/vuelo", handler); │
│ (endpoint final)      │ aborda el avión.                            │                             │
└───────────────────────┴─────────────────────────────────────────────┴─────────────────────────────┘
*/
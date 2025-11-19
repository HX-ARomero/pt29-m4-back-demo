// Servidor en JavaScript "vanilla":
const http = require("http");
const url = require("url");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOST = process.env.HOST ? process.env.HOST : "localhost";

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

// Rutas:
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  // Logger:
  console.log(`${method} ${pathname} [${new Date().toISOString()}]`);

  // Ruta raíz
  if (pathname === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("¡Hola! Este es un servidor básico en Node.js vanilla 🚀");
  }

  // Listar todos los personajes:
  if (pathname === "/personajes" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    return res.end(JSON.stringify(personajes));
  }

  // Buscar personaje por id: "/personajes/:id":
  if (pathname.startsWith("/personajes/") && method === "GET") {
    const id = pathname.split("/")[2];
    const personaje = personajes.find((p) => p.id === id);

    if (personaje) {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      return res.end(JSON.stringify(personaje));
    } else {
      res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
      return res.end(JSON.stringify({ error: "Personaje no encontrado" }));
    }
  }

  // Si ninguna ruta coincide:
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404 - Ruta no encontrada");
});

// Server:
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});

//* ➡️ JavaScript "vanilla" significa JavaScript puro, sin frameworks ni librerías adicionales.
//     Ejemplo: código que corre en el navegador sin React, Vue, jQuery, etc.
//* ➡️ Node.js "vanilla" se usa (un poco más coloquialmente) para decir Node.js puro.
//     Usando solo los módulos nativos (http, fs, url, etc.) sin Express, Koa, Nest, Hapi, etc.

//* URL
//* http://www.ejemplo.com:3000/personajes/id?id=123&color=azul
//* http://www.ejemplo.com:3000/personajes?id=1&nombre=Homero#detalles
// ┌──────────┬───────────────────┬──────┬───────────────────────────────┬──────────────────────┬───────────┐
// │ Protocolo│       Host        │Puerto│    Path (ruta en servidor)    │     Query string     │ Fragmento │
// ├──────────┼───────────────────┼──────┼───────────────────────────────┼──────────────────────┼───────────┤
// │  https   │ www.ejemplo.com   │ 3000 │    /personajes/id             │  ?id=123&color=azul  │ #detalles │
// └──────────┴───────────────────┴──────┴───────────────────────────────┴──────────────────────┴───────────┘
// Path: A su vez se divide en segmentos, separados por "/".
// Fragmento (hash / anchor): Es una referencia interna dentro del recurso (ej: saltar a una sección de la página).
//   No se envía al servidor → solo lo interpreta el navegador.
//   Sirve para apuntar a una parte específica dentro de un documento (por ejemplo, un encabezado en una página HTML).
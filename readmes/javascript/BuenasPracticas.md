# 🧠 Buenas Prácticas de Programación

[Volver](../../README.md)

Un compendio de principios, guías y ejemplos para escribir **código limpio, mantenible y profesional**.

- No es necesario aplicar todos estos principios desde el primer día.
- La clave está en adoptarlos de forma gradual, incorporando uno a la vez hasta que se vuelvan parte natural de tu forma de programar.
- Incluso aplicar solo uno correctamente marcará una gran diferencia en la calidad de nuestro código.

Éxitos!!! 👍

---

## 🧩 1. Principios Fundamentales

### 🔁 DRY — _Don’t Repeat Yourself_ (No te Repitas)

Evita duplicar código. Si algo se repite, refactorízalo en una función reutilizable:

```js
// ❌ Mal
const area1 = width1 * height1;
const area2 = width2 * height2;

// ✅ Bien
function calcularArea(width, height) {
  return width * height;
}
```

---

### 🧘 KISS — _Keep It Simple, Stupid_ (Mantenlo Simple)

Elige la solución más simple que cumpla el objetivo:

```js
// ❌ Mal
if (user && user.isLogged === true && user.role === "admin") {
  grantAccess();
}

// ✅ Bien
if (user?.isLogged && user.role === "admin") grantAccess();
```

---

### 🚫 YAGNI — _You Aren’t Gonna Need It_ (No lo necesitas)

No implementes funcionalidades “por si acaso”:

```js
// ❌ Mal — función innecesaria
function futureFeature() {
  // algún día la usaré...
}

// ✅ Bien
// Implementa solo lo que tu sistema necesita ahora
```

---

### ⚙️ SRP — _Single Responsibility Principle_ (Principio de Responsabilidad Única)

Cada módulo o función debe tener **una sola responsabilidad**.

```js
// ❌ Mal — mezcla lógica de negocio y de presentación
function saveUserAndShowMessage(user) {
  db.save(user);
  alert("Usuario guardado");
}

// ✅ Bien — responsabilidades separadas
function saveUser(user) {
  db.save(user);
}
function showSuccessMessage() {
  alert("Usuario guardado");
}
```

---

### 🧱 OCP — _Open/Closed Principle_ (Principio Abierto/Cerrado)

El código debe estar **abierto a extensión**, pero **cerrado a modificación**.

```js
// ❌ Mal
function calcularPrecio(tipo) {
  if (tipo === "regular") return 100;
  if (tipo === "vip") return 200;
}

// ✅ Bien — extensible
const estrategias = {
  regular: () => 100,
  vip: () => 200,
};
function calcularPrecio(tipo) {
  return estrategias[tipo]?.() ?? 0;
}
```

---

### 🧬 LSP — _Liskov Substitution Principle_ (Principio de Sustitución de Liskov)

Las subclases deben poder reemplazar a sus clases base sin romper el código.

```js
class Ave {
  volar() {}
}

class Pinguino extends Ave {
  // ❌ Mal: viola el principio, un pingüino no puede volar!!!
  volar() {
    throw new Error("No puedo volar");
  }
}
```

---

### 🧩 ISP — _Interface Segregation Principle_ (Principio de Segregación de Interfaces)

Prefiere **interfaces pequeñas y específicas**.

```js
// ❌ Mal
interface Trabajador {
  programar();
  diseñar();
  testear();
}

// ✅ Bien
interface Programador {
  programar();
}
interface Diseñador {
  diseñar();
}
```

---

### 🧠 DIP — _Dependency Inversion Principle_ (Principio de Inversión de Dependencias)

Depende de **abstracciones**, no de implementaciones concretas; es decir, manteniendo nuestras funcionalidades lo más reutilizables que sea posibles, de modo que no queden atadas a un solo fin.

```js
// ❌ Mal
class Report {
  constructor() {
    this.database = new MySQLDatabase();
  }
}

// ✅ Bien
class Report {
  constructor(database) {
    this.database = database;
  }
}
```

---

## ✨ 2. Estilo y Legibilidad

- Usa **nombres descriptivos y consistentes**.
- Evita **números mágicos**.
- Usa **constantes con nombres significativos**.
- Prefiere **funciones pequeñas** y claras.
- **Comenta el porqué**, no el qué.
- Preferentemente en Inglés.

```js
// ❌ Mal
if (user.age > 18) { ... }

// ✅ Bien
const LEGAL_AGE = 18;
if (user.age > LEGAL_AGE) { ... }
```

---

## 🧱 3. Diseño y Arquitectura

- **Divide y vencerás** (Divide and conquer): separa la lógica en módulos o capas independientes para mantener el código más ordenado y fácil de mantener.
  Este principio también puede aplicarse al proceso de planificación y desarrollo, abordando los proyectos en etapas pequeñas y manejables para avanzar de forma más eficiente.
- **Evita el acoplamiento fuerte.**
- **Aplica patrones de diseño** solo si aportan claridad.

```js
// ✅ Ejemplo: patrón Factory (Función Constructora)
function crearUsuario(tipo) {
  if (tipo === "admin") return new Admin();
  if (tipo === "guest") return new Guest();
}
```

---

## 🧮 4. Control de Flujo y Datos

- Valida siempre entradas externas.
- Usa _early returns_ para evitar anidaciones profundas.
- Elige la estructura de datos adecuada.

```js
// ❌ Mal
if (user) {
  if (user.isActive) {
    if (!user.isBanned) {
      login();
    }
  }
}

// ✅ Bien — early returns
if (!user || !user.isActive || user.isBanned) return;
login();
```

---

## 🧰 5. Testing y Calidad

- Escribe **tests unitarios**.
- Prueba **casos límite y de error**.
- Nombra los tests claramente.

```js
// ✅ Ejemplo
test("debería rechazar login con contraseña incorrecta", () => {
  const result = login("usuario", "claveErronea");
  expect(result).toBe(false);
});
```

---

## 🚦 6. Rendimiento y Seguridad

- ⚙️ No optimices prematuramente: primero asegurate de que el código funcione correctamente, incluso si la solución inicial es simple o poco eficiente (fuerza bruta).
  Luego, aplicá refactorización para mejorar el rendimiento sin alterar la funcionalidad.
- 🔁 Evita operaciones redundantes: minimiza consultas repetidas, bucles innecesarios o cálculos que puedan almacenarse temporalmente.
- 🔒 Protege la información sensible: utiliza variables de entorno (`.env`) para guardar credenciales, claves API y configuraciones privadas.

```js
// ❌ Mal — credenciales en código
const DB_PASSWORD = "12345";

// ✅ Bien
const DB_PASSWORD = process.env.DB_PASSWORD;
```

---

## 🧾 7. Documentación y Mantenimiento

- 🧩 Documenta funciones, clases y módulos públicos: explica su propósito, parámetros y comportamiento esperado.
- 📘 Manten un README.md claro y actualizado: debe describir cómo instalar, configurar y ejecutar el proyecto.
- 🔀 Usa Git de forma responsable: realiza commits atómicos (un cambio o funcionalidad por commit) y escribe mensajes descriptivos que expliquen el por qué del cambio, no solo el qué.

```bash
git commit -m "fix(auth): corregido error de login con token inválido"
```

---

## 👥 8. Trabajo en Equipo

- Usa ramas descriptivas: `feature/add-login`, `bugfix/fix-null-pointer`.
- Haz _code reviews_, que incluyan a todo el equipo para mantenerlos al tanto de novedades y funcionamiento general de la aplicación.
- Automatiza formateo y linting.

```bash
npm run lint
npm run test
```

---

## 🧭 9. Prácticas Modernas

- Usa **tipado estático o inferido** (TypeScript).
- Prefiere **funciones puras** e **inmutabilidad**.
- Aplica **map, filter, reduce** (programación declarativa) en lugar de bucles imperativos.

```js
// ✅ Ejemplo de función pura e inmutable
const incrementar = (x) => x + 1;
const nuevosValores = valores.map(incrementar);
```

### 👉 Pero... ¿Qué es una función pura?

- Una función pura es aquella que, dado el mismo conjunto de argumentos, siempre devuelve el mismo resultado y no produce efectos secundarios en el programa o en el entorno.
- En otras palabras: Su salida depende solo de su entrada, y no modifica nada fuera de ella.

#### ⚙️ Características principales

✅ 1. Determinismo:

- Siempre que se le pasen los mismos argumentos, devuelve el mismo resultado.

```js
function sum(a, b) {
  return a + b;
}

sum(2, 3); // siempre devuelve 5 al ser invocada con 2 y 3
```

🚫 2. Sin efectos secundarios:

- No cambia variables globales, no modifica objetos externos, no escribe archivos, ni interactúa con la red, consola o DOM.
- Es completamente predecible y aislada.

📦 3. Inmutabilidad:

- No altera sus argumentos ni estructuras de datos externas; si necesita cambiar algo, crea una copia.

🧩 Fácil de testear y razonar:

- Como no depende de factores externos, se puede probar fácilmente:
- Entrada (input) → Salida esperada (output)
- Sin necesidad de mocks o dependencias

💻 Ejemplo de función pura

```ts
function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(2, 3)); // 5
console.log(sum(2, 3)); // siempre 5
```

👉 Dado el mismo input (2, 3), siempre produce el mismo output (5).
No modifica nada fuera de su alcance.

⚠️ Ejemplo de función impura

```ts
let total = 0;

function addToTotal(value: number): number {
  total += value; // ❌ modifica una variable externa
  return total;
}
```

🔍 Problemas:

- Depende de una variable externa ("total").
- Su resultado cambia aunque el input sea el mismo:

```ts
addToTotal(5); // 5
addToTotal(5); // 10 ❌ diferente resultado con mismos argumentos, depende del valor de "total"
```

🧩 En resumen

```txt
----------------------------------------------------------------------
| Propiedad                         | Función pura  | Función impura |
----------------------------------------------------------------------
| Mismo input → mismo output        |      ✅       |       ❌      |
| Sin efectos secundarios           |      ✅       |       ❌      |
| No modifica variables externas    |      ✅       |       ❌      |
| Fácil de testear                  |      ✅       |       ⚠️      |
----------------------------------------------------------------------

```

---

## 📘 10. Bonus: Principios de Oro

| Principio      | Descripción breve                                |
| -------------- | ------------------------------------------------ |
| DRY            | Evita duplicar código                            |
| KISS           | Mantén las cosas simples                         |
| YAGNI          | No implementes lo que no necesitas               |
| SOLID          | 5 principios clave de diseño orientado a objetos |
| SoC            | Separa responsabilidades                         |
| Clean Code     | Legibilidad > complejidad                        |
| Test early     | Prueba desde el principio                        |
| Refactor often | Mejora continuamente                             |

[Aquí, un resumen con ejemplos de los principios SOLID](./SOLID.md)

---

## 💡 **Consejo final:**

> Escribí tu código como si otra persona fuera a leerlo… incluso tu yo en el futuro, porque en poco tiempo olvidarás lo que hiciste 😅.

> Procurá que sea legible, predecible y sin sorpresas.

---

[Volver](../../README.md)

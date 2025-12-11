# TRIVIAS

[Volver a Inicio](../../README.md)

## 1- ¿Qué devuelve la siguiente función?

```js
function myFunction() {
  console.log(firstName);
  console.log(lastName);
  var firstName = "Bart";
  let lastName = "Simpson";
}

myFunction();
```

- A: "Bart" y undefined
- B: "Bart" y ReferenceError
- C: ReferenceError y "Simpson"
- D: undefined y ReferenceError
<details>
  <summary>Respuesta correcta...</summary>
D: undefined - Cannot access 'lastName' before initialization

Explicación:

- Dentro de la función, primero declaramos la variable firstName con la palabra reservada var. Esto significa que la variable se eleva (el espacio de memoria se configura durante la fase de creación. Hace referencia al termino hoisting) con el valor predeterminado de "undefined", hasta que realmente llegamos a la línea donde definimos la variable. Aún no hemos definido la variable en la línea donde intentamos registrar la variable firstName, por lo que aún mantiene el valor de undefined.
- Las variables con la palabra clave let (y const) se elevan, pero a diferencia de var, no se inicializan. No son accesibles antes de la línea que las declaramos (inicializamos). Esto se llama la "zona muerta temporal". Cuando intentamos acceder a las variables antes de que se declaren, JavaScript lanza un ReferenceError.
</details>

## 2- ¿Cuál es el resultado de lo siguiente?

```js
const resultado = 4 + 2 + "8";
```

- A: 14
- B: "428"
- C: "68"
- D: 68
<details>
  <summary>Respuesta correcta...</summary>
C: "68"

Explicación:

- El 4 y el 2, en este caso, se comportan como números enteros, y el "8" se composrta como una cadena.-
- Por lo tanto 4 + 2 es igual a 6. El resultado de 6 + "8" es "68".
- El cambio de tipo de dato por parte por parte de JavaScript se llama "Casteo de Dato".
</details>

## 📚 REPASO: HOISTING

- Hoisting significa que JavaScript “eleva” (mueve hacia arriba) las declaraciones de variables y funciones al inicio de su ámbito (scope) antes de ejecutar el código.
- En otras palabras, podés usar algo antes de declararlo, aunque con matices según el tipo de declaración.

### 🧩 1. Hoisting con funciones

- Las declaraciones de función se elevan completamente.
- ✅ Ejemplo válido:

```js
saludar(); // 👉 Funciona, aunque la función está declarada después

function saludar() {
  console.log("Hola!");
}
```

📌 Explicación:

- Durante la fase de compilación, JS mueve la declaración completa de la función al principio del ámbito.

### 🧩 2. Hoisting con variables

#### 🔸 var

- Las variables declaradas con var se elevan, pero solo su declaración, no su valor asignado.
- ⚠️ Ejemplo:

```js
console.log(x); // 👉 undefined (no error)
var x = 5;
```

📌 JS lo interpreta internamente así:

```js
var x; // "declarada" arriba (hoisting)
console.log(x);
x = 5; // "asignada" después
```

#### 🔸 let y const

- Las variables declaradas con let o const también se elevan, pero no se inicializan, y quedan en la llamada “zona muerta temporal” (TDZ) hasta su declaración real.
- 🚫 Ejemplo (error):

```js
console.log(y); // ❌ ReferenceError
let y = 10;
```

📌 Explicación: JS sabe que y existe, pero no podés acceder a ella antes de su línea de declaración.

🧩 3. Resumen
| Tipo | ¿Se eleva? | ¿Se inicializa? | Valor antes de declaración | Ejemplo |
| ---------- | --------------- | --------------- | -------------------------- | ------------------------------------------ |
| `var` | ✅ Sí | 🚫 No | `undefined` | `console.log(a); var a = 3;` → `undefined` |
| `let` | ✅ Sí | 🚫 No (TDZ) | ❌ Error | `console.log(b); let b = 3;` → Error |
| `const` | ✅ Sí | 🚫 No (TDZ) | ❌ Error | `console.log(c); const c = 3;` → Error |
| `function` | ✅ Sí (completa) | ✅ Sí | ✅ OK | `saludo(); function saludo(){}` |

### 🧩 4. Hoisting en funciones expresadas

⚠️ Atención con este tema:

```js
saludo(); // ❌ TypeError
var saludo = function () {
  console.log("Hola");
};
```

📌 Aquí no se eleva la función, solo la variable saludo (como undefined).

🧩 5. En resumen

- 🧾 Hoisting = “elevación de declaraciones”, no de asignaciones.
  - 🔹 function → se eleva completa ✅
  - 🔹 var → se eleva, pero se inicializa como undefined ⚠️
  - 🔹 let / const → se elevan, pero no se pueden usar antes ❌

## 📚 REPASO: FUNCIÓN DECLARADA Vs FUNCIÓN EXPRESADA

### 🧩 1. Función declarada (Function Declaration)

- ➡️ Se define con la palabra clave function al inicio de la sentencia.
- ➡️ No llevan punto y coma (";") al finalizar su declaración.

```js
function saludar() {
  console.log("Hola!");
}
```

#### 🔹 Características:

- ✅ Se eleva completamente (hoisting).
- ✅ Se puede usar antes o después de su definición.
- 🔹 Tiene nombre propio.
- 🔹 Ideal para funciones “globales” o reutilizables.

📘 Ejemplo:

```js
saludar(); // ✅ Funciona

function saludar() {
  console.log("Hola desde una función declarada!");
}
```

### 🧩 2. Función expresada (Function Expression)

- ➡️ La función se asigna a una variable, que puede ser var, let o const.
- ➡️ Finalizan con punto y coma (";") al finalizar su declaración.

```js
const saludar = function () {
  console.log("Hola!");
};
```

#### 🔹 Características:

- ⚠️ No se eleva la definición, solo la variable.
- ❌ No se puede usar antes de declararla.
- 🔹 Puede ser anónima (sin nombre) o nombrada.
- 🔹 Se trata como valor (puede pasarse como parámetro, guardarse, etc.).

📘 Ejemplo:

```js
saludar(); // ❌ Error: Cannot access 'saludar' before initialization

const saludar = function () {
  console.log("Hola desde una función expresada!");
};
```

### 🧩 3. Diferencias clave

| Característica           | Declarada              | Expresada                                         |
| ------------------------ | ---------------------- | ------------------------------------------------- |
| **Hoisting**             | ✅ Se eleva completa   | ⚠️ Solo la variable (no la definición)            |
| **Uso antes de definir** | ✅ Permitido           | ❌ Error                                          |
| **Sintaxis**             | `function nombre() {}` | `const nombre = function() {}`                    |
| **Ámbito**               | Función o bloque       | Función o bloque                                  |
| **Típico uso**           | Funciones globales     | Callbacks, funciones anónimas, expresiones cortas |

### 🧩 4. Ejemplo comparativo

```js
// --- Declarada ---
saludarDeclarada(); // ✅ Funciona

function saludarDeclarada() {
  console.log("Hola desde la declarada");
}

// --- Expresada ---
saludarExpresada(); // ❌ ReferenceError

const saludarExpresada = function () {
  console.log("Hola desde la expresada");
};
```

### 🧠 Extra: Arrow Functions (funciones flecha)

- Son una forma moderna de función expresada:

```js
const saludar = () => console.log("Hola!");
```

📌 Tampoco no se elevan, ni tienen su propio this, lo que las hace útiles en callbacks y clases.

## 📚 REPASO: CONVERSIÓN DE TIPO DE DATO

### 🔹 1. Casteo de dato (type casting)

- El casteo es un término propio de lenguajes tipados estáticamente (como C, Java o TypeScript).
- Consiste en decirle explícitamente al compilador que trate un valor como si fuera de otro tipo:
- En TypeScript:

```ts
let input = "123";
let num = input as unknown as number; // "casteo" de tipo en tiempo de compilación
```

👉 Pero esto solo cambia el tipo “a nivel de compilador”, no el valor real en tiempo de ejecución.

### 🔹 2. Conversión de tipo (type conversion)

- En JavaScript (que es dinámico), lo que realmente ocurre es una conversión de valores.
- El motor cambia un tipo a otro tipo real en tiempo de ejecución, por ejemplo:

```js
Number("123"); // → 123
String(123); // → "123"
Boolean(0); // → false
```

👉 Eso sí transforma el valor en memoria.

### 🔹 3. Conversión implícita (type coercion)

- Y además, JavaScript tiene algo aún más “automático”: la coerción de tipo.
- Es cuando el propio lenguaje convierte los valores por nosotros:

```js
"5" * 2; // → 10   (convierte "5" a número)
"5" + 2; // → "52" (convierte 2 a string)
```

### 🧩 En resumen:

| Concepto             | Nombre correcto en JS | Cuándo ocurre                                              | Ejemplo          |
| -------------------- | --------------------- | ---------------------------------------------------------- | ---------------- |
| Conversión explícita | ✅ _Type conversion_  | Cuando vos lo hacés con `Number()`, `String()`...          | `Number("42")`   |
| Conversión implícita | ✅ _Type coercion_    | Cuando JS lo hace automáticamente                          | `"5" * 2` → `10` |
| Casteo de dato       | ⚠️ _Incorrecto en JS_ | Solo en lenguajes estáticos (C, Java, TS a nivel de tipos) | —                |

##💬 En resumen:

👉 En JavaScript no se dice “casteo de dato”, sino “conversión de tipo” (si lo hacemos nosotros) o “coerción de tipo” (si la hace JS automáticamente).

[Volver a Inicio](../../README.md)

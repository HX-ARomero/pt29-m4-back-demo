# 🧠 ¿Qué son los “parámetros inteligentes”?

[Volver](./JavaScript.md)

El término no es oficial del lenguaje, pero se usa para referirse a formas avanzadas y seguras de manejar parámetros de funciones en JavaScript, aprovechando:

- Valores por defecto
- Desestructuración de objetos y arrays
- Parámetros rest (...rest)
- Combinaciones de los anteriores

El objetivo es:

- Evitar errores cuando faltan argumentos.
- Hacer el código más legible y mantenible.
- Permitir funciones más flexibles.

## ⚙️ 1. Parámetros con valores por defecto

### ⚠️ Sin valor por defecto:

```js
function crearUsuario(nombre, edad) {
  console.log(`Usuario: ${nombre}, Edad: ${edad}`);
}

crearUsuario(); // Usuario: undefined, Edad: undefined ❌
```

➡️ Problema: si olvidas pasar un argumento, tendrás undefined y posibles errores en validaciones o concatenaciones.

### ✅ Uso inteligente:

```js
function crearUsuario(nombre = "Anónimo", edad = 18) {
  console.log(`Usuario: ${nombre}, Edad: ${edad}`);
}

crearUsuario("Ariel", 25); // Usuario: Ariel, Edad: 25
crearUsuario(); // Usuario: Anónimo, Edad: 18
```

## ⚙️ 2. Desestructuración en parámetros (objetos)

### ⚠️ Sin desestructuración:

```js
function configurarApp(opciones) {
  console.log(`Tema: ${opciones.tema}, Idioma: ${opciones.idioma}`);
}

configurarApp(); // ❌ TypeError: Cannot read properties of undefined
```

➡️ Problema: sin un objeto por defecto (= {}), si no pasas argumentos, se rompe la función.

### ✅ Uso inteligente:

```js
function configurarApp({ tema = "oscuro", idioma = "es" } = {}) {
  console.log(`Tema: ${tema}, Idioma: ${idioma}`);
}

configurarApp({ tema: "claro" }); // Tema: claro, Idioma: es
configurarApp(); // Tema: oscuro, Idioma: es
```

## ⚙️ 3. Parámetros rest (...args)

### ⚠️ Sin rest:

```js
function sumar(n1, n2, n3) {
  return n1 + n2 + n3;
}

console.log(sumar(1, 2)); // NaN ❌ (porque n3 es undefined)
```

➡️ Problema: la función falla o produce resultados inválidos si no recibe el número exacto de argumentos.

### ✅ Uso inteligente:

```js
function sumar(...numeros) {
  return numeros.reduce((a, b) => a + b, 0);
}

console.log(sumar(1, 2, 3, 4)); // 10
console.log(sumar()); // 0
```

## ⚙️ 4. Combinación inteligente

### ✅ Ejemplo completo:

```js
function crearProducto({
  nombre = "Sin nombre",
  precio = 0,
  categorias = [],
  ...extra // resto de propiedades opcionales
} = {}) {
  console.log({ nombre, precio, categorias, extra });
}

crearProducto({ nombre: "Laptop", precio: 1000, stock: 5 });
crearProducto();
```

Salida:

```bash
{ nombre: 'Laptop', precio: 1000, categorias: [], extra: { stock: 5 } }
{ nombre: 'Sin nombre', precio: 0, categorias: [], extra: {} }
```

➡️ Ventaja: la función es robusta, incluso si se llama sin argumentos o con más propiedades de las esperadas.

## 💥 Resumen de los problemas comunes sin “parámetros inteligentes”

| Problema                            | Ejemplo                 | Consecuencia                                         |
| ----------------------------------- | ----------------------- | ---------------------------------------------------- |
| Argumentos faltantes                | `crearUsuario()`        | `undefined` en valores críticos                      |
| Parámetros tipo objeto sin defaults | `configurarApp()`       | TypeError: no se puede leer propiedad de `undefined` |
| Número variable de args sin `rest`  | `sumar(1, 2)`           | NaN o cálculos erróneos                              |
| Falta de desestructuración          | `user.nombre`           | Código más largo y propenso a errores                |
| Sin valores por defecto             | `if (!edad) edad = 18;` | Lógica repetida e innecesaria                        |

## 🧩 Conclusión

Los parámetros inteligentes hacen que las funciones en JavaScript sean:

- Más seguras (evitan errores por undefined).
- Más flexibles (aceptan distintas formas de invocación).
- Más limpias y legibles (menos condicionales dentro del cuerpo).

[Volver](./JavaScript.md)

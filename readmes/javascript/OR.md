# Operador Lógico OR (||)

[Volver](../../README.md)

## Tabla de Verdad de OR (||)

```txt
| A     | B      | A || B | Explicación                  |
| ----- | ------ | ------ | ---------------------------- |
| true  | true   | true   | Ambos son verdaderos.        |
| true  | false  | true   | Uno de los dos es verdadero. |
| false | true   | true   | Uno de los dos es verdadero. |
| false | false  | false  | Ambos son falsos.            |
```

📗 Ejemplo:

```js
console.log(0 || "Hola"); // "Hola"
```

- Descripción:
  - JS evalúa 0 → valor falsy.
  - Evalúa el segundo operando "Hola".
  - Como "Hola" es truthy, el operador devuelve ese valor.
  - Resultado final: "Hola".

[Volver](../../README.md)

# Operador Lógico NOT (!)

[Volver](../../README.md)

## Tabla de Verdad de NOT (!):

```txt
| A     | !A    | Explicación                    |
| ----- | ----- | ------------------------------ |
| true  | false | Invierte el valor booleano.    |
| false | true  | Invierte el valor booleano.    |
```

📗 Ejemplo:

```js
console.log(!true); // false
console.log(!0); // true
console.log(!""); // true
```

## Descripción:

- ! invierte el valor lógico.
- Cualquier truthy se convierte en false.
- Cualquier falsy se convierte en true.

## Doble NOT (!!)

- El doble operador de negación !! se usa para convertir cualquier valor en su equivalente booleano.
- Ejemplo:

```js
console.log(!!"Hola"); // true
console.log(!!0); // false
console.log(!!null); // false
console.log(!![]); // true
```

- Descripción:
  - El primer ! invierte el valor.
  - El segundo ! vuelve a invertirlo, dejando el booleano equivalente original.
  - En la práctica, !!valor es una forma rápida de hacer Boolean(valor).

📘 Ejemplo de uso práctico:

```js
let usuario = "Ariel";
if (!!usuario) {
  console.log("Usuario válido");
}
```

[Volver](../../README.md)

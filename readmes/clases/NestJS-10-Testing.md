# TESTING

[Volver a Inicio](../../README.md)

> El testing es un proceso fundamental para asegurar que las aplicaciones funcionen correctamente, permitiendo verificar el comportamiento de los componentes de manera aislada y asegurando la calidad del código. NestJS facilita la realización de pruebas utilizando Jest como framework de testing por defecto, pero puede integrarse con otros frameworks de pruebas si se desea.

## A. Tipos de Testing según la automatización

- Manual: Una persona realiza las pruebas siguiendo un plan.
- Automatizado: Scripts y herramientas ejecutan las pruebas.
  - Herramientas web comunes: Jest, Mocha, Cypress, Playwright, Selenium.

### Beneficios del Testing Automatizado

<div style="text-align: center;">
  <img src="../assets/10-02.png" style="width: 700px;" alt="Testing Automatizado">
</div>

## B. Tipos de Testing según el alcance

### 1. Unit Testing (Pruebas Unitarias):

Se enfocan en probar unidades de código individuales, como controladores o servicios, en aislamiento.
En NestJS, puedes utilizar Mocks y Stubs para simular dependencias y concentrarte en la lógica de la unidad que estás probando.
Se realizan utilizando las clases reales o mediante el uso de inyecciones falsas para reemplazar dependencias.

### 2. Integration Testing (Pruebas de Integración):

Estas pruebas verifican cómo interactúan varios módulos o componentes entre sí.
En NestJS, se utiliza un test module para simular el entorno del módulo real y se prueban las interacciones entre diferentes dependencias (por ejemplo, servicios y controladores).
A menudo se configuran con bases de datos en memoria como SQLite o MongoDB in-memory para pruebas más rápidas y realistas.

### 3. End-to-End Testing (E2E):

Este tipo de pruebas se enfoca en probar el sistema completo, emulando la interacción del usuario con la API.
Se utiliza una instancia real del servidor NestJS, para verificar que todo el flujo de la aplicación funciona correctamente.
Se emplea supertest junto con Jest para hacer peticiones HTTP y verificar las respuestas.

### 4. Aceptación / Usuario Final (Tests Manuales / De uso)

El cliente o usuarios validan si cumple con lo acordado.

## HERRAMIENTAS DE TESTING EN NestJS

- Jest: Framework por defecto para realizar pruebas en NestJS. Es potente, flexible y ampliamente utilizado en el ecosistema de Node.js.
- Supertest: Utilizado en pruebas de integración y E2E para realizar peticiones HTTP y validar respuestas.
- Test Utilities de NestJS: La función Test.createTestingModule() permite crear un entorno de prueba que emula los módulos de la aplicación real para pruebas unitarias e integradas.

<div style="text-align: center;">
  <img src="../assets/10-03.png" style="width: 700px;" alt="Tipos de Testing">
</div>

## Testing en NestJS

### Primero, un ejemplo...

- Queremos testear el funcionamiento de un Cajero Automático
- ¿Qué factores debemos descartar?

<div style="text-align: center;">
  <img src="../assets/10-04.png" style="width: 700px;" alt="Tipos de Testing">
</div>

### ¿Entonces qué lógica seguiremos en NestJS?

- Cada capa se testea aislada del resto.
  - Capas en NestJS:
    - Controller → Service → Repository → Database.
    - Tener en cuenta la responsabilidad de cada Capa para confeccionar los Tests.
- Lo que no se está testeando, se mockea.

## Beneficios del Testing en NestJS

- Confiabilidad: Garantiza que los componentes funcionen como se espera a lo largo del tiempo.
- Mantenimiento: Facilita la identificación y corrección de errores, permitiendo que el código sea más fácil de mantener.
- Documentación: Las pruebas sirven como documentación viviente del comportamiento de la aplicación.
- Prevención de Regresiones: Ayuda a evitar que nuevas actualizaciones o cambios en el código introduzcan errores no deseados.

## 🧠 Concepto de Caja negra (Black Box)

- El concepto de caja negra significa que no nos importa cómo funciona algo por dentro, sino:
  - Qué entra (inputs)
  - Qué sale (outputs)
  - Qué comportamiento observable tiene
- No analizamos la implementación interna, solo verificamos que:
  - Dada una entrada determinada, la salida sea la esperada.

### 📌 En testing

- Cuando testeamos como caja negra:
- No miramos el código interno
- No dependemos de variables, funciones privadas o lógica interna
- Probamos el sistema como lo usaría un usuario o consumidor

### 🧪 Ejemplo:

```txt
signIn(email, password) → token válido
```

- No importa:
- si usa bcrypt
- si consulta la base de datos
- cómo construye el token

<div style="text-align: center;">
  <img src="../assets/10-05.png" style="width: 700px;" alt="Tipos de Testing">
</div>

[Volver a Inicio](../../README.md)

# Nest JS - 🌐 Backend Architecture

[Volver a Inicio](../../README.md)

## Links útiles

- [Status Code - Cats](https://http.cat/)
- [Status Code - Dogs](https://http.dog/)
- [LucidChart - Crear Diagrama Entigad Relación](https://www.lucidchart.com)
- [Ejemplo de Tablas en Google Sheet](https://docs.google.com/spreadsheets/d/1y75SnUlawaYE0MvD3oBejBBkqcqQAoFn5wgRcvNHMGk/edit?gid=0#gid=0)
- [Generador UUID Versión-4](https://www.uuidtools.com/v4)

## Breve historia del Backend Web

### ➡️1. Los comienzos (1990–1995)

- La web nace con Tim Berners-Lee, científico británico creador de la World Wide Web y páginas totalmente estáticas.
  - [ITCorp](https://itcorp.com/)
  - [TIC.com](https://www.tic.com/index.html)
  - [SpaceJam](https://www.spacejam.com/1996/jam.htm)
- Los servidores solo enviaban archivos HTML y CSS, sin lógica.
- Aparecen las primeras necesidades de generar contenido dinámico → nace CGI (Common Gateway Interface).
- Los scripts CGI se escribían usualmente en Perl, C o Shell.

### ➡️2. La era de los lenguajes del lado del servidor (1995–2005)

- 1995 — PHP
  - Nace PHP, pensado específicamente para crear páginas dinámicas.
  - Combina HTML + código embebido.
- 1995 — Java + Servlets
  - Java introduce Servlets y luego JSP (JavaServer Pages), permitiendo aplicaciones más grandes y estructuradas.
- 1995 — JavaScript (del lado del cliente…)
  - Inicialmente solo para navegadores, pero luego influirá enormemente en el backend.
- 1996 — ASP (Microsoft)
  - Microsoft lanza Active Server Pages, que evoluciona en ASP.NET en 2002.
- Bases de datos
  - Se popularizan MySQL, PostgreSQL, Oracle, SQL Server.
  - Backend = servidor + lenguaje + base de datos.

### ➡️3. Arquitecturas más complejas (2005–2010)

- Se generaliza el modelo cliente-servidor con AJAX.
- Aparecen frameworks web que ordenan el backend:
  - Ruby on Rails (2005) — impulsó la filosofía “con convención, no configuración”.
  - Django (2005) en Python.
  - Laravel (2011) pero entra fuerte más adelante.
- Se empieza a hablar de APIs REST y servicios reutilizables.

### ➡️4. El gran cambio: JavaScript llega al servidor (2009 en adelante)

- 2009 — Node.js
  - Gracias a Ryan Dahl, JavaScript puede ejecutarse en el servidor.
  - Modelo event-driven, no bloqueante → ideal para miles de conexiones.
  - Cambia la industria: un mismo lenguaje en front y backend.
- Ecosistema Node
  - Frameworks como Express, NestJS, Koa, etc.

### ➡️5. Microservicios, contenedores y la nube (2010–2020)

- Backend empieza a dividirse en servicios pequeños e independientes.
- Se vuelve popular el uso de:
  - Docker (2013): Creación de Imágenes y Contenedores independientes.
  - Kubernetes (2014): Plataforma de código abierto diseñada para orquestar contenedores.
  - Serverless (AWS Lambda 2014): Modelo de desarrollo en el que la nube se encarga de los servidores, escalado, disponibilidad, parches, etc y sólo se cobra el tiempo de ejecución, enfocado a microservicios.
- APIs REST se consolidan, y surge GraphQL (2015).

### ➡️6. Backend moderno (2020–hoy)

- Uso intensivo de:
  - Microservicios
  - APIs híbridas (REST, GraphQL, WebSockets)
  - Contenedores y despliegue en nubes como AWS (Amazon Web Services), Azure, GCP (Google Cloud Platform)
- Frameworks modernos que estructuran mejor los proyectos:
  - NestJS, FastAPI, Spring Boot, Laravel, AdonisJS
- Auge del edge computing (Cloudflare Workers, Vercel Edge Functions), donde el procesamiento de datos se realiza cerca de donde ocurren las cosas: cerca del usuario, del dispositivo, del sensor o de la fuente de datos..
- Integración de IA en servicios backend.

## Niveles de Abstracción en Backend

- JavaScript + Node.js → La base: lenguaje + runtime para correr JS en el servidor.
- TypeScript → Añade tipado estático y herramientas para organizar mejor el código.
  - Sin Middlewares.
  - Manejo manual de headers.
  - Ruteo manual completo.
  - Moyor control, más código.
  - [Ejemplo de Backend en Vanilla JavaScript](../demos/01-server_js/)
- Express → Framework minimalista que simplifica la creación de servidores HTTP.
  - Ruteo manual.
  - Middlewares.
  - Gran flexibilidad.
  - Menor estructura impuesta.
  - [Ejemplo de Backend con Express](../demos/02-server_express/)
- NestJS → Framework de alto nivel sobre Express/Fastify, modular y con arquitectura clara (inspirado en Angular).
  - Arquitectura modular.
  - Decoradores (Sintaxis especial que se apoya en metaprogramación).
  - Inyección de dependencias.
  - Middlewares, Pipes, Guards, Interceptores.
  - Basado en Express/Fastify.
  - [Ejemplo de Backend en Nest JS](../demos/03-server_nest/)

```txt
                ┌───────────┐
                │   NestJS  │
                └───────────┘
            ┌───────────────────┐
            │      Express      │
            └───────────────────┘
        ┌───────────────────────────┐
        │         TypeScript        │
        └───────────────────────────┘
    ┌───────────────────────────────────┐
    │          Node.js (runtime)        │
    │   + JavaScript (base del stack)   │
    └───────────────────────────────────┘
```

Resumen:

✔ Más arriba → Más abstracción, estructura y herramientas.

✔ Más abajo → Más control, pero más código repetitivo.

## Clases, Módulos y Servicios

Cada uno de estos niveles cumple un papel importante en la construcción de software escalable y mantenible:

- Las clases definen entidades y comportamientos
- Los módulos organizan el código en unidades lógicas
- Los servicios permiten la construcción de sistemas mas complejos

## Sistemas sin estado (stateless) y con estado (stateful)

### ➡️Stateless (Sin Estado)

Definición

- Un sistema o componente sin estado no guarda información alguna sobre las interacciones anteriores.
- Cada solicitud del cliente se trata de manera independiente y no tiene conocimiento del contexto o los datos de solicitudes previas.

Características

- Independencia de las Solicitudes: Cada solicitud se procesa de manera aislada, sin depender de ninguna otra.
- Escalabilidad: Al no mantener estado, es más sencillo distribuir la carga entre múltiples servidores.
- Facilidad de Implementación: Las operaciones sin estado son más fáciles de implementar y gestionar, ya que no hay necesidad de sincronizar estados entre servidores.

Ejemplos

- HTTP: Es un protocolo sin estado por diseño. Cada solicitud HTTP es independiente y no guarda información sobre solicitudes anteriores.
- REST: Las API RESTful son, por convención, sin estado. Cada llamada a la API debe contener toda la información necesaria para procesar la solicitud.

Ventajas

- Escalabilidad: Es más fácil escalar aplicaciones sin estado, ya que no es necesario mantener coherencia de estado entre diferentes instancias del servicio.

- Simplicidad: Menor complejidad en el manejo de sesiones y sincronización de estado.

Desventajas

- Redundancia: Puede haber redundancia de datos, ya que cada solicitud debe contener toda la información necesaria.
- Rendimiento: La repetición de información en cada solicitud puede incrementar la carga y el tiempo de procesamiento.

### ➡️Stateful (Con Estado)

Definición

- Un sistema o componente con estado guarda información sobre las interacciones anteriores.
- Esto permite que las solicitudes subsecuentes del cliente se procesen teniendo en cuenta el contexto y el historial de interacciones.

Características

- Dependencia de las Solicitudes: Las solicitudes pueden depender de datos o contexto de interacciones anteriores.
- Gestión de Sesiones: Necesita mecanismos para almacenar y gestionar el estado, como sesiones de usuario.
- Complejidad: Mayor complejidad en la implementación y mantenimiento, especialmente en entornos distribuidos.

Ejemplos

- Sockets: Una conexión de socket mantiene el estado entre el cliente y el servidor, permitiendo comunicación continua y bidireccional.
- Bases de Datos: Los sistemas de bases de datos transaccionales mantienen el estado de las transacciones para asegurar la consistencia y durabilidad de los datos.

Ventajas

- Contexto: Puede mantener contexto entre solicitudes, lo que es útil para aplicaciones que requieren seguimiento de estado, como aplicaciones de chat, juegos en línea, y comercio electrónico.
- Eficiencia: Puede ser más eficiente en algunos casos, ya que no necesita repetir la misma información en cada solicitud.

Desventajas

- Escalabilidad: Más difícil de escalar, ya que se debe gestionar y sincronizar el estado entre múltiples instancias.
- Complejidad: Mayor complejidad en el manejo de fallos, recuperación y consistencia del estado.

### Comparación

| Característica    | Stateless               | Stateful                     |
| ----------------- | ----------------------- | ---------------------------- |
| Dependencia       | Ninguna                 | Sí                           |
| Escalabilidad     | Alta                    | Baja/Moderada                |
| Gestión de Estado | No necesario            | Necesario                    |
| Complejidad       | Baja                    | Alta                         |
| Uso Común         | HTTP, REST              | Sockets, Bases de Datos      |
| Ejemplos          | API REST, Servicios Web | Aplicaciones de Chat, Juegos |

### Conclusión

> La elección entre una arquitectura sin estado y una con estado depende del tipo de aplicación y sus requisitos específicos. Las aplicaciones que requieren alta escalabilidad y simplicidad en la gestión de solicitudes suelen preferir una arquitectura sin estado. En cambio, las aplicaciones que necesitan mantener contexto y proporcionar interacciones continuas suelen optar por una arquitectura con estado.

> Ambos enfoques tienen sus ventajas y desventajas, y a menudo se utilizan en combinación, dependiendo de las necesidades particulares del sistema o aplicación en desarrollo.

## Protocolos comunes en la interacción cliente-servidor

### ➡️TCP/IP (Transmission Control Protocol / Internet Protocol)

Descripción

- TCP/IP es el conjunto de protocolos de comunicación fundamental para la transmisión de datos en redes de computadoras, especialmente en Internet.
- TCP se encarga de dividir los datos en paquetes más pequeños, asegurando que se entreguen de forma fiable y en el orden correcto. IP se ocupa de direccionar y enrutar estos paquetes a través de la red.

Características

- Confiabilidad: TCP proporciona control de errores y garantiza que los paquetes de datos lleguen en el orden correcto.
- Orientado a Conexión: Establece una conexión antes de transmitir datos.
- Fragmentación y Reensamblaje: IP divide los datos en fragmentos manejables y los reensambla en el destino.
- Escalabilidad: Puede manejar redes de diferentes tamaños, desde una pequeña red local hasta Internet.

Usos Comunes

- Navegación web
- Transferencia de archivos
- Correo electrónico
- Servicios de streaming y VoIP

### ➡️WebSocket

Descripción

- WebSocket es un protocolo de comunicación bidireccional que permite la comunicación en tiempo real entre clientes y servidores a través de una conexión persistente.
- A diferencia de HTTP, que es un protocolo basado en solicitudes y respuestas, WebSocket permite que ambos extremos de la conexión envíen datos en cualquier momento.

Características

- Bidireccional: Permite que el cliente y el servidor envíen datos de forma independiente.
- Persistente: La conexión se mantiene abierta, reduciendo la sobrecarga de establecimiento de conexiones múltiples.
- Baja Latencia: Ideal para aplicaciones en tiempo real que requieren una comunicación rápida y eficiente.

Usos Comunes

- Aplicaciones de chat y mensajería
- Juegos en línea
- Actualizaciones de mercado financiero en tiempo real
- Aplicaciones de colaboración en tiempo real, como editores de texto compartidos

### ➡️FTP (File Transfer Protocol)

Descripción

- FTP es un protocolo utilizado para la transferencia de archivos entre un cliente y un servidor en una red TCP/IP.
- Permite a los usuarios subir, descargar, renombrar, mover y borrar archivos en un servidor remoto.

Características

- Autenticación: Requiere un nombre de usuario y contraseña para acceder al servidor.
- Modos de Transferencia: Puede operar en modo activo o pasivo para adaptarse a diferentes configuraciones de red.
- Control de Acceso: Permite diferentes niveles de acceso a archivos y directorios.

Usos Comunes

- Publicación y mantenimiento de sitios web
- Transferencia de archivos grandes entre sistemas
- Copias de seguridad remotas

### ➡️HTTP (Hypertext Transfer Protocol)

Descripción

- HTTP es el protocolo subyacente que define cómo se envían y reciben mensajes entre clientes y servidores web.
- Es el protocolo de comunicación principal de la World Wide Web.
- HTTP/1.1 es la versión más ampliamente usada, aunque HTTP/2 y HTTP/3 están ganando adopción por sus mejoras en eficiencia y velocidad.

Características

- Basado en Solicitud-Respuesta: El cliente envía una solicitud (GET, POST, PUT, DELETE) y el servidor responde con datos y códigos de estado.
- Sin Estado: Cada solicitud es independiente y no retiene información sobre solicitudes anteriores.
- Extensible: Permite el uso de encabezados para transmitir metadatos adicionales.

Usos Comunes

- Navegación web
- Comunicación entre aplicaciones a través de APIs RESTful
- Servicios de datos como JSON y XML

### ➡️HTTPS (HTTP Secure)

HTTPS es la versión segura de HTTP. Utiliza SSL/TLS para encriptar la comunicación entre el cliente y el servidor, asegurando que los datos transmitidos no puedan ser interceptados ni alterados por terceros.

### Ejemplo de Interacción Cliente-Servidor con Cada Protocolo

- TCP/IP: Un cliente envía una solicitud de conexión a un servidor a través de TCP. Una vez establecida la conexión, los datos se dividen en paquetes IP, que se envían a través de la red y se reensamblan en el destino.
- WebSocket: Un cliente inicia una conexión WebSocket enviando una solicitud HTTP estándar que se actualiza a WebSocket. Una vez establecida, la conexión permite la comunicación bidireccional en tiempo real hasta que se cierra.
- FTP: Un cliente FTP se conecta a un servidor FTP utilizando el puerto 21. Después de la autenticación, el cliente puede transferir archivos al servidor o descargar archivos desde él.
- HTTP/HTTPS: Un cliente web (navegador) envía una solicitud HTTP GET para obtener una página web. El servidor responde con el contenido de la página y un código de estado HTTP. Si se utiliza HTTPS, toda la comunicación se cifra para mayor seguridad.

> Estos protocolos son fundamentales para la operación de redes y aplicaciones modernas, y su comprensión es esencial para diseñar y mantener sistemas eficientes y seguros.

## ARQUITECTURA MONOLÍTICA VS MICROSERVICIOS

### ➡️Arquitectura Monolítica

Características

- Unidad Única: La aplicación completa es una única unidad indivisible.
- Despliegue: Todo el código se despliega a la vez.
- Escalabilidad: Escalabilidad vertical (añadiendo más recursos al servidor).
- Comunicación Interna: Todos los componentes se comunican internamente dentro de la misma aplicación.
  Ventajas
- Simplicidad Inicial: Fácil de desarrollar y desplegar al principio.
- Menor Complejidad: No necesita manejar la comunicación entre servicios.
- Rendimiento: Sin sobrecarga de red debido a la comunicación interna entre componentes.
- Fácil de Depurar: Todo el código está en un solo lugar, lo que facilita la depuración y el rastreo de errores.
  Desventajas
- Escalabilidad Limitada: Dificultad para escalar solo partes específicas de la aplicación.
- Dependencias Fuertes: Un cambio en una parte del sistema puede requerir desplegar toda la aplicación.
- Tiempos de Despliegue: Desplegar toda la aplicación puede ser lento y arriesgado.
- Dificultad para Mantener: Con el tiempo, el código puede volverse complejo y difícil de gestionar.

### ➡️Arquitectura de Microservicios

Características

- Componentes Independientes: La aplicación se divide en múltiples servicios independientes.
- Despliegue Independiente: Cada servicio puede ser desplegado de forma independiente.
- Escalabilidad: Escalabilidad horizontal (escalando individualmente los servicios según la demanda).
- Comunicación Interservicios: Los servicios se comunican entre sí a través de API, generalmente utilizando HTTP/HTTPS, gRPC, etc.
  Ventajas
- Escalabilidad Flexible: Los servicios pueden escalarse de manera independiente según las necesidades.
- Despliegue Independiente: Los servicios pueden ser desplegados, actualizados y reiniciados sin afectar a toda la aplicación.
- Resiliencia: Fallos en un servicio no necesariamente afectan a otros servicios.
- Tecnologías Diversas: Posibilidad de usar diferentes tecnologías y lenguajes de programación para diferentes servicios.
- Facilidad de Mantenimiento: Equipos pequeños y autónomos pueden gestionar servicios específicos, facilitando el mantenimiento y el desarrollo continuo.
  Desventajas
- Complejidad Inicial: Más complejo de configurar y desplegar inicialmente.
- Sobrecarga de Red: Comunicación interservicios añade latencia y posible sobrecarga de red.
- Gestión de Datos: Dificultades para gestionar transacciones y consistencia de datos entre servicios.
- Depuración Compleja: Depurar problemas que abarcan varios servicios puede ser más complicado.
- Costos Operacionales: Mayor necesidad de infraestructura y herramientas de orquestación (como Kubernetes) para gestionar los microservicios.

### Comparación General

Despliegue:

- Monolítica: Un solo despliegue para toda la aplicación.
- Microservicios: Despliegue independiente de cada servicio.

Escalabilidad:

- Monolítica: Escalabilidad vertical.
- Microservicios: Escalabilidad horizontal.

Dependencias:

- Monolítica: Fuertes dependencias internas.
- Microservicios: Servicios independientes con interfaces bien definidas.

Complejidad:

- Monolítica: Menos compleja inicialmente, pero puede volverse más difícil de mantener a medida que crece.
- Microservicios: Más compleja inicialmente, pero más fácil de escalar y mantener a largo plazo.

Ejemplo Práctico

- Monolítica: Una aplicación de comercio electrónico donde todos los módulos (autenticación, catálogo de productos, carrito de compras, pagos) están en una única base de código y se despliegan juntos.
- Microservicios: La misma aplicación de comercio electrónico dividida en servicios independientes: un servicio para autenticación, otro para el catálogo de productos, otro para el carrito de compras, y otro para pagos. Cada servicio puede ser desarrollado, desplegado y escalado de forma independiente.

### Conclusión

> La elección entre arquitectura monolítica y de microservicios depende de varios factores, como la complejidad de la aplicación, los requisitos de escalabilidad, los equipos de desarrollo y las preferencias tecnológicas. Las arquitecturas monolíticas son adecuadas para proyectos más simples o cuando se necesita un desarrollo rápido y sencillo, mientras que los microservicios son ideales para aplicaciones más grandes y complejas que requieren escalabilidad y flexibilidad.

## ESCALABILIDAD

### ➡️Escalabilidad Vertical

- El escalado vertical tiene mucho que ver con el **hardware del servidor** de la aplicación. Se consigue de una manera muy sencilla: **aumentando los recursos del servidor**. Principalmente, en lo que respecta a la capacidad de procesamiento, memoria y almacenamiento.
- Este tipo de escalado es bastante **sencillo de alcanzar**, ya que únicamente requiere una intervención en el hardware del equipo, aumentando los recursos o incluso cambiando completamente de servidor. Sin embargo, el beneficio que se puede llegar a obtener también es limitado.
- Ventajas de la escalabilidad vertical:
  - **Facilidad de implementación y configuración**. Gestionar un único servidor suele ser menos complejo que administrar una red de servidores interconectados, lo que puede facilitar la tarea para equipos más pequeños.
  - **No requiere un diseño específico en la aplicación y su arquitectura para funcionar**. Puede adaptarse a sistemas existentes sin modificaciones extensas.
  - **Puede ser más económico**. En algunos casos, la escalabilidad vertical puede ser más económica, especialmente en entornos donde agregar recursos a un servidor existente resulta más rentable que implementar una infraestructura horizontal más amplia.
  - **Mejora en el rendimiento**. Al proporcionar más recursos a un servidor existente, la escalabilidad vertical puede resultar en un aumento inmediato de rendimiento, ideal para aplicaciones que requieren una gran capacidad de procesamiento.
- Desventajas de la escalabilidad vertical
  - **Está limitado a la capacidad de un único servidor**. A medida que se escalan verticalmente, hay límites físicos para mejorar un solo servidor. Eventualmente, se alcanzará un punto en el que no se puedan agregar más recursos.
  - **No aporta beneficios en relación a la alta disponibilidad**. Añadir recursos a un servidor en funcionamiento puede requerir tiempos de inactividad o interrupciones temporales, lo que puede afectar la disponibilidad del servicio.

### ➡️Escalabilidad Horizontal

- Por su parte, la escalabilidad horizontal se consigue **aumentando el número de servidores que atienden una aplicación**. Para ello, un grupo de distintos servidores se configura para atender las peticiones de manera conjunta (es lo que se denomina **cluster**) y la carga de trabajo se distribuye entre ellos a través de un **balanceador**. Cada uno de esos servidores se conoce como **nodo** y el escalado se realiza simplemente agregando un nuevo nodo al cluster.
- Este escalado es bastante más potente, pero sin embargo **requiere una mayor configuración** para poder realizarse, no solamente para crear la red de servidores de un cluster, sino también realizando una arquitectura de aplicación, a nivel de software, capaz de adaptarse a este tipo de funcionamiento.
- Ventajas de la escalabilidad horizontal
  - **El escalado es prácticamente infinito**. La principal ventaja de la escalabilidad horizontal radica en su flexibilidad. Al agregar nuevos servidores según sea necesario, el sistema puede adaptarse a las demandas cambiantes sin interrupciones significativas.
  - **Permite alta disponibilidad**. Distribuir la carga entre varios servidores evita cuellos de botella y garantiza un rendimiento sostenible incluso en momentos de alta demanda.
  - **Permite un correcto balanceo de cargaentre los servidores**. Al permitir un correcto balance de carga entre los servidores, se asegura una distribución equitativa de la carga y se evita la sobrecarga de un servidor específico.
  - **Costos controlados**. Aunque puede haber costos iniciales asociados con la adición de servidores, la escalabilidad horizontal tiende a ser más rentable a largo plazo, ya que solo se utilizan recursos cuando son necesarios.
- Desventajas de la escalabilidad horizontal
  - **Requiere mayor configuración, que puede llegar a ser difícil de realizar**. La implementación de la escalabilidad horizontal a menudo requiere una arquitectura específica y una configuración cuidadosa para garantizar un rendimiento óptimo.
  - **Necesidad de un diseño específico**. Necesita que la aplicación esté construida de modo que soporte escalabilidad vertical, lo que puede requerir modificaciones en el diseño original.
  - **Opción menos económica**. Aunque más potente y de mejor rendimiento, suele ser una opción menos económica, ya que requiere de varios servidores.

<img src="../assets/01-01.png" alt="Escalabilidad">

## Nest JS

- NestJS es un framework para construir aplicaciones backend eficientes y escalables con Node.js.

- Usa JavaScript moderno y está completamente construido con TypeScript (aunque también permite usar JS puro).

- Combina conceptos de POO, Programación Funcional (FP) y Programación Funcional Reactiva (FRP).

- Funciona sobre Express (por defecto) o Fastify (opcional).

- Proporciona una arquitectura predefinida para crear aplicaciones escalables, mantenibles y testeables.

- Inspirado fuertemente en la arquitectura de Angular.

- Nest abstrae Express/Fastify, pero permite acceso directo a sus APIs y a módulos de terceros de Node.

- Se recomienda iniciar proyectos con el CLI de Nest:

```bash
npm i -g @nestjs/cli  # Instalar CLI de NestJS en forma global
nest new project-name # Inicializar un nuevo proyecto de NestJS
```

- Una vez iniciado, puedes ver tu app en http://localhost:3000/.

- También puedes iniciar un proyecto clonando desde GitHub o configurándolo manualmente.

## Dependencias Globales

- En Terminal Integrado:

```bash
# Obtener listado de dependencias globales:
npm list -g --depth=0

# Desinstalar una dependencia global:
npm uninstall -g @nestjs/cli

# Instalar CLI de Nest JS:
npm install -g @nestjs/cli

# Consultar versión de CLI de Nest JS:
nest -v

# Actualizar versión de CLI de Nest JS:
npm install -g @nestjs/cli
```

[Volver a Inicio](../../README.md)

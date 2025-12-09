# Nest JS - Nest JS Pipes

[Volver a Inicio](../../README.md)

## Links

- [Class Transformer - Documentación](https://www.npmjs.com/package/class-transformer)
- [Class Validator - Documentación](https://www.npmjs.com/package/class-validator)
- [NestJS Exception-Filters](https://docs.nestjs.com/exception-filters)

## Guardianes, Interceptores y Pipes

🎯En NestJS, los Guards, Interceptors y Pipes son tres conceptos clave que se utilizan para implementar la lógica de autorización, manipulación de datos y transformación de datos en una aplicación.

1. **Guards (Guardianes)**: Los Guards son utilizados para proteger las rutas de una aplicación y controlar el acceso a ellas. Se utilizan para implementar lógica de autorización y autenticación. Un Guard puede permitir o denegar el acceso a una ruta en función de ciertas condiciones, como por ejemplo si un usuario está autenticado o tiene ciertos roles.
2. **Interceptors (Interceptores)**: Los Interceptors se utilizan para modificar o manejar las peticiones entrantes y salientes en una aplicación. Pueden ser utilizados para modificar la respuesta de una solicitud, realizar tareas comunes como el registro de solicitudes o respuestas, o incluso para transformar los datos antes de que sean enviados al controlador.
3. **Pipes (Tuberías)**: Los Pipes se utilizan para transformar los datos que entran en una aplicación antes de ser procesados por un controlador. Pueden ser utilizados para validar, transformar o limpiar los datos de entrada antes de que sean procesados por la lógica de negocio. Los Pipes pueden ser sincrónicos o asincrónicos, y pueden ser utilizados para validar tipos de datos, realizar conversiones, entre otros.

> En resumen, los Guardianes se utilizan para la autorización, los Interceptors para la manipulación de peticiones y respuestas, y los Pipes para la transformación o validación de datos antes de ser procesados por un controlador. Cada uno cumple una función específica en el flujo de una aplicación NestJS.

| Tipo               | Cuándo se ejecuta               | Para qué sirve                        | Ejemplo típico                                     |
| ------------------ | ------------------------------- | ------------------------------------- | -------------------------------------------------- |
| 🧩 **Pipe**        | Antes del controlador           | Validar y transformar datos           | `ValidationPipe`, `ParseIntPipe`                   |
| 🛡️ **Guard**       | Antes de los Pipes              | Autenticación y autorización          | `AuthGuard`, `RolesGuard`                          |
| 🎯 **Interceptor** | Antes y después del controlador | Transformar respuesta, logging, cache | `ClassSerializerInterceptor`, `LoggingInterceptor` |

## Class-Validator y Class-Transformer

### 🔧 Instalación de Dependencias

```bash
npm install class-validator class-transformer
```

### 🧩 1. class-validator

👉 Sirve para validar los datos de una clase (por ejemplo, un DTO) usando decoradores.

- Comprueba que los valores recibidos cumplen ciertas reglas (longitud, tipo, formato, rango, etc.).
- Se usa típicamente junto a @Body() en NestJS para validar lo que el cliente envía en una request.

### 🧬 2. class-transformer

👉 Sirve para convertir objetos planos (JSON) en instancias de clases y viceversa, además de permitir excluir o exponer propiedades fácilmente.

- Transforma el body (que llega como objeto literal) en una instancia real de tu clase DTO.
- Permite ocultar o cambiar nombres de propiedades al serializar/deserializar.

## Exception Filters Preconstruídos

| EXCEPTION                          | STATUS CODE                    |
| ---------------------------------- | ------------------------------ |
| - BadRequestException              | 400 Bad Request                |
| - UnauthorizedException            | 401 Unauthorized               |
| - NotFoundException                | 404 Not Found                  |
| - ForbiddenException               | 403 Forbidden                  |
| - NotAcceptableException           | 406 Not Acceptable             |
| - RequestTimeoutException          | 408 Request Timeout            |
| - ConflictException                | 409 Conflict                   |
| - GoneException                    | 410 Gone                       |
| - HttpVersionNotSupportedException | 505 HTTP Version Not Supported |
| - PayloadTooLargeException         | 413 Payload Too Large          |
| - UnsupportedMediaTypeException    | 415 Unsupported Media Type     |
| - UnprocessableEntityException     | 422 Unprocessable Entity       |
| - InternalServerErrorException     | 500 Internal Server Error      |
| - NotImplementedException          | 501 Not Implemented            |
| - ImATeapotException               | 418 I'm a teapot               |
| - MethodNotAllowedException        | 405 Method Not Allowed         |
| - BadGatewayException              | 502 Bad Gateway                |
| - ServiceUnavailableException      | 503 Service Unavailable        |
| - GatewayTimeoutException          | 504 Gateway Timeout            |
| - PreconditionFailedException      | 412 Precondition Failed        |

[Volver a Inicio](../../README.md)

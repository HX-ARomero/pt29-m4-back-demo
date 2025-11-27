# PROVIDERS 😎

[Volver a Inicio](../../README.md)

- Los custom providers en NestJS son una de las partes más poderosas del sistema de inyección de dependencias (DI) del framework.
- Te permiten personalizar cómo se crean o resuelven las dependencias; más allá del uso básico de clases con @Injectable().

## 🧩 1. Qué es un provider en NestJS

- Un provider es cualquier clase, valor o fábrica (función constructora) que puede inyectarse en otras partes de tu aplicación usando el sistema de inyección de dependencias de Nest.
- Ejemplo básico:

```ts
@Injectable()
export class UsersService {
  findAll() {
    return ["Lisa", "Bart"];
  }
}
```

- Luego se utiliza así:

```ts
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
}
```

➡️ Aquí UsersService es un provider estándar.

## ⚙️ 2. Qué son los custom providers

- Los custom providers te permiten definir cómo se crea un provider usando distintas estrategias.
- Por ejemplo:
  - useClass
  - useValue
  - useFactory
  - useExisting

➡️ Son útiles cuando queremos reemplazar implementaciones, inyectar configuraciones dinámicas, o usar dependencias condicionalmente.

### ⚠️ IMPORTANTE

- ❗ Solo veremos ejemplos en nuestro proyecto al ver el tema de Testing (que es un Extra Credit).
- ❗La siguiente explicación excede lo que se pretende para este Módulo 4 - Back; pero doy contexto y ejemplos para quien quiera profundizar en el tema.

## 🧱3. Tipos de Custom Providers

### 🔸useClass

- Permite sustituir una clase por otra que implemente la misma lógica o interfaz.

```ts
interface Logger {
  log(message: string): void;
}

@Injectable()
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log("Console:", message);
  }
}

@Injectable()
class FileLogger implements Logger {
  log(message: string) {
    // Guardar en archivo...
  }
}

// Custom provider
const LoggerProvider = {
  provide: "LoggerService",
  useClass: ConsoleLogger,
};

@Module({
  providers: [LoggerProvider],
})
export class AppModule {}
```

Luego podemos inyectarlo así:

```ts
constructor(@Inject('LoggerService') private logger: Logger) {}
```

💡 En este ejemplo "LoggerProvider" es el Nombre de nuestro Provider, y puede tomará el valor declarado en "useClass", en este caso el valor será "ConsoleLogger".

Y si luego queremos cambiar la implementación modificamos:

```ts
// Custom provider
const LoggerProvider = {
  provide: "LoggerService",
  useClass: FileLogger, // <<<<<-----
};
```

💡 Con este cambio, el valor de nuestro "LoggerProvider" será "FileLogger".

## 🔸 useValue

- Usamos un objeto o valor constante como provider.

```ts
const ConfigProvider = {
  provide: "CONFIG",
  useValue: {
    apiKey: "12345",
    dbHost: "localhost",
  },
};

@Module({
  providers: [ConfigProvider],
  exports: ["CONFIG"],
})
export class ConfigModule {}
```

Inyección:

```ts
constructor(@Inject('CONFIG') private readonly config: { apiKey: string; dbHost: string }) {}
```

💡 En este caso, el valor de nuestro Provider "ConfigModule" será el Objeto definido como "ConfigProvider".

## 🔸 useFactory

- Permite crear el provider a partir de una función.
- Ideal para dependencias dinámicas o basadas en otras.

```ts
const DatabaseProvider = {
  provide: "DATABASE_CONNECTION",
  useFactory: async () => {
    const db = await createConnection({
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",
      database: "nest_app",
    });
    return db;
  },
};
```

💡 En este caso

- 👉 El provider es "DATABASE_CONNECTION".
- 👉 El valor asociado al provider es el retorno de la función llamada "useFactory" (es decir, su ejecución).
- En otras palabras:
  - NestJS ejecuta la función useFactory.
  - Toma su resultado (por ejemplo, la conexión a la base de datos).
  - Y guarda ese resultado como el valor del provider "DATABASE_CONNECTION".

Y podemos inyectar nuestro Provider del siguiente modo:

```ts
constructor(@Inject('DATABASE_CONNECTION') private readonly db) {}
```

También puede inyectar otros providers:

```ts
const DatabaseProvider = {
  provide: "DATABASE_CONNECTION",
  useFactory: async (configService: ConfigService) => {
    return createConnection(configService.getDatabaseConfig());
  },
  inject: [ConfigService],
};
```

💡 `inject: [ConfigService]` le dice a Nest qué dependencias debe inyectar dentro de la función "useFactory".

- Aquí ocurre lo siguiente:
  - NestJS ve que la fábrica (useFactory) recibe un parámetro (configService).
  - Entonces busca un provider registrado que coincida con ConfigService.
  - Lo inyecta como argumento al ejecutar la función.

## 🔸 useExisting

- Hace que un provider use una instancia ya existente de otro provider.

```ts
const ExistingProvider = {
  provide: "APP_LOGGER",
  useExisting: LoggerService,
};
```

💡 En este caso 'APP_LOGGER' y LoggerService son el mismo objeto en memoria, ya que nuestro nuevo Provider "APP_LOGGER", tiene como valor a "LoggerService".

## 🧩 4. Ejemplo completo

```ts
@Module({
  providers: [
    {
      provide: "APP_NAME",
      useValue: "Mi Aplicación NestJS",
    },
    {
      provide: "RANDOM_NUMBER",
      useFactory: () => Math.random(),
    },
    {
      provide: "CUSTOM_LOGGER",
      useClass: ConsoleLogger,
    },
  ],
  exports: ["APP_NAME", "RANDOM_NUMBER", "CUSTOM_LOGGER"],
})
export class CoreModule {}
```

Y lo inyectamos en cualquier clase:

```ts
@Injectable()
export class AppService {
  constructor(
    @Inject("APP_NAME") private appName: string,
    @Inject("RANDOM_NUMBER") private random: number,
    @Inject("CUSTOM_LOGGER") private logger: ConsoleLogger
  ) {}

  getInfo() {
    this.logger.log(`${this.appName} - Session: ${this.random}`);
  }
}
```

## 💡 5. Cuándo usar custom providers

- Usalos cuando:
  - Necesites inyección dinámica (por configuración, entorno, etc.)
  - Quieras mockear servicios en testing
  - Quieras reemplazar implementaciones (p. ej. ConsoleLogger por FileLogger)
  - Tengas dependencias externas (DB, API, etc.) que no se pueden crear con new

---

## 6. 🛠️ UN EJEMPLO

### 🎯 Objetivo

- Queremos tener un servicio de logs:
  - En desarrollo → usa DevLogger (imprime colorido, detallado).
  - En producción → usa ProdLogger (guarda o envía los logs a un servidor, sin tanto detalle).
- Y todo esto sin cambiar código, solo dependiendo de process.env.NODE_ENV.

### 🧱 Paso 1: Definir una interfaz común

```ts
// logger.interface.ts
export interface Logger {
  log(message: string): void;
}
```

### 🧱 Paso 2: Crear dos implementaciones

```ts
// dev-logger.service.ts
import { Injectable } from "@nestjs/common";
import { Logger } from "./logger.interface";

@Injectable()
export class DevLogger implements Logger {
  log(message: string) {
    console.log("🧩 [DEV LOG]:", message);
  }
}

// prod-logger.service.ts
import { Injectable } from "@nestjs/common";
import { Logger } from "./logger.interface";

@Injectable()
export class ProdLogger implements Logger {
  log(message: string) {
    // Aquí podrías guardar en un archivo o enviar a un servicio externo
    console.log("📁 [PROD LOG - saved silently]:", message);
  }
}
```

### 🧱 Paso 3: Crear un custom provider dinámico

```ts
// logger.provider.ts
import { DevLogger } from "./dev-logger.service";
import { ProdLogger } from "./prod-logger.service";
import { Logger } from "./logger.interface";

export const LoggerProvider = {
  provide: "LOGGER", // token para inyección
  useFactory: (): Logger => {
    const env = process.env.NODE_ENV || "development";

    if (env === "production") {
      return new ProdLogger();
    }
    return new DevLogger();
  },
};
```

💡 useFactory nos deja decidir en tiempo de ejecución qué clase instanciar.

### 🧱 Paso 4: Registrar el provider en un módulo

```ts
// logger.module.ts
import { Module } from "@nestjs/common";
import { LoggerProvider } from "./logger.provider";

@Module({
  providers: [LoggerProvider],
  exports: ["LOGGER"],
})
export class LoggerModule {}
```

### 🧱 Paso 5: Usarlo en un servicio o controlador

```ts
// app.service.ts
import { Injectable, Inject } from "@nestjs/common";
import { Logger } from "./logger/logger.interface";

@Injectable()
export class AppService {
  constructor(@Inject("LOGGER") private readonly logger: Logger) {}

  doSomething() {
    this.logger.log("Ejecutando tarea importante...");
  }
}
```

### 🧱 Paso 6: Incluir el módulo

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { LoggerModule } from "./logger/logger.module";

@Module({
  imports: [LoggerModule],
  providers: [AppService],
})
export class AppModule {}
```

### 🧪 Resultado

- Si se ejecuta:

```ts
NODE_ENV=development nest start
```

Veremos:

```bash
🧩 [DEV LOG]: Ejecutando tarea importante...
```

Y si ejecutás:

```ts
NODE_ENV=production nest start
```

Veremos:

```bash
📁 [PROD LOG - saved silently]: Ejecutando tarea importante...
```

### ✅ Conclusión

- Este patrón es muy potente porque:
  - Te permite elegir implementaciones dinámicamente.
  - Hace que tu app sea más flexible y fácil de testear.
  - Encaja perfectamente con principios de inyección de dependencias y [SOLID](./NestJS-03-SOLID.md).

---

## 7. 🛠️ Otro Ejemplo

- Vamos a hacer un ejemplo divertido con un “Emoji Provider” en NestJS, para seguir repasando cómo funcionan los custom providers con useValue, useClass y useFactory.

### 🎯 Objetivo

- Vamos a crear un provider que entregue emojis según diferentes estrategias:
- useValue → un emoji fijo.
- useClass → un servicio que maneja varios emojis.
- useFactory → elige un emoji dinámicamente según la hora del día.

### 🧱 1. Definir el tipo base

```ts
// emoji.interface.ts
export interface EmojiProvider {
  getEmoji(): string;
}
```

### 🧱 2. Crear una clase que cumpla la interfaz

```ts
// emoji.service.ts
import { Injectable } from "@nestjs/common";
import { EmojiProvider } from "./emoji.interface";

@Injectable()
export class EmojiService implements EmojiProvider {
  private emojis = ["😀", "🎸", "🔥", "🚀", "🎵", "🐱", "💻"];

  getEmoji(): string {
    const random = Math.floor(Math.random() * this.emojis.length);
    return this.emojis[random];
  }
}
```

### 🧱 3. Crear los custom providers

```ts
// emoji.providers.ts
import { EmojiService } from "./emoji.service";
import { EmojiProvider } from "./emoji.interface";

export const EmojiProviders = [
  // 🔹 1. Valor fijo
  {
    provide: "STATIC_EMOJI",
    useValue: "🌟",
  },

  // 🔹 2. Clase
  {
    provide: "EMOJI_SERVICE",
    useClass: EmojiService,
  },

  // 🔹 3. Fábrica dinámica
  {
    provide: "TIME_EMOJI",
    useFactory: (): string => {
      const hour = new Date().getHours();
      if (hour < 12) return "☀️"; // mañana
      if (hour < 18) return "🌤️"; // tarde
      return "🌙"; // noche
    },
  },
];
```

### 🧱 4. Registrar en un módulo

```ts
// emoji.module.ts
import { Module } from "@nestjs/common";
import { EmojiProviders } from "./emoji.providers";
import { EmojiService } from "./emoji.service";

@Module({
  providers: [...EmojiProviders, EmojiService],
  exports: [...EmojiProviders],
})
export class EmojiModule {}
```

### 🧱 5. Usarlo en otro servicio o controlador

```ts
// app.service.ts
import { Injectable, Inject } from "@nestjs/common";
import { EmojiService } from "./emoji/emoji.service";

@Injectable()
export class AppService {
  constructor(
    @Inject("STATIC_EMOJI") private staticEmoji: string,
    @Inject("EMOJI_SERVICE") private emojiService: EmojiService,
    @Inject("TIME_EMOJI") private timeEmoji: string
  ) {}

  getEmojis() {
    return {
      fixed: this.staticEmoji,
      random: this.emojiService.getEmoji(),
      byTime: this.timeEmoji,
    };
  }
}
```

### 🧱 6. Controlador para verlo en acción

```ts
// app.controller.ts
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("emojis")
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  showEmojis() {
    return this.appService.getEmojis();
  }
}
```

### 🧪 Resultado

Al abrir:
👉 http://localhost:3000/emojis

Verás algo como:

```json
{
  "fixed": "🌟",
  "random": "🎸",
  "byTime": "🌙"
}
```

### 💡 Qué aprendiste aquí

```txt
------------------------------------------------------------------------
| Tipo       | Qué hace                          | Ejemplo             |
------------------------------------------------------------------------
| useValue   | Provee un valor fijo              | '🌟'                |
| useClass   | Usa una clase con lógica interna  | EmojiService        |
| useFactory | Calcula el valor dinámicamente    | emoji según la hora |
------------------------------------------------------------------------
```

[Volver a Inicio](../../README.md)

# Nest JS - Nest JS File Upload

[Volver a Inicio](../../README.md)

## Cloudinary

### Instalación

```bash
npm install cloudinary buffer-to-stream
```

### Ejemplo de Archivo de Configuración

```ts
import { v2 as cloudinary } from "cloudinary";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".development.env" });

export const CloudinaryConfig = {
  provide: "CLOUDINARY",
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
```

### Ejemplo de Servicio

```ts
import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import toStream = require("buffer-to-stream");

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
```

## Express.Multer.File

Es la **firma del tipo** del archivo recibido

- Tiene propiedades como:

```ts
{
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}
```

[Volver a Inicio](../../README.md)

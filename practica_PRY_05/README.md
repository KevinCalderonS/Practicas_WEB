## Descipcion del proyecto
El proyecto consiste en la creación de un sistema de gestión de adopcion para mascotas, en mi caso implemente el modulo donante y mis entidades son : Donante, Verificacion Donante e Informacion Contacto

## Instrucciones para clonar, 
$ git clone https://github.com/joancema/ASW-2025-1 

## instalar dependencias 
$ npm install
$ npm i -g @nestjs/cli
$ npm install @nestjs/typeorm typeorm sqlite3 
$ npm install @nestjs/graphql @nestjs/apollo apollo-server-express graphql
$ npm install class-validator class-transformer

## jecutar el proyecto.
$ npm run start:dev

## Pruebas en graphql: http://localhost:3000/graphql
## DONANTE 
1. Crear un Donante (mutation)
![alt text](./donaciones_graphql/imagenes/image.png)
2. Consultar todos los Donantes (query)
![alt text](./donaciones_graphql/imagenes/image-1.png)
3. Consultar un Donante por id (query)
![alt text](./donaciones_graphql/imagenes/image-2.png)
4. Actualizar un Donante (mutation)
![alt text](./donaciones_graphql/imagenes/image-3.png)
5. Eliminar un Donante (mutation)
![alt text](./donaciones_graphql/imagenes/image-4.png)

## INFORMACION CONTACTO
1. Crear una Informacion Contacto (mutation)
![alt text](./donaciones_graphql/imagenes/image-5.png)
2. Consultar todas las Informacion Contacto (query)
![alt text](./donaciones_graphql/imagenes/image-6.png)
3. Consultar una Informacion Contacto por id (query)
![alt text](./donaciones_graphql/imagenes/image-7.png)
4. Actualizar la Informacion del Contacto (mutation)
![alt text](./donaciones_graphql/imagenes/image-8.png)
5. Eliminar una Informacion Contacto (mutation)
![alt text](./donaciones_graphql/imagenes/image-9.png)

## VERIFICACION DONANTE
1. Crear una Verificacion Donante (mutation)
![alt text](./donaciones_graphql/imagenes/image-10.png)
2. Actualizar la Verificacion de Donante (mutation)
![alt text](./donaciones_graphql/imagenes/image-11.png)
3. Elimar una Verificacion de Donante (mutation)
![alt text](./donaciones_graphql/imagenes/image-12.png)
4. Consultar Verificacion por id (query)
![alt text](./donaciones_graphql/imagenes/image-13.png)
5. Consulta general de Verificaciones (query)
![alt text](./donaciones_graphql/imagenes/image-14.png)
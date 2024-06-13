<hr>
<h1 align="center"><img src="./src/assets/images/pokemon.png" width="30" alt="Poke Logo" /> POKEDEX <img src="./src/assets/images/pokemon.png" width="30" alt="Poke Logo" /></h1>
<br>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar repo
2. Ejecutar 
```
yarn install
```
3. Si no tienes Nest CLI instalado. (Si ya lo tienes, pasa directo al paso 4)
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar archivo __.env.template__ a uno __.env__ y añadir variables de entorno personales
6. Correr app en desarrollo
```
yarn start:dev
```
7. En caso de requerir nueva data de pokemon.
  - __Esta ruta elimina toda data existente en pokemon schema__
  - __Ejecutar ruta solo en caso de requerir data de testing__.
```
Get http://localhost:3000/api/seed
```

## Stack
* MongoDB
* Nestjs
* Docker
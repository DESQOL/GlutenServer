# GlutenServer
[![Travis (.com) branch](https://img.shields.io/travis/com/DESQOL/GlutenServer/develop?label=Travis-CI&style=flat-square)](https://travis-ci.com/DESQOL/GlutenServer)
[![Coveralls github branch](https://img.shields.io/coveralls/github/DESQOL/GlutenServer/master?style=flat-square)](https://coveralls.io/github/DESQOL/GlutenServer)
[![Greenkeeper badge](https://badges.greenkeeper.io/DESQOL/GlutenServer.svg?style=flat-square)](https://greenkeeper.io/)

## Links
- [Swagger UI](https://desqol.hihva.nl/api-docs/)
  > Swagger UI is a collection of HTML, Javascript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API.
- [Portainer](https://desqol.hihva.nl/portainer/)
  > Portainer is a lightweight management UI which allows you to easily manage your Docker host or Swarm cluster.

## Setup
**Filename**: *docker-compose.override.yml*
```docker
version: '3.7' # Must match the version specified in docker-compose.yml

services:
  nginx:
    build: # This results in using the development stage which disables HTTPS
      target: development

  gateway-cache:
    ports: # Allow access to the gateway-cache, usefull for debugging in development
        - 6379:6379

  gateway-database:
    ports: # Allow access to the gateway-database, usefull for debugging in development
      - 3306:3306

  gateway-service:
    environment: # Set NODE_ENV to development to output all logs to the Docker console
      NODE_ENV: development
```

## TypeORM
All commands, for TypeORM, are written for usage in a development enviremont, to use these commands in production prefix them with the following:
```bash
$ docker-compose exec gateway-service ...
```

### Generate migration
```bash
$ npm run typeorm -- migration:generate -n PostRefactoring
```

### Apply migration
```bash
$ npm run typeorm -- migration:run
```

### Undo migration
```bash
$ npm run typeorm -- migration:revert
```

## Docker

### Build
```bash
$ docker-compose build
```

### Run
```bash
$ docker-compose up
```

### Build & Run (production)
```bash
$ docker-compose up --build
```

### Scale a service (production)
```bash
$ docker-compose up --scale gateway-service=X
```

### Build & Run (development)
```bash
$ docker-compose up --detach --build gateway-database gateway-cache
$ cd server; npm run dev
```

### Updated local MySQL init file
```bash
$ docker-compose exec -T gateway-database mysqldump -uroot -proot --no-data --skip-comments --databases gluten > gateway/database/init.sql
$ docker-compose exec -T gateway-database mysqldump -uroot -proot --no-create-info --skip-comments gluten migrations >> gateway/database/init.sql
```

### Updated local MySQL test file
```bash
$ docker-compose exec -T gateway-database mysqldump -uroot -proot --no-create-info --skip-comments gluten --ignore-table=gluten.migrations > gateway/database/test.sql
```

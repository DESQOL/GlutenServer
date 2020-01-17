# GlutenServer

[![Greenkeeper badge](https://badges.greenkeeper.io/DESQOL/GlutenServer.svg)](https://greenkeeper.io/)

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

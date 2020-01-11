# GlutenServer

[![Greenkeeper badge](https://badges.greenkeeper.io/DESQOL/GlutenServer.svg)](https://greenkeeper.io/)

## Setup
**Filename**: *docker-compose.override.yml*
```docker
version: '3.7'

services:
  nginx:
    build:
      target: development
    volumes: []
```

## TypeORM
All commands, for TypeORM, are written for usage in a development enviremont, to use these commands in production prefix them with the following:
```bash
$ docker-compose exec server ...
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
$ docker-compose up --detach --build database cache
$ cd server; npm run dev
```

### Updated local MySQL init file
```bash
$ docker-compose exec -T database mysqldump -uroot -proot --no-data --skip-comments --databases gluten > database/init.sql
$ docker-compose exec -T database mysqldump -uroot -proot --no-create-info --skip-comments gluten migrations >> database/init.sql
```

### Updated local MySQL test file
```bash
$ docker-compose exec -T database mysqldump -uroot -proot --no-create-info --skip-comments gluten --ignore-table=gluten.migrations > database/test.sql
```

# GlutenServer

[![Greenkeeper badge](https://badges.greenkeeper.io/DESQOL/GlutenServer.svg)](https://greenkeeper.io/)

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

### Updated local MySQL dump file
```bash
$ docker-compose exec -T database mysqldump --skip-comments -uroot -proot gluten > database/dump.sql
```

# GlutenServer

[![Greenkeeper badge](https://badges.greenkeeper.io/DESQOL/GlutenServer.svg)](https://greenkeeper.io/)

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

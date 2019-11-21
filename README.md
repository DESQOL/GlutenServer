# GlutenServer

[![Greenkeeper badge](https://badges.greenkeeper.io/DESQOL/GlutenServer.svg)](https://greenkeeper.io/)

## Usage
### Starting the GlutenServer
```sh
GlutenServer $ docker-compose up
```

### Automatically reload changes in the server
```sh
GlutenServer/server $ npm run dev
```

### Manually reload changes in the server
```sh
GlutenServer $ docker-compose up --detach --build server
```

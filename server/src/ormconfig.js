const options = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "gluten",
  password: "gluten",
  database: "gluten",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cache: {
    type: "redis",
    options: {
      host: "localhost",
      port: 6379
    },
    duration: 1 * 1000
  }
};

if (process.env.CI) {
  options['username'] = 'travis';
  options['password'] = '';
}

if (process.env.MYSQL_HOST) {
  options['host'] = process.env.MYSQL_HOST;
}

if (process.env.MYSQL_PORT) {
  options['port'] = process.env.MYSQL_PORT;
}

if (process.env.MYSQL_USER) {
  options['username'] = process.env.MYSQL_USER;
}

if (process.env.MYSQL_PASS) {
  options['password'] = process.env.MYSQL_PASS;
}

if (process.env.MYSQL_NAME) {
  options['database'] = process.env.MYSQL_NAME;
}

if (process.env.REDIS_HOST) {
  options['cache']['options']['host'] = process.env.REDIS_HOST;
}

if (process.env.REDIS_PORT) {
  options['cache']['options']['port'] = process.env.REDIS_PORT;
}

module.exports = options;

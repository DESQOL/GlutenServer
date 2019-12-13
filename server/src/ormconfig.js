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
  subscribers: ["src/subscriber/**/*.ts"]
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

module.exports = options;

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

module.exports = options;

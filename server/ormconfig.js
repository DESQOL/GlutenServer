const options = {
   "type": "mysql",
   "host": "database",
   "port": 3306,
   "username": "test",
   "password": "test",
   "database": "gluten",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}

if (process.env.CI) {
   options['username'] = 'travis'
   options['password'] = ''
}

module.exports = options

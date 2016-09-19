module.exports = {
  db: {
    database: 'dms',
    username: 'root',
    password: '123456',
    connect: {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      freezeTableName: true
    }
  }
}
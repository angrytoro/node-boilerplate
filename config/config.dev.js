module.exports = {
  db: {
    database: '',
    username: '',
    password: '',
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
};
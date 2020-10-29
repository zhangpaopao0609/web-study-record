(async () => {
  const mysql = require('mysql2/promise');
  // 连接设置
  const config = {
    host: '134.175.53.155',
    user: 'root',
    password: '123456',
    database: 'arrow'
  };

  const connection = await mysql.createConnection(config);

  connection.connect(err => {
    if (err) {
      throw err;
    } else {
      console.log("链接成功！");
    }
  })

  const CREATE_TABLE = await connection.execute(`
    CREATE TABLE IF NOT EXISTS test (
      id INT NOT NULL AUTO_INCREMENT,
      message VARCHAR(45) NULL,
      PRIMARY KEY (id)
    )
  `);
  console.log(CREATE_TABLE);

  const INSERT_SQL = await connection.execute(`INSERT INTO test(message) VALUES(?)`, ['papaozhang3']);
  const SELECT_SQL = await connection.execute(`SELECT * FROM test`);
  const [rows, fields] = SELECT_SQL;
  console.log(rows, fields);
})()
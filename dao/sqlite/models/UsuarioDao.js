const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class UsuariosDao extends DaoObject {
  constructor(db = null) {
    super(db);
  }
  async setup() {
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, estado TEXT, password TEXT, nombre TEXT, avatar TEXT, fchIngreso TEXT);';
      await this.run(createStatement);
    }
  }

  getAll() {
    return this.all(
      'SELECT * from usuarios;', []
    );
  }

  getById({ codigo }) {
    const sqlstr = 'SELECT * from usuarios where id=?;';
    const sqlParamArr = [codigo];
    return this.get(sqlstr, sqlParamArr);
  }

  insertOne({ email, password, nombre, avatar, estado }) {
    const fchIngreso = new Date().toISOString();
    const sqlstr = 'INSERT INTO usuarios (email, password, nombre, avatar, estado, fchIngreso) values (?, ?, ?, ?, ?, ?);';
    const sqlParamArr = [email, password, nombre, avatar, estado, fchIngreso];
    return this.run(sqlstr, sqlParamArr);
  }

  updateOne({ codigo, email, password, nombre, avatar, estado }) {
    const sqlstr = 'UPDATE usuarios set email = ?, password = ?, nombre = ?, avatar = ?, estado = ? where id = ?;';
    const sqlParamArr = [email, password, nombre, avatar, estado, codigo];
    return this.run(sqlstr, sqlParamArr);
  }

  deleteOne({ codigo }) {
    const sqlstr = 'DELETE FROM usuarios where id = ?;';
    const sqlParamArr = [codigo];
    return this.run(sqlstr, sqlParamArr);
  }

}

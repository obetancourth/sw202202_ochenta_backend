const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class CategoryDao extends DaoObject{
  constructor(db = null){
    console.log('CategoryDao db: ', db);
    super(db);
  }
  async setup(){
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, status TEXT);';
      await this.run(createStatement);
    }
  }

  getAll(){
    return this.all(
      'SELECT * from categories;', []
    );
  }

  getById( {codigo} ){
    const sqlstr= 'SELECT * from categories where id=?;';
    const sqlParamArr = [codigo];
    return this.get(sqlstr, sqlParamArr);
  }

  insertOne({categoria, estado}) {
    const sqlstr = 'INSERT INTO categories (category, status) values (?, ?);';
    const sqlParamArr = [categoria, estado];
    return this.run(sqlstr, sqlParamArr);
  }

  updateOne({codigo, categoria, estado}){
    const sqlstr= 'UPDATE categories set category = ?, status = ? where id = ?;';
    const sqlParamArr = [categoria, estado, codigo];
    return this.run(sqlstr, sqlParamArr);
  }

  deleteOne({ codigo }) {
    const sqlstr = 'DELETE FROM categories where id = ?;';
    const sqlParamArr = [codigo];
    return this.run(sqlstr, sqlParamArr);
  }

}

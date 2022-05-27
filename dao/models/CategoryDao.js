const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class CategoryDao extends DaoObject{
  constructor(db = null){
    console.log('CategoryDao db: ', db);
    super(db);
  }
  setup(){
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, status TEXT);';
      this.conn.run(createStatement);
    }
  }
  async insertOne({category, status}) {
    this.conn.run(
      'INSERT INTO categories (category, status) values (?, ?);',
      [category, status],
       (err) => {
         if(err){
           throw err;
         }
         return {id: this.lastID, category, status}
       }
    );
  }
  async getAll(){
    this.conn.all(
      'SELECT * from categories;',
      (err, rows)=>{
        if(err){
          throw err;
        }
        return rows;
      }
    )
  }
}

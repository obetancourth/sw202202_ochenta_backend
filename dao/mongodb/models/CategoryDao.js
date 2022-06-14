const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class CategoryDao extends DaoObject {
  constructor(db = null) {
    console.log('CategoryDao db: ', db);
    super(db, 'categorias');
  }
  async setup() {
    if (process.env.MONGODB_SETUP) {
     // TODO: Agregar Indices
    }
  }

  getAll() {
    return this.find();
  }
}

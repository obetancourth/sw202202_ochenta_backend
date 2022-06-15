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
  getById({codigo}) {
    return this.findById(codigo);
  }
  insertOne({ categoria, estado }) {
    return super.insertOne({categoria, estado, created: new Date().toISOString()});
  }
  updateOne({ codigo, categoria, estado }) {
    const updateCommand = {
      '$set': {
        categoria,
        estado,
        updated: new Date().toISOString()
      }
    };
    return super.updateOne(codigo, updateCommand);
  }
  deleteOne({ codigo }) {
    return super.removeOne(codigo);
  }
}

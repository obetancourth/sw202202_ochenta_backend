const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class UsuariosDao extends DaoObject {
  constructor(db = null) {
    super(db, 'usuarios');
  }
  async setup() {
    if (process.env.MONGODB_SETUP) {
     //agregar indice unico para el correo electronico
    }
  }

  getAll() {
    return this.find();
  }

  getById({ codigo }) {
    return this.findById(codigo);
  }

  getByEmail({ email }) {
    return this.findOne({email});
  }

  insertOne({ email, password, nombre, avatar, estado }) {
    const newUser = {
      email,
      password,
      nombre,
      avatar,
      estado,
      created: new Date().toISOString(),
    }
    return super.insertOne(newUser);
  }

  updateOne({ codigo, password, nombre, avatar, estado }) {
    const updateCommand = {
      "$set": {
        nombre,
        password,
        avatar,
        estado,
        updated: new Date().toISOString()
      }
    }
    return super.updateOne(codigo, updateCommand);
  }

  deleteOne({ codigo }) {
    const updateCommand = {
      "$set": {
        estado:'INA',
        updated: new Date().toISOString()
      }
    }
    return super.updateOne(codigo, updateCommand);
  }

}

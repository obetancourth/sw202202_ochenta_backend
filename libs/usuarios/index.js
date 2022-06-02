const DaoObject = require('../../dao/DaoObject');
module.exports = class Usuario {
  usuarioDao = null;

  constructor(usuarioDao = null) {
    if (!(usuarioDao instanceof DaoObject)) {
      throw new Error('An Instance of DAO Object is Required');
    }
    this.usuarioDao = usuarioDao;
  }
  async init() {
    await this.usuarioDao.init();
    await this.usuarioDao.setup();
  }
  async getVersion() {
    return {
      entity: 'Usuarios',
      version: '1.0.0',
      description: 'CRUD de Usuarios'
    };
  }

  async addUsuarios({
    email,
    nombre,
    avatar,
    password,
    estado
  }) {
    const result = await this.usuarioDao.insertOne(
      {
        email,
        nombre,
        avatar,
        password,
        estado
      }
    );
    return {
      email,
      nombre,
      avatar,
      password,
      estado,
      id: result.lastID
    };
  };

  async getUsuarios() {
    return this.usuarioDao.getAll();
  }

  async getUsuarioById({ codigo }) {
    return this.usuarioDao.getById({ codigo });
  }

  async updateUsuario({ email,
    nombre,
    avatar,
    password,
    estado,
    codigo
    }) {
    const result = await this.usuarioDao.updateOne({
      codigo,
      email,
      nombre,
      avatar,
      password,
      estado });
    return {
      email,
      nombre,
      avatar,
      password,
      estado,
      codigo,
      modified: result.changes
    }
  }

  async deleteUsuario({ codigo }) {
    const usuarioToDelete = await this.usuarioDao.getById({ codigo });
    const result = await this.usuarioDao.deleteOne({ codigo });
    return {
      ...usuarioToDelete,
      deleted: result.changes
    };
  }
}

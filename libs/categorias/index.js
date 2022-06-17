const DaoObject = require('../../dao/mongodb/DaoObject');
module.exports = class Category {
  categoryDao = null;

  constructor ( categoryDao = null) {
    if (!(categoryDao instanceof DaoObject)) {
     throw new Error('An Instance of DAO Object is Required');
    }
    this.categoryDao = categoryDao;
  }
  async init(){
    await this.categoryDao.init();
    await this.categoryDao.setup();
  }
  async getCategoryVersion () {
    return {
      entity: 'Categories',
      version: '1.0.0',
      description: 'CRUD de Categorías'
    };
  }

  async addCategory ({
    categoria = 'NuevaCategoria',
    estado = 'ACT'
  }) {
    const result =  await this.categoryDao.insertOne(
      {
        categoria,
        estado
      }
    );
    return {
      categoria, estado, id: result.lastID
    };
  };

  async getCategories () {
    return this.categoryDao.getAll();
  }

  async getCategoryById ({ codigo }) {
    return this.categoryDao.getById({codigo});
  }

  async updateCategory ({ codigo, categoria, estado }) {
    const result = await this.categoryDao.updateOne({ codigo, categoria, estado });
    return {
      id: codigo,
      category: categoria,
      status: estado,
      modified: result.changes
    }
  }

  async deleteCategory({ codigo }) {
    const cateToDelete = await this.categoryDao.getById({codigo});
    const result = await this.categoryDao.deleteOne({ codigo });
    return {
      ...cateToDelete,
      deleted: result.changes
    };
  }
}
/*
categoriasMemStore = [];
categoriasCurrentKey = 0;

module.exports.getCategoryVersion = async ()=>{
  return {
    entity:  'Categories',
    version: '1.0.0',
    description: 'CRUD de Categorías'
  };
}



module.exports.addCategory = async ({
  categoria = 'NuevaCategoria',
  estado = 'ACT'
}) => {
  categoriasCurrentKey ++;
  const newCodigo = categoriasCurrentKey;
  const newCategoria = {
    codigo: newCodigo,
    categoria,
    estado
  }
  categoriasMemStore = categoriasMemStore.concat(newCategoria);
  return newCategoria;
};

module.exports.getCategories = async ()=>{
  return categoriasMemStore;
}

module.exports.getCategoryById = async ({codigo}) => {
  const selectedCategory = categoriasMemStore.find(
    obj => obj.codigo === codigo
  );
  return selectedCategory;
}

module.exports.updateCategory= async({codigo, categoria, estado}) => {
  let updatedCategory = null;
  const newCategories = categoriasMemStore.map((objCategoria)=>{
    if (objCategoria.codigo === codigo) {
      updatedCategory = { ...objCategoria, categoria, estado };
      return updatedCategory;
    }
    return objCategoria;
  });
  categoriasMemStore = newCategories;
  return updatedCategory;
}

module.exports.deleteCategory = async ({codigo})=> {
  let deletedCategory = null;
  const newCategories = categoriasMemStore.filter((objCategoria)=>{
    if(objCategoria.codigo === codigo) {
      deletedCategory = objCategoria;
      return false;
    }
    return true;
  });
  categoriasMemStore = newCategories;
  return deletedCategory;
}
*/

const DaoObject = require('../../dao/DaoObject');
module.exports = class Category {
  categoryDao = null;
  categoriasMemStore = [];
  categoriasCurrentKey = 0;

  constructor ( categoryDao = null) {
    if (!(categoryDao instanceof DaoObject)) {
     throw new Error('An Instance of DAO Object is Required');
    }
    this.categoryDao = categoryDao;
  }
  async init(){
    await this.categoryDao.init();
    this.categoryDao.setup();
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
    return this.categoryDao.insertOne(
      {
        categoria,
        estado
      }
    );
  };

  async getCategories () {
    return this.categoryDao.getAll();
  }

  async getCategoryById ({ codigo }) {
    const selectedCategory = this.categoriasMemStore.find(
      obj => obj.codigo === codigo
    );
    return selectedCategory;
  }

  async updateCategory ({ codigo, categoria, estado }) {
    let updatedCategory = null;
    const newCategories = this.categoriasMemStore.map((objCategoria) => {
      if (objCategoria.codigo === codigo) {
        updatedCategory = { ...objCategoria, categoria, estado };
        return updatedCategory;
      }
      return objCategoria;
    });
    this.categoriasMemStore = newCategories;
    return updatedCategory;
  }

  async deleteCategory({ codigo }) {
    let deletedCategory = null;
    const newCategories = this.categoriasMemStore.filter((objCategoria) => {
      if (objCategoria.codigo === codigo) {
        deletedCategory = objCategoria;
        return false;
      }
      return true;
    });
    this.categoriasMemStore = newCategories;
    return deletedCategory;
  }
}
/*
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

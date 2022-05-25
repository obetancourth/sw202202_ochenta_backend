module.exports.getCategoryVersion = async ()=>{
  return {
    entity:  'Categories',
    version: '1.0.0',
    description: 'CRUD de Categorías'
  };
}

let categoriasMemStore = [];
let categoriasCurrentKey = 0;

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

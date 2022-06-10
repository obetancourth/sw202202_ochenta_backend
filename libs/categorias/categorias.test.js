const Categoria = require('./index.js');
const Conexion = require('../../dao/sqlite/Connection');
const CategoriaDao = require('../../dao/sqlite/models/CategoryDao');
const fs = require('fs');

describe("Testing Categoria Crud", () => {
  const env = process.env;
  let db, CatDao, Cat;
  beforeAll( async ()=>{
    jest.resetModules();
    process.env = {
      ...env,
      SQLITE_DB:"ochentaapp_test.db",
      SQLITE_SETUP:1
    };
    db = await Conexion.getDB();
    CatDao = new CategoriaDao(db);
    Cat = new Categoria(CatDao);
    await Cat.init();
    await Cat.addCategory(
      { categoria: 'Categoria Prueba 1', estado: 'ACT' }
    );
    await Cat.addCategory(
      { categoria: 'Categoria Prueba 2', estado: 'ACT' }
    );
    return true;
  });

  afterAll(async ()=> {
    //Remove testDB;
    fs.unlinkSync(`data/${process.env.SQLITE_DB}`)
    return true;
  }
  );

  test('Category inserts Value', async ()=>{
    const result = await Cat.addCategory(
      {categoria: 'Categoria Prueba Ins', estado: 'ACT'}
    );
    expect(result.id).toBeGreaterThanOrEqual(1);
  });

  test('Category getAll Records', async () => {
    const records = await Cat.getCategories();
    expect(records.length).toBeGreaterThan(1);
  });

  test('Category getOne Record', async () => {
    const record = await Cat.getCategoryById({codigo:2});
    expect(record.id).toBeGreaterThan(0);
  });

  test('Category updateOne Record', async () => {
    const record = await Cat.getCategoryById({ codigo: 2 });
    const updatedRecord = await Cat.updateCategory({
      codigo: record.id,
      categoria: `${record.category} UPD`,
      estado: 'INA'
    });
    expect(updatedRecord.category).toEqual(expect.stringContaining('UPD'));
  });
  test('Category deleteOne Record', async () => {
    const record = await Cat.getCategoryById({ codigo: 2 });
    const updatedRecord = await Cat.deleteCategory({
      codigo: record.id
    });
    const deletedRecord = await Cat.getCategoryById({ codigo: 2 });
    expect(deletedRecord).not.toBeDefined();
  });
});

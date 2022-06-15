const path = require('path');
const dotenv = require('dotenv');
const CategoriaDao = require('./CategoryDao');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const Connection = require('../Connection');
const { hasUncaughtExceptionCaptureCallback } = require('process');

describe("Testing Categoria Crud in MongoDB", () => {
  const env = process.env;
  let db, CatDao, Cat, id;
  beforeAll(async () => {
    jest.resetModules();
    process.env = {
      ...env,
      MONGODB_URI: "mongodb+srv://ochenta_user:kfrbltXGvt2KZH4Q@cojba.nzup0.mongodb.net/?retryWrites=true&w=majority",
      MONGODB_DB: "sw202202_test",
      MONGODB_SETUP: 1,
    };
    db = await Connection.getDB();
    CatDao = new CategoriaDao(db,'categories');
    await CatDao.init();
    return true;
  });
  afterAll(async()=>{
    process.env = env;
    return true;
  });
  test('Get All Records', async ()=>{
    const result = await CatDao.getAll();
    console.log(result);
  });
  test('Insert One Record', async ()=>{
    const result = await CatDao.insertOne({ categoria:'Test INS', estado:'ACT'});
    console.log(result);
    id = result.insertedId;
    expect(result.acknowledged).toBe(true);
  });
  test('FindById Record', async ()=>{
    const record = await CatDao.getById({codigo:id.toString()});
    console.log(record);
    expect(record._id).toStrictEqual(id);
  });
  test('Update One Record', async ()=>{
    const updateResult = await CatDao.updateOne({codigo:id.toString(), categoria:'TEST INS UPD', estado:'INA'});
    console.log(updateResult);
    expect(updateResult.acknowledged).toBe(true);
  });
  test('Delete One Record', async () => {
    const deleteResult = await CatDao.deleteOne({ codigo: id.toString() });
    console.log(deleteResult);
    expect(deleteResult.acknowledged).toBe(true);
  });
});

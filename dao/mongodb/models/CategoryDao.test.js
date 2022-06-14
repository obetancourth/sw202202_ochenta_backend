const path = require('path');
const dotenv = require('dotenv');
const CategoriaDao = require('./CategoryDao');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const Connection = require('../Connection');

describe("Testing Categoria Crud in MongoDB", () => {
  const env = process.env;
  let db, CatDao, Cat;
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
});

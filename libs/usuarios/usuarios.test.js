const Usuario = require('./index.js');
const Conexion = require('../../dao/sqlite/Connection');
const UsuariosDao = require('../../dao/sqlite/models/UsuarioDao');
const fs = require('fs');


describe('Testing Usuarios CRUD', ()=>{
  const env = process.env;
  let db, UsrDao, Usr;
  // Dado que .... al ejecutar | procesar | activar .... se espera que .....
  beforeAll(async ()=>{
    jest.resetModules();
    process.env = {
      ...env,
      SQLITE_DB:"ochentaapp_user_test.db",
      SQLITE_SETUP: 1
    }
    db = await Conexion.getDB();
    UsrDao = new UsuariosDao(db);
    Usr = new Usuario(UsrDao);
    await Usr.init();

    await Usr.addUsuarios(
      { email : "test1@prueba.com", nombre : "Test 1", avatar : "testAvatar1", password : "nondisclose1", estado : "ACT" }
    );
    await Usr.addUsuarios(
      { email: "test2@prueba.com", nombre: "Test 2", avatar: "testAvatar2", password: "nondisclose2", estado: "ACT" }
    );
    await Usr.addUsuarios(
      { email: "test3@prueba.com", nombre: "Test 3", avatar: "testAvatar3", password: "nondisclose3", estado: "ACT" }
    );
    return true;
  });
  afterAll(async ()=>{
    db.close();
    fs.unlinkSync(`data/${process.env.SQLITE_DB}`);
    process.env = env;
    return true;
  });

  test('Usuarios insertOne', async ()=>{
    const result = await Usr.addUsuarios(
      { email: "test3@prueba.com", nombre: "Test 3", avatar: "testAvatar3", password: "nondisclose3", estado: "ACT" }
    );
    expect(result.id).toBeGreaterThanOrEqual(1);
  });

  test('Usuarios getAll Records', async ()=>{
    const results = await Usr.getUsuarios();
    expect(results.length).toBeGreaterThan(1);
  });

  test('Usuarios updateOne Record', async ()=>{
    const record = await Usr.getUsuarioById({codigo:2});
    const updatedRecord = await Usr.updateUsuario({
      codigo:2,
      email: "test2_2@prueba.com",
      nombre: "Test 2 UPD",
      avatar: "testAvatar2_2",
      password: "nondisclose2_2",
      estado: "INA"
    });
    expect(updatedRecord?.nombre).toEqual(expect.stringContaining('UPD'));
  });

  test('Usuario DeleteOne', async ()=>{
    const result = await Usr.deleteUsuario({codigo:2});
    const deletedRecord = await Usr.getUsuarioById({codigo:2});
    expect(deletedRecord).not.toBeDefined();
  });

  test('Usuario password Crypted', async ()=>{});
  test('Usuario login ok', async ()=>{});
  test('Usuario login failed', async ()=>{});
  test('Usuario email duplicate', async ()=>{});
});

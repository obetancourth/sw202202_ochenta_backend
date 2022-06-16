const express = require('express');
const router = express.Router();
const Category = require('../../../../libs/categorias');
const CategoryDao = require('../../../../dao/mongodb/models/CategoryDao');
const catDao = new CategoryDao();
const cat = new Category(catDao);
cat.init();

router.get('/', async (req, res) => {
  // extraer y validar datos del request
  try {
    // devolver la ejecución el controlador de esta ruta
    const versionData = await cat.getCategoryVersion();
    return res.status(200).json(versionData);
  } catch ( ex ) {
    // manejar el error que pueda tirar el controlador
    console.error('Error Category', ex);
    return res.status(502).json({'error': 'Error Interno de Server'});
  }
}); // get /

router.get('/all', async (req, res) => {
  try {
    const categories = await cat.getCategories();
    return res.status(200).json(categories);
  } catch (ex) {
    console.error(ex);
    return res.status(501).json({error:'Error al procesar solicitud.'});
  }
});

router.get('/byid/:codigo', async (req, res) => {
  try {
    const {codigo} = req.params;
    if (!(/^(\d+)|([\da-f]{24})$/.test(codigo))){
      return res.status(400).json({
        error: 'Se espera un codigo numérico'
      });
    }
    const registro = await cat.getCategoryById({codigo});
    return res.status(200).json(registro);
  } catch (ex) {
    console.error(ex);
    return res.status(501).json({ error: 'Error al procesar solicitud.' });
  }
} );

router.post('/new', async (req, res) => {
  try {
    const {categoria = '', estado=''} = req.body;
    if (/^\s*$/.test(categoria)) {
      return res.status(400).json({
        error: 'Se espera valor de categoría'
      });
    }
    if (!(/^(ACT)|(INA)$/.test(estado))) {
      return res.status(400).json({
        error: 'Se espera valor de estado en ACT o INA'
      });
    }
    const newCategory = await cat.addCategory({categoria, estado});
    return res.status(200).json(newCategory);
  } catch(ex){
    console.error(ex);
    return res.status(502).json({error:'Error al procesar solicitud'});
  }
});

router.put('/update/:codigo', async (req, res)=>{
  try {
    const {codigo} = req.params;
    if (!(/^(\d+)|([\da-f]{24})$/.test(codigo))) {
      return res.status(400).json({error:'El codigo debe ser un dígito válido.'});
    }
    const {categoria, estado} = req.body;
    if (/^\s*$/.test(categoria)) {
      return res.status(400).json({
        error: 'Se espera valor de categoría'
      });
    }
    if (!(/^(ACT)|(INA)$/.test(estado))) {
      return res.status(400).json({
        error: 'Se espera valor de estado en ACT o INA'
      });
    }

    const updateResult = await cat.updateCategory({codigo, categoria, estado});

    if (!updateResult) {
      return res.status(404).json({error:'Categoria no encontrada.'});
    }
    return res.status(200).json({updatedCategory:updateResult});

  } catch(ex) {
    console.error(ex);
    res.status(500).json({error: 'Error al procesar solicitud.'});
  }
});


router.delete('/delete/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!(/^(\d+)|([\da-f]{24})$/.test(codigo))) {
      return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
    }

    const deletedCategory = await cat.deleteCategory({ codigo });

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Categoria no encontrada.' });
    }
    return res.status(200).json({ deletedCategory});

  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: 'Error al procesar solicitud.' });
  }
});

module.exports = router;

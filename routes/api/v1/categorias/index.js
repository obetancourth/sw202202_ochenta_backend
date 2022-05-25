const express = require('express');
const { getCategoryVersion, getCategories, addCategory } = require('../../../../libs/categorias');
const router = express.Router();

router.get('/', async (req, res) => {
  // extraer y validar datos del request
  try {
    // devolver la ejecución el controlador de esta ruta
    const versionData = await getCategoryVersion();
    return res.status(200).json(versionData);
  } catch ( ex ) {
    // manejar el error que pueda tirar el controlador
    console.error('Error Category', ex);
    return res.status(502).json({'error': 'Error Interno de Server'});
  }
}); // get /

router.get('/all', async (req, res) => {
  try {
    const categories = await getCategories();
    return res.status(200).json(categories);
  } catch (ex) {
    console.error(ex);
    return res.status(501).json({error:'Error al procesar solicitud.'});
  }
});

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
    const newCategory = await addCategory({categoria, estado});
    return res.status(200).json(newCategory);
  } catch(ex){
    console.error(ex);
    return res.status(502).json({error:'Error al procesar solicitud'});
  }
});


module.exports = router;

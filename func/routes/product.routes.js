const {getAllProduct, createProduct, getOneProduct, updateProduct, deleteProduct} = require('../controller/product.ctr')

const router = require('express').Router()

router.get('/get_products', getAllProduct)
router.get('/get_one_product/:id', getOneProduct)
router.post('/create_product', createProduct)
router.put('/update_product/:id', updateProduct)
router.delete('/delete_product/:id', deleteProduct)

module.exports = router
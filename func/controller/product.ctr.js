const pool = require("../config/db.config");

const getAllProduct = async (req, res) => {
  try {
    const products = await pool.query("select * from product");
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    let results = {}

    if(endIndex < products.rows.length){
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if(startIndex > 0){
        results.prev = {
            page: page - 1,
            limit: limit
        }
    }
    results.totalPages = Math.ceil(products.rows.length / limit)
    results.items = products.rows.slice(startIndex, endIndex)

    res.status(200).json(results);
  } catch (error) {
    console.log(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, category, description, quantity, price } = req.body;

    const product = await pool.query(
      `insert into product(title, category, description, quantity, price)
        values($1, $2, $3, $4, $5) returning *`,
      [title, category, description, quantity, price]
    );

    res.status(201).json({ message: "created product", product: product.rows });
  } catch (error) {
    console.log(error.message);
  }
};

const getOneProduct = async(req, res) => {
    try {
        const {id} = req.params
        const product = await pool.query('select * from product where id = $1', [id])
        if(product.rows.length === 0){
            return res.status(404).json({
                msg: `There is no product with id: ${id}`
            })
        }
        res.status(200).json(product.rows)
        
    } catch (error) {
        
    }
}

const updateProduct = async(req, res) => {
    try {
        const { title, category, description, quantity, price } = req.body;
        const {id} = req.params;
        
        const foundProduct = await pool.query('select * from product where id = $1', [id])
        if(foundProduct.rows.length === 0){
            return res.status(404).json({
                msg: `There is no product with id: ${id}`
            })
        }
        const product = await pool.query(
          `update product set title = $1, category = $2, description = $3, quantity = $4, price = $5 where id = $6 returning *`,
          [title, category, description, quantity, price, id]
        );
    
        res.status(200).json({ message: "updated product", product: product.rows });
      } catch (error) {
        console.log(error.message);
      }
}

const deleteProduct = async(req, res) => {
    try {
        const {id} = req.params;
        
        const foundProduct = await pool.query('select * from product where id = $1', [id])
        if(foundProduct.rows.length === 0){
            return res.status(404).json({
                msg: `There is no product with id: ${id}`
            })
        }
           
           await pool.query(
          `delete from product where id = $1`,[id]);
    
        res.status(200).json({ message: "deleted product"});
      } catch (error) {
        console.log(error.message);
      }
}

module.exports = { 
    getAllProduct,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
};

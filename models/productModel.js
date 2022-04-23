const connection = require('./connection');
const { 
  GetAllProducts, 
  GetByIdProduct, 
  CreateProduct, 
  UpdateProduct,
  DeleteProduct,
} = require('./querys');

const getAll = async () => {
  const [allProducts] = await connection.execute(GetAllProducts);

  return allProducts;
};

const getById = async (id) => {
  const [productById] = await connection.execute(GetByIdProduct, [id]);
  
  return productById[0];
};

const create = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute(CreateProduct, [name, quantity]);

  return { id: insertId, name, quantity };
};

const update = async ({ id, name, quantity }) => {
  await connection.execute(UpdateProduct, [name, quantity, id]);
  
  return { id, name, quantity };
};

const exclude = async (id) => {
  await connection.execute(DeleteProduct, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
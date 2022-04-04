const connection = require('./connection');
const { 
  GetById,
  UpdateQuantity,
  SumQuantity,
} = require('./querys');

// ================================ GET BY ID INVENTORY  ==================================
const getById = async (id) => {
  const [productById] = await connection.execute(GetById, [id]);
  return productById;
};

// ================================ CALCULATE QUANTITY INVENTORY  ==================================
const calculate = async (id, newProducts) => {
  const oldProducts = await getById(id);
  for (let index = 0; index < newProducts.length; index += 1) {
    const newQuantity = newProducts[index].quantity;
    const { productId } = newProducts[index];
    const oldQuantity = oldProducts[index].quantity;
    if (newQuantity > oldQuantity) {
      connection.execute(UpdateQuantity, [newQuantity, productId]);
    } 
    if (newQuantity < oldQuantity) {
      const diference = oldQuantity - newQuantity;
      connection.execute(UpdateQuantity, [diference, productId]);
    }
  }
};

// ================================ SUM QUANTITY INVENTORY  ==================================
const sum = async (id) => {
  const sales = await getById(id);
  await sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(SumQuantity, [quantity, productId]);
  });
};

// ================================ SUBTRACT QUANTITY INVENTORY  ==================================
const subtract = async (sales) => {
  await sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(SumQuantity, [quantity, productId]);
  });
};

module.exports = {
  calculate,
  subtract,
  sum,
};
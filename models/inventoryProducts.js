const connection = require('./connection');
const productModel = require('./productModel');
const { 
  GetById,
  UpdateQuantity,
  SumQuantity,
  SubtractQuantity,
} = require('./querys');

// ================================ GET BY ID INVENTORY  ==================================
const getById = async (id) => {
  const [productById] = await connection.execute(GetById, [id]);
  return productById;
};

// ================================ CALCULATE QUANTITY INVENTORY  ==================================
const calculate = async (id, newProducts) => {
  const oldProducts = await getById(id);
  const updateCalls = [];
  for (let index = 0; index < newProducts.length; index += 1) {
    const newQuantity = newProducts[index].quantity;
    const { productId } = newProducts[index];
    const oldQuantity = oldProducts[index].quantity;
    if (newQuantity > oldQuantity) {
      const subtractQuantity = connection.execute(UpdateQuantity, [newQuantity, productId]);
      updateCalls.push(subtractQuantity);
    } 
    if (newQuantity < oldQuantity) {
      const diference = oldQuantity - newQuantity;
      const sumQuantity = connection.execute(UpdateQuantity, [diference, productId]);
      updateCalls.push(sumQuantity);
    }
  }
  await Promise.all(updateCalls);
};

// ================================ SUM QUANTITY INVENTORY  ==================================
const sum = async (id) => {
  const sales = await getById(id);
  const sumCalls = [];
  await sales.forEach(async ({ productId, quantity }) => {
    const sumProducts = connection.execute(SumQuantity, [quantity, productId]);
    sumCalls.push(sumProducts); 
  });
  await Promise.all(sumCalls);
};

// ================================ SUBTRACT QUANTITY INVENTORY  ==================================
const subtract = async (sales) => {
  const subtractCalls = [];
  await sales.forEach(async ({ productId, quantity }) => {
    const subtractProducts = connection.execute(SubtractQuantity, [quantity, productId]);
    subtractCalls.push(subtractProducts);
  });
  await Promise.all(subtractCalls);
};

const validateQuantity = async (sales) => {
  const productCalls = [];
  sales.forEach(({ productId }) => {
    const product = productModel.getById(productId);
    productCalls.push(product);
  });
  const products = await Promise.all(productCalls);
  const resultValidateQuantity = sales.map((saleProduct, index) => {
    const inventoryProductQuantity = products[index].quantity;
    if (saleProduct.quantity > inventoryProductQuantity) return false;
    return true;
  });

  return resultValidateQuantity[0];
};

module.exports = {
  calculate,
  subtract,
  sum,
  validateQuantity,
};
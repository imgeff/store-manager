const connection = require('./connection');

// ================================ GET BY ID INVENTORY  ==================================
const getById = async (id) => {
  const queryGetById = `
  SELECT SP.product_id AS productId, SP.quantity, S.date
  FROM StoreManager.sales_products SP
  INNER JOIN StoreManager.sales S
  ON S.id = SP.sale_id
  WHERE SP.sale_id = ?
  ORDER BY SP.sale_id, SP.product_id;`;
  const [productById] = await connection.execute(queryGetById, [id]);
  return productById;
};

// ================================ CALCULATE QUANTITY INVENTORY  ==================================
const calculate = async (id, productId, quantity) => {
  const [sale] = await getById(id);
  if (quantity > sale.quantity) {
    const queryUpdateQuantity = `
    UPDATE StoreManager.products 
    SET quantity = quantity - ?
    WHERE id = ?;`;
    await connection.execute(queryUpdateQuantity, [quantity, productId]);
  } 
  if (quantity < sale.quantity) {
    const diference = sale.quantity - quantity;
    const queryUpdateQuantity = `
    UPDATE StoreManager.products 
    SET quantity = quantity + ?
    WHERE id = ?;`;
    await connection.execute(queryUpdateQuantity, [diference, productId]);
  }
};

// ================================ SUM QUANTITY INVENTORY  ==================================
const sum = async (id) => {
  const sales = await getById(id);
  const querySumQuantity = `
  UPDATE StoreManager.products 
  SET quantity = quantity + ?
  WHERE id = ?;`;
  await sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(querySumQuantity, [quantity, productId]);
  });
};

// ================================ SUBTRACT QUANTITY INVENTORY  ==================================
const subtract = async (sales) => {
  const querySumQuantity = `
  UPDATE StoreManager.products 
  SET quantity = quantity - ?
  WHERE id = ?;`;
  await sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(querySumQuantity, [quantity, productId]);
  });
};

module.exports = {
  calculate,
  subtract,
  sum,
};
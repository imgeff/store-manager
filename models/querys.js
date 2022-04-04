const GetAll = `
SELECT SP.sale_id AS saleId, SP.product_id AS productId, SP.quantity, S.date
FROM StoreManager.sales_products SP
INNER JOIN StoreManager.sales S
ON S.id = SP.sale_id
ORDER BY SP.sale_id, SP.product_id;`;

const GetById = `
SELECT SP.product_id AS productId, SP.quantity, S.date
FROM StoreManager.sales_products SP
INNER JOIN StoreManager.sales S
ON S.id = SP.sale_id
WHERE SP.sale_id = ?
ORDER BY SP.sale_id, SP.product_id;`;

const CreateSales = `
INSERT INTO StoreManager.sales(date) 
VALUES(NOW())`;

const CreateSalesProducts = `
INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) 
VALUES(?, ?, ?)`;

const UpdateSalesProducts = `
UPDATE StoreManager.sales_products
SET product_id = ?, quantity = ?
WHERE sale_id = ?;`;

const Delete = `
DELETE FROM StoreManager.sales
WHERE id = ?;`;

const UpdateQuantity = `
UPDATE StoreManager.products 
SET quantity = quantity + ?
WHERE id = ?;`;

const SumQuantity = `
  UPDATE StoreManager.products 
  SET quantity = quantity + ?
  WHERE id = ?;`;

module.exports = {
  GetAll,
  GetById,
  CreateSales,
  CreateSalesProducts,
  UpdateSalesProducts,
  Delete,
  UpdateQuantity,
  SumQuantity,
};
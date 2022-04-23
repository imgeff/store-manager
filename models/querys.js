// =================== PRODUCTS =====================
const GetAllProducts = 'SELECT * FROM products;';

const GetByIdProduct = 'SELECT * FROM products WHERE id = ?;';

const CreateProduct = 'INSERT INTO products(name, quantity) VALUES(?, ?)';

const UpdateProduct = `
UPDATE products
SET name = ?, quantity = ?
WHERE id = ?;`;

const DeleteProduct = `
DELETE FROM products
WHERE id = ?;`;

// =================== SALES =====================
const GetAllSales = `
SELECT SP.sale_id AS saleId, SP.product_id AS productId, SP.quantity, S.date
FROM sales_products SP
INNER JOIN sales S
ON S.id = SP.sale_id
ORDER BY SP.sale_id, SP.product_id;`;

const GetByIdSale = `
SELECT SP.product_id AS productId, SP.quantity, S.date
FROM sales_products SP
INNER JOIN sales S
ON S.id = SP.sale_id
WHERE SP.sale_id = ?
ORDER BY SP.sale_id, SP.product_id;`;

const CreateSales = `
INSERT INTO sales(date) 
VALUES(NOW())`;

const CreateSalesProducts = `
INSERT INTO sales_products(sale_id, product_id, quantity) 
VALUES(?, ?, ?)`;

const UpdateSalesProducts = `
UPDATE sales_products
SET product_id = ?, quantity = ?
WHERE sale_id = ?;`;

const DeleteSale = `
DELETE FROM sales
WHERE id = ?;`;

const UpdateQuantity = `
UPDATE products 
SET quantity = quantity + ?
WHERE id = ?;`;

const SumQuantity = `
  UPDATE products 
  SET quantity = quantity + ?
  WHERE id = ?;`;

const SubtractQuantity = `
UPDATE products 
SET quantity = quantity - ?
WHERE id = ?;`;

module.exports = {
  GetAllProducts,
  GetByIdProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetAllSales,
  GetByIdSale,
  CreateSales,
  CreateSalesProducts,
  UpdateSalesProducts,
  DeleteSale,
  UpdateQuantity,
  SumQuantity,
  SubtractQuantity,
};
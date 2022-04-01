// ===================== CREATE ===================
const newProduct = { name: 'produto', quantity: 10 };
const newSale = { productId: 'produto', quantity: 35 };
// ===================== GET ALL ===================
const date = '2022-03-30 15:22:38';
const allSales = [
  {
    saleId: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date,
    productId: 3,
    quantity: 15,
  },
];

const allProducts = [
  {
    id: 1,
    name: 'produto A',
    quantity: 10,
  },
  {
    id: 2,
    name: 'produto B',
    quantity: 20,
  },
];
// ===================== GET BY ID ===================
const saleForId = [
  {
    date: '2022-03-30 15:22:38',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2022-03-30 15:22:38',
    productId: 2,
    quantity: 10,
  },
];

const product = {
  id: 1,
  name: 'produto A',
  quantity: 10,
};

module.exports = {
  product,
  newProduct,
  allProducts,
  newSale,
  allSales,
  saleForId,
};
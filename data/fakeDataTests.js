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

const allSales = [
  {
    saleId: 1,
    date: '2022-03-30 15:22:38',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2022-03-30 15:22:38',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2022-03-30 15:22:38',
    productId: 3,
    quantity: 15,
  },
];

const product = {
  id: 1,
  name: 'produto A',
  quantity: 10,
};

module.exports = {
  product,
  allProducts,
  allSales,
};
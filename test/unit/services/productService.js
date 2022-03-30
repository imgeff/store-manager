const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const fakeData = require('../../../data/fakeDataTests');

describe('Função getAll em ProductService', () => {
  before(() => {
    sinon.stub(productModel, 'getAll').resolves(fakeData.allProducts);
  })

  after(() => {
    productModel.getAll.restore();
  })

  it('Retorna lista de todos os produtos', async () => {
    const resultgetAll = await productService.getAll();
    expect(resultgetAll).to.be.deep.equal(fakeData.allProducts);
  })
});

// describe('Função getById em ProductModel caso encontre o produto', () => {
//   before(() => {
//     sinon.stub(connection, 'execute').resolves([fakeData.product]);
//   })

//   after(() => {
//     connection.execute.restore();
//   })

//   it('Retorna um objeto', async () => {
//     const resultgetById = await productModel.getById(1);
//     expect(resultgetById).to.be.a('object');
//   })

//   it('Retorna o objeto correto', async () => {
//     const resultgetById = await productModel.getById(1);
//     expect(resultgetById).to.have.own.property('id', 1);
//   })
// })

// describe('Função getById em ProductModel caso não encontre o produto', () => {
//   before(() => {
//     sinon.stub(connection, 'execute').resolves([{}]);
//   })

//   after(() => {
//     connection.execute.restore();
//   })

//   it('Retorna um objeto vazio', async () => {
//     const resultgetById = await productModel.getById(22);
//     expect(resultgetById).to.be.empty;
//   })

// })

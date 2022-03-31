const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const saleModel = require('../../../models/saleModel');
const fakeData = require('../../../data/fakeDataTests');

// ===================== GET ALL ===================

describe('Função getAll em saleModel', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([fakeData.allSales]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna lista de todas as Vendas', async () => {
    const resultgetAll = await saleModel.getAll();
    expect(resultgetAll).to.be.equal(fakeData.allSales);
  })
});

// ===================== GET BY ID SUCESS ===================

// describe('Função getById em ProductModel caso encontre o produto', () => {
//   before(() => {
//     sinon.stub(connection, 'execute').resolves([[fakeData.product]]);
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

// ===================== GET BY ID FAIL ===================

// describe('Função getById em ProductModel caso não encontre o produto', () => {
//   before(() => {
//     sinon.stub(connection, 'execute').resolves([[{}]]);
//   })

//   after(() => {
//     connection.execute.restore();
//   })

//   it('Retorna um objeto vazio', async () => {
//     const resultgetById = await productModel.getById(22);
//     expect(resultgetById).to.be.empty;
//   })

// })

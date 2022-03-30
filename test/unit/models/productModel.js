const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');

const fakeAllProducts = [
  {
    id: 1,
    name: "produto A",
    quantity: 10
  },
  {
    id: 2,
    name: "produto B",
    quantity: 20
  }
];

describe('Função getAll em MODELS', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([fakeAllProducts]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna lista de todos os produtos', async () => {
    const resultgetAll = await productModel.getAll();
    expect(resultgetAll).to.be.equal(fakeAllProducts);
  })
})
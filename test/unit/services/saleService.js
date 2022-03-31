const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');
const fakeData = require('../../../data/fakeDataTests');
const { notFound } = require('../../../data/errorMessage');

// ===================== GET ALL ===================

describe('Função getAll em saleService', () => {
  before(() => {
    sinon.stub(saleModel, 'getAll').resolves(fakeData.allSales);
  })

  after(() => {
    saleModel.getAll.restore();
  })

  it('Retorna lista de todas as vendas', async () => {
    const resultgetAll = await saleService.getAll();
    expect(resultgetAll).to.be.deep.equal(fakeData.allSales);
  })
});

// ===================== GET BY ID SUCESS ===================

describe('Função getById em saleService caso encontre o produto', () => {
  before(() => {
    sinon.stub(saleModel, 'getById').resolves(fakeData.saleForId);
  })

  after(() => {
    saleModel.getById.restore();
  })

  it('Retorna um objeto com as chaves code e content', async () => {
    const resultgetById = await saleService.getById(1);
    expect(resultgetById).to.have.property('code');
    expect(resultgetById).to.have.property('content');
  })

  it('Retorna o objeto correto', async () => {
    const resultgetById = await saleService.getById(1);
    expect(resultgetById).to.have.own.property('code', 200);
    expect(resultgetById).to.have.own.property('content', fakeData.saleForId);
  })
})

// ===================== GET BY ID FAIL ===================

describe('Função getById em saleService caso não encontre o produto', () => {
  before(() => {
    sinon.stub(saleModel, 'getById').resolves([]);
  })

  after(() => {
    saleModel.getById.restore();
  })

  it('Retorna um objeto com code 404 e content { message: "Sale not found" }', async () => {
    const resultgetById = await saleService.getById(22);
    expect(resultgetById.code).to.be.equal(404);
    expect(resultgetById.content).to.be.deep.equal(notFound('Sale'));
  })

})

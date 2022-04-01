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

describe('Função getById em saleModel caso encontre o produto', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([fakeData.saleForId]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna uma lista de vendas filtradas por id', async () => {
    const resultgetById = await saleModel.getById(1);
    const allSaleForId = fakeData.allSales.filter((sale) => {
      const filter = sale.saleId === 1
      delete sale.saleId;
      return filter;
    });
    expect(resultgetById).to.have.length(2);
    expect(allSaleForId).to.be.deep.equal(resultgetById);
  })

})

// ===================== GET BY ID FAIL ===================

describe('Função getById em saleModel caso não encontre o produto', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[]]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna um array vazio', async () => {
    const resultgetById = await saleModel.getById(22);
    expect(resultgetById).to.be.empty;
  })

})

// ===================== CREATE ===================

describe('Função create em saleModel', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna a venda criada', async () => {
    const resultcreate = await saleModel.create(fakeData.newSale);
    expect(resultcreate).to.be.deep.equal({ saleId: 3, ...fakeData.newSale });
  })
})

// ===================== DELETE ===================

describe('Função delete em saleModel', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 0 }]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('A função exclude retorna undefinned', async () => {
    const resultDelete = await saleModel.exclude(4);
    expect(resultDelete).to.be.undefined;
  })

})
const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');
const search = require('../../../helpers/search')
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

// ===================== CREATE ===================

describe('Função create em saleService', () => {
  before(() => {
    sinon.stub(saleModel, 'create').resolves({ id: 3, itemsSold: [fakeData.newSale] });
  })

  after(() => {
    saleModel.create.restore()
  })

  it('Retorna um objeto com code 201 e content com a venda criada', async () => {
    const resultgetById = await saleService.create([fakeData.newSale]);
    expect(resultgetById.code).to.be.equal(201);
    expect(resultgetById.content).to.be.deep.equal({ id: 3, itemsSold: [fakeData.newSale] });
  })

})

// ===================== UPDATE ===================

describe('Função update em saleService', () => {
  before(() => {
    sinon.stub(saleModel, 'update').resolves({ saleId: 4, itemUpdated: [fakeData.newSale] });
  })

  after(() => {
    saleModel.update.restore();
  })

  it('Retorna um objeto com code 200 e content com o objeto atualizado', async () => {
    const resultUpdate = await saleService.update({ id: 4, ...fakeData.newSale });
    expect(resultUpdate.code).to.be.equal(200);
    expect(resultUpdate.content).to.be.deep.equal({ saleId: 4, itemUpdated: [fakeData.newSale] });
  })

})

// ===================== DELETE CASO ENCONTRE A VENDA ===================

describe('Função exclude em saleService quando encontra a venda', () => {
  before(() => {
    sinon.stub(saleModel, 'exclude').resolves(undefined);
    sinon.stub(search, 'sales').resolves(true);
  })

  after(() => {
    saleModel.exclude.restore();
    search.sales.restore();
  })

  it('Retorna um objeto com code 204 e content com undefinned', async () => {
    const resultDelete = await saleService.exclude(1);
    expect(resultDelete.code).to.be.equal(204);
    expect(resultDelete.content).to.be.undefined;
  })

})

// ===================== DELETE CASO NÃO ENCONTRE A VENDA ===================

describe('Função exclude em saleService quando não encontra a venda', () => {
  before(() => {
    sinon.stub(search, 'sales').resolves(false);
  })

  after(() => {
    search.sales.restore();
  })

  it('Retorna um objeto com code 404 e content com { message: "Sale not found" }', async () => {
    const resultUpdate = await saleService.exclude(5);
    expect(resultUpdate.code).to.be.equal(404);
    expect(resultUpdate.content).to.be.deep.equal({ message: 'Sale not found' });
  })

})
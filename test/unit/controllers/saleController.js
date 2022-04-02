const sinon = require('sinon');
const { expect } = require('chai');
const saleService = require('../../../services/saleService');
const saleController = require('../../../controllers/saleController');
const fakeData = require('../../../data/fakeDataTests');
const { notFound } = require('../../../data/errorMessage');

const request = {}
const response = {}

// ===================== GET ALL ===================

describe('Função getAll em saleController', () => {
  before(() => {
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(saleService, 'getAll').resolves(fakeData.allSales);
  })

  after(() => {
    saleService.getAll.restore();
  })

  it('Retorna resposta com status 200 e a lista de todos os produtos', async () => {
    await saleController.getAll(request, response);
    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(fakeData.allSales)).to.be.true;
  })
});

// ===================== GET BY ID SUCESS ===================

describe('Função getById em saleController caso encontre o produto', () => {
  before(() => {
    request.params = { id: 1 }
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(saleService, 'getById').resolves({ code: 200, content: fakeData.saleForId });
  })

  after(() => {
    saleService.getById.restore();
  })

  it('Retorna uma resposta com status 200 e as vendas encontradas', async () => {
    await saleController.getById(request, response);
    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(fakeData.saleForId)).to.be.true;
  })
})

// ===================== GET BY ID FAIL ===================

describe('Função getById em saleController caso não encontre o produto', () => {
  before(() => {
    request.params = { id: 2 };
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(saleService, 'getById').resolves({ code: 404, content: notFound('Sale') });
  })

  after(() => {
    saleService.getById.restore();
  })

  it('Retorna um objeto com code 404 e content { message: "Sale not found" }', async () => {
    await saleController.getById(request, response);
    expect(response.status.calledWith(404)).to.be.true;
    expect(response.json.calledWith(notFound('Sale'))).to.be.true;
  })

})

// ===================== CREATE ===================

describe('Função create em saleController', () => {
  before(() => {
    request.body = [{ name: 'produto', quantity: 10 }];
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(saleService, 'create').resolves({ code: 201, content: { id: 4, itemsSold: [fakeData.newSale] } });
  })

  after(() => {
    saleService.create.restore();
  })

  it('Retorna uma resposta com status 201 e a venda criada', async () => {
    await saleController.create(request, response);
    expect(response.status.calledWith(201)).to.be.true;
    expect(response.json.calledWith({ id: 4, itemsSold: [fakeData.newSale] })).to.be.true;
  })

})

// ===================== UPDATE ===================

describe('Função update em saleController', () => {
  before(() => {
    request.params = { id: 1 };
    request.body = [{ productId: 1, quantity: 6 }];
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(saleService, 'update').resolves({ code: 200, content: { saleId: 1, itemUpdated: [fakeData.newSale] } });
  })

  after(() => {
    saleService.update.restore();
  })

  it('Retorna uma resposta com status 200 e o produto atualizado', async () => {
    await saleController.update(request, response);
    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith({ saleId: 1, itemUpdated: [fakeData.newSale] })).to.be.true;
  })

})

// ===================== DELETE CASO ENCONTRE A VENDA ===================

describe('Função exclude em saleController caso encontre a venda', () => {
  before(() => {
    request.params = { id: 4 };
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(saleService, 'exclude').resolves({ code: 204, content: undefined });
  })

  after(() => {
    saleService.exclude.restore();
  })

  it('Retorna uma resposta com status 204 sem corpo', async () => {
    await saleController.exclude(request, response);
    expect(response.status.calledWith(204)).to.be.true;
    expect(response.json.calledWith(undefined)).to.be.true;
  })

})

// ===================== DELETE CASO NÃO ENCONTRE O PRODUTO ===================

describe('Função exclude em saleController caso não encontre a venda', () => {
  before(() => {
    request.params = { id: 5 };
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(saleService, 'exclude').resolves({ code: 404, content: { message: 'Product not found' } });
  })

  after(() => {
    saleService.exclude.restore();
  })

  it('Retorna uma resposta com status 404 e a mensagem de erro', async () => {
    await saleController.exclude(request, response);
    expect(response.status.calledWith(404)).to.be.true;
    expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
  })

})
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
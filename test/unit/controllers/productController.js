const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const fakeData = require('../../../data/fakeDataTests');
const { notFound } = require('../../../data/errorMessage');

const request = {}
const response = {}

// ===================== GET ALL ===================

describe('Função getAll em ProductController', () => {
  before(() => {
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(productService, 'getAll').resolves(fakeData.allProducts);
  })

  after(() => {
    productService.getAll.restore();
  })

  it('Retorna resposta com status 200 e a lista de todos os produtos', async () => {
    await productController.getAll(request, response);
    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(fakeData.allProducts)).to.be.true;
  })
});

// ===================== GET BY ID SUCESS ===================

describe('Função getById em ProductController caso encontre o produto', () => {
  before(() => {
    request.params = { id: 1 }
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(productService, 'getById').resolves({ code: 200, content: fakeData.product });
  })

  after(() => {
    productService.getById.restore();
  })

  it('Retorna uma resposta com status 200 e o produto encontrado', async () => {
    await productController.getById(request, response);
    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(fakeData.product)).to.be.true;
  })
})

// ===================== GET BY ID FAIL ===================

describe('Função getById em ProductController caso não encontre o produto', () => {
  before(() => {
    request.params = { id: 2 };
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    sinon.stub(productService, 'getById').resolves({ code: 404, content: notFound });
  })

  after(() => {
    productService.getById.restore();
  })

  it('Retorna um objeto com code 404 e content { message: "Product not found" }', async () => {
    await productController.getById(request, response);
    expect(response.status.calledWith(404)).to.be.true;
    expect(response.json.calledWith(notFound)).to.be.true;
  })

})
const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const fakeData = require('../../../data/fakeDataTests');

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

// describe('Função getById em ProductService caso encontre o produto', () => {
//   before(() => {
//     sinon.stub(productModel, 'getById').resolves(fakeData.product);
//   })

//   after(() => {
//     productModel.getById.restore();
//   })

//   it('Retorna um objeto com as chaves code e content', async () => {
//     const resultgetById = await productService.getById(1);
//     expect(resultgetById).to.have.property('code');
//     expect(resultgetById).to.have.property('content');
//   })

//   it('Retorna o objeto correto', async () => {
//     const resultgetById = await productService.getById(1);
//     expect(resultgetById).to.have.own.property('code', 200);
//     expect(resultgetById).to.have.own.property('content', fakeData.product);
//   })
// })

// ===================== GET BY ID FAIL ===================

// describe('Função getById em ProductService caso não encontre o produto', () => {
//   before(() => {
//     sinon.stub(productModel, 'getById').resolves({});
//   })

//   after(() => {
//     productModel.getById.restore();
//   })

//   it('Retorna um objeto com code 404 e content { message: "Product not found" }', async () => {
//     const resultgetById = await productService.getById(22);
//     const notFound = { message: 'Product not found' };
//     expect(resultgetById.code).to.be.equal(404);
//     expect(resultgetById.content).to.be.deep.equal(notFound);
//   })

// })
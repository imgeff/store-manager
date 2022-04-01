const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const verifyDuplicates = require('../../../helpers/verifyDuplicates');
const fakeData = require('../../../data/fakeDataTests');
const { notFound } = require('../../../data/errorMessage');

// ===================== GET ALL ===================

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

// ===================== GET BY ID SUCESS ===================

describe('Função getById em ProductService caso encontre o produto', () => {
  before(() => {
    sinon.stub(productModel, 'getById').resolves(fakeData.product);
  })

  after(() => {
    productModel.getById.restore();
  })

  it('Retorna um objeto com as chaves code e content', async () => {
    const resultgetById = await productService.getById(1);
    expect(resultgetById).to.have.property('code');
    expect(resultgetById).to.have.property('content');
  })

  it('Retorna o objeto correto', async () => {
    const resultgetById = await productService.getById(1);
    expect(resultgetById).to.have.own.property('code', 200);
    expect(resultgetById).to.have.own.property('content', fakeData.product);
  })
})

// ===================== GET BY ID FAIL ===================

describe('Função getById em ProductService caso não encontre o produto', () => {
  before(() => {
    sinon.stub(productModel, 'getById').resolves(undefined);
  })

  after(() => {
    productModel.getById.restore();
  })

  it('Retorna um objeto com code 404 e content { message: "Product not found" }', async () => {
    const resultgetById = await productService.getById(22);
    expect(resultgetById.code).to.be.equal(404);
    expect(resultgetById.content).to.be.deep.equal(notFound('Product'));
  })

})

// ===================== CREATE QUANDO NÃO HÁ OUTRO PRODUTO IGUAL===================

describe('Função create em ProductService caso não tenha produto igual', () => {
  before(() => {
    sinon.stub(verifyDuplicates, 'products').resolves(false);
    sinon.stub(productModel, 'create').resolves({ id: 4, ...fakeData.newProduct });
  })

  after(() => {
    verifyDuplicates.products.restore();
    productModel.create.restore()
  })

  it('Retorna um objeto com code 201 e content com o objeto criado', async () => {
    const resultgetById = await productService.create(fakeData.newProduct);
    expect(resultgetById.code).to.be.equal(201);
    expect(resultgetById.content).to.be.deep.equal({ id: 4, ...fakeData.newProduct });
  })

})

// ===================== CREATE QUANDO HÁ OUTRO PRODUTO IGUAL ===================

describe('Função create em ProductService caso tenha produto igual', () => {
  before(() => {
    sinon.stub(verifyDuplicates, 'products').resolves(true);
  })

  after(() => {
    verifyDuplicates.products.restore();
  })

  it('Retorna um objeto com code 409 e content com { message: "Product already exists" }', async () => {
    const resultgetById = await productService.create(fakeData.newProduct);
    expect(resultgetById.code).to.be.equal(409);
    expect(resultgetById.content).to.be.deep.equal({ message: 'Product already exists' });
  })

})
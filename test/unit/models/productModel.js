const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');
const fakeData = require('../../../data/fakeDataTests');

// ===================== GET ALL ===================

describe('Função getAll em ProductModel', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([fakeData.allProducts]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna lista de todos os produtos', async () => {
    const resultgetAll = await productModel.getAll();
    expect(resultgetAll).to.be.equal(fakeData.allProducts);
  })
});

// ===================== GET BY ID ===================

describe('Função getById em ProductModel caso encontre o produto', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[fakeData.product]]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna um objeto', async () => {
    const resultgetById = await productModel.getById(1);
    expect(resultgetById).to.be.a('object');
  })

  it('Retorna o objeto correto', async () => {
    const resultgetById = await productModel.getById(1);
    expect(resultgetById).to.have.own.property('id', 1);
  })
})

describe('Função getById em ProductModel caso não encontre o produto', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[{}]]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna um objeto vazio', async () => {
    const resultgetById = await productModel.getById(22);
    expect(resultgetById).to.be.empty;
  })

})

// ===================== CREATE ===================

describe('Função create em ProductModel', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna o produto criado', async () => {
    const resultcreate = await productModel.create(fakeData.newProduct);
    expect(resultcreate).to.be.deep.equal({ id: 4, ...fakeData.newProduct });
  })

})

// ===================== UPDATE ===================

describe('Função update em ProductModel', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna o produto atualizado', async () => {
    const resultUpdate = await productModel.update({ id: 4, ...fakeData.newProduct });
    expect(resultUpdate).to.be.deep.equal({ id: 4, ...fakeData.newProduct });
  })

})

// ===================== DELETE ===================

describe('Função delete em ProductModel', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 0 }]);
  })

  after(() => {
    connection.execute.restore();
  })

  it('A função exclude retorna undefinned', async () => {
    const resultDelete = await productModel.exclude(4);
    expect(resultDelete).to.be.undefined;
  })

})
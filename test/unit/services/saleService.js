const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const productModel = require('../../../models/productModel');
const saleService = require('../../../services/saleService');
const search = require('../../../helpers/search')
const fakeData = require('../../../data/fakeDataTests');
const { notFound } = require('../../../data/errorMessage');
const inventoryProducts = require('../../../models/inventoryProducts');

describe('GET ALL SALES', () => {
  // ===================== FAKE DATA =======================
  const date = '2022-03-30 15:22:38';
  const allSales = [
    {
      saleId: 1,
      date,
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date,
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date,
      productId: 3,
      quantity: 15,
    },
  ];
  // ===================== GET ALL ===================
  describe('Lista todas as vendas', () => {
    before(() => {
      sinon.stub(saleModel, 'getAll').resolves(allSales);
    });
  
    after(() => {
      saleModel.getAll.restore();
    });
  
    it('Retorna lista de todas as vendas', async () => {
      const resultgetAll = await saleService.getAll();
      expect(resultgetAll).to.be.deep.equal(allSales);
    });
  });
});

describe('GET BY ID SALE', () => {
  // ===================== FAKE DATA =======================
  const saleForId = [
    {
      date: '2022-03-30 15:22:38',
      productId: 1,
      quantity: 5,
    },
    {
      date: '2022-03-30 15:22:38',
      productId: 2,
      quantity: 10,
    },
  ];
  // ===================== GET BY ID SUCESS =================== 
  describe('Caso encontre o produto', () => {
    before(() => {
      sinon.stub(saleModel, 'getById').resolves(saleForId);
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
      expect(resultgetById).to.have.own.property('content', saleForId);
    })
  })
  
  // ===================== GET BY ID FAIL ===================
  
  describe('Caso não encontre o produto', () => {
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

})

describe('UPDATE SALE', () => {
  // ===================== FAKE DATA =======================
  const newSale = { productId: 'produto', quantity: 35 };
  // ===================== UPDATE ===================
  describe('Atualiza venda passada como parâmetro na URL', () => {
    before(() => {
      sinon.stub(saleModel, 'update').resolves({ saleId: 4, itemUpdated: [newSale] });
    });
  
    after(() => {
      saleModel.update.restore();
    });
  
    it('Retorna um objeto com code 200 e content com o objeto atualizado', async () => {
      const resultUpdate = await saleService.update({ id: 4, ...newSale });
      expect(resultUpdate.code).to.be.equal(200);
      expect(resultUpdate.content).to.be.deep.equal({ saleId: 4, itemUpdated: [newSale] });
    });
  
  });
});

describe('DELETE SALE', () => {
  // ===================== DELETE CASO ENCONTRE A VENDA ===================
  describe('Quando encontra a venda', () => {
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
  
  });
  
  // ===================== DELETE CASO NÃO ENCONTRE A VENDA ===================
  describe('Quando não encontra a venda', () => {
    before(() => {
      sinon.stub(search, 'sales').resolves(false);
    });
  
    after(() => {
      search.sales.restore();
    });
  
    it('Retorna um objeto com code 404 e content com { message: "Sale not found" }', async () => {
      const resultUpdate = await saleService.exclude(5);
      expect(resultUpdate.code).to.be.equal(404);
      expect(resultUpdate.content).to.be.deep.equal({ message: 'Sale not found' });
    });
  
  });
});

describe('CREATE SALES', () => {
  // ===================== FAKE DATA =======================
  const sales = [{ productId: 2, quantity: 8 }];

  // ===================== CREATE SUCESS ===================
  describe('Caso haja produtos suficientes para venda', () => {
    before(() => {
      sinon.stub(productModel, 'getById').resolves({ id: 2, name: 'Traje de encolhimento', quantity: 8 });
      sinon.stub(saleModel, 'create').resolves({ id: 4, itemsSold: sales });
    });
  
    after(() => {
      productModel.getById.restore();
      saleModel.create.restore();
    });
  
    it('Retorna um objeto com a chave code sendo 201 e a chave content sendo a lista de vendas', async () => {
      const resultCreate = await saleService.create(sales);
      expect(resultCreate).to.be.deep.equal({ code: 201, content: { id: 4, itemsSold: sales } });
    });
  });
  
  // ===================== CREATE FAIL ===================
  describe('Caso não haja produtos suficientes para venda', () => {
    before(() => {
      sinon.stub(productModel, 'getById').resolves({ id: 2, name: 'Traje de encolhimento', quantity: 2 });
    });
  
    after(() => {
      productModel.getById.restore();
    });
  
    it('Retorna um objeto com a chave code sendo 422 e a chave content uma mensagem de erro', async () => {
      const resultCreate = await saleService.create(sales);
      expect(resultCreate).to.be.deep.equal({ code: 422, content: { message: 'Such amount is not permitted to sell' } });
    });
  });
});

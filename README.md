
# Store Manager
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

A API Restful Store Manager trata-se de um sistema de gerenciamento de vendas, onde é possível criar, visualizar, deletar e atualizar produtos e vendas.

# Desenvolvimento
A API foi desenvolvida com TDD, Eslint e utilizando a arquitetura MSC (Models, Services e Controllers)!
# Testes
Os Testes unitários foram desenvolvidos com **Chai**, **Mocha** e **Sinon**.
# Aprendizados
Nesse projeto, O grande desafio se tratava de desenvolver a aplicação em TDD, mas ao começar a desenvolver vi o quanto essa prática era positiva para a aplicação, fazendo com que a gente possa conhecer melhor o código que escrevemos além de dar uma segurança maior na hora de implementar algo novo ou corrigir algo.

# Habilidades
Nesse projeto também foi desenvolvido as seguintes as habilidades:

 - Entender o funcionamento da camada de Model;
 - Delegar responsabilidades específicas para essa camada;
 - Conectar a aplicação com diferentes bancos de dados;
 - Estruturar uma aplicação em camadas;
 - Delegar responsabilidades específicas para cada parte do app;
 - Melhorar manutenibilidade e reusabilidade do código;
 - Entender e aplicar os padrões REST;
 - Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

# Erros e Validações

Todos os retornos de erros seguem o mesmo formato:  
``{ message: <mensagem de erro> }``                                                     

As Validações de dados recebidos pela API foram feitas utilizando a biblioteca JOI;

# Restful

- Foi utilizado os verbos HTTP adequados para cada operação.

- URL agrupadas e padronizadas em cada recurso.

- Foi Garantido que todos endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não.

- Retorno com os códigos de status corretos (recurso criado, erro de validação, autorização, etc).



# Documentação

## Endpoints


### GET /products

- O endpoint é capaz de listar todos os produtos

- A API responde com uma estrutura semelhante a essa: 


**status: 200**

**body:**
```json
    [
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "produto B",
      "quantity": 20
    }
  ]
  ```

### GET `/products/:id`

- O endpoint é capaz de responder com o produto passado no parâmetro ``:id``;

- A API responde com uma estrutura semelhante a essa:

**status: 200**

**body:**

  ```json
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }
  ```

- Se o produto passado como parâmetro pelo `:id` não existir,será retornada uma resposta com status `404` e body:
    ``  { "message": "Product not found" }``

### GET `/sales`

lista todas as **Sales**(Vendas) e o retorno tem a seguinte estrutura:

**status: 200**

**body:**


  ```json
  [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]
  ```

### GET `/sales/:id`

- Retorna os detalhes da sale(venda) baseado no `id` da rota. A resposta tem o seguinte formato:

**status: 200**

**body:**

  ```json
  [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]
  ```

Se a venda não for encontrada, A API responderá com a seguinte estrutura:

**status: 404**

**body:**

```json
  { "message": "Sale not found" }
```

### POST `/products`

O endpoint cadastra um novo produto:

A requisição deve ser feita com uma estrutura semelhante a essa:


```json
  { "name": "produto", "quantity": 10 }
```

- `name` deve ser uma string com 5 ou mais caracteres

- `quantity` deve ser um numero inteiro maior que 0

- `name` e `quantity` são obrigatórios

Quando uma requisição é feita com `name` igual a um produto já cadastrado, A resposta terá a seguinte estrutura:

**status: 409**

**body:**

```json
  { "message": "Product already exists" }
```

Quando a requisição é feita corretamente, o produto é cadastrado e a resposta terá uma estrutura semelhante a essa:

**status: 201**

**body:**

```json
  { "id": 1, "name": "produto", "quantity": 10 }

```

### PUT `/products/:id`

Esse endpoint atualiza o produto passado no parâmetro `:id`

A requisição deve ter uma estrutura semelhante a essa:

```json
  { "name": "produto", "quantity": 15 }
```

Quando a requisição é feita corretamente o produto é atualizado e a resposta tem uma estrutura semelhante a essa:



**status: 404**

**body:**
```json
  { "id": 1, "name": "produto", "quantity": 15 }
```

Se o pruduto não existir a resposta terá a seguinte estrutura:

**status: 404**

**body:**

```json
  { "message": "Product not found" }
```

### DELETE `/products/:id`

Esse endpoint deleta o produto passado no parâmetro `:id`

Se o produto passado por parâmetro existir, o **status** será **204** e nenhum **body** será retornado.

Se o produto passado por parâmetro **NÃO** existir, a resposta terá a seguinte estrutura:

**status: 404**

**body:**

```json
  { "message": "Product not found" }
```
---

## IMPORTANTE

Cada venda cadastrada, atualizada ou excluída, tem relação direta com a quantidade do produto em questão no estoque.

Quando uma venda de um produto é feita com quantidade maior do que se tem disponível no estoque, a seguinte resposta será retornada:

**status: 422**

**body:**

```json
  { "message": "Such amount is not permitted to sell" }
```

### POST `/sales`

O endpoint cadastra uma nova venda:

A requisição pode ser feita com uma estrutura semelhante a essa para cadastrar a venda de umm produto:


```json
  [
    {
      "productId": 1,
      "quantity": 3
    }
  ]
```

E a resposta será essa:

**status: 201**

**body:**

```json
  {
    "id": 1,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 3
      }
    ]
  }
```

Ou pode ser semelhante a essa para cadastrar múltiplos produtos:

```json
  [
    {
      "productId": 1,
      "quantity": 3
    },
    {
      "productId": 2,
      "quantity": 8
    }
  ]
```

A resposta será essa:

**status: 201**

**body:**

```json
  {
    "id": 2,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 3
      },
      {
        "productId": 2,
        "quantity": 8
      }
    ]
  }
```

- `quantity` deve ser um numero inteiro maior que 0

- `productId` e `quantity` são obrigatórios

### PUT `/sales/:id`

Esse endpoint atualiza uma venda passada no parâmetro `:id`

A requisição deve ter uma estrutura semelhante a essa:

```json
  [
    {
      "productId": 1,
      "quantity": 6
    }
  ]
```

A resposta será essa:

**status: 200**

**body:**
  {
    "saleId": 1,
    "itemUpdated": [
      {
        "productId": 1,
        "quantity": 6
      }
    ]
  }

### DELETE `/sales/:id`

Esse endpoint deleta a venda passada no parâmetro `:id`

Se a venda passada por parâmetro existir, o **status** será **204** e nenhum **body** será retornado.

Se a venda passada por parâmetro **NÃO** existir, a resposta terá a seguinte estrutura:

**status: 404**

**body:**

```json
  { "message": "Sale not found" }
```

---
## Para rodar localmente

1. Clone o repositório
  * `git clone git@github.com:imgeff/store-manager.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd store-manager`

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o servidor:
    * `npm start`


    
## Stack utilizada

**Back-end:** Node.js, Express

**Testes:** Mocha, Chai, Sinon

## Feedback

Se você tiver algum feedback, por favor mande uma mensagem em  https://www.linkedin.com/in/imgeff/


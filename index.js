const express = require('express');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
require('dotenv').config();

const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

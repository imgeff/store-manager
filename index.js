const express = require('express');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/sales', saleRoutes);

app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const passwordRoutes = require('./CadastroLogin/routes/passwordRoutes');

const app = express();
const PORT = 3001;
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api', passwordRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

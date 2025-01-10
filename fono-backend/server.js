const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do Multer para o upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Endpoints
app.post('/upload', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  console.log(`Arquivo recebido: ${req.file.filename}`);
  res.send('Arquivo recebido com sucesso.');
});

// Servir arquivos estáticos
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

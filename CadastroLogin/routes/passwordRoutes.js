const express = require('express');
const router = express.Router();

// Mock de banco de dados
let users = [
  { email: 'usuario@example.com', password: '12345678' },
];

// Rota para redefinir senha
router.post('/update-password', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'E-mail e senha são obrigatórios.' });
  }

  // Encontra o usuário no banco de dados
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
  }

  // Atualiza a senha do usuário
  user.password = password;
  return res.status(200).json({ success: true, message: 'Senha atualizada com sucesso.' });
});

module.exports = router;

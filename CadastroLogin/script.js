// Lógica do Login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário para testar o login
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Aqui você pode adicionar a lógica de autenticação
    console.log('Email:', email);
    console.log('Senha:', senha);
});

// Lógica para navegação entre os botões de seleção de perfil
document.getElementById('patient-btn').addEventListener('click', function() {
    window.location.href = 'perfil-dados-pessoais.html'; // Navegar para o perfil de paciente
});

document.getElementById('professional-btn').addEventListener('click', function() {
    window.location.href = 'perfil-dados-pessoais.html'; // Navegar para o perfil de profissional
});

// Lógica do botão "Próximo" na tela de dados pessoais
document.getElementById('next-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmSenha = document.getElementById('confirm-senha').value;
    const agreeTerms = document.getElementById('agree-terms').checked;

    // Verifica se a senha e a confirmação de senha são iguais
    if (senha !== confirmSenha) {
        alert('As senhas não coincidem');
        return;
    }

    // Verifica se o usuário aceitou os termos
    if (!agreeTerms) {
        alert('Você precisa aceitar os termos de uso');
        return;
    }

    // Aqui você pode adicionar a lógica para prosseguir com os dados
    console.log('Dados pessoais:', email, senha);
});

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Referências de Elementos Globais ---
    const loginForm = document.getElementById("login-form");
    const loginScreen = document.getElementById("login-screen");
    const mainSystem = document.getElementById("main-system");
    const btnSair = document.getElementById("btn-sair");
    const menuItems = document.querySelectorAll(".menu-item");
    const viewContents = document.querySelectorAll(".view-content");

    // --- Botões de Acesso Rápido (Navegação entre Abas) ---
    const btnAdmin = document.getElementById("btn-admin");
    const btnOperador = document.getElementById("btn-operador");
    const btnCliente = document.getElementById("btn-cliente");

    // Credenciais simples (apenas para demo local)
    const VALID_USERNAME = 'stockfacil';
    const VALID_PASSWORD = '2003';
    let loggedIn = false;

    // Função utilitária para (des)habilitar botões de acesso rápido
    function setQuickAccessEnabled(enabled) {
        [btnAdmin, btnOperador, btnCliente].forEach(btn => {
            if (!btn) return;
            btn.disabled = !enabled;
            if (!enabled) btn.classList.add('disabled'); else btn.classList.remove('disabled');
        });
    }

    // Inicialmente bloqueia os botões rápidos até autenticar
    setQuickAccessEnabled(false);

    // Handlers que exigem autenticação
    function handleProtectedAction(action) {
        if (!loggedIn) {
            alert('Acesso negado. Informe usuário e senha para liberar os botões de acesso rápido.');
            // mostra a tela de login para o usuário se estiver oculta
            loginScreen.classList.remove('hidden');
            mainSystem.classList.add('hidden');
            const userInput = document.getElementById('username');
            if (userInput) userInput.focus();
            return;
        }
        action();
    }

    if (btnAdmin) {
        btnAdmin.addEventListener('click', (e) => {
            e.preventDefault();
            handleProtectedAction(() => {
                loginScreen.classList.add('hidden');
                mainSystem.classList.remove('hidden');
                document.body.style.backgroundColor = '#dcdcdc';
            });
        });
    }

    if (btnOperador) {
        btnOperador.addEventListener('click', (e) => {
            e.preventDefault();
            handleProtectedAction(() => {
                window.location.href = '../tela operador/operador.html';
            });
        });
    }

    if (btnCliente) {
        btnCliente.addEventListener('click', (e) => {
            e.preventDefault();
            handleProtectedAction(() => {
                window.location.href = '../tela cliente/cliente.html';
            });
        });
    }

    // --- Fluxo de Login / Logout ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita recarga da página

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            // Autenticação bem sucedida
            loggedIn = true;
            setQuickAccessEnabled(true);
            loginScreen.classList.add('hidden');
            mainSystem.classList.remove('hidden');
            document.body.style.backgroundColor = '#dcdcdc';
        } else {
            // Falha na autenticação
            alert('Usuário ou senha inválidos. Tente novamente.');
            loggedIn = false;
            setQuickAccessEnabled(false);
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    });

    btnSair.addEventListener('click', () => {
        // Logout: reseta estado de autenticação
        loggedIn = false;
        setQuickAccessEnabled(false);
        mainSystem.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        document.body.style.backgroundColor = '#0b1a24'; // Retorna fundo escuro
        // limpa campos de login
        const userInput = document.getElementById('username');
        const passInput = document.getElementById('password');
        if (userInput) userInput.value = '';
        if (passInput) passInput.value = '';
    });

    // --- Navegação entre as Telas (Abas da Sidebar) ---
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Remove classe ativa de todos os botões do menu
            menuItems.forEach(i => i.classList.remove("active"));
            // Adiciona classe ativa ao item clicado
            item.classList.add("active");

            // Oculta todas as views internas
            viewContents.forEach(view => view.classList.add("hidden"));

            // Mostra a view alvo selecionada no data-target
            const targetId = item.getAttribute("data-target");
            document.getElementById(targetId).classList.remove("hidden");
        });
    });

    // --- Dinâmica de Cadastro de Produto Simples ---
    const formCadastro = document.getElementById("form-cadastro-produto");
    const listaProdutosBody = document.getElementById("lista-produtos-body");
    let proximoId = 3; // Mock continua a partir do #02 já existente

    formCadastro.addEventListener("submit", (e) => {
        e.preventDefault();

        // Captura campos do formulário interno de cadastro
        const inputs = formCadastro.querySelectorAll("input");
        const nome = inputs[0].value;
        const qtd = inputs[1].value;

        // Cria nova linha simulada na tabela de produtos
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>#0${proximoId}</td>
            <td>${nome}</td>
            <td>${qtd}</td>
            <td>
                <button class="action-btn"><i class="fa-solid fa-power-off"></i></button>
                <button class="action-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
        `;

        listaProdutosBody.appendChild(novaLinha);
        proximoId++;

        // Reseta o formulário e avisa o usuário
        formCadastro.reset();
        alert("Produto cadastrado com sucesso! Verifique na aba 'Lista de Produtos'.");
    });
});
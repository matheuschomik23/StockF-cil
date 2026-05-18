document.addEventListener("DOMContentLoaded", () => {
    
    // --- Referências de Elementos Globais ---
    const loginForm = document.getElementById("login-form");
    const loginScreen = document.getElementById("login-screen");
    const mainSystem = document.getElementById("main-system");
    const btnSair = document.getElementById("btn-sair");
    const menuItems = document.querySelectorAll(".menu-item");
    const viewContents = document.querySelectorAll(".view-content");

    // --- Fluxo de Login / Logout ---
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recarga da página
        
        // Simulação simples de validação de acesso
        loginScreen.classList.add("hidden");
        mainSystem.classList.remove("hidden");
        document.body.style.backgroundColor = "#dcdcdc"; // Troca fundo para combinar com o painel
    });

    btnSair.addEventListener("click", () => {
        mainSystem.classList.add("hidden");
        loginScreen.classList.remove("hidden");
        document.body.style.backgroundColor = "#0b1a24"; // Retorna fundo escuro
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
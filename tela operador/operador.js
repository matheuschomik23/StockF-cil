document.addEventListener("DOMContentLoaded", () => {
    
    // --- Controle de Troca de Abas Laterais ---
    const menuItems = document.querySelectorAll(".menu-item");
    const tabContents = document.querySelectorAll(".tab-content");

    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            // Reseta links ativos
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            // Oculta views antigas
            tabContents.forEach(tab => tab.classList.add("hidden"));

            // Exibe a view selecionada
            const activeTabId = item.getAttribute("data-tab");
            document.getElementById(activeTabId).classList.remove("hidden");
        });
    });

    // --- Vinculação Direta: Botão Atualizar da Tabela -> Tela de Atualização ---
    const tableTriggers = document.querySelectorAll(".btn-trigger-update");
    tableTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            const numPedido = btn.getAttribute("data-pedido");
            const nomeCliente = btn.getAttribute("data-cliente");

            // Atualiza dinamicamente o título do formulário
            document.getElementById("view-pedido-title").textContent = `Pedido ${numPedido} — ${nomeCliente}`;

            // Simula clique de troca de aba para a tela de atualização
            document.querySelector('[data-tab="tab-atualizar"]').click();
        });
    });

    // --- Feedback do Envio de Alterações de Pedidos ---
    const formUpdate = document.getElementById("form-update-status");
    if (formUpdate) {
        formUpdate.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Status do pedido e rastreio atualizados com sucesso!");
            
            // Retorna ao painel de monitoramento principal
            document.querySelector('[data-tab="tab-painel"]').click();
        });
    }

    // --- Botão Sair (Logout) - Redireciona para Login ---
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "../../tela adm/index.html";
        });
    }
});
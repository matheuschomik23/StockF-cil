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

    // ========== FUNCIONALIDADE DE MODAIS PARA MOVIMENTAÇÕES ==========
    
    // --- Referências dos Modais ---
    const modalNovaEntrada = document.getElementById("modal-nova-entrada");
    const modalRegistrarSaida = document.getElementById("modal-registrar-saida");
    const btnNovaEntrada = document.querySelector(".btn-teal");
    const btnRegistrarSaida = document.querySelector(".btn-amber");
    const closeEntradaBtn = document.getElementById("close-entrada");
    const closeSaidaBtn = document.getElementById("close-saida");
    const cancelEntradaBtn = document.getElementById("cancel-entrada");
    const cancelSaidaBtn = document.getElementById("cancel-saida");
    const formNovaEntrada = document.getElementById("form-nova-entrada");
    const formRegistrarSaida = document.getElementById("form-registrar-saida");

    // --- Função para Abrir e Fechar Modais ---
    function abrirModal(modal) {
        modal.classList.remove("hidden");
    }

    function fecharModal(modal) {
        modal.classList.add("hidden");
    }

    // --- Eventos para Abrir Modais ---
    if (btnNovaEntrada) {
        btnNovaEntrada.addEventListener("click", () => {
            abrirModal(modalNovaEntrada);
        });
    }

    if (btnRegistrarSaida) {
        btnRegistrarSaida.addEventListener("click", () => {
            abrirModal(modalRegistrarSaida);
        });
    }

    // --- Eventos para Fechar Modais ---
    if (closeEntradaBtn) {
        closeEntradaBtn.addEventListener("click", () => {
            fecharModal(modalNovaEntrada);
        });
    }

    if (closeSaidaBtn) {
        closeSaidaBtn.addEventListener("click", () => {
            fecharModal(modalRegistrarSaida);
        });
    }

    if (cancelEntradaBtn) {
        cancelEntradaBtn.addEventListener("click", () => {
            fecharModal(modalNovaEntrada);
        });
    }

    if (cancelSaidaBtn) {
        cancelSaidaBtn.addEventListener("click", () => {
            fecharModal(modalRegistrarSaida);
        });
    }

    // Fechar ao clicar no overlay
    if (modalNovaEntrada) {
        modalNovaEntrada.addEventListener("click", (e) => {
            if (e.target === modalNovaEntrada) {
                fecharModal(modalNovaEntrada);
            }
        });
    }

    if (modalRegistrarSaida) {
        modalRegistrarSaida.addEventListener("click", (e) => {
            if (e.target === modalRegistrarSaida) {
                fecharModal(modalRegistrarSaida);
            }
        });
    }

    // --- Processar Formulário de Nova Entrada ---
    if (formNovaEntrada) {
        formNovaEntrada.addEventListener("submit", (e) => {
            e.preventDefault();

            const selects = formNovaEntrada.querySelectorAll("select");
            const inputs = formNovaEntrada.querySelectorAll("input[type='number']");
            const textareas = formNovaEntrada.querySelectorAll("textarea");

            const produto = selects[0].value;
            const quantidade = inputs[0].value;
            const observacao = textareas[0].value || "-";

            // Adiciona nova linha na tabela
            const tabela = document.querySelector("#tab-movimentacoes .data-table tbody");
            const novaLinha = document.createElement("tr");
            const hoje = new Date().toLocaleDateString("pt-BR");

            novaLinha.innerHTML = `
                <td>${hoje}</td>
                <td>${produto}</td>
                <td><span class="badge badge-entry">Entrada</span></td>
                <td class="text-success">+${quantidade} un.</td>
                <td class="text-right text-muted">Você</td>
            `;

            tabela.insertBefore(novaLinha, tabela.firstChild);

            // Feedback e limpeza
            alert(`✓ Entrada de ${quantidade} un. de "${produto}" registrada com sucesso!`);
            formNovaEntrada.reset();
            fecharModal(modalNovaEntrada);
        });
    }

    // --- Processar Formulário de Registrar Saída ---
    if (formRegistrarSaida) {
        formRegistrarSaida.addEventListener("submit", (e) => {
            e.preventDefault();

            const selects = formRegistrarSaida.querySelectorAll("select");
            const inputs = formRegistrarSaida.querySelectorAll("input[type='number']");
            const textareas = formRegistrarSaida.querySelectorAll("textarea");

            const produto = selects[0].value;
            const quantidade = inputs[0].value;
            const motivo = selects[1].value;
            const observacao = textareas[0].value || "-";

            // Adiciona nova linha na tabela
            const tabela = document.querySelector("#tab-movimentacoes .data-table tbody");
            const novaLinha = document.createElement("tr");
            const hoje = new Date().toLocaleDateString("pt-BR");

            novaLinha.innerHTML = `
                <td>${hoje}</td>
                <td>${produto}</td>
                <td><span class="badge badge-leave">Saída</span></td>
                <td class="text-danger">-${quantidade} un.</td>
                <td class="text-right text-muted">Você</td>
            `;

            tabela.insertBefore(novaLinha, tabela.firstChild);

            // Feedback e limpeza
            alert(`✓ Saída de ${quantidade} un. de "${produto}" (${motivo}) registrada com sucesso!`);
            formRegistrarSaida.reset();
            fecharModal(modalRegistrarSaida);
        });
    }
});
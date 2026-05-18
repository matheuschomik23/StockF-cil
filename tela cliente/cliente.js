document.addEventListener("DOMContentLoaded", () => {
    
    // --- Troca de Abas do Menu ---
    const navLinks = document.querySelectorAll(".nav-link:not(.logout-link)");
    const tabContents = document.querySelectorAll(".tab-content");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Desativa todos os links
            navLinks.forEach(l => l.classList.remove("active"));
            // Ativa o link atual
            link.classList.add("active");

            // Esconde todas as abas
            tabContents.forEach(content => content.classList.add("hidden"));

            // Mostra o container correspondente
            const targetTab = link.getAttribute("data-tab");
            document.getElementById(targetTab).classList.remove("hidden");
        });
    });

    // --- Efeito Recolher/Expandir Detalhes do Pedido ---
    const orderHeaders = document.querySelectorAll(".order-card .order-header");

    orderHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const card = header.parentElement;
            const icon = header.querySelector(".badge-status i");

            card.classList.toggle("closed");

            // Ajusta o ícone de seta dependendo se o card está aberto ou fechado
            if (card.classList.contains("closed")) {
                icon.className = "fa-solid fa-chevron-right";
            } else {
                icon.className = "fa-solid fa-chevron-down";
            }
        });
    });

    // --- Simulação do Envio de Cadastro ---
    const formCliente = document.getElementById("form-cliente");
    if(formCliente) {
        formCliente.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Cadastro realizado com sucesso!");
            // Redireciona visualmente para a vitrine
            document.querySelector('[data-tab="tab-produtos"]').click();
        });
    }
});
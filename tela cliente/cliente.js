// Carrinho Global para Armazenar Produtos
let cart = [
    { name: "Arroz Tio Urbano 5kg", price: 22.90, qty: 2 },
    { name: "Feijão Carioca 1kg", price: 7.00, qty: 3 },
    { name: "Óleo de Soja 900ml", price: 5.50, qty: 1 }
];

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector(".checkout-box");
    if (!cartItemsContainer) return;
    
    // Encontra o container de itens do carrinho
    const cartItems = cartItemsContainer.querySelector(".cart-item");
    if (!cartItems) return;
    
    // Limpa os itens anteriores (mantém apenas o título)
    const itemsWrapper = cartItemsContainer;
    const allCartItemElements = itemsWrapper.querySelectorAll(".cart-item:not(.cart-total)");
    allCartItemElements.forEach(el => el.remove());
    
    // Adiciona os novos itens
    let html = "";
    let total = 0;
    
    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        html += `
            <div class="cart-item">
                <div class="item-info">
                    <p class="item-title">${item.name}</p>
                    <span class="item-qty">Qtd: ${item.qty}</span>
                </div>
                <span class="item-price">R$ ${subtotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    // Adiciona o total
    html += `
        <div class="cart-total">
            <span>TOTAL</span>
            <span class="total-value">R$ ${total.toFixed(2)}</span>
        </div>
    `;
    
    // Insere o HTML após o título h3
    const h3 = cartItemsContainer.querySelector("h3");
    if (h3) {
        h3.insertAdjacentHTML("afterend", html);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Atualiza Contagem do Carrinho na Inicialização ---
    updateCartCount();
    
    // --- Botões Adicionar ao Carrinho ---
    const addCartButtons = document.querySelectorAll(".btn-add-cart:not([disabled])");
    
    addCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Captura informações do produto do card
            const productCard = button.closest(".product-card");
            const productName = productCard.querySelector("h3").textContent;
            const priceText = productCard.querySelector(".price").textContent;
            const price = parseFloat(priceText.replace("R$", "").trim());
            
            // Verifica se o produto já existe no carrinho
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({ name: productName, price: price, qty: 1 });
            }
            
            // Atualiza visuais
            updateCartCount();
            
            // Feedback visual
            const originalText = button.textContent;
            button.textContent = "✓ Adicionado!";
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "white";
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = "";
                button.style.color = "";
            }, 1500);
        });
    });
    
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
            
            // Atualiza carrinho quando a aba carrinho é aberta
            if (targetTab === "tab-carrinho") {
                updateCartDisplay();
            }
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

    // --- Botão Sair (Logout) - Redireciona para Login ---
    const logoutLink = document.querySelector(".logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "../../tela adm/index.html";
        });
    }
});
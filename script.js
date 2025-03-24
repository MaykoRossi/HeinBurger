document.addEventListener("DOMContentLoaded", () => {
    // Seleção de elementos do DOM
    const botoesAdicionar = document.querySelectorAll(".add-carrinho");
    const listaCarrinho = document.getElementById("itens-carrinho");
    const totalCarrinho = document.getElementById("total");
    const botaoFinalizar = document.getElementById("finalizar-compra");
    const botaoEsvaziar = document.getElementById("esvaziar-carrinho");
    const botaoCarrinho = document.getElementById("carrinho-btn");
    const carrinhoFlutuante = document.getElementById("carrinho-flutuante");
    const listaCarrinhoFlutuante = document.getElementById("itens-carrinho-flutuante");
    const totalCarrinhoFlutuante = document.getElementById("total-flutuante");
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");

    let carrinho = [];

    // Atualiza a exibição do carrinho
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = "";
        listaCarrinhoFlutuante.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            let li = document.createElement("li");
            li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

            let botaoRemover = document.createElement("button");
            botaoRemover.textContent = "Remover";
            botaoRemover.addEventListener("click", () => removerItemCarrinho(index));

            li.appendChild(botaoRemover);
            listaCarrinho.appendChild(li);

            let liFlutuante = li.cloneNode(true);
            listaCarrinhoFlutuante.appendChild(liFlutuante);

            total += item.preco;
        });

        totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
        totalCarrinhoFlutuante.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // Adiciona itens ao carrinho
    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", (event) => {
            let produto = event.target.closest(".produto");
            let nome = produto.getAttribute("data-nome");
            let preco = parseFloat(produto.getAttribute("data-preco"));
            carrinho.push({ nome, preco });
            atualizarCarrinho();
        });
    });

    // Remove um item específico do carrinho
    function removerItemCarrinho(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }

    // Esvazia o carrinho
    botaoEsvaziar.addEventListener("click", () => {
        carrinho = [];
        atualizarCarrinho();
    });

    // Finaliza a compra
    botaoFinalizar.addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        window.location.href = "checkout.html";
    });

    // Exibe/oculta o carrinho flutuante
    botaoCarrinho.addEventListener("click", () => {
        carrinhoFlutuante.style.display = carrinhoFlutuante.style.display === "block" ? "none" : "block";
    });

    botaoFecharCarrinho.addEventListener("click", () => {
        carrinhoFlutuante.style.display = "none";
    });

    // Exibe o botão do carrinho ao rolar a página no mobile
    window.addEventListener("scroll", () => {
        if (window.innerWidth <= 768) {
            botaoCarrinho.style.display = window.scrollY > 100 ? "flex" : "none";
        }
    });
});
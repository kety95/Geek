const containerProdutos = document.querySelector(".container-produtos");

// Carregar produtos e construir os cards
fetch("http://localhost:3000/Produtos")
    .then(response => response.json())
    .then(data => {
        data.forEach(elemento => {
            constroiCard(elemento.urlImagem, elemento.titulo, elemento.preco, elemento.id); // Inclua o id do produto
        });
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });

// Função para construir o card do produto
function constroiCard(urlImagem, titulo, preco, id) {
    const cardProduto = document.createElement('div');
    cardProduto.classList.add('card-produto', 'mt-5');

    cardProduto.innerHTML = `
        <img src="${urlImagem}" alt="" class="card-produto__img-produto">
        <div class="card-produto__legenda">
            <p class="card-produto__nome-produto">${titulo}</p>
            <span class="card-produto__detalhes">
                <span class="card-produto__preco">
                    <span>$</span>
                    <p class="card-produto__preco-produto">${preco}</p>
                </span>
                <img src="img/🦆 icon _trash 2_.png" alt="ícone de lixeira" class="card-produto__icone-lixeira" data-id="${id}">
            </span>
        </div>
    `;

    const imagemProduto = cardProduto.querySelector('.card-produto__img-produto');
    imagemProduto.style.width = '50%';

    containerProdutos.appendChild(cardProduto);
}

// Captura o evento de clique na lixeira e exclui o produto
containerProdutos.addEventListener('click', event => {
    if (event.target.classList.contains('card-produto__icone-lixeira')) {
        const id = event.target.getAttribute('data-id');
        excluirProduto(id);
    }
});

function excluirProduto(id) {
    fetch(`http://localhost:3000/Produtos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao excluir produto: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Produto excluído com sucesso:', data);
        carregarProdutos(); 
    })
    .catch(error => {
        console.error('Erro ao excluir o produto:', error);
    });
}

function carregarProdutos() {
    // Limpa a lista de produtos e carrega novamente
    containerProdutos.innerHTML = '';
    fetch("http://localhost:3000/Produtos")
        .then(response => response.json())
        .then(data => {
            data.forEach(elemento => {
                constroiCard(elemento.urlImagem, elemento.titulo, elemento.preco, elemento.id);
            });
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}

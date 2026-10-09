// ===== DADOS =====
const nomeLoja = "Informática Top";
const produtos = [
    {nome: "Notebook", categoria: "Eletrônicos", preco: 3500.00, quantidade: 4, vendidos: 2},
    {nome: "Mouse", categoria: "Eletrônicos", preco: 50.00, quantidade: 20, vendidos: 15},
    {nome: "Teclado", categoria: "Eletrônicos", preco: 150.00, quantidade: 10, vendidos: 7},
    {nome: "Capa de Celular", categoria: "Acessórios", preco: 30.00, quantidade: 50, vendidos: 25},
    {nome: "Fone de Ouvido", categoria: "Eletrônicos", preco: 200.00, quantidade: 15, vendidos: 10},
    {nome: "Cabo USB", categoria: "Acessórios", preco: 20.00, quantidade: 100, vendidos: 60},
    {nome: "Monitor", categoria: "Eletrônicos", preco: 800.00, quantidade: 4, vendidos: 2}
];

// ===== FUNÇÕES =====
function listarProdutos(produtos) {
    console.log(`Produtos disponíveis na loja ${nomeLoja}:`);
    let i = 0;
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        console.log(`${i + 1}. ${produto.nome} | ${produto.categoria}: R$ ${produto.preco.toFixed(2)} | Quantidade: ${produto.quantidade} | Vendidos: ${produto.vendidos}`);
    }
}

function cadastrarProduto(produtos, nome, categoria, preco, quantidade) {
    const novoProduto = {
        nome: nome,
        categoria: categoria,
        preco: preco,
        quantidade: quantidade,
        vendidos: 0
    };
    novoProduto.nome = formatarNome(novoProduto.nome);
    produtos.push(novoProduto);
    console.log(`Produto cadastrado! Agora a loja tem ${produtos.length} produtos.`);
}

function calcularValorEstoque(produtos) {
    let valorTotal = 0;
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        valorTotal += produto.preco * produto.quantidade;
    }
    console.log(`Valor total do estoque: R$ ${valorTotal.toFixed(2)}`);
    return valorTotal;
}

function buscarProduto(produtos, termo) {
    const resultados = produtos.filter(produto => produto.nome.toLowerCase().includes(termo.toLowerCase()));
    if (resultados.length > 0) {
        console.log(`Encontrado: "${resultados[0].nome}"`);
        resultados.forEach(produto => {
            console.log(`- ${produto.nome} | ${produto.categoria}: R$ ${produto.preco.toFixed(2)} | Quantidade: ${produto.quantidade} | Vendidos: ${produto.vendidos}`);
        });
        return resultados[0];
    } else {
        console.log(`Produto não encontrado.`);
        return null;
    }
}

function produtosEmFalta(produtos, minimo) {
    const produtosFaltando = [];
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        if (produto.quantidade < minimo) {
            produtosFaltando.push(produto);
        }
    }
    console.log(`Produtos com menos que ${minimo} unidades: ${produtosFaltando.length}`);
    return produtosFaltando.length;
}

function aplicarDesconto(produtos, categoria, percentual) {
    const produtosComDesconto = [];
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        if (produto.categoria === categoria) {
            produto.preco -= produto.preco * percentual / 100;
            produtosComDesconto.push(produto);
        }
    }
    console.log(`${produtosComDesconto.length} produtos receberam desconto.`);
    for (let i = 0; i < produtosComDesconto.length; i++) {
        if (produtosComDesconto[i].categoria === categoria) {
            console.log(`Novo preço do ${produtosComDesconto[i].nome}: R$ ${produtosComDesconto[i].preco.toFixed(2)}`);
        }
    }
}

function venderProduto(produtos, nome, quantidade) {
    const produtoEncontrado = buscarProduto(produtos, nome);
    if (!produtoEncontrado) {
        return;
    }

    if (produtoEncontrado.quantidade < quantidade) {
        console.log(`Estoque insuficiente para a venda de ${quantidade} unidades de ${produtoEncontrado.nome}.`);
        return;
    }

    produtoEncontrado.quantidade -= quantidade;
    produtoEncontrado.vendidos += quantidade;
    console.log(`Venda registrada! ${quantidade} unidades de ${produtoEncontrado.nome} vendidas.`);
}

function registrarVenda(produtos, nome, quantidade) {
    venderProduto(produtos, nome, quantidade);
}

function formatarNome(texto) {
    return texto.trim().toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}   

function converterParaJSON(produtos) { 
    const jsonString = JSON.stringify(produtos, null, 2);
    return jsonString;
}

function lerJSON(jsonString) {
        const produtos = JSON.parse(jsonString);
        return produtos;
}

function gerarRelatorio(nomeLoja, produtos) {
    const relatorio = {
        nomeLoja: nomeLoja.toUpperCase(),
        totalProdutos: produtos.length,
        valorTotalEstoque: 1,
        quantidadeDeProdutosComMenosDeCincoUnidades: 1,
    };
    const valorTotalEstoque = calcularValorEstoque(produtos);
    const produtosFaltando = produtosEmFalta(produtos, 5);
    relatorio.valorTotalEstoque = valorTotalEstoque;
    relatorio.quantidadeDeProdutosComMenosDeCincoUnidades = produtosFaltando;
    return relatorio;
}

//===== EXECUÇÃO =====
console.log("--Tarefa 2--");
listarProdutos(produtos);
console.log("--Tarefa 3--");
cadastrarProduto(produtos, "WEBCAM", "Eletrônicos", 120.00, 10);
listarProdutos(produtos);
console.log("--Tarefa 4--");
calcularValorEstoque(produtos);
console.log("--Tarefa 5--");
buscarProduto(produtos, "NOTEBOOK");
console.log("--Tarefa 6--");
produtosEmFalta(produtos, 5);
console.log("--Tarefa 7--");
aplicarDesconto(produtos, "Eletrônicos", 10);
console.log("--Tarefa 8--");
registrarVenda(produtos, "NOTEBOOK", 2);
console.log("--Tarefa 9--");
const textoFormatado = formatarNome(" bORRACHA  branca ");
console.log(`${textoFormatado}`);
console.log("--Tarefa 10--");
const jsonProdutos = converterParaJSON(produtos);
const produtosDoJSON = lerJSON(jsonProdutos);
console.log(typeof jsonProdutos);
console.log(`Itens recuperados do JSON: ${produtosDoJSON.length} | Primeiro item: ${produtosDoJSON[0].nome} | Último item: ${produtosDoJSON[produtosDoJSON.length - 1].nome}`);
console.log("--Tarefa 11--");   
const relatorio = gerarRelatorio(nomeLoja, produtos);
console.log(`Relatório da loja ${relatorio.nomeLoja}:`);
console.log(`Total de produtos: ${relatorio.totalProdutos}`);
console.log(`Valor total do estoque: R$ ${relatorio.valorTotalEstoque}`);
console.log(`Quantidade de produtos com menos de 5 unidades: ${relatorio.quantidadeDeProdutosComMenosDeCincoUnidades}`);
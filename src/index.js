const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const CARDAPIO = [
  { id: 1, categoria: "Entradas & Porções", nome: "Batata Rústica com Alecrim e Alho", preco: 26.90 },
  { id: 2, categoria: "Entradas & Porções", nome: "Onion Rings Crocantes (Molho Barbecue)", preco: 24.50 },
  { id: 3, categoria: "Entradas & Porções", nome: "Dadinhos de Tapioca com Geleia de Pimenta", preco: 32.00 },

  { id: 4, categoria: "Burgers Artesanais", nome: "Dan Classic Burger (Blend 180g + Cheddar Inglês)", preco: 34.90 },
  { id: 5, categoria: "Burgers Artesanais", nome: "Dan Crispy Bacon (Bacon Extra Crocante + Barbecue)", preco: 39.90 },
  { id: 6, categoria: "Burgers Artesanais", nome: "Dan Truffled Brie (Queijo Brie + Maionese Trufada)", preco: 46.00 },
  { id: 7, categoria: "Burgers Artesanais", nome: "Dan Smash Duplo (2x 90g + Molho Especial da Casa)", preco: 32.00 },

  { id: 8, categoria: "Bebidas", nome: "Refrigerante Lata (Coca-Cola / Zero / Guaraná)", preco: 7.50 },
  { id: 9, categoria: "Bebidas", nome: "Chá Gelado da Casa (Limão Siciliano)", preco: 9.00 },
  { id: 10, categoria: "Bebidas", nome: "Cerveja IPA Artesanal (Long Neck)", preco: 18.50 },

  { id: 11, categoria: "Sobremesas", nome: "American Brownie com Sorvete de Baunilha", preco: 24.00 },
  { id: 12, categoria: "Sobremesas", nome: "Milkshake de Doce de Leite com Paçoca", preco: 22.00 },
];

const pedidos = [];
let proximoPedidoId = 1;

app.get("/health", (req, res) => res.status(200).send("ok"));

app.get("/mesa/:id", (req, res) => {
  const mesaId = req.params.id;
  const categorias = ["Entradas & Porções", "Burgers Artesanais", "Bebidas", "Sobremesas"];

  let htmlCategorias = categorias.map((cat) => {
    const itensDaCat = CARDAPIO.filter((i) => i.categoria === cat);
    if (itensDaCat.length === 0) return "";

    const itensHtml = itensDaCat.map(
      (item) => `
        <label class="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-sm hover:border-amber-500/50 hover:bg-zinc-900 transition-all cursor-pointer group">
          <div class="flex items-center space-x-4">
            <input type="checkbox" name="itemId" value="${item.id}" class="w-5 h-5 text-amber-500 focus:ring-amber-500 bg-zinc-800 border-zinc-700 rounded cursor-pointer">
            <span class="text-zinc-200 font-medium group-hover:text-amber-400 transition-colors">${item.nome}</span>
          </div>
          <span class="text-amber-400 font-bold text-base">R$ ${item.preco.toFixed(2)}</span>
        </label>
      `
    ).join("");

    return `
      <div class="mb-8">
        <h2 class="text-sm font-bold tracking-wider text-amber-500 uppercase mb-3 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> ${cat}
        </h2>
        <div class="space-y-3">
          ${itensHtml}
        </div>
      </div>
    `;
  }).join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br" class="dark">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dan Burguer — Mesa ${mesaId}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
    </head>
    <body class="bg-zinc-950 text-zinc-100 min-h-screen py-12 px-4 selection:bg-amber-500 selection:text-zinc-950">
      <div class="max-w-2xl mx-auto bg-zinc-900/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-zinc-800/80">
        <div class="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 p-8 text-center relative border-b border-zinc-800">
          <div class="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tempo médio de preparo: 15 a 25 min
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white">DAN BURGUER</h1>
          <p class="text-zinc-400 mt-1 text-sm font-medium">Mesa ${mesaId} • Selecione os seus itens favoritos</p>
        </div>
        <form method="POST" action="/mesa/${mesaId}/pagamento" class="p-8">
          ${htmlCategorias}
          <button type="submit" class="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] text-zinc-950 font-bold py-4 px-6 rounded-2xl shadow-lg shadow-amber-500/20 transition-all duration-200 text-base flex items-center justify-center gap-2">
            <span>Avançar para Pagamento</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </body>
    </html>
  `);
});

app.post("/mesa/:id/pagamento", (req, res) => {
  const mesaId = req.params.id;
  let itensSelecionados = req.body.itemId || [];
  if (!Array.isArray(itensSelecionados)) itensSelecionados = [itensSelecionados];

  if (itensSelecionados.length === 0) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="pt-br" class="dark">
      <head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet"><style>body{font-family:'Plus Jakarta Sans',sans-serif;}</style></head>
      <body class="bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center p-4">
        <div class="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-center max-w-sm">
          <p class="text-amber-400 font-semibold mb-4">Nenhum item selecionado!</p>
          <a href="/mesa/${mesaId}" class="inline-block bg-amber-500 text-zinc-950 font-bold px-6 py-3 rounded-xl">Voltar ao Cardápio</a>
        </div>
      </body>
      </html>
    `);
  }

  const itens = itensSelecionados
    .map((id) => CARDAPIO.find((item) => item.id === Number(id)))
    .filter(Boolean);

  const total = itens.reduce((soma, item) => soma + item.preco, 0);
  const inputsHidden = itensSelecionados.map(id => `<input type="hidden" name="itemId" value="${id}">`).join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br" class="dark">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pagamento — Dan Burguer</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
    </head>
    <body class="bg-zinc-950 text-zinc-100 min-h-screen py-12 px-4 flex items-center justify-center">
      <div class="max-w-md w-full bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800 p-8">
        <div class="text-center mb-6">
          <span class="text-amber-500 font-semibold text-xs tracking-widest uppercase">Etapa Final</span>
          <h1 class="text-2xl font-bold text-white mt-1">Forma de Pagamento</h1>
          <p class="text-zinc-400 text-sm mt-1">Mesa ${mesaId} • Total a pagar: <span class="text-amber-400 font-bold">R$ ${total.toFixed(2)}</span></p>
        </div>
        <form method="POST" action="/mesa/${mesaId}/finalizar" class="space-y-4">
          ${inputsHidden}
          <label class="flex items-center gap-3 p-4 bg-zinc-800/50 border border-zinc-700/60 rounded-2xl cursor-pointer hover:border-amber-500 transition">
            <input type="radio" name="formaPagamento" value="PIX" required class="w-4 h-4 text-amber-500 focus:ring-amber-500 bg-zinc-900 border-zinc-700">
            <span class="font-medium text-zinc-200">PIX (Aprovação imediata)</span>
          </label>
          <label class="flex items-center gap-3 p-4 bg-zinc-800/50 border border-zinc-700/60 rounded-2xl cursor-pointer hover:border-amber-500 transition">
            <input type="radio" name="formaPagamento" value="Cartão de Crédito" class="w-4 h-4 text-amber-500 focus:ring-amber-500 bg-zinc-900 border-zinc-700">
            <span class="font-medium text-zinc-200">Cartão de Crédito (Na Mesa)</span>
          </label>
          <label class="flex items-center gap-3 p-4 bg-zinc-800/50 border border-zinc-700/60 rounded-2xl cursor-pointer hover:border-amber-500 transition">
            <input type="radio" name="formaPagamento" value="Cartão de Débito" class="w-4 h-4 text-amber-500 focus:ring-amber-500 bg-zinc-900 border-zinc-700">
            <span class="font-medium text-zinc-200">Cartão de Débito (Na Mesa)</span>
          </label>
          <label class="flex items-center gap-3 p-4 bg-zinc-800/50 border border-zinc-700/60 rounded-2xl cursor-pointer hover:border-amber-500 transition">
            <input type="radio" name="formaPagamento" value="Dinheiro" class="w-4 h-4 text-amber-500 focus:ring-amber-500 bg-zinc-900 border-zinc-700">
            <span class="font-medium text-zinc-200">Dinheiro</span>
          </label>
          <button type="submit" class="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-4 px-4 rounded-2xl transition duration-200 shadow-lg shadow-amber-500/20 text-base">
            Confirmar Pedido
          </button>
        </form>
      </div>
    </body>
    </html>
  `);
});

app.post("/mesa/:id/finalizar", (req, res) => {
  const mesaId = req.params.id;
  const { formaPagamento } = req.body;
  let itensSelecionados = req.body.itemId || [];
  if (!Array.isArray(itensSelecionados)) itensSelecionados = [itensSelecionados];

  const itens = itensSelecionados
    .map((id) => CARDAPIO.find((item) => item.id === Number(id)))
    .filter(Boolean);

  const pedidoIdAtual = proximoPedidoId++;
  const total = itens.reduce((soma, item) => soma + item.preco, 0);

  const pedido = {
    id: pedidoIdAtual,
    mesa: mesaId,
    itens,
    total,
    pagamento: formaPagamento,
    criadoEm: new Date().toISOString(),
  };
  pedidos.push(pedido);

  console.log(`Pedido #${pedidoIdAtual} confirmado: mesa=${mesaId}, pagamento=${formaPagamento}`);

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br" class="dark">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pedido Confirmado — Dan Burguer</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
    </head>
    <body class="bg-zinc-950 text-zinc-100 min-h-screen py-12 px-4 flex items-center justify-center">
      <div class="max-w-md w-full bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800 p-8 text-center">
        <div class="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-xl font-bold text-white leading-snug">Número do pedido #${pedidoIdAtual} para Mesa ${mesaId} foi confirmado com sucesso!</h1>
        <p class="text-zinc-400 text-xs mt-2">O seu pedido já foi encaminhado para a cozinha.</p>
        <div class="bg-zinc-800/40 rounded-2xl p-5 my-6 text-left border border-zinc-800">
          <div class="flex justify-between text-xs text-zinc-400 mb-2 font-semibold">
            <span>RESUMO</span>
            <span>PAGAMENTO: ${formaPagamento}</span>
          </div>
          <ul class="space-y-2 text-zinc-300 text-sm">
            ${itens.map((i) => `<li class="flex justify-between border-b border-zinc-800 pb-2"><span>${i.nome}</span> <span class="font-medium text-white">R$ ${i.preco.toFixed(2)}</span></li>`).join("")}
          </ul>
          <div class="border-t border-zinc-800 mt-4 pt-3 flex justify-between font-bold text-white text-base">
            <span>Total:</span>
            <span class="text-amber-400">R$ ${total.toFixed(2)}</span>
          </div>
        </div>
        <a href="/mesa/${mesaId}" class="block w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-3.5 px-4 rounded-2xl transition duration-200 text-center border border-zinc-700 text-sm">
          Fazer novo pedido
        </a>
      </div>
    </body>
    </html>
  `);
});

app.get("/pedidos", (req, res) => {
  const linhas = pedidos
    .map(
      (p) => `
      <tr class="hover:bg-zinc-800/40 transition">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-amber-400">#${p.id}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-200 font-semibold">Mesa ${p.mesa}</td>
        <td class="px-6 py-4 text-sm text-zinc-300">${p.itens.map((i) => i.nome).join(", ")}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-200 font-medium"><span class="bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md text-xs border border-amber-500/20">${p.pagamento}</span></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-white font-bold">R$ ${p.total.toFixed(2)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">${new Date(p.criadoEm).toLocaleTimeString("pt-BR")}</td>
      </tr>
    `
    )
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br" class="dark">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Painel da Cozinha — Dan Burguer</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
    </head>
    <body class="bg-zinc-950 text-zinc-100 min-h-screen py-12 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-extrabold text-white">Dan Burguer • Cozinha</h1>
            <p class="text-zinc-400 text-sm mt-1">Acompanhamento de pedidos e formas de pagamento</p>
          </div>
          <span class="bg-amber-500/10 text-amber-400 font-semibold text-xs px-4 py-2 rounded-xl border border-amber-500/20">Sistema Online</span>
        </div>
        <div class="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800">
          <table class="min-w-full divide-y divide-zinc-800">
            <thead class="bg-zinc-950/60">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Pedido</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Mesa</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Itens</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Pagamento</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Total</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Horário</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-800 bg-zinc-900">
              ${linhas || "<tr><td colspan='6' class='px-6 py-12 text-center text-zinc-500 font-medium'>Nenhum pedido registrado no momento</td></tr>"}
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`TapDine backend rodando na porta ${PORT}`));
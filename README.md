# TapDine

Sistema de gestão de pedidos para restaurantes, com acesso do cliente via link/QR Code fixado na mesa.

## Escopo

- **Cardápio digital via link/QR Code da mesa**: o cliente escaneia e faz o pedido direto pelo celular.
- **Painel de pedidos em tempo real** para a cozinha, mostrando o que precisa ser preparado e em qual mesa.
- **Fluxo de pagamento** (PIX, cartão de crédito/débito ou dinheiro) associado a cada pedido confirmado.

## Arquitetura

Cliente (navegador) → Backend (Node/Express) → n8n (automações futuras: notificações, integrações) → PostgreSQL (histórico)

## Stack

Node.js + Express · n8n · PostgreSQL · Docker

## Estrutura

- `/src` — API do backend (cardápio, pedido, pagamento, painel de cozinha)
- `/workflows` — exports JSON dos workflows do n8n
- `/infra` — Docker Compose, Dockerfiles, variáveis de ambiente
- `/tests` — testes automatizados
- `/docs` — documentação técnica adicional

## Rodando localmente
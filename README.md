# TapDine

Sistema de autoatendimento e fidelização via NFC (Near Field Communication) para redes de restaurantes.

## Escopo

- **Tags NFC nas mesas**: o cliente aproxima o celular e é direcionado ao cardápio digital / chatbot de pedidos.
- **Cartões/pulseiras NFC de fidelidade**: ao aproximar no caixa, o sistema identifica o cliente, credita pontos e dispara uma mensagem promocional personalizada.
- **Crachás NFC da equipe**: controle de ponto e liberação de acesso ao PDV.

## Arquitetura

Evento NFC (tag/cartão/crachá) → Backend (Node/Express) → n8n (orquestra a automação) → PostgreSQL (histórico)

## Stack

Node.js + Express · n8n · PostgreSQL · Docker

## Estrutura

- `/src` — API do backend
- `/workflows` — exports JSON dos workflows do n8n
- `/infra` — Docker Compose, Dockerfiles, variáveis de ambiente
- `/tests` — testes automatizados
- `/docs` — documentação técnica adicional

## Rodando localmente
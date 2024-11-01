# Cidadão Shopping

Este projeto é uma aplicação web para agendamento de serviços, permitindo que os usuários realizem agendamentos de forma simples e prática.

## Tecnologias Utilizadas

- **Frontend**: React, Context API, React Router
- **Backend**: Node.js, Express
- **Banco de Dados**: MySQL
- **Estilo**: CSS com tons de verde e branco

## Configuração do Projeto

### Pré-requisitos

Antes de configurar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (v14 ou superior)
- **MySQL** (ou outro banco de dados compatível)
- **Git** para controle de versão

### Passos para Configuração

1. **Clone o Repositório**:

   ```bash
   git clone https://github.com/RaphaelRPapa/SprintFE3.git
   
2. **Navegue até o Diretório do Projeto**:

   ```bash
   cd SprintFE3

3. **Instale as Dependências do Frontend**:

   Navegue até o diretório frontend e instale as dependências:

   ```bash
   npm install

4. **Configuração do Banco de Dados**:

   Crie um banco de dados no MySQL e configure suas credenciais no arquivo de configuração do backend.
   Exemplo de configuração no arquivo .env:

   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco

## Visão Geral das Funcionalidades

1. **Cadastro e Login de Usuários**: Os usuários podem se cadastrar e fazer login para acessar as funcionalidades de agendamento.


2. **Agendamento de Serviços**: Os usuários podem escolher uma data e horário para agendar serviços, como:

   - Renovação de CNH
   - Emplacamento de Veículos
   - Segunda Via de RG
   - Alistamento Militar
   - Passaporte


3. **Cancelamento de Agendamentos**: Os usuários podem visualizar e cancelar seus agendamentos.


4. **Autenticação**: Implementada com Context API para gerenciar o estado de autenticação do usuário.


5. **Proteção de Rotas**: Apenas usuários autenticados podem acessar as páginas de agendamento e histórico de agendamentos.


## Instruções para Execução
Após configurar o projeto, siga os passos abaixo para iniciar os servidores do frontend e backend:

1. Iniciando o Backend
   Execute o Servidor:

   ```bash
   npm start
   O backend estará acessível em http://localhost:5000.

2. Iniciando o Frontend
   Abra um novo terminale execute o Servidor:

   ```bash
   npm start

O frontend estará acessível em http://localhost:3000.

### Detalhes da Implementação
Estrutura de Pastas
1. A estrutura básica do projeto é organizada da seguinte maneira:

   ```plaintext
   SprintFE3/
   ├── backend/
   │   ├── controllers/
   │   ├── models/
   │   ├── routes/
   │   ├── server.js
   │   └── config.js
   ├── frontend/
   │   ├── public/
   │   ├── src/
   │   │   ├── components/
   │   │   ├── pages/
   │   │   ├── App.js
   │   │   └── index.js
   ├── README.md

## Explicação de Componentes

- **AuthContext**: Contexto que gerencia o estado de autenticação.

- **BookingPage**: Página onde o usuário agenda os serviços, com validação de formulário.

- **UserBookingsPage**: Mostra os agendamentos do usuário em um layout em grade.


## Banco de Dados

- A base de dados inclui uma tabela para usuários (users) e uma tabela para agendamentos (bookings).

- **Tabela users**: Armazena as informações de login e identificação do usuário.

- **Tabela bookings**: Armazena os agendamentos, associando-os a um usuário através do userId.

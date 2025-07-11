# Locadora de veiculos
Bem-vindo ao repositório do projeto de locadora de carros! Esta aplicação web, desenvolvida com Next.js e React, permite que usuários autenticados gerenciem um catálogo de veículos, com funcionalidades de cadastro, listagem, edição e exclusão de carros. Além disso, ela se integra à API da FIPE para facilitar o preenchimento de dados de marcas e modelos.

## Funcionalidades
Autenticação de Usuário: Sistema de login para acesso seguro ao dashboard.
Gestão de Carros (CRUD):
-  [x] Cadastrar novos veículos com modelo, marca, ano e imagem.
-  [x] Realizar a leitura e visualização de todos os carros cadastrados pelo usuário.
-  [x] Update: Editar informações de carros existentes.
-  [x] Delete: Excluir veículos do catálogo.
-  [x] Integração com API FIPE: Preenchimento automático de marcas e modelos de veículos, proporcionando agilidade e precisão no cadastro.
-  [x] Dashboard Intuitivo: Interface de usuário amigável para gerenciamento simplificado.
-  [x] Redirecionamento Protegido: Verificação de token de autenticação para proteger rotas.

## Tecnologias Utilizadas
Este projeto foi construído utilizando as seguintes tecnologias:

### Frontend:
- Next.js: Framework React para construção de aplicações web modernas, com renderização no lado do servidor (SSR) e geração de sites estáticos (SSG).
- React: Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas.
- JavaScript/TypeScript: Linguagem de programação com tipagem estática para maior robustez do código.
- CSS Modules: Para encapsulamento e modularização dos estilos CSS.

### Backend (APIs):
- API Própria (/api/carros, /api/auth/verify): Implementada no Next.js (Serverless Functions) para persistência e gestão dos dados dos carros e autenticação de usuários.
- API Pública da FIPE: Utilizada para buscar dados de marcas e modelos de veículos (https://parallelum.com.br/fipe/api/v1/carros/marcas).

### Armazenamento:
- Persistência de dados de usuários e veículos por meio de arquivos armazenados em disco.
- LocalStorage: Usado para armazenar o token de autenticação no navegador.

## Como Rodar o Projeto
- Para executar este projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos
- Certifique-se de ter o Node.js (versão v24.1.0) e o npm (versão 11.3.0).

### Instalação
Clone o repositório:

Bash

```sh
git clone https://github.com/Armando0510/locadora-veiculos.git
```
### Instale as dependências:

```sh
npm install
```
### Configuração do Backend:
- Este projeto utiliza rotas de API do Next.js (/api/) para o backend de gestão de carros e autenticação. Você precisará garantir que a lógica de backend (lógica de autenticação e CRUD) esteja configurada dentro dessas rotas de API.

Configuração de variáveis de ambiente:
- Crie um arquivo .env.local na raiz do projeto e adicione as variáveis de ambiente necessárias para as chaves secretas de autenticação.

JWT_SECRET="sua_chave_secreta_jwt"

### Para iniciar o servidor de desenvolvimento:

```sh
npm run dev
```

Confira a [Apresentação do Projeto (PDF)](./Apresentação%20Locadora%20de%20Carros%20-%20Web%20(2).pdf).

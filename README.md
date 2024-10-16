# Thigs TodoApp

## Table of Contents

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Instalação](#instalação)
  - [Pré-requisitos](#pré-requisitos)
  - [Clonando o Repositório](#clonando-o-repositório)
  - [Instalando Dependências](#instalando-dependências)
- [Executando a Aplicação](#executando-a-aplicação)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Fluxo do Projeto](#fluxo-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
  - [Frontend](#estrutura-frontend)
  - [Backend](#estrutura-backend)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição

Thigs TodoApp é uma aplicação web completa que permite aos usuários gerenciar suas tarefas de forma eficiente. Com funcionalidades como criação, edição, exclusão, visualização e filtragem de tarefas por status, a aplicação proporciona uma experiência de gerenciamento intuitiva e responsiva tanto no front-end quanto no back-end.

## Tecnologias Utilizadas

### Frontend

- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **TailwindCSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **Framer Motion**: Biblioteca para animações fluidas.
- **React Modal**: Biblioteca para criação de modais acessíveis.

### Backend

- **Express.js**: Framework de aplicação web para Node.js.
- **TypeScript**: Superset do JavaScript para tipagem estática no backend.
- **Cors**: Middleware para habilitar CORS.
- **Body-Parser**: Middleware para analisar corpos de requisições HTTP.
- **ts-node**: Execução de TypeScript diretamente no Node.js.

## Instalação

### Pré-requisitos

- **Node.js**: Versão 14 ou superior.
- **npm** ou **yarn**: Gerenciadores de pacotes.
- **Git**: Para clonar o repositório.

### Clonando o Repositório

```bash
git clone https://github.com/0thigs/todo_app_homework.git
cd todo_app_homework
```

### Instalando Dependências

#### Frontend

```bash
cd web
npm install
# ou
yarn install
```

#### Backend

```bash
cd ../api
npm install
# ou
yarn install
```

## Executando a Aplicação

### Frontend

```bash
cd web
npm run dev
# ou
yarn dev
```

O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

### Backend

```bash
cd api
npm run dev
# ou
yarn dev
```

O backend estará rodando em [http://localhost:3001](http://localhost:3001).

## Fluxo do Projeto

1. **Frontend**: O usuário interage com a interface do Thigs TodoApp, realizando ações como adicionar, editar, excluir e visualizar tarefas.
2. **Comunicação com API**: O frontend faz requisições HTTP para o backend, utilizando endpoints específicos para gerenciar as tarefas.
3. **Backend**: O backend processa as requisições, manipula os dados das tarefas e retorna as respostas apropriadas ao frontend.
4. **Atualização de Estado**: Após receber respostas do backend, o frontend atualiza o estado das tarefas para refletir as mudanças na interface do usuário.

## Funcionalidades

- **Criação de Tarefas**: Adicione novas tarefas com nome, descrição e data de vencimento.
- **Edição de Tarefas**: Modifique os detalhes de tarefas existentes.
- **Exclusão de Tarefas**: Remova tarefas que não são mais necessárias.
- **Visualização de Tarefas**: Veja a lista completa de tarefas com detalhes importantes.
- **Filtragem por Status**: Filtre as tarefas para visualizar apenas as concluídas, pendentes ou todas.
- **Validação de Entrada**: Garantia de que todas as entradas são válidas antes de serem processadas.

## Estrutura do Projeto

### Frontend

```plaintext
web/
├── src/
│   ├── components/
│   │   ├── Home.tsx
│   │   ├── TaskInput.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskModal.tsx
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   ├── styles/
│   │   └── globals.css
├── public/
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── next.config.mjs
├── package.json
└── .eslintrc.json
```

### Backend

```plaintext
api/
├── src/
│   ├── controllers/
│   │   └── TaskController.ts
│   ├── models/
│   │   └── Task.ts
│   ├── routes/
│   │   └── taskRoutes.ts
│   ├── services/
│   │   └── TaskService.ts
│   ├── app.ts
│   └── index.ts
├── tsconfig.json
├── package.json
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. **Fork** o repositório.
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. **Push** para a branch (`git push origin feature/nova-feature`).
5. **Abra** um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Detalhes Adicionais

### Frontend

O frontend do Thigs TodoApp é construído com Next.js e React, proporcionando uma experiência de usuário rápida e responsiva. A utilização de TypeScript adiciona robustez ao código, garantindo maior confiabilidade e facilidade de manutenção. TailwindCSS é utilizado para estilização, permitindo a criação rápida de interfaces elegantes e personalizadas. Framer Motion adiciona animações fluidas, melhorando a interatividade da aplicação, enquanto React Modal gerencia os modais de forma acessível e eficiente.

#### Principais Componentes

- **Home.tsx**: Componente principal que gerencia o estado das tarefas e integra outros componentes como TaskInput, TaskList e TaskModal.
- **TaskInput.tsx**: Formulário para adicionar novas tarefas e editar tarefas existentes.
- **TaskList.tsx**: Lista filtrável de todas as tarefas.
- **TaskItem.tsx**: Representação individual de uma tarefa, com opções para editar, deletar e alternar status.
- **TaskModal.tsx**: Modal para editar detalhes de uma tarefa.

### Backend

O backend é desenvolvido com Express.js e TypeScript, fornecendo uma API RESTful para gerenciamento das tarefas. Ele inclui funcionalidades para criar, ler, atualizar e deletar tarefas (CRUD). A estrutura de serviço e controlador separa a lógica de negócios da lógica de rotas, facilitando a manutenção e escalabilidade.

#### Principais Módulos

- **TaskController.ts**: Controla as requisições e respostas relacionadas às tarefas, delegando operações para o TaskService.
- **TaskService.ts**: Gerencia a lógica de negócios, incluindo validação e manipulação dos dados das tarefas.
- **Task.ts**: Define a interface de uma tarefa, garantindo que todas as tarefas sigam o mesmo formato.
- **taskRoutes.ts**: Define as rotas da API para operações CRUD nas tarefas.

## Considerações Finais

Thigs TodoApp é uma aplicação modular e escalável, ideal para quem busca uma solução completa para gerenciamento de tarefas com uma base sólida tanto no frontend quanto no backend. A combinação de tecnologias modernas garante uma experiência de usuário fluida e um desenvolvimento eficiente.

Se você tiver dúvidas ou sugestões, sinta-se à vontade para entrar em contato ou contribuir para o projeto!

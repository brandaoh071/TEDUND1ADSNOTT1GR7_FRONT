# TEDUND1ADSNOTT1GR7_FRONT

Aplicação Front-End do **Sistema de Controle de Solicitações de Disciplina** (Cenário TED, versão 03).

É o **único ponto de interação do usuário** com o sistema. Toda informação e toda regra de negócio vêm da API do Back-End (`TEDUND1ADSNOTT1GR7_BACK`). O Front-End só apresenta os dados e coleta as entradas do usuário.

---

## 1. Stack

| Item | Tecnologia |
| --- | --- |
| Framework | Angular (versão estável mais recente) |
| Linguagem | TypeScript |
| Componentes | Standalone Components |
| Estado | Signals + serviços |
| HTTP | `HttpClient` com interceptors funcionais |
| Formulários | Reactive Forms |
| UI | Angular Material |
| Testes | Testes unitários do Angular CLI |

## 2. Restrições do cenário que este projeto cumpre

- Desenvolvido **exclusivamente** em Angular.
- **Não contém regra de negócio.** As validações no formulário servem só para dar retorno rápido ao usuário, e quem decide é sempre o Back-End.
- **Nunca acessa o banco de dados.** Toda informação vem da API.

---

## 3. Arquitetura

A organização é **por funcionalidade (feature-based)**, com uma área por perfil de acesso. Cada área é carregada sob demanda (*lazy loading*).

```
src/app/
 ├─ core/                     ← carregado uma vez, usado pela aplicação inteira
 │   ├─ auth/                 ← AuthService, login, armazenamento do token, perfis do usuário
 │   ├─ guards/               ← authGuard, perfilGuard('ADMIN' | 'COLABORADOR' | 'USUARIO')
 │   ├─ interceptors/         ← authInterceptor (anexa o JWT), errorInterceptor (401/403/erros)
 │   ├─ layout/               ← shell, menu (montado conforme os perfis), cabeçalho
 │   └─ models/               ← tipos compartilhados (Usuario, Perfil, Page<T>, ProblemDetail)
 ├─ shared/                   ← componentes, pipes e diretivas reutilizáveis (sem regra de negócio)
 │   ├─ components/           ← tabela paginada, confirmação, badge de status, campo de busca
 │   └─ pipes/
 ├─ features/
 │   ├─ auth/                 ← tela de login
 │   ├─ admin/                ← IES, Centros Acadêmicos, Cursos, Docentes, Auditoria, Relatórios
 │   ├─ colaborador/          ← Disciplinas, Discentes, Validação de Solicitações, Relatórios
 │   └─ discente/             ← Nova Solicitação, Minhas Solicitações, Relatório
 ├─ app.routes.ts
 └─ app.config.ts
```

Dentro de cada funcionalidade:

```
features/admin/ies/
 ├─ data/
 │   ├─ ies.api.ts            ← chamadas HTTP (/api/ies)
 │   └─ ies.model.ts          ← tipos que espelham os DTOs da API
 ├─ pages/                    ← componentes "smart": buscam dados e controlam a tela
 │   ├─ ies-lista.page.ts
 │   └─ ies-form.page.ts
 ├─ components/               ← componentes "dumb": só recebem @Input/@Output
 └─ ies.routes.ts
```

### 3.1 Regras

1. `core` e `shared` **não importam** nada de `features`.
2. Uma funcionalidade **não importa** outra. O que for comum vai para `shared` ou `core`.
3. Só as classes `*.api.ts` usam `HttpClient`. Componentes nunca chamam HTTP diretamente.
4. A URL da API fica em `environment.apiUrl`. Na 2ª unidade, quando houver o API Gateway, só esse valor muda.
5. Os guards **só escondem telas**. A autorização de verdade é feita pela API.

### 3.2 Rotas por perfil

```ts
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login.page') },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/shell.component'),
    children: [
      { path: 'admin',       canMatch: [perfilGuard('ADMIN')],       loadChildren: () => import('./features/admin/admin.routes') },
      { path: 'colaborador', canMatch: [perfilGuard('COLABORADOR')], loadChildren: () => import('./features/colaborador/colaborador.routes') },
      { path: 'discente',    canMatch: [perfilGuard('USUARIO')],     loadChildren: () => import('./features/discente/discente.routes') },
    ],
  },
];
```

Um usuário com mais de um perfil vê os menus de todos eles.

---

## 4. Padrões de projeto

| Padrão | Onde é usado |
| --- | --- |
| **Smart / Dumb Components** (Container / Presentational) | `pages/` buscam dados e `components/` só exibem |
| **Service / Facade** | `*.api.ts` isolam o HTTP; serviços de tela combinam chamadas quando necessário |
| **Interceptor** (Chain of Responsibility) | `authInterceptor` e `errorInterceptor` em toda requisição |
| **Guard** | Proteção de rota por login e por perfil |
| **Observer** | Signals e RxJS para reagir a mudanças de dados |
| **Dependency Injection** | Serviços com `inject()`, sem instanciação manual |
| **DTO / Model** | Tipos em `*.model.ts` espelhando os contratos da API |
| **Adapter** | Conversão entre o formato da API e o formato da tela, quando forem diferentes |

## 5. Convenções

- Nomes de arquivos: `*.page.ts` (telas), `*.component.ts` (componentes), `*.api.ts` (HTTP), `*.model.ts` (tipos) e `*.routes.ts` (rotas).
- Usar `ChangeDetectionStrategy.OnPush` em todos os componentes.
- Os erros da API chegam no formato `ProblemDetail`, e o `errorInterceptor` os exibe de forma padronizada.
- Listas usam paginação vinda da API (`page`, `size`, `sort`).
- Todo texto de status (`ATIVO`, `INATIVO`, `AGUARDANDO`, `EM_ANALISE`, `LISTA_ESPERA`) passa por um pipe de exibição.

## 6. Telas por perfil

| Perfil | Telas |
| --- | --- |
| Administrador | IES, Centros Acadêmicos, Cursos, Docentes (cadastrar, editar, inativar), Auditoria, Relatórios gerais |
| Colaborador | Disciplinas, Discentes, Validação de solicitações (por ordem de chegada), Relatórios |
| Discente | Nova solicitação (de 2 a 9 disciplinas, prioridade de 1 a 5, no máximo 2 com prioridade máxima), Minhas solicitações, Relatório |

---

## 7. Como executar

> A seção será preenchida quando o projeto for gerado.

```bash
npm install
npm start          # http://localhost:4200
```

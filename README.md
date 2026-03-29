# 🏫 School Platform — API & Dashboard

Uma plataforma de gestão de atividades escolares. Professores podem criar e corrigir tarefas, enquanto alunos visualizam atividades específicas de sua turma e submetem respostas dentro do prazo.

---

## 🚀 Como Rodar o Projeto

O projeto está totalmente **dockerizado**, eliminando a necessidade de instalar dependências locais.

### Passo a Passo

**1. Clone o repositório:**

```bash
git clone https://github.com/saikyuu658/school.git
cd school
```

**2. Configuração de Variáveis (Frontend):**

Crie um arquivo `.env` dentro da pasta `/frontend`:

```env
VITE_API_URL=http://localhost:8000
```

**3. Suba a aplicação:**

```bash
docker-compose up --build
```

> ⚠️ O flag `--build` é necessário para injetar as variáveis do Vite nos arquivos estáticos do frontend.

**4. Acesse:**

| Serviço | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend (API) | http://localhost:8000 |
| Admin Django | http://localhost:8000/admin |

---

## 🛠 Decisões Técnicas

- **Backend (Django & DRF):** Uso de `SimpleJWT` para autenticação stateless e sobrescrita de `get_queryset` para garantir o isolamento de dados entre perfis *(Ownership Filter)*.
- **Frontend (React + Vite):** Arquitetura baseada em *Services/Hooks* para isolar a lógica de busca de dados (`HttpClient`) da interface. Estilização com **Tailwind CSS**.
- **Infraestrutura (Docker):** Orquestração com Docker Compose e automação de banco de dados via `entrypoint.sh`, executando migrações e o script de sementes *(seed)* automaticamente.

---

## 📋 Regras de Negócio Implementadas

- ✅ **Isolamento de Turma:** Alunos só acessam atividades da sua respectiva turma.
- ✅ **Segurança de Correção:** Professores só corrigem respostas de atividades que eles próprios criaram.
- ✅ **Regra de Submissão:** Limite de 1 resposta por atividade por aluno.
- ✅ **Prazo de Entrega:** Bloqueio de edição/envio de respostas após o vencimento da atividade.
- ✅ **Validação de Nota:** Notas obrigatórias entre 0 e 10 na correção do professor.

---

## 🔑 Dados para Teste (Seed)

Ao iniciar o container, o banco de dados é populado automaticamente com os seguintes usuários.

> **Senha de todos os usuários:** `123456`

| Usuário | E-mail | Perfil | Turma |
|---|---|---|---|
| `prof_ana` | ana@escola.edu.br | Professor | — |
| `prof_carlos` | carlos@escola.edu.br | Professor | — |
| `aluno_a1` | aluno_a1@escola.edu.br | Aluno | A |
| `aluno_a2` | aluno_a2@escola.edu.br | Aluno | A |
| `aluno_b1` | aluno_b1@escola.edu.br | Aluno | B |

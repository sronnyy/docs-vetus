import React from 'react';
import {
  FaInfoCircle,
  FaKey,
  FaShieldAlt,
  FaLink,
  FaClipboardList,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaPlug,
  FaLock,
} from 'react-icons/fa';
import { Zap, Globe, Clock, Shield as ShieldLucide, Cpu } from 'lucide-react';

export default function ApiOverview({ onStartSpecs }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative space-y-10 sm:space-y-12">
      {/* Hero com tema azul, menos saturação */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-700/40 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-primary-2)]/8 via-transparent to-transparent" />
        <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-[var(--color-primary-2)]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-[var(--color-secondary)]/10 blur-3xl" />

        <div className="relative p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-dual-gradient shadow-2xl shadow-[var(--color-primary-2)]/20 flex items-center justify-center">
                  <FaLock className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[var(--color-primary-2)]/15 text-[var(--color-primary-2)] rounded-full text-sm font-medium border border-[var(--color-primary-2)]/25">
                  API RESTful
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Integração
                <span className="bg-gradient-to-r from-[var(--color-primary-2)] to-[var(--color-secondary)] bg-clip-text text-transparent"> Premium</span>
                <br />
                para seu negócio
              </h1>

              <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed mb-8 max-w-3xl">
                Potencialize suas operações com nossa API completa. Consultas em tempo real, 
                cobranças PIX instantâneas e saques automatizados com segurança enterprise.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onStartSpecs}
                  className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-dual-gradient text-white font-semibold shadow-2xl shadow-[var(--color-primary-2)]/20 hover:shadow-[var(--color-primary-2)]/30 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-2)]/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-3">
                    <FaPlug className="w-5 h-5" />
                    Explorar Especificações
                  </div>
                </button>

                <a
                  href="#base-url"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/5 text-white font-semibold border border-white/10 hover:border-[var(--color-primary-2)]/40 hover:bg-[var(--color-primary-2)]/10 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-2)]/50"
                >
                  <div className="flex items-center gap-3">
                    <FaLink className="w-5 h-5" />
                    Base URL & Headers
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Métricas resumidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
            {[
              { icon: Zap, value: '99.9%', label: 'Uptime' },
              { icon: Clock, value: '< 200ms', label: 'Latência' },
              { icon: ShieldLucide, value: 'TLS 1.3', label: 'Segurança' },
              { icon: Cpu, value: 'REST API', label: 'Arquitetura' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary-2)]/15 transition-colors">
                  <stat.icon className="w-6 h-6 text-[var(--color-primary-2)]" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Start em 3 passos — tema azul */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-850 rounded-3xl border border-white/5" />
        <div className="relative p-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Comece em <span className="text-[var(--color-primary-2)]">3 Passos</span>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
              Integração simples e direta. Em poucos minutos você estará processando pagamentos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { step: '01', icon: FaKey, title: 'Gerar Token API', description: 'Acesse o painel e gere seu token de autenticação seguro.', gradient: 'bg-dual-gradient' },
              { step: '02', icon: FaClipboardList, title: 'Configurar Headers', description: 'Configure Authorization, Content-Type e Accept em suas requisições.', gradient: 'bg-dual-gradient' },
              { step: '03', icon: FaMoneyBillWave, title: 'Criar Cobrança', description: 'POST /transactions/pix com amountCents para gerar PIX instantâneo.', gradient: 'bg-dual-gradient' },
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary-2)]/15 to-[var(--color-secondary)]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm rounded-2xl" />
                <div className="relative h-full bg-neutral-800/50 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm group-hover:border-white/20 transition-all">
                  <div className={`w-16 h-16 rounded-2xl ${item.gradient} flex items-center justify-center shadow-lg mb-6`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[var(--color-primary-2)] font-mono text-xs sm:text-sm font-semibold mb-2">{item.step}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Autenticação e Permissões — focado em azul */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-850 rounded-3xl border border-white/5" />
          <div className="relative p-8 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-2)]/15 border border-[var(--color-primary-2)]/25 flex items-center justify-center">
                <FaKey className="w-6 h-6 text-[var(--color-primary-2)]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Autenticação</h3>
                <p className="text-neutral-400">Bearer Token Security</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
                <code className="text-[var(--color-primary-2)] font-mono text-sm break-all">Authorization: Bearer &lt;SEU_API_TOKEN&gt;</code>
              </div>
              <div className="flex items-start gap-3 text-neutral-300">
                <div className="w-2 h-2 bg-[var(--color-primary-2)] rounded-full mt-2" />
                <p>Tokens são criados no painel e não devem ser expostos em clientes públicos.</p>
              </div>
              <div className="flex items-start gap-3 text-neutral-300">
                <div className="w-2 h-2 bg-[var(--color-primary-2)] rounded-full mt-2" />
                <p>Use sempre HTTPS em todas as requisições.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-850 rounded-3xl border border-white/5" />
          <div className="relative p-8 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-2)]/15 border border-[var(--color-primary-2)]/25 flex items-center justify-center">
                <FaShieldAlt className="w-6 h-6 text-[var(--color-primary-2)]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Permissões</h3>
                <p className="text-neutral-400">Scopes & Access Control</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { scope: 'wallet:read', desc: 'Leitura de saldos e carteiras' },
                { scope: 'payments:create', desc: 'Criação de cobranças PIX' },
                { scope: 'payments:read', desc: 'Consulta de transações' },
                { scope: 'withdrawals:write', desc: 'Solicitação de saques' },
                { scope: 'withdrawals:read', desc: 'Consulta de saques' },
              ].map((perm, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800/30 hover:bg-neutral-800/50 transition-colors">
                  <div className="w-2 h-2 bg-[var(--color-primary-2)] rounded-full" />
                  <code className="text-[var(--color-primary-2)] font-mono text-xs sm:text-sm">{perm.scope}</code>
                  <span className="text-neutral-400 text-xs sm:text-sm">— {perm.desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-300 mb-2">
                <FaExclamationTriangle className="w-4 h-4" />
                <span className="font-semibold">Atenção</span>
              </div>
              <p className="text-amber-200/80 text-sm">Sem o escopo adequado: resposta HTTP 403 Forbidden</p>
            </div>
          </div>
        </div>
      </div>

      {/* Base URL & Headers */}
      <div id="base-url" className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-850 rounded-3xl border border-white/5" />
        <div className="relative p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Configuração de <span className="text-[var(--color-primary-2)]">Endpoint</span></h2>
            <p className="text-neutral-400 text-base sm:text-lg">Base URL e headers necessários para integração</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="relative group/card">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary-2)]/15 to-[var(--color-secondary)]/15 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity blur-sm" />
              <div className="relative bg-neutral-800/50 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-2)]/15 border border-[var(--color-primary-2)]/25 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-[var(--color-primary-2)]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Base URL</h3>
                    <p className="text-neutral-400">Endpoint Principal</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-700/50 mb-6">
                  <code className="text-[var(--color-primary-2)] font-mono text-sm break-all">https://api.vetuspay.com/api/public/v1</code>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/30">
                    <code className="text-[var(--color-primary-2)] font-mono text-sm">Content-Type</code>
                    <span className="text-neutral-300">application/json</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/30">
                    <code className="text-[var(--color-primary-2)] font-mono text-sm">Accept</code>
                    <span className="text-neutral-300">application/json</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/30">
                    <code className="text-[var(--color-primary-2)] font-mono text-sm">Idempotency-Key</code>
                    <span className="text-neutral-300 text-sm">UUID v4</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group/card">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary-2)]/15 to-[var(--color-secondary)]/15 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity blur-sm" />
              <div className="relative bg-neutral-800/50 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-2)]/15 border border-[var(--color-primary-2)]/25 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[var(--color-primary-2)]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Padrões</h3>
                    <p className="text-neutral-400">Formatação & Convenções</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <FaMoneyBillWave className="w-4 h-4 text-[var(--color-primary-2)]" />
                      Valores Monetários
                    </h4>
                    <p className="text-neutral-400 text-sm">Todos os valores em centavos (inteiros). Exemplo: R$ 1,00 = <code className="text-[var(--color-primary-2)]">100</code></p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--color-primary-2)]" />
                      Datas e Horários
                    </h4>
                    <p className="text-neutral-400 text-sm">ISO 8601 UTC com "Z". Exemplo: <code className="text-[var(--color-primary-2)]">2024-01-15T10:30:00Z</code></p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <ShieldLucide className="w-4 h-4 text-[var(--color-primary-2)]" />
                      Idempotência
                    </h4>
                    <p className="text-neutral-400 text-sm">Use <code className="text-[var(--color-primary-2)]">Idempotency-Key</code> em todas as operações de criação para evitar duplicidade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoints disponíveis — menos cor, realce azul */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-850 rounded-3xl border border-white/5" />
        <div className="relative p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Endpoints <span className="text-[var(--color-primary-2)]">Disponíveis</span></h2>
            <p className="text-neutral-400 text-base sm:text-lg">Todos os recursos disponíveis para integração</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { method: 'GET', path: '/balance', desc: 'Consultar saldo disponível' },
              { method: 'GET', path: '/wallets', desc: 'Listar carteiras' },
              { method: 'POST', path: '/transactions/pix', desc: 'Criar cobrança PIX' },
              { method: 'GET', path: '/transactions/pix/{saleId}', desc: 'Consultar transação' },
              { method: 'POST', path: '/withdrawals', desc: 'Solicitar saque' },
              { method: 'GET', path: '/withdrawals', desc: 'Listar saques' },
              { method: 'GET', path: '/withdrawals/{wid}', desc: 'Consultar saque' },
            ].map((endpoint, idx) => (
              <div key={idx} className="group/card relative p-6 rounded-2xl bg-neutral-800/30 border border-white/10 hover:border-[var(--color-primary-2)]/30 transition-all">
                <div className="inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-4 bg-[var(--color-primary-2)]/15 text-[var(--color-primary-2)] border border-[var(--color-primary-2)]/25">
                  {endpoint.method}
                </div>
                <code className="block text-white font-mono text-sm mb-3 break-all">{endpoint.path}</code>
                <p className="text-neutral-400 text-sm">{endpoint.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Boas práticas */}
      <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3"><FaClipboardList className="inline-block w-5 h-5 mr-2 text-[var(--color-primary-2)]" /> Boas práticas</h3>
        <ul className="text-neutral-300 text-sm sm:text-base space-y-2">
          <li>• Não exponha o token; guarde-o apenas no servidor.</li>
          <li>• Use <code className="text-[var(--color-primary-2)]">Idempotency-Key</code> em POSTs de criação.</li>
          <li>• Polling com backoff exponencial para consultar status.</li>
          <li>• Confirme KYC se receber 403 "KYC required".</li>
          <li>• Só libere produto/serviço quando o status for "paid".</li>
          <li>• Armazene o campo <code className="text-[var(--color-primary-2)]">raw</code> do provedor para auditoria.</li>
          <li>• Para saques, valide que o CPF cadastrado existe e é válido.</li>
        </ul>
      </div>

      {/* Ação final */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-neutral-900 to-neutral-850 border border-neutral-700/40 rounded-2xl p-6">
        <p className="text-neutral-300 text-sm sm:text-base">
          Em resumo: configure o token com scopes corretos, use a Base URL, Idempotency-Key em criações,
          consulte status com <code className="text-[var(--color-primary-2)]">sync=true</code> quando precisar do "agora", e lembre-se que
          saques vão apenas para o CPF cadastrado.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onStartSpecs}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dual-gradient text-white border border-[var(--color-primary-2)]/60 hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-2)]/50"
          >
            <FaPlug className="w-4 h-4" />
            Especificação da API
          </button>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-neutral-200 border border-neutral-700/50 hover:bg-[var(--color-primary-2)]/10 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-2)]/50"
          >
            Voltar ao topo
          </button>
        </div>
      </div>
    </section>
  );
}
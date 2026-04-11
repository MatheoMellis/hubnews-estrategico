import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Cpu, 
  Globe, 
  Search, 
  ChevronRight, 
  Newspaper, 
  GraduationCap, 
  Landmark, 
  ShieldAlert, 
  Menu,
  X,
  Lock,
  User,
  KeyRound,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'ti', label: 'Concursos TI', icon: <Building2 size={18} /> },
  { id: 'ai', label: 'Inteligência Artificial', icon: <Cpu size={18} /> },
  { id: 'news', label: 'Atualidades', icon: <Globe size={18} /> },
];

const SUB_CATEGORIES = {
  ti: [
    { id: 'all', label: 'Visão Geral' },
    { id: 'bancos', label: 'Bancos' },
    { id: 'federal', label: 'Setor Federal' },
    { id: 'policial', label: 'Carreira Policial' },
    { id: 'universidades', label: 'Faculdades' }
  ],
  ai: [
    { id: 'all', label: 'Visão Geral' },
    { id: 'local', label: 'IAs Locais (Edge)' },
    { id: 'cloud', label: 'IAs na Nuvem (API)' },
    { id: 'agents', label: 'Ferramentas Agênticas' }
  ],
  news: [
    { id: 'all', label: 'Visão Geral' },
    { id: 'brasil', label: 'Brasil' },
    { id: 'mundo', label: 'Mundo' },
    { id: 'economia', label: 'Economia' }
  ]
};

const NEWS_DATA = [
  // TI - BANCOS
  { id: 1, mainCat: 'ti', subCat: 'bancos', title: 'Caixa Econômica acelera convocações de TI', excerpt: 'Com prorrogação até 2026, banco estatal foca em cadastro reserva da área de Tecnologia.', date: 'Há 2 horas', source: 'Estratégia' },
  { id: 2, mainCat: 'ti', subCat: 'bancos', title: 'Banco do Brasil: Edital 2026 para Agente de Tecnologia', excerpt: 'Termos de referência foram enviados às bancas. Foco em UX, Dados e Segurança.', date: 'Ontem', source: 'Direção' },
  
  // TI - FEDERAL
  { id: 3, mainCat: 'ti', subCat: 'federal', title: 'BNDES: Novo cronograma para Analista de Sistemas', excerpt: 'Concurso unificado de tecnologia no setor federal promete salário inicial de R$ 20.900.', date: 'Hoje', source: 'Gran Cursos' },
  { id: 4, mainCat: 'ti', subCat: 'federal', title: 'TSE Unificado: Impactos na área de TI', excerpt: 'O que focar na reta final para Analista de Apoio Especializado.', date: 'Há 5 horas', source: 'Qconcursos' },
  
  // TI - POLICIAL
  { id: 5, mainCat: 'ti', subCat: 'policial', title: 'Polícia Federal: Perito de Informática', excerpt: 'Novo pedido de concurso inclui 100 vagas específicas para área técnica de TI e Cybersec.', date: 'Há 1 dia', source: 'Folha Dirigida' },
  { id: 6, mainCat: 'ti', subCat: 'policial', title: 'Edital PC-SP para Tecnologia', excerpt: 'Polícia Civil concentra esforços na digitalização e prevê vagas em 2026.', date: 'Hoje', source: 'PCI Concursos' },
  
  // TI - UNIVERSIDADES
  { id: 7, mainCat: 'ti', subCat: 'universidades', title: 'Edital UFRJ para Técnico de TI', excerpt: 'Mais de 50 vagas abertas para suporte, redes e desenvolvimento nas universidades federais.', date: 'Hoje', source: 'DOU' },
  
  // AI
  { id: 8, mainCat: 'ai', subCat: 'local', title: 'Gemma 2 em smartphones: Como rodar', excerpt: 'Google otimiza modelos de linguagem para processamento on-device sem usar internet.', date: 'Hoje', source: 'TechCrunch' },
  { id: 9, mainCat: 'ai', subCat: 'cloud', title: 'GPT-5.4 Nano chega com preços agressivos', excerpt: 'Nova versão para desenvolvedores reduz custos de API em 80%.', date: 'Há 3 horas', source: 'OpenAI Blog' },
  { id: 10, mainCat: 'ai', subCat: 'agents', title: 'Claude Code assume automação plena', excerpt: 'Ferramenta agêntica agora consegue gerenciar infraestrutura inteira via terminal.', date: 'Ontem', source: 'Anthropic' },
  
  // NEWS
  { id: 11, mainCat: 'news', subCat: 'economia', title: 'Ibovespa rompe os 195 mil pontos', excerpt: 'Mercado em alta com expectativas de juros e cenário externo favorável.', date: 'Agora', source: 'Valor' },
  { id: 12, mainCat: 'news', subCat: 'brasil', title: 'Novas regras para trabalho remoto aprovadas', excerpt: 'Congresso define normas claras para teletrabalho de profissionais de tecnologia.', date: 'Ontem', source: 'G1' },
];

// Componentes movidos para fora do App para evitar perda de foco/teclado
const PageHeader = ({ activeMain, apiKey, searchQuery, setSearchQuery, setShowSettings }) => (
  <div className="mb-8 border-b border-[#262626] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2 md:pt-0">
    <div className="flex-1">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
        {CATEGORIES.find(c => c.id === activeMain)?.label}
      </h1>
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-[#A1A1AA]">
          Visão estratégica em tempo real.
        </p>
        {!apiKey && (
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold border border-amber-500/20 uppercase tracking-widest whitespace-nowrap">
            Modo Estático
          </span>
        )}
      </div>
    </div>
    <div className="flex gap-3 w-full md:w-auto flex-shrink-0">
      <div className="relative flex-1 md:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]" size={16} />
        <input 
          type="text" 
          placeholder="Filtrar resultados..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingLeft: '2.5rem' }}
          className="w-full bg-[#0A0A0A] border border-[#262626] rounded-md py-2 pr-4 text-sm text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#EDEDED] transition-colors"
        />
      </div>
      <button 
        onClick={() => setShowSettings(true)}
        className="p-2 border border-[#262626] bg-[#0A0A0A] rounded-md hover:bg-[#171717] text-[#A1A1AA] transition-colors flex-shrink-0"
      >
         <ShieldAlert size={18} />
      </button>
    </div>
  </div>
);

const SubNav = ({ activeMain, activeSub, setActiveSub }) => (
  <div className="flex gap-6 border-b border-[#262626] mb-8 overflow-x-auto no-scrollbar">
    {SUB_CATEGORIES[activeMain]?.map(sub => (
      <button
        key={sub.id}
        onClick={() => setActiveSub(sub.id)}
        className={`pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
          activeSub === sub.id 
          ? 'border-white text-white' 
          : 'border-transparent text-[#A1A1AA] hover:text-white'
        }`}
      >
        {sub.label}
      </button>
    ))}
  </div>
);

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, activeMain, setActiveMain, handleLogout }) => (
  <AnimatePresence>
    {isMobileMenuOpen && (
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        className="fixed inset-0 z-50 bg-[#000000] border-r border-[#262626] w-64 p-6 md:hidden flex flex-col"
      >
        <div className="flex justify-between items-center mb-8">
          <span className="font-bold text-white tracking-tight">HUBNEWS</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#A1A1AA]">
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveMain(cat.id); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                activeMain === cat.id ? 'bg-[#171717] text-white' : 'text-[#A1A1AA] hover:bg-[#171717] hover:text-white'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </nav>
        
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 mt-auto p-3 text-sm font-medium text-red-500 bg-red-500/10 rounded-lg"
        >
          <LogOut size={16} /> Sair do App
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

function App() {
  // Persistência de Sessão
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('HUBNEWS_AUTH') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [activeMain, setActiveMain] = useState('ti');
  const [activeSub, setActiveSub] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [dynamicNews, setDynamicNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('HUBNEWS_API_KEY') || 'bca4d13fe7d88370c39b731e9b02b5ce');
  const [showSettings, setShowSettings] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'TPdTpTTT!1973') {
      setIsAuthenticated(true);
      localStorage.setItem('HUBNEWS_AUTH', 'true');
      setErrorMsg('');
    } else {
      setErrorMsg('Usuário ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('HUBNEWS_AUTH');
    setUsername('');
    setPassword('');
  };

  const saveApiKey = () => {
    localStorage.setItem('HUBNEWS_API_KEY', tempApiKey);
    setApiKey(tempApiKey);
    setShowSettings(false);
  };

  const getQueryForCategory = (main, sub) => {
    const queries = {
      ti: {
        all: 'concurso tecnologia',
        bancos: 'concurso (banco brasil OR caixa economica)',
        federal: 'concurso (federal OR bndes OR tse OR inss)',
        policial: 'concurso (policia federal OR policia civil)',
        universidades: 'concurso (universidade OR ufrj OR usp)'
      },
      ai: {
        all: 'inteligencia artificial',
        local: 'IA local OR gemma OR llama',
        cloud: 'openai OR gemini OR claude',
        agents: 'IA agentes OR auto-gpt'
      },
      news: {
        all: 'noticias Brasil',
        brasil: 'politica Brasil OR tecnologia Brasil',
        mundo: 'internacional noticias',
        economia: 'economia OR ibovespa'
      }
    };
    return queries[main][sub] || 'concurso';
  };

  useEffect(() => {
    setActiveSub('all');
  }, [activeMain]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    if (apiKey) {
      setIsLoading(true);
      const query = getQueryForCategory(activeMain, activeSub);
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=pt&country=br&max=9&apikey=${apiKey}`;
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.articles) {
            const formattedNews = data.articles.map((item, idx) => ({
               id: idx + Math.random(),
               title: item.title,
               excerpt: item.description || 'Sem descrição.',
               date: new Date(item.publishedAt).toLocaleDateString('pt-BR'),
               source: item.source.name,
               url: item.url,
               mainCat: activeMain,
               subCat: activeSub
            }));
            setDynamicNews(formattedNews);
          }
        })
        .catch(err => console.error("Erro API:", err))
        .finally(() => setIsLoading(false));
    }
  }, [activeMain, activeSub, isAuthenticated, apiKey]);

  const filteredNews = dynamicNews.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-sm rounded-2xl bg-[#0A0A0A] border border-[#262626] p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center">
              <Lock size={24} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white tracking-tight mb-2">Acesso Restrito</h2>
          <p className="text-center text-sm text-[#A1A1AA] mb-8">HUBNEWS Área Administrativa</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3 text-[#A1A1AA]" />
                <input 
                  type="text" 
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                  className="w-full bg-[#000000] border border-[#262626] rounded-lg py-3 pr-4 text-sm text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#EDEDED] transition-colors"
                />
              </div>
            </div>
            <div>
              <div className="relative flex items-center">
                <KeyRound size={16} className="absolute left-3 text-[#A1A1AA]" />
                <input 
                  type="password" 
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                  className="w-full bg-[#000000] border border-[#262626] rounded-lg py-3 pr-4 text-sm text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#EDEDED] transition-colors"
                />
              </div>
            </div>
            {errorMsg && <p className="text-red-500 text-xs text-center font-medium">{errorMsg}</p>}
            <button type="submit" className="w-full bg-white text-black font-semibold rounded-lg py-3 text-sm hover:bg-[#E5E5E5] transition-colors mt-4">
              Entrar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#000000] flex overflow-hidden relative">
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
             <div className="bg-[#0A0A0A] border border-[#262626] w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-[#A1A1AA] hover:text-white"><X size={18}/></button>
                <h3 className="text-xl font-bold text-white mb-2">Integração de Notícias</h3>
                <p className="text-[#A1A1AA] text-sm mb-6">Configure sua API Key da GNews aqui.</p>
                <div className="mb-4">
                  <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-widest block mb-2">API GNews Key</label>
                  <input type="password" value={tempApiKey} onChange={(e) => setTempApiKey(e.target.value)} style={{ paddingLeft: '1rem' }} className="w-full bg-[#000000] border border-[#262626] rounded-md py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors" />
                </div>
                <div className="flex gap-3 justify-end mt-8">
                  <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-sm text-white bg-[#171717] rounded-md hover:bg-[#262626]">Cancelar</button>
                  <button onClick={saveApiKey} className="px-4 py-2 text-sm text-black bg-white rounded-md font-medium hover:bg-[#E5E5E5]">Salvar</button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:hidden absolute top-0 left-0 right-0 h-14 border-b border-[#262626] bg-[#000000]/80 backdrop-blur-md z-40 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-[#A1A1AA] p-1 mr-3"><Menu size={20} /></button>
          <span className="font-bold text-white text-sm">HUBNEWS</span>
        </div>
      </div>
      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} activeMain={activeMain} setActiveMain={setActiveMain} handleLogout={handleLogout} />

      <aside className="w-64 border-r border-[#262626] bg-[#000000] hidden md:flex flex-col h-full flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center"><Newspaper size={14} /></div>
            HUBNEWS
          </h2>
        </div>
        <div className="px-3 pb-6 flex-1 overflow-y-auto no-scrollbar">
          <p className="px-3 text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-3">Workspace</p>
          <nav className="flex flex-col gap-1">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveMain(cat.id)} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeMain === cat.id ? 'bg-[#171717] text-white' : 'text-[#A1A1AA] hover:bg-[#171717] hover:text-white'}`}>
                {cat.icon}{cat.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-[#262626] flex items-center justify-between group cursor-pointer flex-shrink-0" onClick={handleLogout}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center"><User size={14} className="text-white" /></div>
            <div><p className="text-sm font-medium text-white">{username || 'admin'}</p><p className="text-xs text-[#A1A1AA]">Admin</p></div>
          </div>
          <LogOut size={16} className="text-[#A1A1AA] group-hover:text-red-500 transition-colors" />
        </div>
      </aside>

      <main className="flex-1 bg-[#000000] h-full overflow-y-auto relative w-full">
        <div className="max-w-5xl mx-auto p-6 md:p-10 pt-20 md:pt-10">
          <PageHeader activeMain={activeMain} apiKey={apiKey} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setShowSettings={setShowSettings} />
          <SubNav activeMain={activeMain} activeSub={activeSub} setActiveSub={setActiveSub} />
          {isLoading ? <div className="flex items-center justify-center py-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode='popLayout'>
                {filteredNews.map((news) => (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={news.id} onClick={() => news.url && window.open(news.url, '_blank')} className="card p-5 cursor-pointer group flex flex-col h-full bg-[#0A0A0A] border border-[#262626] rounded-xl hover:border-[#3b82f6] transition-all overflow-hidden text-left">
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <span className="bg-[#171717] px-2.5 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider flex-shrink-0">{news.subCat}</span>
                      <span className="text-[#A1A1AA] text-[11px] truncate">{news.date}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white leading-snug mb-3 group-hover:text-[#3b82f6] transition-colors line-clamp-2">{news.title}</h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 font-normal line-clamp-3">{news.excerpt}</p>
                    <div className="mt-auto pt-4 border-t border-[#262626] flex justify-between items-center whitespace-nowrap overflow-hidden">
                      <span className="text-[10px] uppercase text-[#A1A1AA] font-bold block truncate max-w-[150px]">Fonte: {news.source}</span>
                      <ChevronRight size={14} className="text-[#A1A1AA] group-hover:text-white transition-colors flex-shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          {!isLoading && filteredNews.length === 0 && (
            <div className="py-20 text-center border border-dashed border-[#262626] rounded-xl mt-6">
              <Search size={32} className="mx-auto text-[#A1A1AA] mb-4" />
              <h3 className="text-white font-medium mb-1">Nenhum resultado</h3>
              <p className="text-sm text-[#A1A1AA]">Ajuste seus filtros ou aguarde a cota diária da API (máx 100/dia).</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

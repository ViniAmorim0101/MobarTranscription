// Força o painel a ser sempre visível e reanexado ao body
setInterval(() => {
  let painel = document.getElementById('painel-transcricao');
  if (!painel) {
    criarPainel();
    fixarPainel();
    painel = document.getElementById('painel-transcricao');
  }
  if (painel) {
    // Remove qualquer atributo ou estilo que possa ocultar
    painel.style.display = 'block';
    painel.style.visibility = 'visible';
    painel.style.opacity = '1';
    painel.style.pointerEvents = 'auto';
    painel.removeAttribute('hidden');
    painel.removeAttribute('aria-hidden');
    // Reanexa ao body se não estiver
    if (painel.parentElement !== document.body) {
      document.body.appendChild(painel);
    }
  }
}, 200);
// Sempre reexibe o painel se ele sumir ou for ocultado
function restaurarPainelSempre() {
  criarPainel();
  fixarPainel();
}

// Reforça a cada clique, foco ou interação
['click', 'mousedown', 'mouseup', 'focus', 'blur'].forEach(evt => {
  window.addEventListener(evt, () => {
    setTimeout(restaurarPainelSempre, 10);
  }, true);
});
// Garante que o painel nunca seja removido ou ocultado
function fixarPainel() {
  const painel = document.getElementById('painel-transcricao');
  if (painel) {
    painel.style.display = 'block';
    painel.style.visibility = 'visible';
    painel.style.opacity = '1';
    painel.style.pointerEvents = 'auto';
    // Remove qualquer atributo que possa ocultar
    painel.removeAttribute('hidden');
    painel.removeAttribute('aria-hidden');
  }
}
let transcritas = [];
let linhasTranscritas = new Set();
let ultimoBloco = "";

function criarPainel() {
  if (document.getElementById('painel-transcricao')) return;
  const painel = document.createElement('div');
  painel.id = 'painel-transcricao';
  painel.style.position = 'fixed';
  painel.style.top = '20px';
  painel.style.right = '20px';
  painel.style.width = '350px';
  painel.style.maxHeight = '300px';
  painel.style.overflowY = 'auto';
  painel.style.background = '#fff';
  painel.style.color = '#000';
  painel.style.padding = '16px';
  painel.style.borderRadius = '8px';
  painel.style.zIndex = '99999';
  painel.style.fontSize = '16px';
  painel.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  painel.innerHTML = '<b>Transcrição:</b><br><div id="texto-transcricao" style="white-space:pre-line; margin-top:8px;"></div>';
  document.body.appendChild(painel);
}

function atualizarPainel() {
  const painelTexto = document.getElementById('texto-transcricao');
  if (painelTexto) {
    painelTexto.innerText = transcritas.join('\n');
  }
  // Salva no localStorage para o popup acessar
  localStorage.setItem('transcricao_meet', transcritas.join('\n'));
}


function capturarLegendas() {
  // Captura todos os blocos de legenda na tela (um para cada participante)
  const legendaDivs = document.querySelectorAll('div.ygicle.VbkSUe');
  let todasFalaseNomes = [];
  legendaDivs.forEach(div => {
    // Tenta encontrar o nome do participante acima do bloco de legenda
    let nome = '';
    let el = div.parentElement;
    // Sobe até encontrar um elemento com texto (nome) ou até o topo
    for (let i = 0; i < 3 && el; i++) {
      // Procura por span ou div com texto e sem classe de legenda
      const possivelNome = el.querySelector('span, div');
      if (possivelNome && possivelNome !== div && possivelNome.innerText.trim() && !possivelNome.className.includes('VbkSUe')) {
        nome = possivelNome.innerText.trim();
        break;
      }
      el = el.parentElement;
    }
    if (!nome) nome = 'Participante';
    const texto = div.innerText.trim();
    if (texto) {
      const linhas = texto.split('\n').map(l => l.trim()).filter(l => l);
      linhas.forEach(fala => {
        todasFalaseNomes.push(`${nome}: ${fala}`);
      });
    }
  });
  // Remove duplicatas consecutivas
  let resultado = [];
  todasFalaseNomes.forEach(linha => {
    if (resultado.length === 0 || resultado[resultado.length - 1] !== linha) {
      resultado.push(linha);
    }
  });
  // Só atualiza se mudou
  if (resultado.length > 0 && resultado.join('\n') !== transcritas.join('\n')) {
    transcritas = [...resultado];
    atualizarPainel();
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ transcricao_meet: transcritas.join('\n') });
    }
    localStorage.setItem('transcricao_meet', transcritas.join('\n'));
  }
}

criarPainel();
// Cria e mantém o painel sempre visível enquanto o Meet estiver aberto
criarPainel();
setInterval(() => {
  criarPainel(); // Garante que o painel sempre existe e visível
  capturarLegendas();
  fixarPainel();
}, 1000);
// Impede que o painel seja removido do DOM
const observer = new MutationObserver(() => {
  if (!document.getElementById('painel-transcricao')) {
    restaurarPainelSempre();
  } else {
    fixarPainel();
  }
});
observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'hidden', 'aria-hidden'] });

document.addEventListener('DOMContentLoaded', function () {
  const textarea = document.getElementById('texto');
  const btnBaixar = document.getElementById('baixar');

  // Atualiza o textarea sempre que abrir o popup

  function atualizarTexto() {
    // Tenta ler do chrome.storage.local para garantir acesso entre scripts
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['transcricao_meet'], function(result) {
        textarea.value = result.transcricao_meet || '';
      });
    } else {
      // fallback para localStorage (caso rode como página normal)
      const textoSalvo = localStorage.getItem('transcricao_meet') || '';
      textarea.value = textoSalvo;
    }
  }
  atualizarTexto();
  setInterval(atualizarTexto, 1000);

  btnBaixar.addEventListener('click', function () {
    const textoSalvo = textarea.value;
    const blob = new Blob([textoSalvo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcricao_meet.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});
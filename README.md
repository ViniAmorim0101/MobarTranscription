# 📝 MobarTranscription

**MobarTranscription** é uma extensão para Google Chrome desenvolvida para capturar e transcrever automaticamente as reuniões no Google Meet. Ideal para quem deseja registrar reuniões, aulas ou conversas importantes de forma prática e automatizada.

## 🚀 Funcionalidades

- Captura em tempo real das legendas automáticas do Google Meet.
- Transcrição contínua e organizada das falas.
- Interface leve e simples, com foco na produtividade.

## ⚙️ Instalação no Google Chrome

Para adicionar a extensão manualmente ao seu navegador, siga os passos abaixo:

1. **Clone ou baixe o repositório**:
   - Acesse [o repositório MobarTranscription](https://github.com/ViniAmorim0101/MobarTranscription) e clique em "Code" > "Download ZIP".
   - Extraia os arquivos em uma pasta local.

2. **Acesse o modo de desenvolvedor no Chrome**:
   - Abra o navegador Google Chrome.
   - Vá para `chrome://extensions/`.
   - Ative o **Modo de desenvolvedor** (canto superior direito).

3. **Carregue a extensão**:
   - Clique em **"Carregar sem compactação"**.
   - Selecione a pasta onde os arquivos da extensão foram extraídos.

4. A extensão será adicionada e estará pronta para uso.

## ⚠️ Importante: Ative as legendas automáticas no Google Meet

Para que a extensão funcione corretamente, é **obrigatório ativar as legendas automáticas** durante a chamada no Google Meet:

- Ao entrar em uma reunião, clique em **"Ativar legendas"** (ícone de CC).
- Certifique-se de que o idioma das legendas está configurado corretamente.

Sem as legendas ativadas, a extensão **não conseguirá capturar o conteúdo falado**.

## 📁 Estrutura do Projeto

- `manifest.json`: Define as permissões e configurações da extensão.
- `content.js`: Script principal que interage com a página do Google Meet e extrai as legendas.
- `background.js` (se presente): Gerencia eventos em segundo plano.
- `popup.html` e `popup.js`: Interface da extensão (se aplicável).

## 👨‍💻 Autor

Desenvolvido por [Vinicius Amorim](https://www.linkedin.com/in/viniciusferreiradasilvaamorim/) — apaixonado por tecnologia, qualidade de software e inteligência artificial.

---

Se quiser, posso ajudar a traduzir esse README para o inglês ou criar uma versão visual para publicação no GitHub. Deseja isso?

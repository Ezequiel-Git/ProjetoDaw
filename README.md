# Project Daw

Project Daw é uma estação de trabalho de áudio digital (DAW) baseada na web, focada em síntese de áudio, sequenciamento e live coding diretamente no navegador usando o poder da **Web Audio API**, **Tone.js** e **WebAudioFont**.

Com uma interface responsiva cyberpunk e múltiplos esquemas visuais premium, o Project Daw permite que você programe arranjos musicais complexos usando um editor de código em tempo real integrado a um sequenciador físico clássico estilo Step Sequencer/Piano Roll.

---

## 🚀 Principais Recursos

- **Engine Híbrida de Áudio**: Combina síntese subtrativa/FM clássica da Web Audio API com amostras de SoundFont (.sf2) reais por meio da biblioteca WebAudioFont player.
- **Teclado de Piano Virtual**: Teclado interativo de 25 teclas (C4 a C6) com suporte completo a toques de mouse e mapeamento de teclas físicas de digitação do computador.
- **Editor de Código com Sintaxe Facilitada**:
  - Instâncias Synth auto-instanciáveis de forma global (sem necessidade obrigatória de `const`/`let`).
  - Suporte a multiplicador de repetição simplificado (`D2*4` expande para `D2 D2 D2 D2`, e `.*16` insere 16 tempos de silêncio).
  - Execução de canais sintetizados diretamente como funções callables: `bass("D2 C2")` em vez de `bass.play("D2 C2")`.
- **Mixer Completo com Efeitos**: Controle independente por canal de Volume, Panning, Reverb, Chorus, Distorção e Eco/Delay no FX Rack lateral.
- **Visualizador em Resolução HD**:
  - Renderização Retina-sharp sem borrões ou esticamentos geométricos.
  - Modos visuais dinâmicos auto-ajustáveis para visualização em tela cheia (Classic Waveform, Neon Spectrogram e Holograma 3D Wave).
- **Suporte Interativo Avançado**:
  - Ajuste de faders, knobs de VST e sliders de efeito girando a roda do mouse (**Mouse Wheel**).
  - Rolagem horizontal automática e fluida no Channel Rack e no Piano Roll ao girar a roda do mouse sobre a grade de notas.
- **Responsividade Total**: Layout totalmente adaptável para telas de smartphones, tablets e desktops de alta resolução.
- **Sistema de Temas Dinâmicos**: Quatro temas neon selecionáveis em tempo real (Cyberpunk, Acid Toxic Lime, Synthwave Sunset e Deep Space Silver).
- **Exportação e Gravação**: Suporte para gravação ao vivo da saída master e exportação direta do áudio em arquivo de formato **MP3/WAV**.

---

## 🎹 Atalhos de Teclado (Shortcuts)

Para agilizar o fluxo de produção, você pode usar os seguintes atalhos no teclado:

- `Ctrl + Enter`: Tocar/Iniciar Reprodução (Play)
- `Ctrl + Space`: Pausar/Retomar Reprodução (Pause/Resume)
- `Ctrl + .`: Parar/Silenciar DAW (Stop)
- `Ctrl + K`: Mostrar/Ocultar Teclado Piano Virtual
- `C`: Ligar/Desligar Metrônomo (quando fora de caixas de texto)

---

## 🛠️ Stack Tecnológica

1. **Core**: HTML5, Vanilla JavaScript, CSS3
2. **Biblioteca de Áudio**: Web Audio API, Tone.js, lamejs (Codificador MP3)
3. **Soundfonts**: WebAudioFontPlayer
4. **Ferramenta de Build**: Vite v5

---

## ⚙️ Instalação e Execução Local

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM

### Passos
1. Clone este repositório no seu computador.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra o endereço gerado pelo Vite no seu navegador (ex: `http://localhost:5173`).

### Compilação de Produção
Para compilar a aplicação final estática otimizada para hospedagem em sites (ex: GitHub Pages):
```bash
npm run build
```
O build de produção será gerado na pasta `/dist`.

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT** - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

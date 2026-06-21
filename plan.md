# Plano de Implementação - Análise do Projeto DAW & Próximos Passos

Este plano detalha o estado atual da DAW customizada contida no arquivo [index.html](file:///c:/Users/Pichau/Projetos/strundel/index.html) e propõe as próximas melhorias com base na análise minuciosa de todo o código-fonte.

---

## Estado Atual da DAW (O que existe e funciona)

1. **Abas do Workspace**:
   - `PRESETS` (Timbres predefinidos)
   - `SEQUENCER` (Step Sequencer físico estilo rack)
   - `PIANO ROLL` (Grade de notas para o canal ativo, com suporte a polifonia / acordes via `Tone.PolySynth`)
   - `PLAYLIST` (Grade de arranjo linear estilo FL Studio com suporte a lápis, borracha, faixas horizontais e desenho dinâmico de waveforms/mini piano-rolls)
   - `MIXER` (Faders individuais de volume, pan e controle de efeitos: distorção, chorus, reverb por canal e fader master)
   - `CÓDIGO` (Editor live coding que traduz a grade visual para código executável)

2. **Controles de Tempo e BPM**:
   - Controle de BPM bidirecional: controle deslizante (slider) e campo numérico interativo digitável com fallback automático e sincronização em tempo real com o editor de código.

3. **Gravação ao Vivo & Upload**:
   - Gravação de voz/instrumento direto do microfone para a playlist.
   - Upload de arquivos de áudio locais, com renderização gráfica da forma de onda (waveform) na timeline.

4. **Exportação Offline & Salvamento JSON**:
   - Motor de exportação offline em partes (`renderAudioInChunks`) que suporta os modos PAT e SONG.
   - **[RESOLVIDO] Salvamento Completo:** Agora o JSON de exportação salva toda a playlist (`playlistClips`), as automações (`playlistAutomations`) e serializa em Base64 todos os clipes de áudio gravados ou carregados.

5. **[RESOLVIDO] Visual Premium & Botões Modernizados**:
   - **Controles de Transporte:** Novo estilo com gradientes escuros, bordas refinadas e efeitos de neon pulsante nas cores verde (play), magenta (stop), ciano (pause) e laranja/vermelho (record), com animações 3D de translação (translate Y) e escala (scale) ao passar o mouse.
   - **Ações de Projeto (Save/Load/Export):** Novo estilo sem estilos inline, utilizando classes CSS dedicadas (`.btn-save`, `.btn-load`, `.btn-export`) com efeitos modernos de reflexão (inset shadows) e sombras brilhantes (box shadow glow).

---

## Próximas Ideias e Melhorias Propostas

### 1. Falta de Desfazer/Refazer (Undo/Redo) no Piano Roll
- **Problema**: Alterações acidentais no Piano Roll ou no Sequenciador não podem ser desfeitas.
- **Solução**: Implementar uma pilha simples de estados de histórico para a grade do sequencer e piano roll para suportar `Ctrl+Z` e `Ctrl+Y`.

### 2. Quantização (Snap to Grid) e Edição Avançada no Piano Roll
- **Problema**: As notas inseridas no Piano Roll ficam restritas a um grid fixo sem flexibilidade avançada de tamanho da nota ou encaixe rítmico (ex: 1/4, 1/8, 1/16, tripletos).
- **Solução**: Adicionar um seletor de snap (quantização) e controle de tamanho das notas no painel superior do Piano Roll.

### 3. Controle Avançado de Automações na Playlist
- **Problema**: O suporte para clipes de automação é simples. Não há um editor visual de pontos para desenhar curvas livres de automação na playlist.
- **Solução**: Implementar um editor de curvas para clipes de automação onde o usuário clica e cria pontos de modulação para qualquer parâmetro (Volume, Pan, Reverb, Chorus, Cutoff).

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
   - **Controles de Transporte:** Novo estilo com gradientes escuros, bordas refinadas e efeitos de neon pulsante.
   - **Ações de Projeto (Save/Load/Export):** CSS limpo com as classes `.btn-save`, `.btn-load`, `.btn-export` contendo sombras e reflexos modernos.

6. **[RESOLVIDO] Sincronização Automática Editor ➔ Playlist**:
   - **Geração Automática de Clipes:** Sempre que você escrever ou compilar código no editor, a DAW cria automaticamente clipes de padrões correspondentes na Playlist no **tempo e compasso corretos**.
   - **Redimensionamento Dinâmico da Timeline:** A timeline e o grid visual se adaptam automaticamente para caber toda a sequência do código de forma dinâmica.

7. **[RESOLVIDO] Correções de Playback e Adição de Trilhas na Playlist**:
   - **Playhead Sincronizado e Inteligente:** Corrigido o bug em que o playhead voltava após 4 compassos no modo PAT (Pattern), mesmo quando o padrão do usuário era maior. Agora o playhead usa o `visualStep` sincronizado com o Web Audio Context e calcula dinamicamente o ponto de retorno baseado no tamanho real dos passos do padrão compilado (`maxSteps`), e avança linearmente no modo SONG.
   - **Botão ADD TRACK:** Adicionado um botão interativo na barra da Playlist que permite criar dinamicamente novas trilhas de arranjo com um único clique.

8. **[RESOLVIDO] Upgrade Premium da DAW (Cyber v7.0)**:
   - **Canvas ADSR Interativo:** O painel de envelope ADSR agora suporta arrastar os nós visuais com o mouse para alterar as configurações do sintetizador do canal em tempo real.
   - **VU Meters Segmentados:** Displays em degrade de LEDs reativos adicionados em todas as tiras do Mixer (individuais e Master) que animam usando analysers do Web Audio API no ritmo exato do playback.
   - **Faders Metálicos de Console:** O estilo dos controles de fader de volume no Mixer foi remodelado para parecer fisicamente tátil com destaques metálicos tridimensionais.
   - **Navegação Sincronizada no Mixer:** Clicar na tira do mixer de qualquer canal agora ativa e seleciona automaticamente esse canal na DAW.

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

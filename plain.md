# Fruity Cyber DAW - Guia de Programação Musical Live Code

Bem-vindo ao guia de live coding da **Fruity Cyber DAW**! Este documento ensina como criar músicas programando diretamente no editor de código da DAW.

## 🚀 Como Começar
No editor de código (Aba **PIANO ROLL / STRUDEL CODE EDITOR**):
*   **Tocar/Compilar**: Pressione `Ctrl + Enter` para carregar as alterações e iniciar a música.
*   **Parar**: Pressione `Ctrl + .` para parar a reprodução.

---

## 🎛️ Todas as Funções Disponíveis

A linguagem de programação da Fruity Cyber DAW é baseada em 4 funções principais:

### 1. Andamento: `bpm(valor)`
Define a velocidade da música em batidas por minuto (BPM).
*   **Exemplo**: `bpm(130);`

---

### 2. Sintetizador/Instrumento: `defineSynth`
Configura a síntese sonora e o comportamento de envelope de um canal específico.
```javascript
defineSynth("nome_do_canal", "tipo", attack, decay, sustain, release, cutoff, resonance, delayMix, delayTime, pitch, humanizer, sustainPedal);
```

#### Parâmetros em Detalhes:
1.  **`nome_do_canal`** (Texto): O ID do canal que você quer configurar (ex: `"bass"`, `"lead"`, `"kick"`). Se o canal não existir, ele será criado.
2.  **`tipo`** (Texto): O gerador de som do canal. Pode ser uma forma de onda ou um instrumento de bateria físico:
    *   **Sintetizadores**: `"sine"` (suave), `"triangle"` (brilhante e limpo), `"sawtooth"` (encorpado, ideal para leads/basses), `"square"` (retrô/chiptune).
    *   **Bateria Física**: `"kick"` (bumbo clássico), `"kick_deep"` (sub bumbo 808), `"snare"` (caixa), `"clap"` (palmas), `"hihat"` (chimbau fechado), `"hihat_open"` (chimbau aberto).
3.  **`attack`** (Número): Tempo de ataque em segundos. O tempo que o som leva para atingir o volume máximo (fade-in).
    *   *Ex*: `0.01` para sons percussivos instantâneos; `0.5` para sons flutuantes (pads).
4.  **`decay`** (Número): Tempo de decaimento em segundos. O tempo que o som leva para descer do pico até o nível de sustain.
    *   *Ex*: `0.15` para sons curtos de pluck.
5.  **`sustain`** (Número): Volume sustentado (de `0.0` a `1.0`). O nível de volume que o sintetizador mantém enquanto a nota estiver ativa.
    *   *Ex*: `0.5` (médio); `0.0` para percussão/plucks que não sustentam som.
6.  **`release`** (Número): Tempo de liberação em segundos. O tempo que o som leva para desaparecer após a nota terminar de tocar (fade-out).
    *   *Ex*: `0.2` para corte rápido; `1.0` ou mais para eco prolongado.
7.  **`cutoff`** (Número): Frequência de corte do filtro passa-baixas (Lowpass Filter) em Hz. Filtra frequências agudas acima desse valor.
    *   *Ex*: `300` para graves abafados; `2000` para sons brilhantes e abertos.
8.  **`resonance`** (Número): Ressonância do filtro (fator Q). Cria um pico de ênfase na frequência de corte, dando um som mais "analógico" ou "ácido".
    *   *Ex*: `1.0` (suave); `8.0` a `15.0` (muito ressonante/ácido estilo TB-303).
9.  **`delayMix`** (Número): Nível do efeito de delay/eco (de `0.0` a `1.0`).
    *   *Ex*: `0.3` adiciona um eco flutuante agradável.
10. **`delayTime`** (Número): Tempo entre as repetições do eco em segundos.
    *   *Ex*: `0.25` para eco rápido; `0.5` para eco mais espaçado.
11. **`pitch`** (Número): Transposição de tom em semitons.
    *   *Ex*: `-12` (uma oitava abaixo, ótimo para baixo); `12` (uma oitava acima).
12. **`humanizer`** (Número): Fator de humanização (de `0.0` a `1.0`). Adiciona variações aleatórias de tempo de início de notas (+/- 25ms) e volumes aleatórios para simular um humano tocando.
    *   *Ex*: `0.1` a `0.2` para uma performance mais natural e expressiva.
13. **`sustainPedal`** (0 ou 1): Simula um pedal de sustentação de piano. Quando ativo (`1`), as notas duram mais tempo antes do corte do envelope de release.
    *   *Ex*: `1` (Ativo), `0` (Desativado).

---

### 3. Efeitos de Rack: `fx`
Aplica efeitos de distorção, chorus e reverb ao canal em tempo real.
```javascript
fx("nome_do_canal", distortion, chorus, reverb);
```
*   **`distortion`** (de `0.0` a `1.0`): Quantidade de saturação de sinal (ótimo para techno/rock).
*   **`chorus`** (de `0.0` a `1.0`): Efeito de duplicação de voz (deixa o som mais largo e espacial).
*   **`reverb`** (de `0.0` a `1.0`): Simulação de ambiente/espaço tridimensional.

---

### 4. Sequenciamento: `canal("padrao")`
Gera o ritmo ou a melodia do canal. O padrão é escrito dentro de aspas duplas, com os passos separados por espaços.

*   **Para Canais de Bateria** (`kick`, `kick_deep`, `snare`, etc.):
    Qualquer caractere diferente de ponto (`.`) aciona o som da bateria (geralmente usamos `x`). O ponto (`.`) representa silêncio (pausa).
    *   *Exemplo*: `kick("x . . . x . . . x . x . x . . .");`

*   **Para Canais de Sintetizador** (`sine`, `triangle`, `sawtooth`, `square`):
    Digite os nomes das notas com suas oitavas (Ex: `C3`, `D#3`, `Eb4`, `F4`, `A4`). O ponto (`.`) representa silêncio.
    *   *Exemplo*: `bass("C3 . D3 . Eb3 . F3 . G3 . . . C3 . . .");`

*   **Tamanho dos Ciclos (Grid)**:
    A DAW ajustará automaticamente o tamanho da tela e da música para acompanhar o canal com a sequência de passos mais longa (ex: se o baixo tiver 32 notas e o bumbo 16, a música inteira tocará em loop de 32 passos).

---

## 🎼 Exemplo Prático e Detalhado

Copie e cole o código abaixo na aba de edição de código da DAW para ver e ouvir a programação em ação:

```javascript
// ==========================================
// ARRANJO CYBERPUNK CHILL - PROGRAMADO
// ==========================================
bpm(115);

// 1. Canal de Bumbo: Som de Sub Bass 808 encorpado, sem delay, sem pedal
defineSynth("bumbo", "kick_deep", 0.00, 0.25, 0.00, 0.10, 90, 1.0, 0.00, 0.00, 0, 0.05, 0);

// 2. Canal de Caixa: Usando 'snare', com reverb no FX
defineSynth("caixa", "snare", 0.00, 0.15, 0.00, 0.08, 1200, 1.5, 0.10, 0.20, 0, 0.05, 0);

// 3. Canal de Hi-Hat: Chimbau fechado rápido
defineSynth("hats", "hihat", 0.00, 0.05, 0.00, 0.05, 7000, 1.0, 0.00, 0.00, 0, 0.08, 0);

// 4. Canal de Baixo Synth: Onda dente de serra transposta 1 oitava abaixo (-12 semitons), filtro bem abafado (450 Hz)
defineSynth("baixo", "sawtooth", 0.02, 0.30, 0.70, 0.20, 450, 2.0, 0.00, 0.00, -12, 0.05, 0);

// 5. Canal de Lead: Onda quadrada de 8 bits brilhante, com vibrato automático, delay e pedal de sustain ativo
defineSynth("melodia", "square", 0.01, 0.18, 0.35, 0.15, 2500, 4.0, 0.40, 0.30, 0, 0.15, 1);

// 6. Canal de Pad Ambiental: Onda senoidal suave com ataque longo (fade-in de 0.35s) e muito delay
defineSynth("fundo", "sine", 0.35, 0.80, 0.80, 0.60, 800, 1.0, 0.50, 0.45, 0, 0.02, 1);


// ==========================================
// EFEITOS DE RACK (FX)
// ==========================================
fx("bumbo", 0.0, 0.0, 0.0);       // Bumbo limpo
fx("caixa", 0.0, 0.1, 0.45);     // Caixa com Reverb espacial e Chorus leve
fx("baixo", 0.15, 0.0, 0.0);     // Baixo com saturação/distorção analógica
fx("melodia", 0.0, 0.4, 0.35);   // Lead com Chorus espacial largo
fx("fundo", 0.0, 0.2, 0.70);     // Pad com Reverb gigante e etéreo


// ==========================================
// SEQUÊNCIAS DE PASSOS (PATTERNS - 16 passos)
// ==========================================
bumbo("x . . . x . . . x . x . x . . .");
caixa(". . . . x . . . . . . . x . . .");
hats("x x x x x x x x x x x x x x x x");

// Baixo fazendo uma linha em Lá Menor (A2) e Dó Maior (C3)
baixo("A2 A2 . A2 . A2 G2 . C3 C3 . C3 . C3 D3 .");

// Melodia de sintetizador aguda e expressiva
melodia("E4 . G4 . A4 . E5 . D5 . A4 . G4 . E4 .");

// Acordes / Notas longas de fundo flutuando
fundo("A3 . . . . . . . C4 . . . . . . .");
```

---

## 🎨 Dicas de Programação de Sintetizadores (Sound Design)

Modificando o código, você pode criar uma grande variedade de sons:

*   **Para fazer um Pluck de Trance (som curto e "estalo")**:
    *   Use tipo `"sawtooth"` ou `"triangle"`.
    *   Ataque curto (`attack: 0.01`), decaimento rápido (`decay: 0.15`), sem sustentação (`sustain: 0.0`), liberação curta (`release: 0.1`).
    *   Filtro fechado e muito ressonante (`cutoff: 1200`, `resonance: 6.0` ou mais).
    *   Exemplo: `defineSynth("pluck", "sawtooth", 0.01, 0.15, 0, 0.1, 1200, 7.0, 0.3, 0.25, 0, 0.1, 0);`

*   **Para fazer um Pad Atmosférico (som de fundo viajante)**:
    *   Use tipo `"sine"` ou `"triangle"`.
    *   Ataque longo (`attack: 0.30` a `0.60`), decaimento longo (`decay: 0.8`), sustentação alta (`sustain: 0.8`), liberação longa (`release: 0.8`).
    *   Adicione bastante Delay (`delayMix: 0.5`, `delayTime: 0.4`) e Reverb no FX (`reverb: 0.7`).
    *   Exemplo: `defineSynth("ambient", "sine", 0.4, 0.8, 0.8, 0.8, 800, 1.0, 0.5, 0.4, 0, 0.02, 1);`

*   **Para fazer um Baixo Analógico Estilo 303 (Acid)**:
    *   Use tipo `"sawtooth"` ou `"square"`.
    *   Decaimento rápido (`decay: 0.12`), sustentação média (`sustain: 0.40`), liberação rápida (`release: 0.10`).
    *   Suba a ressonância para o máximo (`resonance: 12.0`), feche o corte (`cutoff: 550`).
    *   Exemplo: `defineSynth("acid", "sawtooth", 0.01, 0.12, 0.4, 0.1, 550, 12.0, 0.1, 0.2, -12, 0.05, 0);`

---

## 📁 Usando os Timbres Integrados (Mais de 600 opções)
Na aba **TIMBRES** do painel lateral da DAW, você encontra mais de 600 timbres de sintetizadores e baterias organizados por pastas. 
Quando você clica no botão de carregar (📥) em um timbre:
1. Ele substitui os parâmetros do canal selecionado no editor de código pelo equivalente programático do timbre.
2. Você pode ver exatamente as configurações de `defineSynth` geradas e modificá-las livremente no código!

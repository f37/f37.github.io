---
title: projects
author: Florens Greßner
mathjax: true
---

## Simpler Music Generator

Input: Midi. Classification. Output autoregressive model predicting its environment.

This is a progress from [version 1](../musicgen). Pls compare the songs with each other. The model is simpler, more accurate, but less creative. Practically no training time. When past horizont big enough a music peace can exactly be copied into the model. When making horizont smaller, some infinite patterns emerge.

### Pachelbel Canon

![pachelbel](./pachelbel_canon_01.png)

<audio controls="controls">
  <source type="audio/wav" src="./nc_pachelbel_canon02.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

### Tetris

![tetris](./tetris01.png)

<audio controls="controls">
  <source type="audio/wav" src="./nc_tetris.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

unfortunally without pictures, too late for now

### Star Wars Theme

<audio controls="controls">
  <source type="audio/wav" src="./nc_starwars.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

### Elise

<audio controls="controls">
  <source type="audio/wav" src="./nc_elise.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>



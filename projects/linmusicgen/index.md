---
title: projects
author: Florens Greßner
mathjax: true
---

## Simpler Music Generator

- **Input**: Musical Instrument Digital Interface (MIDI)
- **Processing**: Classification Blackbox. 
- **Output**: autoregressive model predicting its environment.

This is a new approach for my music generator [version 1](../musicgen). This model is much simpler, more accurate, but less creative. Practically no training time (compared to version 1). 
When past horizont big enough a music peace can be completely imitated by the model. When making horizont smaller, some infinite patterns emerge. I searched for hyperparameters that result a harmonic sound loop.

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


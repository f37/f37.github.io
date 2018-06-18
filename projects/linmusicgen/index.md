---
title: Linear music generation
description: Simple Model for music generation
image: http://florens.io/projects/linmusicgen/index.png
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

Like you can see in the music patterns, the agent found a harmonic loop.

#### Original
<audio controls="controls">
  <source type="audio/wav" src="./pachelbel_canon.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>


#### Generated
<audio controls="controls">
  <source type="audio/wav" src="./nc_pachelbel_canon02.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

### Tetris

![tetris](./tetris01.png)

I find very interesting that the algorithm created new music patterns. Those can be heard in the difference of the following.

#### Original
<audio controls="controls">
  <source type="audio/wav" src="./tetris.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>


#### Generated
<audio controls="controls">
  <source type="audio/wav" src="./nc_tetris.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

---

Unfortunally the following samples are without pictures. R.I.P.

### Star Wars Theme

A little bit bumpy, some unharmonic sequences.

#### Original
<audio controls="controls">
  <source type="audio/wav" src="./starwars.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>


#### Generated
<audio controls="controls">
  <source type="audio/wav" src="./nc_starwars.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

### Elise

Found a obious loop for Für Elise by Beethoven.

#### Original
<audio controls="controls">
  <source type="audio/wav" src="./elise.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>


#### Generated
<audio controls="controls">
  <source type="audio/wav" src="./nc_elise.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>



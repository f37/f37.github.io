---
title: Music Generation
description: Generating Music via MDN
image: http://florens.io/projects/musicgen/index.png
author: Florens Greßner
mathjax: true
---

# Music Generator

## WAV soundwaves

I build a Mixture Density Model from Christopher Bishop into a Tensorflow computation graph.

### Computation Graph

![MDN](./old_thesis/cgraph.png)

### Sinus

With that I solved toyproblems, like generating Sinus

![sinus](./old_thesis/toy1.png)

### drum

![sdrum](./old_thesis/sdrum.png)
![drum](./old_thesis/drums.png)

#### original
<audio controls="controls">
<source type="audio/wav" src="./old_thesis/drums.wav"></source>
<p>Your browser does not support the audio element.</p>
</audio>

#### generated
<audio controls="controls">
  <source type="audio/wav" src="./old_thesis/gen_drums.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

### rap

![drum](./old_thesis/rap2.png)

#### original
<audio controls="controls">
<source type="audio/wav" src="./old_thesis/rap.wav"></source>
<p>Your browser does not support the audio element.</p>
</audio>

#### generated
<audio controls="controls">
  <source type="audio/wav" src="./old_thesis/rap_gen.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

## MIDI

Less complex, more efficient results

Input: Midi. Density function approximation. Output autoregressive model predicting its environment.


### Starwars

My favorite (from 1.5min+). So much different from the original.

#### original
<audio controls="controls">
<source type="audio/wav" src="http://florens.io/projects/linmusicgen/starwars.wav"></source>
<p>Your browser does not support the audio element.</p>
</audio>

#### generated
<audio controls="controls">
  <source type="audio/wav" src="./nc_starwars_001.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

### Scale A major

Simple music basics for the agent to learn with interesting result. Maybe one has to give the agent music patterns and no music pieces...

#### original
<audio controls="controls">
<source type="audio/wav" src="./scale_a_major.wav" ></source>
<p>Your browser does not support the audio element.</p>
</audio>

#### generated
<audio controls="controls">
  <source type="audio/wav" src="./nc_scale_a_major.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>

### Tetris

Very exciting, it is archived as the first working descision process.

#### original
<audio controls="controls">
<source type="audio/wav" src="http://florens.io/projects/linmusicgen/tetris.wav"></source>
<p>Your browser does not support the audio element.</p>
</audio>

#### generated
<audio controls="controls">
  <source type="audio/wav" src="./nc_tetris001.wav"></source>
  <p>Your browser does not support the audio element.</p>
</audio>




---
title: Music Generation
description: Generating Music via Mixture Density Network (MDN)
image: http://florens.io/projects/musicgen/index.png
author: Florens Greßner
mathjax: true
---

# Music Generator

- **Data**: 
    1. *.mp3*, analysing soundwaves
    2. *.mid*, analysing scores
- **Processing**: Mixture Density Network (MDN), Density function approximation
- **Output**: autoregressive music predictor

## WAV soundwaves

To process soundwaves in a standard mp3 file you will have to worry about 44k datapoints per second. Even by reducing quality that is very muchas muchachas for learning time. 

For that I took a Neural Network with bayesian interpretation of the output units.
![MDN](./old_thesis/cgraph.png)

### Sinus

The model can solve toyproblems, like generating Sinus.

![sinus](./old_thesis/toy1.png)

### drum

The model can solve toyproblems, like imitate a drum.

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

The model can solve toyproblems, like extracting the baseline of a music piece.

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

## Musical Instrument Digital Interface (MIDI)

Patterns are always hierarchical. Thinking about the environment, I don't want to predict in a complexity of a soundwave. Lets go MIDI.


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




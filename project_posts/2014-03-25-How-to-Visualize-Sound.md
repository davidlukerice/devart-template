# How To Visualize Sound

One of the enticing properties of evolving visual evolutionary art is the immediacy in which the art jumps out at the viewer. One can visit a site like [Picbreeder](http://picbreeder.org/ "Picbreeder") and have an immediate emotional reaction to the wide variety of possibilities that are brimming on the front page alone. Yet, when transferring to the audible domain, an immediate overload of sounds blaring out to users when they first visit the application would not only elicit mental confusion but also a notable aversion to continue exploring what the software has to offer. The problem, then, is how to prompt intrigue visually for audio in a welcoming way on a platform (the web) that traditionally caters to users' eyes. Not only does this visualization need to promote user interest in the software but also needs to be representative of the underlying abstract nature of the evolving “dna” that the user is guiding towards novel and interesting synthetic instruments. To complicate matters, an instrument has both on and off states that require visualizations. When a user isn't playing a particular instrument, a visualization of what it will sound like is still beneficial. In addition, since instruments will be mutated and merged together, the visualization should be able to show how the instruments differentiate from each other.


## Visualizations

There are three main types of audio visualizations (Oscilloscope, Spectrum, and Spectrogram), in addition to a network based visualization that utilizes the “dna” representing the instrument.

### Oscilloscope
![Spectrum](../project_images/2014-03-25_oscilloscope.jpg?raw=true "Spectrum")

One of the most used visualizations, the oscilloscope displays the actual waveform being moved out to the speakers. It can be used in both on and off states of an instrument. For an off state, a segment of audio that an instrument would play (say a second of playing a c4 note) can be displayed in a single image. When the instrument is being played, a constantly updated latest fraction of time can be shown. Although it represents what the speaker is receiving, the visualization gives little detail to novice users, or even expert musicians, what the instrument will actually sound like.

### Spectrum
![Spectrum](../project_images/2014-03-25_spectrum.jpg?raw=true "Spectrum")

A spectrum visualization shows the intensity of frequencies currently playing. Although an average of a segment of audio can be shown when an instrument is in the off state, this visualization is typically used to show audio in motion. So, this visualization will be a good at showing what frequencies an instrument utilizes. This gives a bit more information to users but still doesn’t give that initial emotional response to an instrument that the app needs.

### Spectrogram
![Spectrum](../project_images/2014-03-25_spectrogram.jpg?raw=true "Spectrum")

If we give a spectrum some depth, make the taller bars brighter and dim the lower ones, and finally rotate it so that so that the frequency axis is now going up and down and we’re peering down from the top of it, we have a single slice of a spectrogram. Jam many of these consecutive slices together over time and a visualization fills out that not only depicts the amplitudes of the audible frequencies but also relates these amplitudes across time so that distinct aural patterns emerge. This visualization is excellent at showing a silent instrument (by showing that same c4 note across a second) and an active instrument being played by treating the spectrogram as a piece of tape being rolled across the screen with new slices attaching to one end. Although still a step away from actually listening to an instrument, a spectrogram can visualize the patterns that an instrument produces over time and in what frequency ranges.

### Instrument Network
![graph](../project_images/2014-03-25_graph.jpg?raw=true "graph")

Since each instrument is composed of a network of audio nodes (based on the [Web Audio API]( https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html "Web Audio API"), GenSynth has the opportunity for a fourth visualization displaying the underlying structure of the instrument. A user can see what nodes are producing the base frequencies and how sound travels/combines/subtracts through various effects until it finally exits the output node. Even though a network of audio nodes is a large distance from produced sound, the visualization gives insight into how the networks are actually evolving and how the audio is generated.

## Spicing things up a byte

The provided images have been both black and white (except for the added two colors in the graph) and lifeless. Color will be a welcome addition in increasing both visual appeal and clarity of what’s being shown. For example, in a spectrogram, traversing purely from black to white is far less striking than one transitioning through blue-green-yellow-red. Further research needs to be done on the exact color scheme to use and how much control the user should have on it.
Animation is another category that can provide additional clarity in understanding how an instrument is changing. In particular, seeing how an instrument network evolves by utilizing transitions provided by [D3]( http://d3js.org/ "D3") can help in teaching what is going on to users' instruments.

Ultimately, all four visualizations are useful and will be provided to users were appropriate (in addition to other variations and hybrids that are found to be useful).

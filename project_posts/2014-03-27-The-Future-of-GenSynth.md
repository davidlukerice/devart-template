# The Future of GenSynth

The main goal going into Google’s DevArt competition was to build momentum in my thesis project. In that regard, GenSynth has made considerable advances and positioned itself for continued development in the months to come. Although there’s quite a bit left to develop, the platform is already starting to take shape!

# Todo

## Audio

### asNEAT
A.K.A, make the instruments not sound awful. Part of this will be filling out the rest of the asNEAT library. Currently, the networks are only mutating by splitting connections with intermediary nodes, adding base oscillators, mutating the weights of node connections (the gain), and mutating the various parameters within a node. This leaves out the ability to mutate new connections to various parameters other than sound in/out (which would allow FM synthesis) and “crossing over,” breeding, different instruments together (the basic underpinning of the NEAT algorithm). Crossover between instruments is one of the key elements of the NEAT algorithm’s ability to explore a given space. The inclusion of FM synthesis and crossover will greatly increase what kinds of instruments can be created and how quickly a user can find interesting instruments.

Still, though, newly evolved instruments are at a disadvantage to something like a newly evolved image. Initially evolved images can still have some kinds of interesting qualities to them, whereas instruments mostly just sound bad. Although the purpose of the platform is to help evolve better sounding networks, new users may be put off by the fact that the first several generations of instruments are difficult to wade through. The front page will definitely help in this regard (a feature I was hoping to get in for the competition, but requires data persistence, which, as talked about below, I’ve had to stay away from) since a user will be immediately prompted with showcased instruments that they can start with and evolve in new directions, but improving the initial set of random instruments will be a plus.

Exposing more options to the users for how the instrument generations are being created will also aid in the instrument search. For instance, users should be able to change how drastically their network would mutate (little changes to radical ones per generation), or if they like the actual layout of the instrument, they can freeze the underlying ‘topology’ and only mutate the various parameters already present within the instrument.

### MIDI
What good is an instrument if you can only play a single note? Randomly selecting frequencies is good for evolving various sounds (like a door closing or a laser blaster firing), but not so great when trying to evaluate an instrument. This was improved a bit by only allowing the base oscillators to play notes on a tempered scale (with a bas A4 note at 440hz), but the ability to actually play it with either an onscreen keyboard or through a MIDI controller will greatly improve testing out the instruments. Although even less standardized then the Web Audio API, the [Web MIDI API](http://www.w3.org/TR/webmidi/ "Web MIDI API") does already have at least a [polyfill](https://github.com/cwilso/WebMIDIAPIShim/ "polyfill") available so I can began testing instruments with a MIDI controller fairly quickly.

## Visualizations
Although a simple instrument network visualization has been created, a more advanced D3 [force layout](http://graus.nu/d3/ "force layout") visualization will allow users to better explore what an instrument consists of and what has changed between the various instruments. Also, the three audio visuals (as described in previous posts) will greatly help users see how the instruments are actually behaving.

## Instrument Persistence
The Google API I was looking to integrate into the platform was the G+ api for user authentication. The benefit of authenticating users is that the evolved instruments could then be saved and returned to later or published for others to branch off from. These instruments could then be voted on and tagged for easier searching. This greatly increases instrument exploration by reducing the restraints of single user fatigue and improves the probability of ‘good’ instruments rising to the top (some of the main points of Collaborative Interactive Evolution I’m researching). However, since I would then be collecting traceable data of human subjects and the project is part of my graduate research at a USA university, the IRB gets involved. Although the possible harm is minimal to users and no more than they would experience in day to day activities (increasing the likelihood of getting an exemption), I’ve only just begun the approval process.


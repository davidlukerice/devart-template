
// requires chrome 33 with chrome://flags/#enable-web-midi enabled
// influenced from midi.js at https://github.com/cwilso/midi-synth
export default Ember.Component.extend({
  // Passed in
  instrument: null,
 
  inputList: [],
  selectedInput: null,

  setupMIDI: function() {
    var self = this,
        midiAccess = null;
    navigator.requestMIDIAccess().then(onSuccess, onError);

    function onSuccess(access) {
      var preferredIndex = -1;

      midiAccess = access;

      var inputList=midiAccess.inputs();

      // If any of the inputs have "keyboard" in them, selected them first...
      _.forEach(inputList, function(input, i) {
        var str=input.name.toString();
        if (str.toLowerCase().indexOf("keyboard") !== -1 ||
            str.toLowerCase().indexOf("qx25") !== -1 )
        {
          preferredIndex=i;
          return true;
        }
      });
      if (preferredIndex === -1)
        preferredIndex = 0;

      self.set('inputList', inputList);
      self.set('selectedInput', inputList[preferredIndex]);
    }
    function onError(error) {
      throw "No MIDI? " + error.code;
    }

  }.on('init'),

  onSelectedMIDIChange: function() {
    var self = this,
        input = this.get('selectedInput'),
        A4NUMBER = 69;
    
    input.onmidimessage = function(ev) {
      var cmd = ev.data[0] >> 4;
      var channel = ev.data[0] & 0xf;
      var noteNumber = ev.data[1];
      var velocity = ev.data[2];

      if (channel == 9)
        return;
      if ( cmd==8 || ((cmd==9)&&(velocity==0)) ) { // with MIDI, note on with velocity zero is the same as note off
        // note off
        noteOff( noteNumber );
      } else if (cmd == 9) {
        // note on
        noteOn( noteNumber, velocity/127.0);
      } else if (cmd == 11) {
        //controller( noteNumber, velocity/127.0);
      } else if (cmd == 14) {
        // pitch wheel
        //pitchWheel( ((velocity * 128.0 + noteNumber)-8192)/8192.0 );
      }
    };

    function noteOn(noteNumber, velocity) {
      console.log('noteOn: '+noteNumber + " @ "+velocity);
      // todo playHold
      // todo velocity
      var steps = noteNumber - A4NUMBER;
      var instrument = self.get('instrument');
      
      var noteOscillators = instrument.getNoteOscillatorNodes();
      _.forEach(noteOscillators, function(node) {
        node.stepFromRootNote = steps;
      });

      instrument.play();

      //releaseHandler = instrument.playHold();
      //this.set('releaseHandler', releaseHandler);
    }
    function noteOff(noteNumber){
      console.log('noteOff: '+noteNumber);
    }

  }.observes('selectedInput')
});

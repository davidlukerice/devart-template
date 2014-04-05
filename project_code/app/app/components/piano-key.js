var Utils = require('asNEAT/utils')['default'];

export default Ember.Component.extend({

  note: "a4",
  hotkey: "q",
  colemakHotkey: "q",
  instrument: null,

  useColemak: true,

  tagName: 'span',

  setupKeyEvents: function() {
    var self = this,
        hotkey = this.get('useColemak') ?
          this.get('colemakHotkey') :
          this.get('hotkey');

    // special character cases
    if (hotkey === ";")
      hotkey = 186;
    else if (hotkey === '"')
      hotkey = 222;
    else
      hotkey = hotkey.toUpperCase().charCodeAt();

    // setting up events from document because we can't
    // get focus on multiple piano-keys at once for key events
    // to fire correctly
    $(document).keydown(function(e){
      if(e.keyCode === hotkey)
        self.playNote();
    });

  }.on('init'),

  playNote: function() {
    var instrument = this.get('instrument'),
        note = this.get('note');

    if (!instrument) {
      throw 'No instrument to play!';
    }

    var steps = Utils.stepsFromRootNote(note);
    Utils.log('Playing note: '+note+' ('+steps+')');

    var noteOscillators = instrument.getNoteOscillatorNodes();
    _.forEach(noteOscillators, function(node) {
      node.stepFromRootNote = steps;
    });

    instrument.play();
  },

  mouseDown: function() {
    Utils.log('mouseDown');
    this.playNote();
  },

  mouseUp: function() {
    Utils.log('mouseUp');
  },

  keyDown: function() {
    Utils.log('keyDown');
  },
  keydown: function() {
    Utils.log('keydown');
  },

  keyUp: function() {
    Utils.log('keyUp');
  }

});
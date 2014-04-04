var Utils = require('asNEAT/utils')['default'];

export default Ember.Component.extend({

  note: "a4",
  hotkey: "q",
  instrument: null,

  tagName: 'span',

  setupKeyEvents: function() {
    var self = this,
        hotkey = this.get('hotkey');

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
    Ember.run.scheduleOnce('afterRender', this, function() {
      $(document).keydown(function(e){
        if(e.keyCode === hotkey)
          self.playNote();
      });
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
    console.log('mouseDown');
    this.playNote();
  },

  mouseUp: function() {
    console.log('mouseUp');
  },

  keyDown: function() {
    console.log('keyDown');
  },
  keydown: function() {
    console.log('keydown');
  },

  keyUp: function() {
    console.log('keyUp');
  }

});
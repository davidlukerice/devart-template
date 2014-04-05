var Utils = require('asNEAT/utils')['default'];

export default Ember.Component.extend({

  note: "a4",
  hotkey: "q",
  colemakHotkey: "q",
  instrument: null,

  hotkeyLayout: "colemakHotkey",

  tagName: 'span',

  releaseHandler: null,

  activeHotkey: function() {
    var hotkeyAccesor = this.get('hotkeyLayout');
    return this.get(hotkeyAccesor);
  }.property('hotkeyLayout'),

  activeHotkeyKeyCode: function() {
    var hotkey = this.get('activeHotkey');

    // special character cases
    if (hotkey === ";")
      hotkey = 186;
    else if (hotkey === "'")
      hotkey = 222;
    else if (hotkey === "]")
      hotkey = 221;
    else
      hotkey = hotkey.toUpperCase().charCodeAt();

    return hotkey;
  }.property('activeHotkey'),

  isPlaying: function() {
    return typeof this.get('releaseHandler') === 'function';
  }.property('releaseHandler'),

  setupKeyEvents: function() {
    var self = this;

    // setting up events from document because we can't
    // get focus on multiple piano-keys at once for key events
    // to fire correctly
    $(document).keydown(function(e){
      var hotkey = self.get('activeHotkeyKeyCode');
      if(e.keyCode === hotkey && !self.get('isPlaying'))
        self.playNote();
    });

    $(document).keyup(function(e){
      var hotkey = self.get('activeHotkeyKeyCode');
      if(e.keyCode === hotkey)
        self.releaseNote();
    });

  }.on('init'),

  playNote: function() {
    var instrument = this.get('instrument'),
        note = this.get('note'),
        releaseHandler = this.get('releaseHandler');

    // make sure to release any previous notes playing
    if (typeof releaseHandler === "function")
      releaseHandler();

    if (!instrument) {
      throw 'No instrument to play!';
    }

    var steps = Utils.stepsFromRootNote(note);
    Utils.log('Playing note: '+note+' ('+steps+')');

    var noteOscillators = instrument.getNoteOscillatorNodes();
    _.forEach(noteOscillators, function(node) {
      node.stepFromRootNote = steps;
    });

    releaseHandler = instrument.playHold();
    this.set('releaseHandler', releaseHandler);
  },

  releaseNote: function() {
    var releaseHandler = this.get('releaseHandler');

    if (typeof releaseHandler === "function") {
      releaseHandler();
      this.set('releaseHandler', null);
    }
  },

  mouseDown: function() {
    Utils.log('mouseDown');
    this.playNote();
  },

  mouseUp: function() {
    Utils.log('mouseUp');
    this.releaseNote();
  }
});
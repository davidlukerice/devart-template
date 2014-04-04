var Utils = require('asNEAT/utils')['default'];

export default Ember.Component.extend({

  // Passed in
  instrument: null,

  setupHandlers: function() {

  }.on('init'),

  actions: {
    playNote: function(note) {
      var instrument = this.get('instrument');
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
    }
  }
});


export default Ember.Component.extend({
  // Passed in
  instrument: null,

  hotkeyLayouts: [
    {type: "querty", accessor: "hotkey"},
    {type: "colemak", accessor: "colemakHotkey"}],
  selectedHotkeyLayout: "colemakHotkey",

  sustaining: false,

  setupKeyEvents: function() {
    var self = this;

    // setting up events from document because we can't
    // get focus on multiple piano-keys at once for key events
    // to fire correctly
    $(document).keydown(function(e){
      e.preventDefault();
      if(e.keyCode === 32)
        self.set('sustaining', true);
    });

    $(document).keyup(function(e){
      e.preventDefault();
      if(e.keyCode === 32)
        self.set('sustaining', false);
    });

  }.on('init'),

  actions: {
    sustain: function() {
      this.set('sustaining', true);
    },

    releaseSustain: function() {
      this.set('sustaining', false);
    }
  }
});

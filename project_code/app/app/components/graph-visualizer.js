
var Visualizer = require('asNEAT/asNEAT-visualizer')['default'];

export default Ember.Component.extend({
  // passed in
  network: null,
  width: "100%",
  height: "100%",
  padding: 50,

  // created on init
  visualization: null,

  selector: function() {
    return "#"+this.elementId+' .visualizer';
  }.property('elementId'),

  initVisualization: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var visualization = Visualizer.createVisualization({
        network: this.get('network'),
        selector: this.get('selector'),
        width: this.get('width'),
        height: this.get('height'),
        padding: this.get('padding')
      });

      this.set('visualization', visualization);
    });
  }.on('init'),

  actions: {
    play: function() {
      this.get('network').play();
    }
  }
});

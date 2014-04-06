
var Visualizer = require('asNEAT/asNEAT-visualizer')['default'];

export default Ember.Component.extend({
  // passed in
  // {network, selected, isLive}
  instrumentModel: null,
  width: "100%",
  height: "100%",

  // created on init
  visualization: null,

  selector: function() {
    return "#"+this.elementId+' .visualizer';
  }.property('elementId'),

  initVisualization: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var visualization = Visualizer.createForceVisualization({
        network: this.get('instrumentModel.network'),
        selector: this.get('selector'),
        width: this.get('width'),
        height: this.get('height')
      });

      this.set('visualization', visualization);
    });
  }.on('init'),

  actions: {
    play: function() {
      this.get('instrumentModel.network').play();
    }
  }
});

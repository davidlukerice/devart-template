
var Visualizer = require('asNEAT/asNEAT-visualizer')['default'];

export default Ember.Component.extend({
  // passed in
  network: null,

  // created on init
  visualization: null,

  initVisualization: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var selector = "#"+this.elementId+' .network';
      var visualization = Visualizer.createVisualization({
        network: this.get('network'),
        selector: selector
      });

      this.set('visualization', visualization);
    });
  }.on('init')

});

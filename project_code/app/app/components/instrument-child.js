
import GraphVisualizer from 'appkit/components/graph-visualizer';

export default GraphVisualizer.extend({
  // passed in
  network: null,

  // shadow element of network
  selected: function() {
    return this.get('network.selected');
  }.property('network.selected'),

  padding: 60,
  width: 360,
  height: 235,

  actions: {
    toggleSelected: function() {
      this.set('network.selected', !this.get('selected'));
    }
  }
});
